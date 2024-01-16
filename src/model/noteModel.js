const {DataTypes} = require("sequelize")
const {sequelize} = require("../config/database");
const {User}  = require("../model/userModel")


const Note = sequelize.define("notes",{
    noteId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },

});

Note.belongsTo(User,{foreignKey: userId});