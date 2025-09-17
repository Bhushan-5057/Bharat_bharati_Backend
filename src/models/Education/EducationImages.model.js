import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const EducationImages = sequelize.define(" EducationImages", {
    education_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    file_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    data: {
        type: DataTypes.BLOB("long"),
        allowNull: false,
    },
    is_main: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    tableName: "education_images",
    timestamps: true,
});

export default EducationImages;