import * as moment from "moment";
import Service from "../models/service";

class Services {

    public async getOne(req, res): Promise<void> {
        try {
            let service = await Service.getByServiceId(req.params.serviceId, req.params.date);
            res.status(200).json(service);
        } catch (err) {
            res.status(400).json({ errors: { code: "InvalidRequest", description: err.message } });
        }
    }

}

export default new Services();
