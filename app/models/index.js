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

// Fetching models
db.article = require("./article.js")(sequelize, Sequelize);
db.status = require("./status.js")(sequelize, Sequelize);
db.item = require("./item.js")(sequelize, Sequelize);
db.submit_group = require("./submit_group.js")(sequelize, Sequelize);
db.section = require("./section.js")(sequelize, Sequelize);
db.volume = require("./volume.js")(sequelize, Sequelize);


// article's associations
db.article.belongsTo(db.item, { foreignKey: "id_item" }) // Remove if not used
db.item.hasMany(db.article, { foreignKey: "id_item" })

db.article.belongsTo(db.submit_group, { foreignKey: "id_submit" })
// db.submit_group.hasMany(db.article, { foreignKey: "id_submit" })

db.article.belongsTo(db.status, { foreignKey: "status", as: "statuses" })
// db.status.hasMany(db.article, { foreignKey: "status", as: "statuses" }); // Pasa sur pour lui car il y a un renommage

// Other associations
db.item.belongsTo(db.section, { foreignKey: "id_section" }) // Remove if not used
db.section.hasMany(db.item, { foreignKey: "id_section" })

db.section.belongsTo(db.volume, { foreignKey: "id_volume" }) // Remove if not used
db.volume.hasMany(db.section, { foreignKey: "id_volume" })

module.exports = db;
