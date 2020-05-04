const db = require("../models");
const Section = db.section;
const Item = db.item;
const Volume = db.volume;
const Op = db.Sequelize.Op;

// Create and Save a new Section
exports.create = (req, res) => {
    // Validate request
    if (!req.body.label) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Section
    const section = {
        label: req.body.label,
        comment: req.body.comment,
        id_volume: req.body.id_volume
    };

    // Save Section in the database
    Section.create(section)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Section."
            });
        });
}

// Retrieve all Section from the database.
exports.findAll = (req, res) => {
    Section.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving status."
            });
        });
};

// Retrieve all Section from the database with a join on Item table
exports.findAllWithItems = (req, res) => {
    Section.findAll({
        attributes: ['id', 'label', 'comment', 'id_volume'], include: [{ model: Item }]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving status."
            });
        });
};

// Retrieve all Section from the database with a join on Volume table
exports.findAllWithVolumes = (req, res) => {
    Section.findAll({
        attributes: ['id', 'label', 'comment'], include: [{ model: Volume }]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving status."
            });
        });
};

// Find a single Section with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Section.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Section with id=" + id
            });
        });
};

// Update a Section by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Section.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Section was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Section with id=${id}. Maybe Section was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Section with id=" + id
            });
        });
};

// Delete a Section with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Section.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Section was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Section with id=${id}. Maybe Section was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Section with id=" + id
            });
        });
};
