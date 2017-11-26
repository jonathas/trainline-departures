const dotenv = require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

export = () => {
    let app = express();

    app.use(bodyParser.json());

    // so we can get the client's IP address
    app.enable("trust proxy");

    require("../routes")(app);

    return app;
};
