module.exports = (sequelize, Sequelize) => {
    const Article = sequelize.define("article", {
        label: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        comment: {
            type: Sequelize.STRING
        },
        unit: {
            type: Sequelize.STRING
        },
        minimal_quantity: {
            type: Sequelize.FLOAT
        },
        price: {
            type: Sequelize.FLOAT
        },
        percent_workforce: {
            type: Sequelize.FLOAT
        },
        subcontractable: {
            type: Sequelize.BOOLEAN
        },
        up_to_date: {
            type: Sequelize.BOOLEAN
        },
        id_item: {
            type: Sequelize.INTEGER
        },
        id_submit: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.INTEGER
        }
    },
        {
            // don't add the timestamp attributes (updatedAt, createdAt)
            timestamps: false,

            // don't use camelcase for automatically added attributes but underscore style
            // so updatedAt will be updated_at
            underscored: true,

            // disable the modification of tablenames; By default, sequelize will automatically
            // transform all passed model names (first parameter of define) into plural.
            // if you don't want that, set the following
            freezeTableName: true,

            // define the table's name
            tableName: 'article'
        });

    return Article;
};
