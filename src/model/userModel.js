const { DataTypes } = require("sequelize")
const { sequelize } = require("../config/database");
const bcrypt = require("bcrypt")


const User = sequelize.define("users", {
    userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    }
});

User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
});

User.prototype.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = User;
