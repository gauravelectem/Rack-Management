module.exports = app => {
    const store = require("../controllers/store.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/createStore", store.create);

    // Retrieve all Tutorials
    router.get("/", store.findAll);

    router.put("/updateById/:storeId", store.update);

    router.delete("/:storeId", store.delete);
      
    app.use('/api/store', router);
  };