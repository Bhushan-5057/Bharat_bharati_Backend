
import { Education, EducationImages, User } from '../models/index.js'

// Create Education
export const createEducation = async (req, res, next) => {
    try {
        const { type, title, description, school_address } = req.body;
        const files = req.files ? req.files : []; 

        if (!files || files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one image is required"
            });
        }

        let isMainImage = req.body.is_main || [];
        if (!Array.isArray(isMainImage)) {
            isMainImage = [isMainImage];
        }

        const existingEducation = await Education.findOne({ where: { title } });
        if (existingEducation) {
            return res.status(400).json({
                success: false,
                message: `Education with title "${title}" already exists`
            });
        }

        const education = await Education.create({
            type,
            title,
            description,
            school_address: type === 'school' ? school_address : null,
            created_by: req.user.id
        })

        if (files && files.length > 0) {
            const imagesData = files.map((file, index) => ({
                education_id: education.id,
                file_name: file.originalname,
                data: file.buffer,
                is_main: isMainImage[index] === "true"
            }));

            await EducationImages.bulkCreate(imagesData);
        }

        const educatiuonWithRelaion = await Education.findByPk(education.id, {
            include: [
                { model: EducationImages, as: 'images' },
                { model: User, as: "creator", attributes: ["id", "name"] }
            ]
        })

        res.status(201).json({ message: `${type} created successfully`, educatiuonWithRelaion });
    } catch (error) {
        next(error)
    }
};

// Get all Education 
export const getAllEducations = async (req, res, next) => {
    try {
        const { type } = req.query;

        const whereClause = type ? { type } : {};

        const educations = await Education.findAll({
            where: whereClause,
            include: [
                { model: EducationImages, as: 'images' },
                { model: User, as: "creator", attributes: ["id", "name"] }
            ]
        });

        const formattedEducations = educations.map(education => ({
            id: education.id,
            type: education.type,
            title: education.title,
            description: education.description,
            school_address: education.school_address,
            created_by: education.created_by,
            creator: education.creator,
            createdAt: education.createdAt,
            updatedAt: education.updatedAt,
            images: education.images.map(img => ({
                id: img.id,
                file_name: img.file_name,
                is_main: img.is_main,
                data: img.data.toString("base64")
            }))
        }));

        res.json(formattedEducations);
    } catch (error) {
        next(error)
    }
}

// Get Education or school by ID
export const getEducationById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const education = await Education.findByPk(id, {
            include: [
                { model: EducationImages, as: 'images' },
                { model: User, as: "creator", attributes: ["id", "name"] }
            ]
        });
        if (!education) return res.status(404).json({ error: "Not found" });

        const formattedEducation = {
            id: education.id,
            type: education.type,
            title: education.title,
            description: education.description,
            school_address: education.school_address,
            created_by: education.created_by,
            creator: education.creator,
            createdAt: education.createdAt,
            updatedAt: education.updatedAt,
            images: education.images.map(img => ({
                id: img.id,
                is_main: img.is_main,
                file_name: img.file_name,
                data: img.data.toString("base64")
            }))
        };

        res.json(formattedEducation);
    } catch (error) {
        next(error)
    }
};

// Update Education or School
export const updateEducation = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { type, title, description, school_address } = req.body;
        const files = req.files;

        const education = await Education.findByPk(id, {
            include: [{ model: EducationImages, as: "images" }]
        });
        if (!education) return res.status(404).json({ error: "Not found" });

        await education.update({
            type: type ?? education.type,
            title,
            description,
            school_address: (type ?? education.type) === "school" ? school_address : null,
        });

        if (files && files.length > 0) {
            for (const file of files) {
                const existingImage = education.images.find(
                    img => img.file_name === file.originalname
                );

                if (existingImage) {
                    await existingImage.update({
                        data: file.buffer
                    });
                } else {
                    await EducationImages.create({
                        education_id: id,
                        file_name: file.originalname,
                        data: file.buffer
                    });
                }
            }
        }

        const updated = await Education.findByPk(id, {
            include: [
                { model: EducationImages, as: "images" },
                { model: User, as: "creator", attributes: ["id", "name"] }
            ]
        });

        const formattedEducation = {
            id: updated.id,
            type: updated.type,
            title: updated.title,
            description: updated.description,
            school_address: updated.school_address,
            created_by: updated.created_by,
            creator: updated.creator,
            createdAt: updated.createdAt,
            updatedAt: updated.updatedAt,
            images: updated.images.map(img => ({
                education_id: img.id,
                file_name: img.file_name,
                data: img.data.toString("base64")
            }))
        };

        res.json({
            message: `${type ?? education.type} updated successfully`,
            education: formattedEducation
        });
    } catch (error) {
        next(error);
    }
};

// Delete Education or School
export const deleteEducation = async (req, res, next) => {
    try {
        const { id } = req.params;

        const education = await Education.findByPk(id);
        if (!education) {
            return res.status(404).json({ success: false, message: "Education or school record not found" });
        }

        await EducationImages.destroy({ where: { education_id: id } });

        await education.destroy();

        res.json({ message: "Education and related images deleted successfully" });
    } catch (error) {
        next(error)
    }
};

//Update Education Image by ID
export const updateEducationImageById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { is_main } = req.body;
        const files = req.files;

        const image = await EducationImages.findByPk(id);
        if (!image) {
            return res.status(404).json({ error: "Image not found" });
        }

        if (files && files.length > 0) {
            const file = files[0];
            await image.update({
                file_name: file.originalname,
                data: file.buffer
            });
        }

        if (is_main === true || is_main === "true") {
            await EducationImages.update(
                { is_main: false },
                { where: { education_id: image.education_id } }
            );

            await image.update({ is_main: true });
        }

        res.json({
            message: "Image updated successfully",
            image: {
                id: image.id,
                education_id: image.education_id,
                is_main: image.is_main,
                file_name: image.file_name,
                data: image.data.toString("base64")
            }
        });
    } catch (error) {
        next(error);
    }
};

// Delete Education Image by ID
export const deleteEducationImageById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const image = await EducationImages.findByPk(id);
        if (!image) {
            return res.status(404).json({ error: "Image not found" });
        }
        await image.destroy();
        res.json({ message: "Image deleted successfully" });
    } catch (error) {
        next(error)
    }
}