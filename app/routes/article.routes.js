module.exports = app => {
    const articles = require("../controllers/article.controller.js");
    
    var router = require("express").Router();

    // Create a new Article
    router.post("/articles", articles.create);

    // Retrieve all Articles
    // Not used yet, if it is not used at the end, remove this line
    router.get("/articles", articles.findAll);

    // Retrieve all Articles with a join
    // Not used yet, if it is not used at the end, remove this line
    router.get("/articles/all", articles.findAllWithAllForeignTable);

    // Retrieve a single Article with id
    router.get("/articles/:id", articles.findOne);

    // Update a Article with id
    router.put("/articles/:id", articles.update);

    // Delete a Article with id
    router.delete("/articles/:id", articles.delete);

    app.use('/api', router);
};