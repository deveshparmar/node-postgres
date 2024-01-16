const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    database: "notes",
    username: "postgres",
    password: "admin",
    host: "localhost",
    dialect: "postgres",
    logging: false,
});

module.exports = { sequelize };
