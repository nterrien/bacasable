const db = require("../models");
const City = db.city;
const Op = db.Sequelize.Op;

// Create and Save a new City
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a City
    const city = {
        id: req.body.id,
        name_city: req.body.name_city,
        zip_code: req.body.zip_code,
    };

    // Save City in the database
    City.create(city)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.city(500).send({
                message:
                    err.message || "Some error occurred while creating the City."
            });
        });
}

// Retrieve all City from the database.
exports.findAll = (req, res) => {
    City.findAll({
        order: [['id', 'ASC']]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.city(500).send({
                message:
                    err.message || "Some error occurred while retrieving city."
            });
        });
};

// Find a single City with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    City.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.city(500).send({
                message: "Error retrieving City with id=" + id
            });
        });
};

// Update a City by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    City.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "City was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update City with id=${id}. Maybe City was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.city(500).send({
                message: "Error updating City with id=" + id
            });
        });
};

// Delete a City with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    City.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "City was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete City with id=${id}. Maybe City was not found!`
                });
            }
        })
        .catch(err => {
            res.city(500).send({
                message: "Could not delete City with id=" + id
            });
        });
};