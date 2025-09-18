import { Service, User } from "../../models/index.js";
import { Op } from "sequelize";

// Create Service
export const createService = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "Image file is required" });
        }

        const existingService = await Service.findOne({
            where: { title, description }
        });
        if (existingService) {
            return res.status(409).json({ message: "Service with this title and description already exists" });
        }

        const service = await Service.create({
            title,
            description,
            file_name: req.file.originalname,
            data: req.file.buffer,
            created_by: req.user.id
        });

        const serviceWithRelation = await Service.findByPk(service.id, {
            include: [
                { model: User, as: "creator", attributes: ["id", "name"] }
            ]
        })

        res.status(201).json({ message: "Service created successfully", serviceWithRelation });
    } catch (error) {
        next(error)
    }
};

// Get all Services
export const getAllServices = async (req, res, next) => {
    try {
        const services = await Service.findAll({
            include: [
                { model: User, as: 'creator', attributes: ["id", "name"] }
            ]
        });
        res.json(services.map(service => ({
            id: service.id,
            title: service.title,
            description: service.description,
            created_by: service.created_by,
            creator: service.creator,
            createdAt: service.createdAt,
            updatedAt: service.updatedAt,
            file_name: service.file_name,
            data: service.data.toString("base64"),
        })));
    } catch (error) {
        next(error)
    }
};

// Get Service by ID
export const getServiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service.findByPk(id, {
            include: [
                { model: User, as: 'creator', attributes: ["id", "name"] }
            ]
        });

        if (!service) return res.status(404).json({ message: "Service not found" });

        res.json({
            id: service.id,
            title: service.title,
            description: service.description,
            created_by: service.created_by,
            creator: service.creator,
            createdAt: service.createdAt,
            updatedAt: service.updatedAt,
            file_name: service.file_name,
            data: service.data.toString("base64"),

        });
    } catch (error) {
        console.error("Error fetching service:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update Service
export const updateService = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const service = await Service.findByPk(id);
        if (!service) return res.status(404).json({ message: "Service not found" });

        const updates = { title, description };
        const uniqueFields = ["title", "description"];

        for (const field of uniqueFields) {
            if (updates[field]) {
                const existing = await Service.findOne({
                    where: {
                        [field]: updates[field],
                        id: { [Op.ne]: id }
                    }
                });
                if (existing) {
                    return res
                        .status(409)
                        .json({ message: `Another service with this ${field} already exists.` });
                }
                service[field] = updates[field];
            }
        }

        if (req.file) {
            const duplicateFile = await Service.findOne({
                where: {
                    id: { [Op.ne]: id },
                    file_name: req.file.originalname
                }
            });

            if (duplicateFile) {
                return res.status(409).json({
                    message: "Another service with this file already exists. Please upload a different file."
                });
            }

            service.file_name = req.file.originalname;
            service.data = req.file.buffer;
        }

        await service.save();

        const updated = await Service.findByPk(service.id, {
            include: [{ model: User, as: "creator", attributes: ["id", "name"] }]
        });

        const formattedService = {
            id: updated.id,
            title: updated.title,
            description: updated.description,
            created_by: updated.created_by,
            creator: updated.creator,
            createdAt: updated.createdAt,
            updatedAt: updated.updatedAt,
            file_name: updated.file_name,
            data: updated.data ? updated.data.toString("base64") : null,
        };

        res.json({ message: "Service updated successfully", formattedService });
    } catch (error) {
        next(error);
    }
};

// Delete Service
export const deleteService = async (req, res, next) => {
    try {
        const { id } = req.params;
        const service = await Service.findByPk(id);

        if (!service) return res.status(404).json({ message: "Service not found" });

        await service.destroy();
        res.json({ message: "Service deleted successfully" });
    } catch (error) {
        next(error)
    }
};