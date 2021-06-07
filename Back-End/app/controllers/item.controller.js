const db = require("../models");
const Sequelize = require("sequelize");
const sequelize = require("../config/seq.config.js");
db.sequelize = sequelize;
db.Sequelize = Sequelize;

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

  let query = `CREATE TABLE ${req.body.name}_template (`;
             query += `id SERIAL PRIMARY KEY, name character varying(255),  subscriberId integer, description character varying(255), attributes json, createdAt timestamp with time zone NULL,
             updatedAt timestamp with time zone NULL`;
        query += ")";

        sequelize.query(query, { type: sequelize.QueryTypes.CREATE})
        .then(data => {
           insertRecords(item);
           res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message: "Error retrieving Templates with id=" + id
          });
    });        
};

// Retrieve all Templates from the database.
exports.findAll = (req, res) => {
  var name = req.query.name;
  var clientFk = req.query.clientFk;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
 // var condition = clientFk ? { clientFk: { [Op.eq]: clientFk } } : null;
  Items.findAll({ where: condition})
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

  let query = `UPDATE ${req.body.name}_template SET name = '${req.body.name}',description = '${req.body.description}',
  attributes = '${JSON.stringify(req.body.attributes)}' WHERE id = ${id}`;
  sequelize.query(query).then(([results, metadata]) => {
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
  const id = req.params.id;
  let querys = `SELECT * FROM ${req.params.name}_template WHERE id = ${id}`;
  sequelize.query(querys, { type: sequelize.QueryTypes.SELECT})
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving Tutorial with id=" + id
    });
  });
};

insertRecords = (item) => {

  let insert = `INSERT INTO ${item.name}_template(`;
  for (let key in item) {
    if(key === 'description') {
      insert += `${key}`;
    }else {
      insert += `${key}, `;
    }
     
  }
  insert += ") VALUES (";
  for (let key in item) {
    if(key === 'description') {
      insert += `'${item[key]}'`; 
    }else {
      insert += `'${item[key]}', `;
    }
  }
  insert += ")";

  insert += "RETURNING id";
  sequelize.query(insert, { type: sequelize.QueryTypes.INSERT, raw: true})
  .then(data => {
     console.log("Successfully inserted");
  })
};


