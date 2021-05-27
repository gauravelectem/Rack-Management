module.exports = (sequelize, Sequelize) => {
	const Store = sequelize.define('store', {	
	  storeId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
      },
	  storeName: {
			type: Sequelize.STRING
	  },
	  location: {
		type: Sequelize.STRING
  	  },
        isAvaliable: {
            type: Sequelize.BOOLEAN
          }
	});
	
	return Store;
}