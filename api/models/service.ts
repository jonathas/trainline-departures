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
    static async getByServiceId (serviceId: string): Promise<IService> {
        return null;
    }
}

export default Service;