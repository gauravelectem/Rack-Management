module.exports = (sequelize, Sequelize) => {
	const Item = sequelize.define("itemTemplate", {
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
		clientFk: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {         
			  model: 'clients',
			  key: 'id'
			}
		  },
	});

	Item.associate = function (models) {
		Item.hasMany(models.Menu, { as: 'menu' })
	};


	Item.associate = (models) => {
		Item.belongsTo(models.Client, { foreignKey: 'clientFk', as: 'client' })
	};


	return Item;
};
