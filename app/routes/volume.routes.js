module.exports = app => {
    const volumes = require("../controllers/volume.controller.js");

    var router = require("express").Router();

    // // Create a new Volume
    // Not used yet, if it is not used at the end, remove this line
    router.post("/volume", volumes.create);

    // Retrieve all Volumes
    // Not used yet, if it is not used at the end, remove this line
    router.get("/volume", volumes.findAll);

    // Retrieve all Volumes
    // Not used yet, if it is not used at the end, remove this line
    router.get("/volume/sections", volumes.findAllWithSections);

    // Retrieve all Volumes with a join on Article table
    router.get("/volume/articles", volumes.findAllWithArticles);

    // Retrieve all Volumes with a join on Article table, and the choice to search on Description or not
    router.get("/volume/articles/:searchDescription", volumes.findAllWithArticles);

    // Retrieve a single Volume with id
    // Not used yet, if it is not used at the end, remove this line
    router.get("/volume/:id", volumes.findOne);

    // Update a Volume with id
    // Not used yet, if it is not used at the end, remove this line
    router.put("/volume/:id", volumes.update);

    // Delete a Volume with id
    // Not used yet, if it is not used at the end, remove this line
    router.delete("/volume/:id", volumes.delete);

    app.use('/api', router);
};
