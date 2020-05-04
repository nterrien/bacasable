const db = require("../models");
const Section = db.section;
const Volume = db.volume;
const Op = db.Sequelize.Op;

// Create and Save a new Volume
exports.create = (req, res) => {
    // Validate request
    if (!req.body.label) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Volume
    const volume = {
        label: req.body.label,
        comment: req.body.comment,
    };

    // Save Volume in the database
    Volume.create(volume)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Volume."
            });
        });
}

// Retrieve all Volume from the database.
exports.findAll = (req, res) => {
    Volume.findAll({
        order: [['id', 'ASC']]
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

// Retrieve all Volume from the database with a join on Item table
exports.findAllWithSections = (req, res) => {
    Volume.findAll({
        attributes: ['id', 'label', 'comment'],
        include: [{ model: Section }],
        order: [['id', 'ASC']]
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

// Find a single Volume with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Volume.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Volume with id=" + id
            });
        });
};

// Update a Volume by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Volume.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Volume was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Volume with id=${id}. Maybe Volume was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Volume with id=" + id
            });
        });
};

// Delete a Volume with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Volume.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Volume was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Volume with id=${id}. Maybe Volume was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Volume with id=" + id
            });
        });
};
