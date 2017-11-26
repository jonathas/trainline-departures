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
    requestId: string;
    queryEarlierServices: string;
    queryLaterServices: string;
    realTimeDataSourceAvailable: boolean;
    timestamp: string;
    services: [IService];
}