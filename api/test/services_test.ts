import { request, chai } from "./common";
import * as moment from "moment";

describe("# Services", () => {
    const endpoint = process.env.API_BASE + "services";

    it("should return the service", () => {
        let serviceIdentifier = "";

        return request.get(process.env.API_BASE + "departures/wat")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(res => {
                serviceIdentifier = res.body[0].serviceIdentifier;
            })
            .expect(200)
            .then(res => {
                return request.get(`${endpoint}/${serviceIdentifier}/${moment().format(process.env.DATE_FORMAT)}`)
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(res => chai.expect(res.body.stops).to.have.length.of.at.least(1))
                    .expect(200);
            });
    });

    it("should return invalid request when the service identifier is badly formatted", () => {
        return request.get(endpoint + "/W3482@/" + moment().format(process.env.DATE_FORMAT))
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(res => chai.expect(res.body.errors[0].code).to.equal("InvalidRequest"))
            .expect(400);
    });

    it("should return invalid request when the date is badly formatted", () => {
        return request.get(endpoint + "/W34828/abc")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(res => chai.expect(res.body.errors[0].description).to.equal("The data format is not valid. It should be in the format YYYY-MM-DD"))
            .expect(400);
    });

});