import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Activities = sequelize.define("Activities", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    file_name: {
        type: DataTypes.STRING,
        allowNull: false
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
    tableName: "activities",
    timestamps: true,
});

export default Activities;