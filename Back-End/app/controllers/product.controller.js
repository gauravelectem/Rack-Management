const db = require("../models");
const Products = db.products;
const Op = db.Sequelize.Op;

// Create and Save a new Product
exports.create = (req, res) => {
    // Validate request
   
    
    //const data =  JSON.stringify(req.body.itemData)
    var prodData = JSON.stringify(req.body.attributes)
    const product = {
      attributes: prodData,
      name: req.body.name,
      description: req.body.description
    };
    
    // Save Tutorial in the database
    Products.create(product)
      .then(data => {
        var citemData = JSON.parse(data.dataValues.attributes);
        citemData.forEach(function(citemData) {
            data.dataValues[citemData.name] = citemData.value;
        });
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the users."
        });
      });
  };


  // Retrieve all Produts from the database.
exports.findAll = (req, res) => {
  var name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Products.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};