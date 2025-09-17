import { User, GalleryImage } from '../models/index.js'
import { Op } from 'sequelize';

// Add one or many images
export const addImage = async (req, res, next) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No files uploaded" });
        }
        const fileNames = req.files.map(file => file.originalname);

        const existingImages = await GalleryImage.findAll({
            where: { file_name: fileNames }
        });

        if (existingImages.length > 0) {
            const existingNames = existingImages.map(img => img.file_name);
            return res.status(409).json({
                success: false,
                message: `Image(s) with these file names already exist: ${existingNames.join(", ")}`
            });
        }

        let savedData = [];
        for (const file of req.files) {
            const newImage = await GalleryImage.create({
                file_name: file.originalname,
                data: file.buffer,
                created_by: req.user.id,
            });
            savedData.push({ id: newImage.id, file_name: newImage.file_name });
        }

        const creator = await User.findByPk(req.user.id, { attributes: ["id", "name"] });

        res.status(201).json({
            message: `${savedData.length} image(s) uploaded successfully`,
            files: savedData,
            creator,
        });
    } catch (error) {
        next(error)
    }
};

// Get All Images
export const getAllImages = async (req, res, next) => {
    try {
        const images = await GalleryImage.findAll({
            include: [{ model: User, as: "creator", attributes: ["id", "name"] }],
            order: [["createdAt", "DESC"]]
        });

        const result = images.map(img => ({
            id: img.id,
            file_name: img.file_name,
            created_by: img.created_by,
            creator: img.creator,
            createdAt: img.createdAt,
            updatedAt: img.updatedAt,
            data: img.data.toString("base64"),
        }));

        res.json(result);
    } catch (error) {
        next(error)
    }
};

// Get Image by ID
export const getImageById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const image = await GalleryImage.findByPk(id, {
            include: [{ model: User, as: "creator", attributes: ["id", "name"] }],
        });

        if (!image) {
            return res.status(404).json({ message: "Image not found" });
        }

        res.json({
            id: image.id,
            file_name: image.file_name,
            creator: image.creator,
            created_by: image.created_by,
            createdAt: image.createdAt,
            updatedAt: image.updatedAt,
            data: image.data.toString("base64"),
        });
    } catch (error) {
        next(error)
    }
};

// Update Image
export const updateImage = async (req, res, next) => {
    try {
        const { id } = req.params;

        const image = await GalleryImage.findByPk(id);
        if (!image) {
            return res.status(404).json({ message: "Image not found" });
        }

        if (req.files && req.files.length > 0) {
            const file = req.files[0];

            const existingImage = await GalleryImage.findOne({
                where: {
                    file_name: file.originalname,
                    id: { [Op.ne]: id }
                }
            });

            if (existingImage) {
                return res.status(409).json({
                    success: false,
                    message: `Image with file name "${file.originalname}" already exists`
                });
            }

            image.file_name = file.originalname;
            image.data = file.buffer;
        }

        await image.save();

        const creator = await User.findByPk(req.user.id, { attributes: ["id", "name"] });

        res.json({ message: "Image updated successfully", id: image.id, file_name: image.file_name, creator });
    } catch (error) {
        next(error)
    }
};

// Delete Image
export const deleteImage = async (req, res, next) => {
    try {
        const { id } = req.params;
        const image = await GalleryImage.findByPk(id);

        if (!image) {
            return res.status(404).json({ message: "Image not found" });
        }

        await image.destroy();

        res.json({ message: "Image deleted successfully" });
    } catch (error) {
        next(error)
    }
};