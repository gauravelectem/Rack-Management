module.exports = app => {
  const profile = require("../controllers/userProfile.controller.js");
  
    var router = require("express").Router();
  
     router.put("/:id", profile.updateProfile);

     router.get("/fetchProfileByUserFK/:user_fk", profile.fetchProfileByUserFK);
   
     app.use('/api/profile', router);
  };
  