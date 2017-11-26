import * as request from "request";
import { IError } from "./error";

interface IScheduled {
    scheduledTime: string;
    scheduledPlatform: string;
}

interface IRealTime {
    realTimeServiceInfo: {
        hasArrived?: boolean;
        hasDeparted?: boolean;
        realTime: string;
        realTimePlatform: string;
        realTimeFlag: string;
    };
}

interface IStops {
    location: { crs: string; name?: string; };
    arrival: {
        notApplicable?: boolean;
        scheduled?: IScheduled;
        realTime?: IRealTime;
    };
    departure: {
        notApplicable?: boolean;
        scheduled?: IScheduled;
        realTime?: IRealTime;
    };
    callingType: string;
}

export interface IService {
    errors?: [IError];
    requestId: string;
    isRealTimeDataAvailable: boolean;
    service: {
        serviceUid: string;
        serviceOperator: string;
        transportMode: string;
        serviceOrigins: [string];
        serviceDestinations: [string];
        stops: [IStops];
    };
}

export interface IServiceResponse {
    originName: string;
    destinationName: string;
    serviceOperator: string;
    stops: [IStops];
}

class Service {

    public getFromAPI = (serviceId: string, date: string): Promise<IService> => {
        let options = {
            url: `${process.env.EXT_API_BASE}callingPattern/${serviceId}/${date}`,
            method: "GET"
        };

        return new Promise((resolve, reject) => {
            request(options, (err, response, body) => {
                if (err) return reject(err);

                let service = <IService>JSON.parse(response.body);
                if (service.errors) return reject(service.errors);

                return resolve(service);
            });
        });
    }

}

export default new Service();