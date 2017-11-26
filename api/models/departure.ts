import * as request from "request";
import cache from "../config/cache";

export interface IDeparture {
    requestId: string;
    queryEarlierServices: string;
    queryLaterServices: string;
    realTimeDataSourceAvailable: boolean;
    timestamp: string;
    services: [{
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
    }];
}

class Departure {
    static async getByStation(stationCode: string): Promise<IDeparture> {
        return null;
    }
}

export default Departure;