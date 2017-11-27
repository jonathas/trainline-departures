import { request, chai } from "./common";
import Service from "../models/service";
import * as sinon from "sinon";
import * as util from "util";
import * as fs from "fs";
const readFile = util.promisify(fs.readFile);

describe("# Services", () => {
    const endpoint = process.env.API_BASE + "services";

    before(async () => {
        const services = await readFile(`${__dirname}/mock/service.json`, "utf8");
        return sinon.stub(Service, "getFromAPI").resolves(JSON.parse(services));
    });

    it("should return the service", () => {
        return request.get(`${endpoint}/P75126/2017-11-26}`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(res => chai.expect(res.body.stops).to.have.length.of.at.least(1))
            .expect(200);
    });

    it("should return invalid request when the service identifier is badly formatted", () => {
        return request.get(endpoint + "/P7512@/2017-11-26")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(res => chai.expect(res.body.errors[0].code).to.equal("InvalidRequest"))
            .expect(400);
    });

    it("should return invalid request when the date is badly formatted", () => {
        return request.get(endpoint + "/P75126/abc")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(res => chai.expect(res.body.errors[0].description).to.equal("The data format is not valid. It should be in the format YYYY-MM-DD"))
            .expect(400);
    });

});