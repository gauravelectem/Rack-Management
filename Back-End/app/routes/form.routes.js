module.exports = app => {
    const form = require("../controllers/form.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", form.create);
  
    // Retrieve all Tutorialscls
    router.get("/", form.findAll);

    router.get("/:prodId", form.findOne);

    // Update a Tutorial with id
    router.put("/:id", form.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", form.delete);
      
    app.use('/api/form', router);
  };
  