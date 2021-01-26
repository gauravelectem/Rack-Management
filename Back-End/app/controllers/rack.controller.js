const db = require("../models");
const Rack = db.racks;
const Op = db.Sequelize.Op;
const Tray = db.trays;

exports.rackCreate = (req, res) => {

    const rack = {
        label: req.body.label,
        state: req.body.state,
        type: req.body.type,
    };

    // Save Rack in the database
    Rack.create(rack)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Rack."
            });
        });
};


// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Rack.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Rack with id=" + id
            });
        });
};


// Update a Rack by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Rack.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Rack was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Rack with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Rack with id=" + id
        });
      });
  };
  
  // Delete a Rack with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Rack.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Rack was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Rack with id=${id}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Rack with id=" + id
        });
      });
  };


  exports.trayCreate = (req, res) => {

    const tray = {
        label: req.body.label,
        dimension: req.body.dimension,
        type: req.body.type,
        rackId: req.body.rackId
    };

    // Save Tray in the database
    Tray.create(tray)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tray."
            });
        });
};

// Find a single Tray with an id
exports.findTrayById = (req, res) => {
    const id = req.params.id;

    Tray.findByPk(id, { include: ["rack"] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tray with id=" + id
            });
        });
};


// Update a Tray by the id in the request
exports.updateTray = (req, res) => {
    const id = req.params.id;
  
    Tray.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tray was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tray with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tray with id=" + id
        });
      });
  };
  
  // Delete a Tray with the specified id in the request
  exports.deleteTray = (req, res) => {
    const id = req.params.id;
  
    Tray.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tray was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tray with id=${id}. Maybe Tray was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tray with id=" + id
        });
      });
  };