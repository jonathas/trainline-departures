import * as request from "request";

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
            arrival: { notApplicable: boolean };
            departure: {
                scheduled: {
                    scheduledTime: string;
                    scheduledPlatform: string;
                };
                realTime: {
                    realTimeServiceInfo: {
                        hasDeparted: boolean;
                        realTime: string;
                        realTimePlatform: string;
                        realTimeFlag: string;
                    }
                };
            };
            callingType: string;
        }]
    };
}

class Service {
    static getByServiceId (serviceId: string, date: string): Promise<IService> {
        let options = {
            url: `${process.env.EXT_API_BASE}callingPattern/${serviceId.toUpperCase().trim()}/${date}`,
            method: "GET"
        };

        return new Promise((resolve, reject) => {
            request(options, (err, response, body) => {
                if (err) return reject(err);
                return resolve(<any>response);
            });
        });
    }
}

export default Service;