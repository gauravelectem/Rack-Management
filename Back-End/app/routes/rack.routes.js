module.exports = app => {
    const racks = require("../controllers/rack.controller.js");

    var router = require("express").Router();

    // Create a new Rack
    router.post("/createRack/", racks.rackCreate);

     // Fetch All Racks
    router.get("/fetchAllRacks/", racks.fetchAllRacks);

    //Fetch Rack By Id
    router.get("/getRackById/:id", racks.fetchRackById);

    // Update a Rack with id
    router.put("/:id", racks.update);

    // Delete a Rack with id
    router.delete("/:id", racks.delete);

    //Seach Rack By rackName
    router.post("/searchRackByName", racks.searchRackByName);

    router.post("/fetchRack", racks.fetchRack);

    //Fetch Rack By ClientId
    router.get("/findRackByClientId/:name/:client_fk", racks.findRackByClientId);

    router.get("/fetchJoinTable/:name/:name2/:client_fk", racks.fetchJoinTable);

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
