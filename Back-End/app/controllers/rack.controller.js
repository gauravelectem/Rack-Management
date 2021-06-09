const db = require("../models");
const Rack = db.racks;
const Op = db.Sequelize.Op;
const Tray = db.trays;
const Sequelize = require("sequelize");
const sequelize = require("../config/seq.config.js");
db.Sequelize = Sequelize;

exports.rackCreate = (req, res) => {

    const rack = {
      rackName: req.body.rackName,
      no_of_rows: req.body.no_of_rows,
      no_of_columns: req.body.no_of_columns,
      client_fk:req.body.client_fk,
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


//1Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Rack.findByPk(id)
        .then(data => {
            res.send(data);
            console.log(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Rack with id=" + id
            });
        });
};

// const rackObject = await Rack.findOne({ where: { client_fk:2 } });
// if (rackObject === null) {
//   console.log('Not found!');
// } else {
//   console.log(rackObject instanceof Rack); // true
//   console.log(rackObject.client_fk); // 'My Title'
// }


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

 exports.findAll = (req, res) => {
  const tableName = req.query.name;

  sequelize.query ( "SELECT * FROM "+tableName).then( myTableRows => { 
    res.send(myTableRows);
  }
  )
}

exports.fetchRackByClientId = (req, res) => {
  // const no_of_rows = req.params.no_of_rows;
  // var condition = client_fk ? { client_fk: { [Op.like]: `%${client_fk}%` } } : null;

  Rack.findAll({ where: {
    client_fk: {
      [Op.eq]: 1
    }
  }
}) .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving menu records."
      });
    });
};

exports.trayCreate = (req, res) => {

  const tray = {
      x: req.body.x,
      y: req.body.y,
      h: req.body.h,
      w: req.body.w,
      name: req.body.name,
      color: req.body.color,
      quantity: req.body.quantity,
      eSearchable: req.body.eSearchable,
      attr1: req.body.attr1,
      val1: req.body.val1,
      attr2: req.body.attr2,
      val2: req.body.val2,
      attr3: req.body.attr3,
      val3: req.body.val3,
      attr4: req.body.attr4,
      val4: req.body.val4,
      attr5: req.body.attr5,
      val5: req.body.val5,
      attribute: req.body.attribute,
      createdBy: req.body.createdBy,
      modifiedBy: req.body.modifiedBy,
      rack_fk: req.body.rack_fk
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
    const id = req.params.rack_fk;

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