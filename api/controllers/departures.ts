import Validation from "../helpers/validation";
import Departure, { IDeparture, IDepartureRequest, IDepartureResponse } from "../models/departure";
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
        let departureRequest = this.assignDepartureRequest(req);

        let key = this.getCacheKey(departureRequest);
        let departure = await cache.getAsync(key);
        if (departure) return <IDeparture>JSON.parse(departure);

        departure = await this.prepareResponse(await Departure.getFromAPI(departureRequest));

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
        let paramsUsed = Object.keys(departureRequest).filter(key => departureRequest[key] !== "");
        let values = paramsUsed.map(param => departureRequest[param]);

        return "departure_" + values.join("_");
    }

    private prepareResponse = async (departure: IDeparture): Promise<Array<IDepartureResponse>> => {
        try {
            const stations = await this.getStations();
            let departureResponse = <Array<IDepartureResponse>>departure.services.map(service => {
                return <IDepartureResponse>{
                    serviceIdentifier: service.serviceIdentifier,
                    platform: service.scheduledInfo.scheduledPlatform,
                    serviceOperator: service.serviceOperator,
                    scheduledTime: service.scheduledInfo.scheduledTime,
                    realTimeFlag: service.realTimeUpdatesInfo.realTimeServiceInfo.realTimeFlag,
                    destinationName: stations[service.destinationList[0].crs]
                };
            });

            return departureResponse;
        } catch (err) {

        }
    }

    private getStations = async () => {
        let stations = cache.getAsync("stations");
        if (stations) return JSON.parse(stations);

        stations = await readFile("../config/populate/stations.json", "utf8");
        await cache.setAsync("stations", stations);

        return stations;
    }

}

export default new Departures();
