module.exports = app => {
    const product = require("../controllers/product.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", product.create);
  
    // Retrieve all Tutorialscls
    router.get("/", product.findAll);

    //router.get("/:itemId", items.findOne);

    // Update a Tutorial with id
   // router.put("/:id", items.update);
  
    // Delete a Tutorial with id
   // router.delete("/:id", items.delete);
      
    app.use('/api/product', router);
  };
  