const mongoose = require("mongoose");
require("./restaurantsModel");
require("./usersModel");

const dbName = "meanRestaurants";
const dbUrl = "mongodb://localhost:27017/" + dbName;

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

process.on("SIGINT", function () {
    mongoose.connection(function () {
        process.exit(0);
    })
})

process.on("SIGTERM", function () {
    mongoose.connection(function () {
        process.exit(0)
    })
})

process.on("SIGUSR2", function () {
    mongoose.connection(function () {
        process.kill(process.pid, "SIGUSR2")
    })
})