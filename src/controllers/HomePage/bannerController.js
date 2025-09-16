import { Banner, User } from "../../models/index.js"

// Create a new banner
export const createBanner = async (req, res, next) => {
    try {

        const existingBanner = await Banner.findOne({ where: { file_name: req.file.originalname } });
        if (existingBanner) {
            return res.status(409).json({ message: "Banner with this file name already exists" });
        }
        if (!req.file) {
            return res.status(400).json({ message: "Image file is required" });
        }

        const banner = await Banner.create({
            file_name: req.file.originalname,
            data: req.file.buffer,
            created_by: req.user.id
        });

        const bannerWithRelation = await Banner.findByPk(banner.id, {
            include: [{
                model: User, as: 'creator', attributes: ["id", "name"]
            }]
        })

        res.status(201).json({ message: "Banner created successfully", bannerWithRelation });
    } catch (error) {
        next(error)
    }
};

// Get all banners
export const getAllBanners = async (req, res, next) => {
    try {
        const banners = await Banner.findAll({
            include: [
                { model: User, as: 'creator', attributes: ["id", "name"] }
            ]
        });

        res.json(banners.map(banner => ({
            id: banner.id,
            created_by: banner.created_by,
            creator: banner.creator,
            createdAt: banner.createdAt,
            updatedAt: banner.updatedAt,
            file_name: banner.file_name,
            data: banner.data.toString("base64"),
        })));
    } catch (error) {
        next(error)
    }
};

// Get banner by ID
export const getBannerById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const banner = await Banner.findByPk(id, {
            include: [{ model: User, as: "creator", attributes: ["id", "name"] }]
        });

        if (!banner) {
            return res.status(404).json({ message: "Banner not found" });
        }

        res.json({
            id: banner.id,
            created_by: banner.created_by,
            creator: banner.creator,
            createdAt: banner.createdAt,
            updatedAt: banner.updatedAt,
            file_name: banner.file_name,
            data: banner.data.toString("base64"),
        });
    } catch (error) {
        next(error)
    }
};

// Update banner
export const updateBanner = async (req, res, next) => {
    try {
        const { id } = req.params;

        const banner = await Banner.findByPk(id);
        if (!banner) return res.status(404).json({ message: "Banner not found" });

        if (req.file) {
            banner.file_name = req.file.originalname;
            banner.data = req.file.buffer;
        }

        await banner.save();

        const bannerWithRelation = await Banner.findByPk(banner.id, {
            include: [{
                model: User, as: 'creator', attributes: ["id", "name"]
            }]
        })

        res.json({ message: "Banner updated successfully", bannerWithRelation });
    } catch (error) {
        next(error)
    }
};

// Delete banner
export const deleteBanner = async (req, res, next) => {
    try {
        const { id } = req.params;
        const banner = await Banner.findByPk(id);

        if (!banner) return res.status(404).json({ message: "Banner not found" });

        await banner.destroy();
        res.json({ message: "Banner deleted successfully" });
    } catch (error) {
        next(error)
    }
};
