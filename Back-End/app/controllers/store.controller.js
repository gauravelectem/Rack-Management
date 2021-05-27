const db = require("../models");
const Stores = db.stores;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.storeName) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const store = {
    storeName: req.body.storeName,
    location: req.body.location,
    isAvaliable: req.body.isAvaliable
  };

  // Save Tutorial in the database
  Stores.create(store)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the stores."
      });
    });
};

exports.findAll = (req, res) => {
    const title = req.query.storeName;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Stores.findAll({ where: condition })
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

exports.update = (req, res) => {
    const storeId = req.params.storeId;
  
    Stores.update(req.body, {
      where: { storeId: storeId }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with id=${storeId}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + storeId
        });
      });
  };

  exports.delete = (req, res) => {
    const storeId = req.params.storeId;
  
    Stores.destroy({
      where: { storeId: storeId }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tutorial with id=${storeId}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + storeId
        });
      });
  };