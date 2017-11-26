import Validation from "../helpers/validation";
import Departure, { IDeparture, IDepartureRequest } from "../models/departure";
import cache from "../config/cache";

class Departures {

    public async getAll(req, res): Promise<void> {
        try {
            Validation.departureRequest(req);

            let departures = await this.getByStationCode(req);
            res.status(200).json(departures);
        } catch (err) {
            res.status(400).json({ errors: { code: "InvalidRequest", description: err.message } });
        }
    }

    public getByStationCode = async (req): Promise<IDeparture> => {
        // Implement date, time, window and number of services in the cache key
        let departureRequest = this.assignDepartureRequest(req);

        let key = `departures_${stationCode}`;
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

    private prepareResponse = (departure: IDeparture) => {
        // Make it return only the relevant data
        /**
         * service identifier, Time, stattion name, platform, status (On time) (or return the scheduled time + realTimeFlat, which is not always there), service operator name
         */
        return departure;
    }

}

export default new Departures();
