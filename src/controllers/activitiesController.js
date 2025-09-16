import { Activities, User } from "../models/index.js";

// Create  Activities
export const createActivities = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const existingActivities = await Activities.findOne({ where: { title } });
        if (existingActivities) {
            return res.status(409).json({ success: false, message: "Activities with this title already exists" });
        }

        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image File is required" });
        }

        const activities = await Activities.create({
            title,
            description,
            file_name: req.file.originalname,
            data: req.file.buffer,
            created_by: req.user.id,
        });

        const activitiesWithRelation = await Activities.findByPk(activities.id, {
            include: [
                { model: User, as: "creator", attributes: ["id", "name"] }
            ]
        })

        res.status(201).json({
            success: true,
            message: "Activities record created successfully",
            activitiesWithRelation
        });
    } catch (error) {
        next(error)
    }
};

// Get All  activities
export const getAllActivities = async (req, res, next) => {
    try {
        const activities = await Activities.findAll({
            include: [
                { model: User, as: 'creator', attributes: ["id", "name"] }
            ]
        });

        res.json(activities.map(activity => ({
            id: activity.id,
            title: activity.title,
            description: activity.description,
            created_by: activity.created_by,
            creator: activity.creator,
            createdAt: activity.createdAt,
            updatedAt: activity.updatedAt,
            file_name: activity.file_name,
            data: activity.data.toString("base64"),
        })));
    } catch (error) {
        next(error)
    }
};

// Get activity by ID
export const getActivityById = async (req, res) => {
    try {
        const { id } = req.params;
        const activities = await Activities.findByPk(id, {
            include: [
                { model: User, as: 'creator', attributes: ["id", "name"] }
            ]
        });

        if (!activities) {
            return res.status(404).json({ success: false, message: "Activities not found" });
        }

        res.json({
            id: activities.id,
            title: activities.title,
            description: activities.description,
            created_by: activities.created_by,
            creator: activities.creator,
            createdAt: activities.createdAt,
            updatedAt: activities.updatedAt,
            file_name: activities.file_name,
            data: activities.data.toString("base64"),
        });
    } catch (error) {
        next(error)
    }
};

// Update activities
export const updateActivities = async (req, res) => {
    try {

        const { id } = req.params;
        const { title, description } = req.body;

        const activities = await Activities.findByPk(id);
        if (!activities) {
            return res.status(404).json({ message: "Activities not found" });
        }

        if (req.file) {
            activities.file_name = req.file.originalname;
            activities.data = req.file.buffer;
        }

        if (title) activities.title = title;
        if (description) activities.description = description;

        await activities.save();

        const updated = await Activities.findByPk(activities.id, {
            include: [
                { model: User, as: "creator", attributes: ["id", "name"] }
            ]
        })

        const formattedActivity = {
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

        res.json({
            success: true,
            message: "Activity updated successfully",
            formattedActivity
        });
    } catch (error) {
        next(error)
    }
};

// Delete  activities
export const deleteActivities = async (req, res) => {
    try {
        const { id } = req.params;

        const activities = await Activities.findByPk(id);
        if (!activities) {
            return res.status(404).json({ success: false, message: "Activities not found" });
        }

        await activities.destroy();

        res.json({ success: true, message: "Activity deleted successfully" });
    } catch (error) {
        next(error)
    }
};
