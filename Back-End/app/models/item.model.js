module.exports = (sequelize, Sequelize) => {
	const Item = sequelize.define("items", {
		name: {
			type: Sequelize.STRING
		},
		subscriberId: {
			type: Sequelize.INTEGER,
		},
		description: {
			type: Sequelize.STRING
		},
		attributes: {
			type: Sequelize.JSON,

		},

	});

	Item.associate = function (models) {
		Item.hasMany(models.Menu, { as: 'menu' })
	};


	return Item;
};
