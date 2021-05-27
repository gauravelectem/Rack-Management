module.exports = (sequelize, Sequelize) => {
    const Tray = sequelize.define("tray", {
        label: {
            type: Sequelize.STRING
        },
        dimension: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        rackId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {         
              model: 'racks',
              key: 'id'
            }
          }
    }, {});

    Tray.associate = (models) => {
        Tray.belongsTo(models.Rack, { foreignKey: 'rackId', as: 'rack' })
    };

    return Tray;
};
