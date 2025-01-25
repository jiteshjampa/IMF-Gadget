const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});

const GadgetModel = require("./gadget");

const db = {};
db.sequelize = sequelize;
db.Gadget = GadgetModel(sequelize);

module.exports = db;
