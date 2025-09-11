import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const Banner = sequelize.define("Banner", {
    file_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data: {
        type: DataTypes.BLOB("long"),
        allowNull: false
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "banners",
    timestamps: true
});

export default Banner;
