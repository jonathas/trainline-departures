const dotenv = require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

export = () => {
    let app = express();

    app.use(bodyParser.json());

    // CORS is configured on Nginx

    require("../routes")(app);

    return app;
};
