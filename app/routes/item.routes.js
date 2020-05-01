module.exports = app => {
    const items = require("../controllers/item.controller.js");

    var router = require("express").Router();

    // // Create a new Status
    // Not used yet, if it is not used at the end, remove this line
    router.post("/item", items.create);

    // Retrieve all Status
    router.get("/item", items.findAll);

    // Retrieve a single Status with id
    // Not used yet, if it is not used at the end, remove this line
    router.get("/item/:id", items.findOne);

    // Update a Status with id
    // Not used yet, if it is not used at the end, remove this line
    router.put("/item/:id", items.update);

    // Delete a Status with id
    // Not used yet, if it is not used at the end, remove this line
    router.delete("/item/:id", items.delete);

    app.use('/api', router);
};