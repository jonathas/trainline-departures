import * as request from "request";
import cache from "../config/cache";

interface IService {
    serviceIdentifier: string;
    serviceOperator: string;
    transportMode: string;
    scheduledInfo: {
        scheduledTime: string;
        scheduledPlatform?: string;
    };
    callingType: string;
    destinationList: [{ crs: string }];
    realTimeUpdatesInfo?: {
        realTimeServiceInfo: {
            realTime: string;
            realTimePlatform: string;
            realTimeFlag: string;
        }
    };
    callingPatternUrl: string;
}

export interface IDeparture {
    requestId: string;
    queryEarlierServices: string;
    queryLaterServices: string;
    realTimeDataSourceAvailable: boolean;
    timestamp: string;
    services: IService[];
}

class Departure {

    public getByStationCode = async (stationCode: string): Promise<IDeparture> => {
        let key = `departures_${stationCode}`;
        let departure = await cache.getAsync(key);
        if (departure) return <IDeparture>JSON.parse(departure);

        departure = this.prepareResponse(await this.getFromAPI(stationCode));

        await cache.setexAsync(key, 60, JSON.stringify(departure));

        return departure;
    }

    private getFromAPI = (stationCode: string): Promise<IDeparture> => {
        return new Promise((resolve, reject) => {
            let options = {
                url: `${process.env.EXT_API_BASE}departures/${stationCode.toUpperCase().trim()}`,
                method: "GET"
            };

            request(options, (err, response, body) => {
                if (err) return reject(err);

                let departure = <IDeparture>JSON.parse(response.body);
                departure.services = this.filterServices(departure.services);

                return resolve(departure);
            });
        });
    }

    private filterServices(services: Array<IService>): Array<IService> {
        return services.filter(service => service.transportMode === "TRAIN");
    }

    private prepareResponse = (departure: IDeparture) => {
        // Make it return only the relevant data
        return departure;
    }
}

export default new Departure();