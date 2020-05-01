const db = require("../models");
const SubmitGroup = db.submit_group;
const Op = db.Sequelize.Op;

// Create and Save a new SubmitGroup
exports.create = (req, res) => {
    // Validate request
    if (!req.body.label) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a SubmitGroup
    const submit_group = {
        label: req.body.label,
        comment: req.body.comment
    };

    // Save SubmitGroup in the database
    SubmitGroup.create(submit_group)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the SubmitGroup."
            });
        });
}

// Retrieve all SubmitGroup from the database.
exports.findAll = (req, res) => {
    SubmitGroup.findAll()
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

// Find a single SubmitGroup with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    SubmitGroup.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving SubmitGroup with id=" + id
            });
        });
};

// Update a SubmitGroup by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    SubmitGroup.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "SubmitGroup was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update SubmitGroup with id=${id}. Maybe SubmitGroup was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating SubmitGroup with id=" + id
            });
        });
};

// Delete a SubmitGroup with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    SubmitGroup.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "SubmitGroup was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete SubmitGroup with id=${id}. Maybe SubmitGroup was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete SubmitGroup with id=" + id
            });
        });
};