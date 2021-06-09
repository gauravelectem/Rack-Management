module.exports = app => {
    const racks = require("../controllers/rack.controller.js");

    var router = require("express").Router();

    // Create a new Rack
    router.post("/createRack/", racks.rackCreate);

    // router.get("/", racks.findAll);

    // router.get("/:no_of_rows", racks.findAll);

    //Retrieve a single Rack with id
    router.get("/rackById/:id", racks.findOne);

    // Update a Rack with id
    router.put("/:id", racks.update);

    // Delete a Rack with id
    router.delete("/:id", racks.delete);

    // Create a new Tray
    router.post("/tray", racks.trayCreate);

    // Retrieve a single Tray with id
    router.get("/tray/:id", racks.findTrayById);

    // Update a Tray with id
    router.put("/tray/:id", racks.updateTray);

    // Delete a Tray with id
    router.delete("/tray/:id", racks.deleteTray);

    app.use('/api/rack', router);
};
