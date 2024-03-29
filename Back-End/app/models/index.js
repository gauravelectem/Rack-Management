const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = require("../config/seq.config.js");
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.userprofile = require("./userProfile.model.js")(sequelize, Sequelize);
db.racks = require("./rack.model.js")(sequelize, Sequelize);
db.trays = require("./tray.model.js")(sequelize, Sequelize);
db.stores = require("../models/store.model.js")(sequelize, Sequelize);
db.menus = require("../models/menu.model.js")(sequelize, Sequelize);
//db.itemtemplates = require("./itemTemplate.model.js")(sequelize, Sequelize);
db.templates = require("./item.model.js")(sequelize, Sequelize);
db.itemtemplatepropertys = require("./itemTemplateProperty.js")(sequelize, Sequelize);
db.products = require("./itemForm.model.js")(sequelize, Sequelize);
db.clients = require("./client.model.js")(sequelize, Sequelize);
db.plans = require("./plan.model.js")(sequelize, Sequelize);

db.role.hasMany(db.user, { as: "users" });
db.user.belongsTo(db.role, {
  foreignKey: "roleId",
  as: "role",
});

db.templates.hasMany(db.menus, { as: "menu" });
db.menus.belongsTo(db.templates, {
  foreignKey: "itemId",
  as: "templates",
});

db.role.hasMany(db.menus, { as: "menu" });
db.menus.belongsTo(db.role, {
  foreignKey: "roleId",
  as: "role",
});
      

db.trays.belongsToMany(db.templates, {
  through: "tray_item",
  foreignKey: "trayId",
  otherKey: "userId"
});
db.templates.belongsToMany(db.trays, {
  through: "tray_item",
  foreignKey: "itemId",
  otherKey: "trayId"
});

// db.products.belongsToMany(db.items, {
//   through: "product_item",
//   foreignKey: "itemId",
//   otherKey: "productId"
// });

db.ROLES = ["admin", "moderator","staff"];

module.exports = db;
