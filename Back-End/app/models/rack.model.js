module.exports = (sequelize, Sequelize) => {
    const Rack = sequelize.define("rack", {
        rackName: {
        type: Sequelize.STRING
      },
      no_of_rows: {
        type: Sequelize.INTEGER
      },
      no_of_columns: {
        type: Sequelize.STRING
      },
      client_fk: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {         
          model: 'clients',
          key: 'id'
        }
      }
    });

    Rack.associate = function (models) {
      Rack.hasMany(models.Tray, { as: 'tray' })
  };

    Rack.associate = (models) => {
      Rack.belongsTo(models.Client, { foreignKey: 'client_fk', as: 'client' })
  };

  
    return Rack;
  };
  