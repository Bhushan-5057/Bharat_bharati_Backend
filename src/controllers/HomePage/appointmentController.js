import Appointment from "../../models/HomePage/Appointment.model.js";
import { Op } from "sequelize";
import { sendEmail } from "../../utils/sendEmail.js";
import { appointmentConfirmationTemplate, newAppointmentNotificationTemplate } from "../../utils/emailTemplates.js";

// Create Appointment
export const createAppointment = async (req, res, next) => {
    try {
        const { name, email, contact_number, date, time, reason_of_meeting, your_expectation, more_details } = req.body;

        const existingAppointment = await Appointment.findOne({
            where: { email, date, time }
        });

        if (existingAppointment) {
            return res.status(400).json({
                message: `You already have an appointment on ${date} at ${time} with ${name}.`
            });
        }

        const appointment = await Appointment.create({
            name, email, contact_number, date, time, reason_of_meeting, your_expectation, more_details
        });

        await sendEmail(
            email,
            "Appointment Confirmation",
            `Dear ${name},\n\nYour appointment is scheduled on ${date} at ${time}.`,
            appointmentConfirmationTemplate(name, date, time, reason_of_meeting)
        );

        await sendEmail(
            process.env.TRUST_EMAIL,
            "New Appointment Received",
            `New appointment created for ${name} on ${date} at ${time}.`,
            newAppointmentNotificationTemplate({
                name, email, contact_number, date, time,
                reason_of_meeting, your_expectation, more_details
            })
        );

        res.status(201).json({ message: "Appointment created successfully", appointment });
    } catch (error) {
        next(error)
    }
};

// Get all Appointments
export const getAllAppointments = async (req, res, next) => {
    try {

        const {
            page = 1,
            limit = 10,
            search = '',
            sortBy = 'createdAt',
            order = 'DESC',
            view
        } = req.query;

        const pageNumber = parseInt(page) || 1;
        const limitNumber = parseInt(limit) || 10;
        const offset = (pageNumber - 1) * limitNumber;

        const sortOrder = ['ASC', 'DESC'].includes(order.toUpperCase())
            ? order.toUpperCase()
            : 'DESC';


        const whereCondition = {};

        if (search) {
            whereCondition[Op.or] = [
                { name: { [Op.like]: `%${search}%` } },
                { email: { [Op.like]: `%${search}%` } },
            ];
        }

        if (view !== undefined) {
            whereCondition.view = view === "true";
        }

        const { count, rows } = await Appointment.findAndCountAll({
            where: whereCondition,
            offset,
            limit: limitNumber,
            order: [[sortBy, sortOrder]],
        });

        return res.json({
            total: count,
            page: pageNumber,
            totalPages: Math.ceil(count / limitNumber),
            data: rows.map((row) => ({
                ...row.get({ plain: true }),
                createdAt: row.createdAt,
                updatedAt: row.updatedAt
            }))
        })
    } catch (error) {
        next(error)
    }
};

// Get Appointment by ID
export const getAppointmentById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const appointment = await Appointment.findByPk(id);

        if (!appointment) return res.status(404).json({ message: "Appointment not found" });

        if (!appointment.view) {
            appointment.view = true;
            await appointment.save();
        }

        res.json({
            ...appointment.get({ plain: true }),
            createdAt: appointment.createdAt,
            updatedAt: appointment.updatedAt
        });

    } catch (error) {
        next(error)
    }
};