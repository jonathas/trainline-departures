import { request, chai } from "./common";

describe("# Departures", () => {
    const endpoint = process.env.API_BASE + "departures";

    it("should return the departures", () => {
        return request.get(endpoint + "/wat")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(res => chai.expect(res.body).to.have.length.of.at.least(1))
            .expect(200);
    });

    it("should return invalid request when an invalid station code is informed", () => {
        return request.get(endpoint + "/jon")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(res => chai.expect(res.body.errors[0].code).to.equal("InvalidRequest"))
            .expect(400);
    });

    it("should return invalid parameter value when a parameter is badly formatted", () => {
        return request.get(endpoint + "/1")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(res => chai.expect(res.body.errors[0].code).to.equal("InvalidRequest"))
        .expect(400);
    });

});