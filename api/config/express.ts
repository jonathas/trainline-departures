const dotenv = require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const request = require("request");

export = () => {
    let app = express();

    app.use(bodyParser.json());
    app.use(expressValidator({
        customValidators: {
            isArray: function (value) {
                return Array.isArray(value);
            }
        }
    }));

    // so we can get the client's IP address
    app.enable("trust proxy");

    app.all(process.env.API_BASE + "*", (req, res, next) => {
        if (req.path.includes(process.env.API_BASE + "clients")) 
            return next();
        if (!req.headers["authorization"]) 
            return res.status(401).json({"message": "No auth token"});
        
        // Post to the Auth microservice
        let options = {
            url: `http://${process.env.SERVICE_AUTH}`,
            method: "POST",
            headers: {
                "Authorization": req.headers["authorization"]
            }
        };

        return request(options, (err, response, body) => {
            let user = <IUser>JSON.parse(response.body); if (response.statusCode === 401) return
                res.status(401).json(user); app.set("user", user); // User with freeslots level
                can only post free slots, nothing else if (user.level === UserLevel.FreeSlots &&
                !(req.path.includes(process.env.API_BASE + "freeslots") && typeof
                req.query.channelId !== "undefined")) {return res
                    .status(401)
                    .json({message: "Your user has no authorization for this action"});
}