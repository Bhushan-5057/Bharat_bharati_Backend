import { Cities, User, CityImages } from "../models/index.js";

// Create  Cities
export const createCity = async (req, res, next) => {
    try {
        const { title, description } = req.body; 
        const files = req.files ? req.files : [];  

        let isMainImage = req.body.is_main || [];
        if (!Array.isArray(isMainImage)) {
            isMainImage = [isMainImage];
        }

        const existingCity = await Cities.findOne({ where: { title } });
        if (existingCity) {
            return res.status(400).json({
                success: false,
                message: `City with title "${title}" already exists`
            });
        }

        if (!files || files.length === 0) {
            return res.status(400).json({ success: false, message: "Image File is required" });
        }

        const city = await Cities.create({
            title,
            description,
            created_by: req.user.id,
        });

        const imagesData = files.map((file, index) => ({
            cities_id: city.id,
            file_name: file.originalname,
            is_main: isMainImage[index] === "true",
            data: file.buffer,
        }));

        await CityImages.bulkCreate(imagesData);

        const citiyWithRelation = await Cities.findByPk(city.id, {
            include: [
                { model: CityImages, as: 'images' },
                { model: User, as: "creator", attributes: ["id", "name"] }
            ]
        })

        res.status(201).json({
            success: true,
            message: "City record created successfully",
            citiyWithRelation: {
                id: citiyWithRelation.id,
                title: citiyWithRelation.title,
                description: citiyWithRelation.description,
                created_by: citiyWithRelation.created_by,
                creator: citiyWithRelation.creator,
                created_at: citiyWithRelation.createdAt,
                updated_at: citiyWithRelation.updatedAt,
                images: citiyWithRelation.images.map(img => ({  
                    id: img.id,
                    file_name: img.file_name,
                    is_main: img.is_main,
                    data: img.data.toString("base64"),
                }))
            }
        });
    } catch (error) {
        next(error)
    }
};

// Get All  Cities
export const getAllCities = async (req, res, next) => {
    try {
        const cities = await Cities.findAll({
            include: [
                { model: CityImages, as: 'images' },
                { model: User, as: 'creator', attributes: ["id", "name"] }
            ]
        });

        res.json(cities.map(city => ({
            id: city.id,
            title: city.title,
            description: city.description,
            created_by: city.created_by,
            creator: city.creator,
            created_at: city.createdAt,
            updated_at: city.updatedAt,
            images: city.images.map(img => ({
                id: img.id,
                file_name: img.file_name,
                is_main: img.is_main,
                data: img.data.toString("base64")
            }))
        })));
    } catch (error) {
        next(error)
    }
};

// Get city by ID
export const getCityById = async (req, res,next) => {
    try {
        const { id } = req.params;
        const cities = await Cities.findByPk(id, {
            include: [
                { model: CityImages, as: 'images' },
                { model: User, as: 'creator', attributes: ["id", "name"] }
            ]
        });

        if (!cities) {
            return res.status(404).json({ success: false, message: "City not found" });
        }

        res.json({
            id: cities.id,
            title: cities.title,
            description: cities.description,
            created_by: cities.created_by,
            creator: cities.creator,
            created_at: cities.createdAt,
            updated_at: cities.updatedAt,
            images: cities.images.map(img => ({
                id: img.id,
                file_name: img.file_name,
                is_main: img.is_main,
                data: img.data.toString("base64")
            }))
        });
    } catch (error) {
        next(error)
    }
};

export const updateCity = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const files = req.files; 

        const city = await Cities.findByPk(id, {
            include: [{ model: CityImages, as: "images" }]
        });

        if (!city) {
            return res.status(404).json({ success: false, message: "City not found" });
        }

        await city.update({ title, description });

        if (files && files.length > 0) {
            for (const file of files) {
                const existingImage = city.images.find(img => img.file_name === file.originalname);

                if (existingImage) {
                    await existingImage.update({
                        data: file.buffer
                    });
                } else {
                    await CityImages.create({
                        cities_id: id,
                        file_name: file.originalname,
                        data: file.buffer
                    });
                }
            }
        }

        const updated = await Cities.findByPk(id, {
            include: [
                { model: CityImages, as: "images" },
                { model: User, as: "creator", attributes: ["id", "name"] }
            ]
        }); 

        const formattedCity = {
            id: updated.id,
            title: updated.title,
            description: updated.description,
            created_by: updated.created_by,
            creator: updated.creator,
            created_at: updated.createdAt,
            updated_at: updated.updatedAt,
            images: updated.images.map(img => ({
                cities_id: img.id,
                file_name: img.file_name,
                data: img.data.toString("base64") 
            }))
        };

        res.json({
            success: true,
            message: "City updated successfully",
            city: formattedCity
        });
    } catch (error) {
        next(error);
    }
};

// Delete  city
export const deleteCity = async (req, res, next) => {
    try {
        const { id } = req.params;

        const city = await Cities.findByPk(id);
        if (!city) {
            return res.status(404).json({ success: false, message: "City not found" });
        }

        await CityImages.destroy({ where: { cities_id: id } });

        await city.destroy();

        res.json({ success: true, message: "City and related images deleted successfully" });
    } catch (error) {
        next(error);
    }
}; 

//Update City Image by ID
export const updateCityImageById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { is_main } = req.body;
        const files = req.files;

        const image = await CityImages.findByPk(id);
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
            await CityImages.update(
                { is_main: false },
                { where: { cities_id: image.cities_id } }
            );

            await image.update({ is_main: true });
        }

        res.json({
            message: "Image updated successfully",
            image: {
                id: image.id,
                cities_id: image.cities_id,
                is_main: image.is_main,
                file_name: image.file_name,
                data: image.data.toString("base64")
            }
        });
    } catch (error) {
        next(error);
    }
};

// Delete Cities Image by ID
export const deleteCityImageById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const image = await CityImages.findByPk(id);
        if (!image) {
            return res.status(404).json({ error: "Image not found" });
        }
        await image.destroy();
        res.json({ message: "Image deleted successfully" });
    } catch (error) {
        next(error)
    }
}
