module.exports = app => {
    const items = require("../controllers/item.controller.js");

    var router = require("express").Router();

    // // Create a new Items
    // Not used yet, if it is not used at the end, remove this line
    router.post("/item", items.create);

    // Retrieve all Items
    router.get("/item", items.findAll);
    
    // Retrieve all Items
    // Not used yet, if it is not used at the end, remove this line
    router.get("/item/articles", items.findAllWithArticles);

    // Retrieve all Items
    // Not used yet, if it is not used at the end, remove this line
    router.get("/item/section", items.findAllWithSections);

    // Retrieve a single Items with id
    // Not used yet, if it is not used at the end, remove this line
    router.get("/item/:id", items.findOne);

    // Update a Items with id
    // Not used yet, if it is not used at the end, remove this line
    router.put("/item/:id", items.update);

    // Delete a Items with id
    // Not used yet, if it is not used at the end, remove this line
    router.delete("/item/:id", items.delete);

    app.use('/api', router);
};
