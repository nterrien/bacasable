module.exports = app => {
    const market_types = require("../controllers/market_type.controller.js");

    var router = require("express").Router();

    // // Create a new Market Type
    // Not used yet, if it is not used at the end, remove this line
    router.post("/market_type", market_types.create);

    // Retrieve all Market Type
    router.get("/market_type", market_types.findAll);

    // Retrieve a single Market Type with id
    // Not used yet, if it is not used at the end, remove this line
    router.get("/market_type/:id", market_types.findOne);

    // Update a Market Type with id
    // Not used yet, if it is not used at the end, remove this line
    router.put("/market_type/:id", market_types.update);

    // Delete a Market Type with id
    // Not used yet, if it is not used at the end, remove this line
    router.delete("/market_type/:id", market_types.delete);

    app.use('/api', router);
};