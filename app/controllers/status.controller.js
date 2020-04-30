const db = require("../models");
const Status = db.status;
const Op = db.Sequelize.Op;

// Create and Save a new Status
exports.create = (req, res) => {
    // Validate request
    if (!req.body.label) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Status
    const status = {
        label: req.body.label,
        comment: req.body.comment
    };

    // Save Status in the database
    Status.create(status)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Status."
            });
        });


    // Retrieve all Status from the database.
    exports.findAll = (req, res) => {
        const label = req.query.label;
        var condition = label ? { label: { [Op.like]: `%${label}%` } } : null;
        Status.findAll({ where: condition })
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

    // Find a single Status with an id
    exports.findOne = (req, res) => {
        const id = req.params.id;

        Status.findByPk(id)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error retrieving Status with id=" + id
                });
            });
    };

    // Update a Status by the id in the request
    exports.update = (req, res) => {
        const id = req.params.id;

        Status.update(req.body, {
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Status was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update Status with id=${id}. Maybe Status was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating Status with id=" + id
                });
            });
    };

    // Delete a Status with the specified id in the request
    exports.delete = (req, res) => {
        const id = req.params.id;

        Status.destroy({
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Status was deleted successfully!"
                    });
                } else {
                    res.send({
                        message: `Cannot delete Status with id=${id}. Maybe Status was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete Status with id=" + id
                });
            });
    };
};