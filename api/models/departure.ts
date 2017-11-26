import * as request from "request";

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
    static getByStationCode(stationCode: string): Promise<IDeparture> {
        let options = {
            url: `${process.env.EXT_API_BASE}departures/${stationCode.toUpperCase().trim()}`,
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

export default Departure;