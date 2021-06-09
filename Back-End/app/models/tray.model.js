module.exports = (sequelize, Sequelize) => {
    const Tray = sequelize.define("tray", {
        x: {
            type: Sequelize.INTEGER
        },
        y: {
            type: Sequelize.INTEGER
        },
        h: {
            type: Sequelize.INTEGER
        },
        w: {
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING
        },
        color: {
            type: Sequelize.STRING
        },
        quantity: {
            type: Sequelize.INTEGER
        },
        eSearchable: {
            type: Sequelize.BOOLEAN
        },
        attr1: {
            type: Sequelize.STRING
        },
        val1: {
            type: Sequelize.INTEGER
        },
        attr2: {
            type: Sequelize.STRING
        },
        val2: {
            type: Sequelize.INTEGER
        },
        attr3: {
            type: Sequelize.STRING
        },
        val3: {
            type: Sequelize.INTEGER
        },
        attr4: {
            type: Sequelize.STRING
        },
        val4: {
            type: Sequelize.INTEGER
        },
        attr5: {
            type: Sequelize.STRING
        },
        val5: {
            type: Sequelize.INTEGER
        },
        attribute: {
            type: Sequelize.STRING
        },
        createdBy: {
            type: Sequelize.STRING
        },
        modifiedBy: {
            type: Sequelize.STRING
    }, 
    });

    return Tray;
};
