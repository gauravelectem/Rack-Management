  const db = require("../models");
const Forms = db.products;
const Op = db.Sequelize.Op;

// Create and Save a new Product
exports.create = (req, res) => {
    // Validate request
   
    
    //const data =  JSON.stringify(req.body.itemData)
    var formData = JSON.stringify(req.body.attributes)
    const product = {
      attributes: formData,
      name: req.body.name,
      description: req.body.description,
      itemTempId: req.body.itemTempId,
    };
    
    // Save Forms in the database
    Forms.create(product)
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


  // Retrieve all Forms from the database.
exports.findAll = (req, res) => {
  var name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Forms.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Forms."
      });
    });
};

// Find a single Forms with a customerId
exports.findOne = (req, res) => {
  const id = req.params.prodId;

  Forms.findByPk(id)
    .then(data => {
     // data.dataValues.attributes =JSON.parse(data.dataValues.attributes);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

// Update a Forms by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Forms.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Delete a Forms with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Forms.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};