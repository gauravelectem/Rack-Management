const db = require("../models");
const profile = db.userprofile;
const Op = db.Sequelize.Op;
const Sequelize = require("sequelize");
const sequelize = require("../config/seq.config.js");
db.Sequelize = Sequelize;

exports.updateProfile = (req, res) => {
    const id = req.params.id;
  
    profile.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Profile was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Profile with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Profile with id=" + id
        });
      });
  };

exports.fetchProfileByUserFK = (req, res) => {
  const user_fk= req.params.user_fk;
  let query = `SELECT * FROM userprofiles WHERE user_fk = ${user_fk} `;
  sequelize.query(query, { type: sequelize.QueryTypes.SELECT})
  .then(data => {
    res.send(data);
  }).catch(err => {
      res.status(500).send({
        message: "Error retrieving userProfile with id=" + user_fk
      });
    });
};