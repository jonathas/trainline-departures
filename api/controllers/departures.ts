import Validation from "../helpers/validation";
import Stations from "../helpers/stations";
import Departure, { IDeparture, IDepartureRequest, IDepartureResponse, IService } from "../models/departure";
import { formatError } from "../models/error";
import cache from "../config/cache";

class Departures {

    public getAll = async (req, res): Promise<void> => {
        try {
            Validation.departureRequest(req);

            let departures = await this.getDeparture(req);

            res.status(200).json(departures);
        } catch (err) {
            res.status(400).json(formatError("InvalidRequest", err.message));
        }
    }

    private getDeparture = async (req): Promise<IDepartureResponse> => {
        let departureRequest = Departure.assignDepartureRequest(req);

        let key = this.getCacheKey(departureRequest);
        let departureResponse = await cache.getAsync(key);
        if (departureResponse) return <IDepartureResponse>JSON.parse(departureResponse);

        let departure = await Departure.getFromAPI(departureRequest);
        departureResponse = await this.prepareResponse(departure);

        await cache.setexAsync(key, 60, JSON.stringify(departureResponse));

        return departureResponse;
    }

    private getCacheKey = (departureRequest: IDepartureRequest): string => {
        let paramsUsed = Object.keys(departureRequest).filter(key => departureRequest[key] !== "");
        let values = paramsUsed.map(param => departureRequest[param]);

        return "departure_" + values.join("_");
    }

    private prepareResponse = async (departure: IDeparture): Promise<Array<IDepartureResponse>> => {
        try {
            await Stations.load();

            let departureResponse = <Array<IDepartureResponse>>departure.services.map(service => {
                return <IDepartureResponse>{
                    serviceIdentifier: service.serviceIdentifier,
                    platform: service.scheduledInfo.scheduledPlatform,
                    serviceOperator: service.serviceOperator,
                    scheduledTime: service.scheduledInfo.scheduledTime,
                    realTimeFlag: Departure.getRealTimeFlag(service),
                    destinationName: Stations.getName(service.destinationList[0].crs)
                };
            });

            return departureResponse;
        } catch (err) {
            console.error(err);
        }
    }

}

export default new Departures();
