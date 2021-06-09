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
      }
    });

    Rack.associate = (models) => {
      Rack.belongsTo(models.Client, { foreignKey: 'client_fk', as: 'client' })
  };

  
    return Rack;
  };
  