import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const DonationPage = sequelize.define("DonationPage", {
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
    sub_title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    account_holder_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    account_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bank_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ifsc_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: "donation_page",
    timestamps: true,
});

export default DonationPage;
