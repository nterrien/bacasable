const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.article = require("./article.model.js")(sequelize, Sequelize);
db.status = require("./status.model.js")(sequelize, Sequelize);

// db.status.hasMany(db.article, { as: "statuses" });
db.article.belongsTo(db.status, {
    foreignKey: "status",
    as: "articles",
});


module.exports = db;
