const {DataTypes} = require("sequelize")
const sequelize = require("../database/config.js")

const Skaters = sequelize.define(
    "Skaters", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
            },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false
            },
        nombre: {
            type: DataTypes.STRING(25),
            allowNull: false
            },
        password: {
            type: DataTypes.STRING(25),
            allowNull: false
            },
        anos_experiencia: {
            type: DataTypes.INTEGER,
            allowNull: false
            },
        especialidad: {
            type: DataTypes.STRING(50),
            allowNull: false
            },
        foto: {
            type: DataTypes.STRING(255),
            allowNull: false
            },
        estado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false
            }
  }, {
    tableName: "Skaters", 
    timestamps: true,    
  })


  
  module.exports = Skaters