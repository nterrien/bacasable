module.exports = {
    HOST: "localhost",
    USER: "icodb", // Mettre le nom d'un utilisateur mysql
    //PASSWORD: "123456", // Mettre le mot de passe de l'utilisateur
    DB: "testdb", //Mettre le nom de la table mysql qu'il faut creer auparavant
    dialect: "mysql",
    port: 8080,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
