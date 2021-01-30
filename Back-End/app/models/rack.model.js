module.exports = (sequelize, Sequelize) => {
    const Rack = sequelize.define("rack", {
        label: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      }
    });

    Rack.associate = function (models) {
        Rack.hasMany(models.Tray, { as: 'tray' })
    };
  
    return Rack;
  };
  