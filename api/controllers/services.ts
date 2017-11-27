import * as moment from "moment";
import Validation from "../helpers/validation";
import Stations from "../helpers/stations";
import Service, { IServiceResponse, IService } from "../models/service";
import APIError from "../models/error";
import log from "../config/logger";
import cache from "../config/cache";

class Services {

    public getOne = async (req, res): Promise<void> => {
        try {
            Validation.serviceRequest(req);

            let service = await this.getByServiceId(req);

            res.status(200).json(service);
        } catch (err) {
            APIError.returnError(res, err);
        }
    }

    private getByServiceId = async (req) => {
        let key = this.getCacheKey(req);
        let serviceResponse = await cache.getAsync(key);
        if (serviceResponse) return <IServiceResponse>JSON.parse(serviceResponse);

        let service = await Service.getFromAPI(req.params.serviceId, req.params.date);

        serviceResponse = await this.prepareResponse(service);

        await cache.setexAsync(key, 60, JSON.stringify(serviceResponse));

        return serviceResponse;
    }

    private getCacheKey = (req): string => {
        let formattedServiceId = req.params.serviceId.toUpperCase().trim();
        let formattedDate = moment(req.params.date, process.env.DATE_FORMAT).format("YYYYMMDD");
        return `service_${formattedServiceId}_${formattedDate}`;
    }

    private prepareResponse = async (serviceObj: IService): Promise<IServiceResponse> => {
        try {
            await Stations.load();

            let stops = serviceObj.service.stops.map(stop => {
                stop.location.name = Stations.getName(stop.location.crs);
                return stop;
            });

            let serviceResponse = <IServiceResponse>{
                originName: Stations.getName(serviceObj.service.serviceOrigins[0]),
                destinationName: Stations.getName(serviceObj.service.serviceDestinations[0]),
                serviceOperator: serviceObj.service.serviceOperator,
                stops: stops
            };

            return serviceResponse;
        } catch (err) {
            /* istanbul ignore next */
            throw new Error(err);
        }
    }

}

export default new Services();
