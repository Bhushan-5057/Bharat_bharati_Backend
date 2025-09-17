import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Certificate = sequelize.define("Certificate", {
    file_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pdf: {
        type: DataTypes.BLOB("long"), 
        allowNull: false,
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: "certificates",
    timestamps: true,
});

export default Certificate;