import { validationResult } from "express-validator/check";
import * as moment from "moment";

class Validation {

    public static departureRequest(req) {
        validationResult(req).throw();

        if (req.params.date) {
            Validation.checkDateValid(req.params.date);
        }

        if (req.params.time) {
            Validation.checkTimeValid(req.params.time);
        }

        if (req.params.expectedwindow) {
            Validation.checkExpectedWindow(req.params.expectedwindow);
        }

        if (req.params.desidernumberofservices) {
            Validation.checkDesiredNumberOfServices(req.params.desidernumberofservices);
        }
    }

    public static checkDateValid(date: string) {
        if (!moment(date, process.env.DATE_FORMAT).isValid()) {
            throw Error("The data format is not valid. It should be in the format " + process.env.DATE_FORMAT);
        }
    }

    public static checkTimeValid(time: string) {
        if (!moment(time, process.env.TIME_FORMAT).isValid()) {
            throw Error("The time format is not valid. It should be in the format " + process.env.TIME_FORMAT);
        }
    }

    public static checkExpectedWindow(expectedWindow: number) {
        // Should be numeric and have 3 characters
    }

    public static checkDesiredNumberOfServices(numServices: number) {
        // Should be numeric, not negative and max 100
    }

    public static serviceRequest(req) {
        validationResult(req).throw();

        if (req.params.date) {
            Validation.checkDateValid(req.params.date);
        }
    }


}

export default Validation;