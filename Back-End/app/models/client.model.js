module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("client", {
      name: {
        type: Sequelize.STRING
      },
    });

    Client.associate = function (models) {
        Client.hasMany(models.User, { as: 'user' })
    };
  
    return Client;
  };
  