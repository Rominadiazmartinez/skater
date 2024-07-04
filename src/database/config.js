const Sequelize = require("sequelize")
require('dotenv').config();

let user = process.env.DB_USER
let host =  process.env.DB_HOST
let database =  process.env.DB_DATABASE
let password =  process.env.DB_PASSWORD

const sequelize = new Sequelize(
    database, user, password, {
        host,
        dialect: "postgres",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 3000
        }
    }

)

module.exports = sequelize