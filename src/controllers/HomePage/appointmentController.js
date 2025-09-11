import Appointment from "../../models/HomePage/Appointment.model.js";
import { Op } from "sequelize";

// Create Appointment
export const createAppointment = async (req, res, next) => {
    try {
        const { name, email, contact_number, date, time, reason_of_meeting, your_expectation, more_details } = req.body;

        const existingAppointment = await Appointment.findOne({
            where: { email, date, time }
        });

        if (existingAppointment) {
            return res.status(400).json({
                message: `You already have an appointment on ${date} at ${time}`
            });
        }

        const appointment = await Appointment.create({
            name, email, contact_number, date, time, reason_of_meeting, your_expectation, more_details
        })

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
            data: rows.map((row) => row.get({ plain: true }))
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

        res.json(appointment.get({ plain: true }));

    } catch (error) {
        next(error)
    }
};

// Update Appointment
export const updateAppointment = async (req, res, next) => {
    try {
        const { id } = req.params;

        const appointment = await Appointment.findByPk(id);

        if (!appointment) return res.status(404).json({ message: "Appointment not found" });

        const { name, email, contact_number, date, time, reason_of_meeting, your_expectation, more_details } = req.body;

        await appointment.update({
            name: name ?? appointment.name,
            email: email ?? appointment.email,
            contact_number: contact_number ?? appointment.contact_number,
            date: date ?? appointment.date,
            time: time ?? appointment.time,
            reason_of_meeting: reason_of_meeting ?? appointment.reason_of_meeting,
            your_expectation: your_expectation ?? appointment.your_expectation,
            more_details: more_details ?? appointment.more_details
        });

        res.json({ message: "Appointment updated successfully", appointment });

    } catch (error) {
        next(error)
    }
};

// Delete Appointment
export const deleteAppointment = async (req, res, next) => {
    try {
        const { id } = req.params;

        const appointment = await Appointment.findByPk(id);

        if (!appointment) return res.status(404).json({ message: "Appointment not found" });

        await appointment.destroy();

        res.json({ message: "Appointment deleted successfully" });

    } catch (error) {
        next(error)
    }
};