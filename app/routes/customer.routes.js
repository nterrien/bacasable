module.exports = app => {
    const customeres = require("../controllers/customer.controller.js");

    var router = require("express").Router();

    // // Create a new Customer
    router.post("/customer", customeres.create);

    // Retrieve all Customer
    router.get("/customer", customeres.findAll);

    // Retrieve a single Customer with id
    // Not used yet, if it is not used at the end, remove this line
    router.get("/customer/:id", customeres.findOne);

    // Update a Customer with id
    // Not used yet, if it is not used at the end, remove this line
    router.put("/customer/:id", customeres.update);

    // Delete a Customer with id
    // Not used yet, if it is not used at the end, remove this line
    router.delete("/customer/:id", customeres.delete);

    app.use('/api', router);
};