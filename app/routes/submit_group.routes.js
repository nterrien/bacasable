module.exports = app => {
    const submit_groups = require("../controllers/submit_group.controller.js");

    var router = require("express").Router();

    // // Create a new Status
    // Not used yet, if it is not used at the end, remove this line
    router.post("/submit", submit_groups.create);

    // Retrieve all Status
    router.get("/submit", submit_groups.findAll);

    // Retrieve a single Status with id
    // Not used yet, if it is not used at the end, remove this line
    router.get("/submit/:id", submit_groups.findOne);

    // Update a Status with id
    // Not used yet, if it is not used at the end, remove this line
    router.put("/submit/:id", submit_groups.update);

    // Delete a Status with id
    // Not used yet, if it is not used at the end, remove this line
    router.delete("/submit/:id", submit_groups.delete);

    app.use('/api', router);
};