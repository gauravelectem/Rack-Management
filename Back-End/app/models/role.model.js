module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("role", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  });

  Role.associate = function (models) {
    Role.hasMany(models.Menu, { as: 'menu' })
};


  return Role;
};
