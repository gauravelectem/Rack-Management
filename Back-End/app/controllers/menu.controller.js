const db = require("../models");
const Op = db.Sequelize.Op;
const Role = db.role;
const Menu=db.menus;


exports.menuCreate = (req, res) => {

  const menu = {
      label: req.body.label,
      action: req.body.action,
      menu_fk: req.body.menu_fk,
      roleId: req.body.roleId,
      itemId:req.body.itemId,
  };

  // Save Rack in the database
  Menu.create(menu)
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


// Find a single Menu with an id
exports.findRoleById = (req, res) => {
    const roleId = req.params.roleId;

    Role.findByPk(roleId, { include: ["menu"] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Role with id=" + roleId
            });
        });
};

exports.findAll = (req, res) => {
    const title = req.query.label;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Menu.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving menu records."
        });
      });
  };