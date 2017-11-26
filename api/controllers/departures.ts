import Validation from "../helpers/validation";
import Departure, { IDeparture, IDepartureRequest } from "../models/departure";
import * as util from "util";
import * as fs from "fs";
import cache from "../config/cache";
const readFile = util.promisify(fs.readFile);

class Departures {

    public async getAll(req, res): Promise<void> {
        try {
            Validation.departureRequest(req);

            let departures = await this.getDeparture(req);
            res.status(200).json(departures);
        } catch (err) {
            res.status(400).json({ errors: { code: "InvalidRequest", description: err.message } });
        }
    }

    private getDeparture = async (req): Promise<IDeparture> => {
        // Implement date, time, window and number of services in the cache key
        let departureRequest = this.assignDepartureRequest(req);

        let key = this.getCacheKey(departureRequest);
        let departure = await cache.getAsync(key);
        if (departure) return <IDeparture>JSON.parse(departure);

        departure = this.prepareResponse(await Departure.getFromAPI(departureRequest));

        await cache.setexAsync(key, 60, JSON.stringify(departure));

        return departure;
    }

    private assignDepartureRequest = (req): IDepartureRequest => {
        let departureRequest = {
            stationCode: req.params.stationCode,
            date: "",
            time: "",
            expectedwindow: "",
            desidernumberofservices: ""
        };

        departureRequest.date = (req.params.date) ? req.params.date : "";
        departureRequest.time = (req.params.time) ? req.params.time : "";
        departureRequest.expectedwindow = (req.params.expectedwindow) ? req.params.expectedwindow : "";
        departureRequest.desidernumberofservices = (req.params.desidernumberofservices) ? req.params.desidernumberofservices : "";

        return departureRequest;
    }

    private getCacheKey = (departureRequest: IDepartureRequest): string => {
        let key = ["departures"];

        let paramsUsed = Object.keys(departureRequest).filter(key => departureRequest[key] !== "");
        key.concat(paramsUsed);

        return key.join("_");
    }

    private prepareResponse = (departure: IDeparture) => {
        // Make it return only the relevant data
        /**
         * service identifier, Time, stattion name, platform, status (On time) (or return the scheduled time + realTimeFlat, which is not always there), service operator name
         */
        return departure;
    }

    private loadStations = async (): Promise<{ code: string, name: string }> => {
        let stations = cache.getAsync("stations");
        if (stations) return JSON.parse(stations);

        stations = await readFile("../config/populate/stations.json", "utf8");
        await cache.setAsync("stations", stations);

        return stations;
    }

}

export default new Departures();
