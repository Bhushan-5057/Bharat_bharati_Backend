import {OfficeBearer,User} from "../../models/index.js";

// Create Office Bearer
export const createOfficeBearer = async (req, res,next) => {
    try {
        const { title, designation, quotes, twitter, facebook, gmail } = req.body;
        
        const existingOfficeBearer = await OfficeBearer.findOne({ where: { title } });
        if (existingOfficeBearer) {
            return res.status(409).json({ message: "Office bearer with this title already exists" });
        }
        if (!req.file) {
            return res.status(400).json({ message: "Image file is required" });
        }

        const officeBearer = await OfficeBearer.create({
            title,
            designation,
            quotes,
            file_name: req.file.originalname,
            data: req.file.buffer,
            twitter,
            facebook,
            gmail,
            created_by: req.user.id
        }); 

        const officeBearerWithCreator = await OfficeBearer.findByPk(officeBearer.id, {
            include: [
                { model: User, as: "creator", attributes: ["id","name"] }
            ]
        });

        res.status(201).json({
            message: "Office bearer created successfully",
            officeBearerWithCreator: {
                id: officeBearerWithCreator.id,
                title: officeBearerWithCreator.title,
                designation: officeBearerWithCreator.designation,
                quotes: officeBearerWithCreator.quotes,
                file_name: officeBearerWithCreator.file_name,
                twitter: officeBearerWithCreator.twitter,
                facebook: officeBearerWithCreator.facebook,
                gmail: officeBearerWithCreator.gmail,
                created_by: officeBearerWithCreator.created_by,
                creator: officeBearerWithCreator.creator,
                createdAt: officeBearerWithCreator.createdAt,
                updatedAt: officeBearerWithCreator.updatedAt,
                data: officeBearerWithCreator.data ? officeBearerWithCreator.data.toString("base64") : null,
            }
        });
    } catch (error) {
        next(error)
    }
};

// Get all Office bearer
export const getAllOfficeBearer = async (req, res,next) => {
    try {
        const officeBearers = await OfficeBearer.findAll({
            include: [
                {model:User,as:"creator",attributes:["id","name"]}
            ]
        });
        res.json(officeBearers.map(officeBearer => ({
            id: officeBearer.id,
            title: officeBearer.title,
            designation: officeBearer.designation,
            quotes:officeBearer.quotes,
            file_name: officeBearer.file_name,
            twitter:officeBearer.twitter,
            facebook:officeBearer.facebook,
            gmail:officeBearer.gmail,
            created_by: officeBearer.created_by,
            creator: officeBearer.creator,
            createdAt: officeBearer.createdAt,
            updatedAt: officeBearer.updatedAt,
            data: officeBearer.data?.toString("base64"),
        })));
    } catch (error) {
        next(error)
    }
};

// Get Office bearer by ID
export const getOfficeBearerById = async (req, res,next) => {
    try {
        const { id } = req.params;
        const officeBearer = await OfficeBearer.findByPk(id, {
            include: [
                {model:User,as:'creator',attributes:["id","name"]}
            ]
        });

        if (!officeBearer) return res.status(404).json({ message: "Office bearer not found" });

        res.json({
            id: officeBearer.id,
            title: officeBearer.title,
            designation: officeBearer.designation,
            quotes: officeBearer.quotes,
            file_name: officeBearer.file_name,
            twitter: officeBearer.twitter,
            facebook: officeBearer.facebook,
            gmail: officeBearer.gmail,
            created_by: officeBearer.created_by,
            creator: officeBearer.creator,
            createdAt: officeBearer.createdAt,
            updatedAt: officeBearer.updatedAt,
            data: officeBearer.data.toString("base64"),
        });
    } catch (error) {
       next(error)
    }
};

// Update Office bearer
export const updateOfficeBearer = async (req, res,next) => {
    try {
        const { id } = req.params;
        const { title, designation,quotes, twitter, facebook, gmail } = req.body;

        const officeBearer = await OfficeBearer.findByPk(id);
        if (!officeBearer) return res.status(404).json({ message: "Office bearer not found" });

        if (req.file) {
            officeBearer.file_name = req.file.originalname;
            officeBearer.data = req.file.buffer;
        }

        if (title) officeBearer.title = title;
        if (designation) officeBearer.designation = designation;
        if (quotes) officeBearer.quotes = quotes;
        if (twitter) officeBearer.twitter = twitter;
        if (facebook) officeBearer.facebook = facebook;
        if (gmail) officeBearer.gmail = gmail;

        await officeBearer.save(); 

        const updated = await OfficeBearer.findByPk(id, {
            include: [{ model: User, as: "creator", attributes: ["id", "name"] }]
        }); 

        const formattedOfficeBearer = {
            id: updated.id,
            title: updated.title,
            designation: updated.designation,
            quotes: updated.quotes,
            twitter: updated.twitter,
            facebook: updated.facebook,
            gmail: updated.gmail,
            created_by: updated.created_by,
            creator: updated.creator,
            file_name: updated.file_name,
            createdAt: updated.createdAt,
            updatedAt: updated.updatedAt,
            data: updated.data ? updated.data.toString("base64") : null,
        };

        res.json({ message: "Office bearer updated successfully", formattedOfficeBearer });
    } catch (error) {
       next(error)
    }
};

// Delete Office bearer
export const deleteOfficeBearer = async (req, res,next) => {
    try {
        const { id } = req.params;
        const officeBearer = await OfficeBearer.findByPk(id);

        if (!officeBearer) return res.status(404).json({ message: "Office bearer not found" });

        await officeBearer.destroy();
        res.json({ message: "Office bearer deleted successfully" });
    } catch (error) {
       next(error)
    }
};
