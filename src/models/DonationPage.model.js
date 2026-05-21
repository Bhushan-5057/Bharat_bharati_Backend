import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const DonationPage = sequelize.define("DonationPage", {
    file_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data: {
        type: DataTypes.BLOB("long"),
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
    upi_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "UPI ID is required",
            },
            is: {
                args: /^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,}$/,
                msg: "Invalid UPI ID format",
            },
        },
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