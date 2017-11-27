import { request, chai } from "./common";
import cache from "../config/cache";
import Departure from "../models/departure";
import * as sinon from "sinon";
import * as util from "util";
import * as fs from "fs";
const readFile = util.promisify(fs.readFile);

describe("# Departures", () => {
    const endpoint = process.env.API_BASE + "departures";

    before(async () => {
        await cache.delAsync("departures_wat");
        const departures = await readFile(`${__dirname}/mock/departures.json`, "utf8");
        return sinon.stub(Departure, "getFromAPI").resolves(JSON.parse(departures));
    });

    it("should return the departures", () => {
        return request.get(endpoint + "/wat")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(res => chai.expect(res.body).to.have.length.of.at.least(1))
            .expect(200)
            .then(res => {
                return request.get(endpoint + "/wat") // get from cache this time
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(res => chai.expect(res.body).to.have.length.of.at.least(1))
                    .expect(200);
            });
    });

    it("should return invalid request when an invalid station code is informed", () => {
        return request.get(endpoint + "/jon")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(res => chai.expect(res.body.errors[0].code).to.equal("InvalidRequest"))
            .expect(400);
    });

    it("should return invalid request when an invalid date is informed", () => {
        return request.get(endpoint + "/BGN?date=2017-11-32")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(res => chai.expect(res.body.errors[0].description).to.equal("The data format is not valid. It should be in the format YYYY-MM-DD"))
            .expect(400);
    });

    it("should return invalid request when an invalid time is informed", () => {
        return request.get(endpoint + "/BGN?date=2017-11-27&time=25:15")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(res => chai.expect(res.body.errors[0].description).to.equal("The time format is not valid. It should be in the format HH:mm"))
            .expect(400);
    });

    it("should return invalid request when an invalid expected window is informed", () => {
        return request.get(endpoint + "/BGN?date=2017-11-27&time=12:30&expectedwindow=3021")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(res => chai.expect(res.body.errors[0].description).to.equal("The expected window should be a number and have 2 or 3 characters"))
            .expect(400);
    });

    it("should return invalid request when an invalid desired number of services is informed", () => {
        return request.get(endpoint + "/BGN?date=2017-11-27&time=12:30&expectedwindow=302&desirednumberofservices=101")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(res => chai.expect(res.body.errors[0].description).to.equal("The desired number of services has to be a positive number and can\'t be higher than 100"))
            .expect(400);
    });

    it("should return the departures with the correct desired number of services", () => {
        return request.get(endpoint + "/BGN?date=2017-11-27&time=12:30&expectedwindow=302&desirednumberofservices=50")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(res => chai.expect(res.body).to.have.length.of.at.least(1))
            .expect(200);
    });

    it("should return invalid parameter value when the station code is badly formatted", () => {
        return request.get(endpoint + "/1")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(res => chai.expect(res.body.errors[0].code).to.equal("InvalidRequest"))
            .expect(400);
    });

});