import * as request from "request";

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

export interface IDepartureRequest {
    stationCode: string;
    date: string;
    time: string;
    expectedwindow: string;
    desidernumberofservices: string;
}

export interface IDepartureResponse {
    serviceIdentifier: string;
    destinationName: string;
    serviceOperator: string;
    platform: string;
    scheduledTime: string;
    realTimeFlag: string;
}

class Departure {

    public getFromAPI = (departureRequest: IDepartureRequest): Promise<IDeparture> => {
        return new Promise((resolve, reject) => {
            let options = {
                url: `${process.env.EXT_API_BASE}departures/${this.getQueryString(departureRequest)}`,
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

    private getQueryString = (departureRequest: IDepartureRequest) => {

    }

    private filterServices = (services: Array<IService>): Array<IService> => {
        return services.filter(service => service.transportMode === "TRAIN");
    }

}

export default new Departure();