import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

export const MEMBER_CATEGORIES = {
    NATIONAL_EXECUTIVE_COUNCIL: "national excutive council",
    NATIONAL_CORE_COMMITTEE: "national core commitee",
};

const Member = sequelize.define("Member", {
    category: {
        type: DataTypes.ENUM(...Object.values(MEMBER_CATEGORIES)),
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Member name is required",
            },
            is: {
                args: /^[A-Za-z\s.'()-]+$/,
                msg: "Member name cannot contain numbers",
            },
        },
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isValidDesignation(value) {
                if (value && !/^[A-Za-z\s.'()-]+$/.test(value)) {
                    throw new Error("Designation cannot contain numbers");
                }
            },
        },
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: "members",
    timestamps: true,
});

export default Member;
