import * as request from "request";
import { IError } from "./error";

export interface IService {
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
    errors?: [IError];
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
                if (departure.errors) return reject(departure.errors);

                departure.services = this.filterServices(departure.services);

                return resolve(departure);
            });
        });
    }

    private getQueryString = (departureRequest: IDepartureRequest) => {
        let queryString = departureRequest.stationCode + "?";
        let paramsUsed = Object.keys(departureRequest).filter(key => (departureRequest[key] !== "" && key !== "stationCode"));
        let query = paramsUsed.map(param => param + "=" + departureRequest[param]);
        return queryString + query.join("&");
    }

    private filterServices = (services: Array<IService>): Array<IService> => {
        return services.filter(service => service.transportMode === "TRAIN");
    }

    public getRealTimeFlag = (service: IService) => {
        return (service.realTimeUpdatesInfo) ? service.realTimeUpdatesInfo.realTimeServiceInfo.realTimeFlag : "";
    }

    public assignRequest = (req): IDepartureRequest => {
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

}

export default new Departure();