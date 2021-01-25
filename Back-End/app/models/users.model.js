module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("usersinfo", {
        first: {
        type: Sequelize.STRING
      },
      last: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      hobby: {
        type: Sequelize.STRING
      },
      added: {
        type: Sequelize.STRING
      }

    });
  
    return Users;
  };
  