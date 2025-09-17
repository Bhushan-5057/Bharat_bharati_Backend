import { DataTypes } from "sequelize";
import sequelize from '../config/db.js';

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'admin',
    },
    status: {
        type: DataTypes.ENUM('Active', 'Deactive', 'Deleted'),
        defaultValue: 'Active',
        allowNull: false
    },
    created_by: {
        type: DataTypes.STRING,
        allowNull: false
    },
},
    {
        timestamps: true, 
        tableName: 'users',
        indexes: [
            {
                unique: true,
                fields: ['email']
            },
        ]
    });

// Instance methods
User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
};

// Class methods
User.findByEmail = function (email) {
    return this.findOne({ where: { email } });
};

export default User;