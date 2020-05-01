const db = require("../models");
const Article = db.article;
const Status = db.status;
const Item = db.item;
const SubmitGroup = db.submit_group;
const Op = db.Sequelize.Op;

// Create and Save a new Article
exports.create = (req, res) => {
    // Validate request
    if (!req.body.label) {
        res.status(400).send({
            message: "Content can not be empty!" // Voir ici y'a pas que le lable uqi doit etre non vide je pense
        });
        return;
    }

    // Create a Article
    const article = {
        label: req.body.label,
        description: req.body.description,
        comment: req.body.comment,
        unit: req.body.unit,
        minimal_quantity: req.body.minimal_quantity,
        price: req.body.price,
        percent_workforce: req.body.percent_workforce,
        subcontractable: req.body.subcontractable,
        up_to_date: req.body.up_to_date ? req.body.up_to_date : true,
        id_item: req.body.id_item,
        id_submit: req.body.id_submit,
        status: req.body.status
    };

    // Save Article in the database
    Article.create(article)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Article."
            });
        });
};


// Retrieve all Articles from the database.
exports.findAll = (req, res) => {
    const label = req.query.label;
    // OP.or et OP.and vont pouvoir servir ici
    var condition = label ? { label: { [Op.like]: `%${label}%` } } : null;
    /// TODO Je crois que la recherche ce fait sur label et descrpition en meme tmeps
    Article.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving article."
            });
        });
};

// Find all with a join on item, status, and submit group
exports.findAllWithAllForeignTable = (req, res) => {
    const label = req.query.label;
    var condition = label ? { label: { [Op.like]: `%${label}%` } } : null;
    /// TODO Je crois que la recherche ce fait sur label et descrpition en meme tmeps

    // Ne plus prendre les id vu que je retoune direct la listes des elements
    Article.findAll({
        attributes: ['id', 'label', 'description', 'comment', 'unit', 'minimal_quantity', 'price', 'percent_workforce', 'subcontractable', 'up_to_date'],
        where: condition, include: [{ model: Item }, { model: SubmitGroup }, { model: Status, as:"statuses"}]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving article."
            });
        });
};

// Find a single Article with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Article.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Article with id=" + id
            });
        });
};

// Update a Article by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Article.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Article was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Article with id=${id}. Maybe Article was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Article with id=" + id
            });
        });
};

// Delete a Article with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Article.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Article was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Article with id=${id}. Maybe Article was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Article with id=" + id
            });
        });
};

