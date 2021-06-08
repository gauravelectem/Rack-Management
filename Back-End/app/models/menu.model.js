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
    
          },
        roleId: {
            type: Sequelize.INTEGER,
            allowNull: false,
          }
    }, {});

   


    return Menu;
};
