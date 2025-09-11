import { Integration, User } from "../models/index.js";

// Create  integration
export const createIntegration = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        if (!req.file) {
            return res.status(400).json({ success: false, message: "File is required" });
        }

        const integration = await Integration.create({
            title,
            description,
            file_name: req.file.originalname,
            data: req.file.buffer,
            created_by: req.user.id,
        });

        const integrationWithRelation = await Integration.findByPk(integration.id, {
            include: [
                { model: User, as: "creator", attributes: ["id", "name"] }
            ]
        })

        res.status(201).json({
            success: true,
            message: "Integration record created successfully",
            integrationWithRelation
        });
    } catch (error) {
        next(error)
    }
};

// Get All  integration
export const getAllIntegrations = async (req, res, next) => {
    try {
        const integrations = await Integration.findAll({
            include: [
                { model: User, as: 'creator', attributes: ["id", "name"] }
            ]
        });

        res.json(integrations.map(integration => ({
            id: integration.id,
            title: integration.title,
            description: integration.description,
            file_name: integration.file_name,
            data: integration.data.toString("base64"),
            created_by: integration.created_by,
            creator: integration.creator
        })));
    } catch (error) {
        next(error)
    }
};

// Get integration by ID
export const getIntegrationById = async (req, res) => {
    try {
        const { id } = req.params;
        const integration = await Integration.findByPk(id, {
            include: [
                { model: User, as: 'creator', attributes: ["id", "name"] }
            ]
        });

        if (!integration) {
            return res.status(404).json({ success: false, message: "Integration not found" });
        }

        res.json({
            id: integration.id,
            title: integration.title,
            description: integration.description,
            file_name: integration.file_name,
            data: integration.data.toString("base64"),
            created_by: integration.created_by,
            creator: integration.creator
        });
    } catch (error) {
        next(error)
    }
};

// Update integration
export const updateIntegration = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const integration = await Integration.findByPk(id);
        if (!integration) {
            return res.status(404).json({ message: "Integration not found" });
        }

        if (req.file) {
            integration.file_name = req.file.originalname;
            integration.data = req.file.buffer;
        }

        if (title) integration.title = title;
        if (description) integration.description = description;

        await integration.save();

        const updated = await Integration.findByPk(integration.id, {
            include: [
                { model: User, as: "creator", attributes: ["id", "name"] }
            ]
        }) 

        const formattedIntegration = {
            id: updated.id,
            title: updated.title,
            description: updated.description,
            created_by: updated.created_by,
            creator: updated.creator,
            file_name: updated.file_name,
            data: updated.data ? updated.data.toString("base64") : null
        };

        res.json({
            success: true,
            message: "Integration updated successfully",
            formattedIntegration
        });
    } catch (error) {
        next(error)
    }
};

// Delete  integration
export const deleteIntegration = async (req, res) => {
    try {
        const { id } = req.params;

        const integration = await Integration.findByPk(id);
        if (!integration) {
            return res.status(404).json({ success: false, message: "Integration not found" });
        }

        await integration.destroy();

        res.json({ success: true, message: "Integration deleted successfully" });
    } catch (error) {
        next(error)
    }
};
