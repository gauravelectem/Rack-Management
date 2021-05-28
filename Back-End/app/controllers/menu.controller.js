const db = require("../models");
const Op = db.Sequelize.Op;
const Role = db.role;
const Menu=db.menus;

// Find a single Menu with an id
exports.findRoleById = (req, res) => {
    const roleId = req.params.roleId;

    Role.findByPk(roleId, { include: ["menu"] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tray with id=" + roleId
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
            err.message || "Some error occurred while retrieving Users."
        });
      });
  };