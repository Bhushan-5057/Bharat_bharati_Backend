import { User,GalleryVideo } from "../models/index.js";

// Add a new video
export const addVideo = async (req, res,next) => {
    try {
        const { description, youtube_url } = req.body;
        
        const existingVideo = await GalleryVideo.findOne({ where: { youtube_url } });
        if (existingVideo) {
            return res.status(409).json({ success: false, message: "Video with this YouTube URL already exists" });
        }

        const newVideo = await GalleryVideo.create({
            description,
            youtube_url,
            created_by:req.user.id,
        }); 

        const videoWithCreator = await GalleryVideo.findByPk(newVideo.id, {
            include: [{ model: User, as: "creator", attributes: ["id", "name"] }],
            attributes: ["id", "description", "youtube_url", "created_by", "createdAt", "updatedAt"],
        });

        res.status(201).json({
            message: "Video added successfully",
            videoWithCreator
        });
    } catch (error) {
       next(error)
    }
};

// Get all videos
export const getAllVideos = async (req, res,next) => {
    try {
        const videos = await GalleryVideo.findAll({
            include: [{ model: User, as: "creator", attributes: ["id", "name"] }],
            attributes: ["id", "description", "youtube_url", "created_by", "createdAt", "updatedAt"],
            order: [["createdAt", "DESC"]],
        });
        res.json(videos);
    } catch (error) {
       next(error)
    }
};

// Get video by ID
export const getVideoById = async (req, res,next) => {
    try {
        const { id } = req.params;
        const video = await GalleryVideo.findByPk(id, {
            include: [{ model: User, as: "creator", attributes: ["id", "name"] }],
            attributes: ["id", "description", "youtube_url", "created_by", "createdAt", "updatedAt"],
        });

        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        res.json(video);
    } catch (error) {
        next(error)
    }
};

// Update video
export const updateVideo = async (req, res,next) => {
    try {
        const { id } = req.params;
        const { description, youtube_url } = req.body;

        const video = await GalleryVideo.findByPk(id);
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        await video.update({
            description,
            youtube_url,
            created_by:req.user.id,
        }); 

        const updatedVideo = await GalleryVideo.findByPk(id, {
            include: [{ model: User, as: "creator", attributes: ["id", "name"] }],
            attributes: ["id", "description", "youtube_url", "created_by", "createdAt", "updatedAt"],
        });

        res.json({ message: "Video updated successfully", video: updatedVideo });
    } catch (error) {
       next(error)
    }
};

// Delete video
export const deleteVideo = async (req, res,next) => {
    try {
        const { id } = req.params;
        const video = await GalleryVideo.findByPk(id);

        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        await video.destroy();
        res.json({ message: "Video deleted successfully" });
    } catch (error) {
       next(error)
    }
};