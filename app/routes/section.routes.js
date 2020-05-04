module.exports = app => {
    const sections = require("../controllers/section.controller.js");

    var router = require("express").Router();

    // // Create a new Section
    // Not used yet, if it is not used at the end, remove this line
    router.post("/section", sections.create);

    // Retrieve all Sections
    router.get("/section", sections.findAll);

    // Retrieve all Sections
    // Not used yet, if it is not used at the end, remove this line
    router.get("/section/items", sections.findAllWithItems);

    // Retrieve all Sections
    // Not used yet, if it is not used at the end, remove this line
    router.get("/section/volume", sections.findAllWithVolumes);

    // Retrieve a single Section with id
    // Not used yet, if it is not used at the end, remove this line
    router.get("/section/:id", sections.findOne);

    // Update a Section with id
    // Not used yet, if it is not used at the end, remove this line
    router.put("/section/:id", sections.update);

    // Delete a Section with id
    // Not used yet, if it is not used at the end, remove this line
    router.delete("/section/:id", sections.delete);

    app.use('/api', router);
};
