const db = require("../models");
const MarketType = db.market_type;

// Create and Save a new MarketType
exports.create = (req, res) => {
    // Validate requesth
    if (!req.body.label) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a MarketType
    const market_type = {
        label: req.body.label,
        comment: req.body.comment
    };

    // Save MarketType in the database
    MarketType.create(market_type)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the MarketType."
            });
        });
}

// Retrieve all MarketType from the database.
exports.findAll = (req, res) => {
    MarketType.findAll({
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

// Find a single MarketType with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    MarketType.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving MarketType with id=" + id
            });
        });
};

// Update a MarketType by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    MarketType.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "MarketType was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update MarketType with id=${id}. Maybe MarketType was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating MarketType with id=" + id
            });
        });
};

// Delete a MarketType with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    MarketType.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "MarketType was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete MarketType with id=${id}. Maybe MarketType was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete MarketType with id=" + id
            });
        });
};