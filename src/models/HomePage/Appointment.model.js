import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const Appointment = sequelize.define("Appointment", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contact_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    reason_of_meeting: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    your_expectation: {
        type: DataTypes.STRING,
        allowNull: true
    },
    more_details: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    view: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false  
    }
}, {
    tableName: "appointments",
    timestamps: true
});

export default Appointment;
