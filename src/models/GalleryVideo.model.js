import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const GalleryVideo = sequelize.define("GalleryVideo", {
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    youtube_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: "gallery_videos",
    timestamps: true,
});

export default GalleryVideo;