module.exports = app => {
    const items = require("../controllers/item.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", items.create);
  
    // Retrieve all Tutorialscls
    router.get("/", items.findAll);

    router.get("/:name/:id", items.findOne);

    router.get("/:id", items.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", items.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", items.delete);
      
    app.use('/api/items', router);
  };
  