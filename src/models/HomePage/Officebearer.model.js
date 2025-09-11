import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const OfficeBearer = sequelize.define("OfficeBearer", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quotes: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    file_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data: {
        type: DataTypes.BLOB("long"),
        allowNull: false,
    },
    twitter: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    facebook: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    gmail: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: "office_bearers",
    timestamps: true,
});

export default OfficeBearer;

