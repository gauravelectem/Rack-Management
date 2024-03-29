module.exports = (sequelize, Sequelize) => {
    const Menu = sequelize.define("menu", {
        label: {
            type: Sequelize.STRING
        },
        action: {
            type: Sequelize.STRING
        },
        menu_fk: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {         
              model: 'menus',
              key: 'id'
            }
          },
        roleId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {         
              model: 'roles',
              key: 'id'
            }
          },
          clientFk: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {         
              model: 'clients',
              key: 'id'
            }
            },
    }, {});

    Menu.associate = (models) => {
        Menu.belongsTo(models.Menu, { foreignKey: 'menu_fk', as: 'menu' })
    };

    Menu.associate = (models) => {
        Menu.belongsTo(models.Role, { foreignKey: 'roleId', as: 'role' })
    };

    Menu.associate = (models) => {
      Menu.belongsTo(models.Client, { foreignKey: 'clientFk', as: 'client' })
    };

    return Menu;
};
