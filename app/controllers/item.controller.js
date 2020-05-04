const db = require("../models");
const Item = db.item;
const Article = db.article;
const Section = db.section;
const Op = db.Sequelize.Op;

// Create and Save a new Item
exports.create = (req, res) => {
    // Validate request
    if (!req.body.label) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Item
    const item = {
        label: req.body.label,
        comment: req.body.comment,
        id_section: req.body.id_section
    };

    // Save Item in the database
    Item.create(item)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Item."
            });
        });
}

// Retrieve all Item from the database.
exports.findAll = (req, res) => {
    Item.findAll({
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

// Retrieve all Item from the database with a join on Article table
exports.findAllWithArticles = (req, res) => {
    Item.findAll({
        attributes: ['id', 'label', 'comment', 'id_section'],
        include: [{ model: Article }],
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


// Retrieve all Item from the database with a join on Article table
exports.findAllWithSections = (req, res) => {
    Item.findAll({
        attributes: ['id', 'label', 'comment'], include: [{ model: Section }]
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

// Find a single Item with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Item.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Item with id=" + id
            });
        });
};

// Update a Item by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Item.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Item was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Item with id=${id}. Maybe Item was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Item with id=" + id
            });
        });
};

// Delete a Item with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Item.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Item was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Item with id=${id}. Maybe Item was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Item with id=" + id
            });
        });
};
