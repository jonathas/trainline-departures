import { request, chai } from "./common";
import * as moment from "moment";

describe("# Services", () => {
    const endpoint = process.env.API_BASE + "services";

    it("should return the service", () => {
        return request.get(endpoint + "/W34824/" + moment().format(process.env.DATE_FORMAT))
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(res => chai.expect(res.body).to.have.length.of.at.least(1))
            .expect(200);
    });

    it("should return invalid request when the service identifier is badly formatted");

    it("should return invalid request when the date is badly formatted");

});