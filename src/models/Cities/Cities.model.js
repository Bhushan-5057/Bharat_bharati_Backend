import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const Cities = sequelize.define("Cities", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: "cities",
    timestamps: true,
});

export default Cities;