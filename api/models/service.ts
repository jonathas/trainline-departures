import * as request from "request";

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

export interface IService {
    requestId: string;
    isRealTimeDataAvailable: boolean;
    service: {
        serviceUid: string;
        serviceOperator: string;
        transportMode: string;
        serviceOrigins: [string];
        serviceDestinations: [string];
        stops: [{
            location: { crs: string };
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
        }]
    };
}

export interface IServiceResponse {
    originName: string;
    destinationName: string;
    serviceOperator: string;
    stops: [{
        stationName: string;
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
    }];
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
                return resolve(<any>JSON.parse(response.body));
            });
        });
    }
}

export default new Service();