import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const GalleryImage = sequelize.define("GalleryImage", {
    file_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    data: {
        type: DataTypes.BLOB("long"), 
        allowNull: false,
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: "gallery_images",
    timestamps: true, 
});

export default GalleryImage;
