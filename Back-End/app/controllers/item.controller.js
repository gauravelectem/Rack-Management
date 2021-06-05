const db = require("../models");
const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const { Pool, Client } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ItemFinals",
  password: "postgres",
  port: "5432"
});
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);
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
        pool.query(query);
        let insert = `INSERT INTO ${req.body.name}_template(`;
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
        db.sequelize.query(insert);

         pool.query(insert, (err, res) => {
          if (err !== undefined) {
            // log the error to console
            console.log("Postgres INSERT error:", err);
        
            // get the keys for the error
            var keys = Object.keys(err);
            console.log("\nkeys for Postgres error:", keys);
        
            // get the error position of SQL string
            console.log("Postgres error position:", err.position);
          }
        
          // check if the response is not 'undefined'
          if (res !== undefined) {
            // log the response to console
            console.log("Postgres response:", res);
        
            // get the keys for the response object
            var keys = Object.keys(res);
        
            // log the response keys to console
            console.log("\nkeys type:", typeof keys);
            console.log("keys for Postgres response:", keys);
        
            if (res.rowCount > 0) {
              console.log("# of records inserted:", res.rowCount);
            } else {
              console.log("No records were inserted.");
            }
          }
        });

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


