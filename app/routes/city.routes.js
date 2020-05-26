module.exports = app => {
    const cities = require("../controllers/city.controller.js");

    var router = require("express").Router();

    // // Create a new City
    // Not used yet, if it is not used at the end, remove this line
    router.post("/city", cities.create);

    // Retrieve all City
    router.get("/city", cities.findAll);

    // Retrieve a single City with id
    // Not used yet, if it is not used at the end, remove this line
    router.get("/city/:id", cities.findOne);

    // Update a City with id
    // Not used yet, if it is not used at the end, remove this line
    router.put("/city/:id", cities.update);

    // Delete a City with id
    // Not used yet, if it is not used at the end, remove this line
    router.delete("/city/:id", cities.delete);

    app.use('/api', router);
};