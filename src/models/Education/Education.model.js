import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const Education = sequelize.define("Education", {
    type: {
        type: DataTypes.ENUM('education', 'school'),
        allowNull: false,
        defaultValue: 'school'
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    school_address: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: "education",
    timestamps: true,
});

export default Education;
