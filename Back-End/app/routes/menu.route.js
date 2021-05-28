module.exports = app => {
    const menus = require("../controllers/menu.controller.js");

    var router = require("express").Router();

    // Retrieve a single Tray with id
    router.get("/role/:roleId", menus.findRoleById);

    router.get("/", menus.findAll);

    app.use('/api/menu', router);
};