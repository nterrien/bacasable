module.exports = app => {
    const statuses = require("../controllers/status.controller.js");

    var router = require("express").Router();

    // // Create a new Status
    // Not used yet, if it is not used at the end, remove this line
    router.post("/status", statuses.create);

    // Retrieve all Status
    router.get("/status", statuses.findAll);

    // Retrieve a single Status with id
    // Not used yet, if it is not used at the end, remove this line
    router.get("/status/:id", statuses.findOne);

    // Update a Status with id
    // Not used yet, if it is not used at the end, remove this line
    router.put("/status/:id", statuses.update);

    // Delete a Status with id
    // Not used yet, if it is not used at the end, remove this line
    router.delete("/status/:id", statuses.delete);

    app.use('/api', router);
};