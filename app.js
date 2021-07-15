const express = require("express");
const path = require("path");
require("./api/data/db");

const routers = require("./api/routes");

const app = express();

app.set("port", 3000);
app.use("/api", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
})

app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: false}));
app.use(express.json({extended: false}));
app.use("/api", routers);

const server = app.listen(app.get("port"), function() {
    console.log("Listening to port ", server.address().port);
});