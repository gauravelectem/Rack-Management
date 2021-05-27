const db = require("../models");
const Items = db.items;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
 
  
  //const data =  JSON.stringify(req.body.itemData)
  var ites = JSON.stringify(req.body.attributes)
  const item = {
    attributes: ites,
    name: req.body.name,
    description: req.body.description
  };
  
  // Save Tutorial in the database
  Items.create(item)
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

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.first;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Items.findAll({ where: condition })
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

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Items.update(req.body, {
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

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Items.destroy({
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

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
  const id = req.params.itemId;

  Items.findByPk(id)
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
