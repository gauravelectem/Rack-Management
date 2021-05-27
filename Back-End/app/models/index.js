const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.users = require("./users.model.js")(sequelize, Sequelize);
db.racks = require("./rack.model.js")(sequelize, Sequelize);
db.trays = require("./tray.model.js")(sequelize, Sequelize);
db.stores = require("../models/store.model.js")(sequelize, Sequelize);
//db.itemtemplates = require("./itemTemplate.model.js")(sequelize, Sequelize);
db.items = require("./item.model.js")(sequelize, Sequelize);
db.itemtemplatepropertys = require("./itemTemplateProperty.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.racks.hasMany(db.trays, { as: "tray" });
db.trays.belongsTo(db.racks, {
  foreignKey: "rackId",
  as: "rack",
});

// db.itemtemplates.hasMany(db.itemtemplatepropertys, { as: "itemtemplateproperty" });
// db.itemtemplatepropertys.belongsTo(db.itemtemplates, {
//   foreignKey: "itemtemplateId",
//   as: "itemtemplate",
// });


// db.itemtemplatepropertys.hasMany(db.items, { as: "item" });
// db.items.belongsTo(db.itemtemplatepropertys, {
//   foreignKey: "itemTemplatePropertyId",
//   as: "itemtemplatepropertys",
// });

db.trays.belongsToMany(db.items, {
  through: "tray_item",
  foreignKey: "trayId",
  otherKey: "userId"
});
db.items.belongsToMany(db.trays, {
  through: "tray_item",
  foreignKey: "itemId",
  otherKey: "trayId"
});


db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
