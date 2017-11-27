import { validationResult } from "express-validator/check";
import Station from "./stations";
import * as moment from "moment";

class Validation {

    public static departureRequest(req) {
        validationResult(req).throw();

        Validation.checkStationValid(req.params.stationCode);

        if (req.query.date) {
            Validation.checkDateValid(req.query.date);
        }

        if (req.query.time) {
            Validation.checkTimeValid(req.query.time);
        }

        if (req.query.expectedwindow) {
            Validation.checkExpectedWindow(req.query.expectedwindow);
        }

        if (req.query.desirednumberofservices) {
            Validation.checkDesiredNumberOfServices(req.query.desirednumberofservices);
        }
    }

    public static checkStationValid(stationCode: string) {
        let stationName = Station.getName(stationCode.toUpperCase());

        if (stationName === stationCode.toUpperCase()) {
            throw new Error("The informed station is invalid");
        }
    }

    public static checkDateValid(date: string) {
        if (!moment(date, process.env.DATE_FORMAT).isValid()) {
            throw new Error("The data format is not valid. It should be in the format " + process.env.DATE_FORMAT);
        }
    }

    public static checkTimeValid(time: string) {
        if (!moment(time, process.env.TIME_FORMAT).isValid()) {
            throw new Error("The time format is not valid. It should be in the format " + process.env.TIME_FORMAT);
        }
    }

    public static checkExpectedWindow(expectedWindow: number) {
        if (!(/^-{0,1}\d{2,3}$/.test(expectedWindow.toString()))) {
            throw new Error("The expected window should be a number and have 2 or 3 characters");
        }
    }

    public static checkDesiredNumberOfServices(numServices: number) {
        if (!(/^\d{1,3}$/.test(numServices.toString())) || numServices <= 0 || numServices > 100) {
            throw new Error("The desired number of services has to be a positive number and can't be higher than 100");
        }
    }

    public static serviceRequest(req) {
        validationResult(req).throw();
        Validation.checkDateValid(req.params.date);
    }

}

export default Validation;