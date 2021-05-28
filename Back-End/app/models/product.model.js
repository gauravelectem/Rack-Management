module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("Product", {
        name: {
			type: Sequelize.STRING
		},
		itemId: {
			type: Sequelize.INTEGER,
		},
		description: {
			type: Sequelize.STRING
		},
		attributes: {
			type: Sequelize.JSON,
        }
		}, {});

  Product.associate = function(models) {
    Product.belongsToMany(models.Item, {foreignKey: 'itemId', as: 'items'})
  };
    return Product;
};
