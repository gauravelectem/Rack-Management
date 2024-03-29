const db = require("../models");
const profile = db.userprofile;
const Op = db.Sequelize.Op;
const crypto = require('crypto');
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

  exports.fetchProfileById = (req, res) => {
    const id = req.params.id;

    profile.findByPk(id)
        .then(data => {
            res.send(data);
            console.log(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving profile with id=" + id
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

exports.fetchAllProfiles = (req, res) => {
  let query = `SELECT * FROM userprofiles`;
  sequelize.query(query, { type: sequelize.QueryTypes.SELECT})
  .then(data => {
    res.send(data);
  }).catch(err => {
      res.status(500).send({
        message: "Error retrieving userProfile"
      });
    });
};

exports.updatePassword = (req, res) => {
  const id = req.params.id;
  const profile={
     password :req.body.password,
    confirmPassword :req.body.confirmPassword,
  }
  var hash = crypto.createHash('md5').update(profile.password).digest('hex');
  profile.password = hash;

  let query = `UPDATE userprofiles SET password = '${profile.password}' WHERE id = ${id}`;
  sequelize.query(query).then(data => {
      if (data[1].rowCount >=1) {
        res.send({
          message: "profile password was updated successfully."
        });
        updateUserPassword(profile.password,id);
      } else {
        res.send({
          message: `Cannot update profile password id=${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Form with id=" + id
      });
    });
};

function updateUserPassword(password,id){
  let query = `UPDATE users SET password = '${password}' WHERE id = ${id}`;
  sequelize.query(query).then(data => {
      if (data[1].rowCount >=1) {
        console.log("updated user password with id"+id);
      } else {
        console.log("Cannot update user password  id"+id);
      }
    })
    .catch(err => {
      console.log("Error updating user password with id"+err);
    });
}