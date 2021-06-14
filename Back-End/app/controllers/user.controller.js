const db = require("../models");
const crypto = require('crypto');
const Op = db.Sequelize.Op;
const User = db.user;
const Client = db.clients;
const Sequelize = require("sequelize");
const sequelize = require("../config/seq.config.js");
db.Sequelize = Sequelize;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.Create = (req, res) => {

  const user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    location: req.body.location,
    clientFk: req.body.clientFk
  };
  
  var hash = crypto.createHash('md5').update(user.password).digest('hex');
  user.password = hash;

  // Save User in the database
  User.create(user)
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

exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
    status:'ACTIVE'
  };
  var hash = crypto.createHash('md5').update(user.password).digest('hex');
  user.password = hash;

  User.findOne({where:user })
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({
              message: "Error retrieving Tray with id=" + id
          });
      });
};

exports.createClient = (req, res) => {

  // Create a Client
  const client = {
    name: req.body.name,
  };

  // Save Client in the database
  Client.create(client)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the client."
      });
    });
};

exports.saveClientStaff = (req, res) => {
  const staff = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    status: req.body.status,
    clientFk: req.body.clientFk,
    roleId: req.body.roleId
  }; 
  
  var hash = crypto.createHash('md5').update(staff.password).digest('hex');
  staff.password = hash;

  // Save User in the database
  User.create(staff)
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


//Fetch role 
 exports.getRole = (req, res) => {
  let query = `select id from roles where name = 'staff'`;
  sequelize.query(query, { type: sequelize.QueryTypes.SELECT})
  .then(data => {
    res.send(data);
  }).catch(err => {
      res.status(500).send({
        message: "Error retrieving Form with id=" + id
      });
    });
};



