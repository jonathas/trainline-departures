import * as moment from "moment";
import Validation from "../helpers/validation";
import Service from "../models/service";

class Services {

    public async getOne(req, res): Promise<void> {
        try {
            Validation.serviceRequest(req);

            let service = await this.getByServiceId(req.params.serviceId, req.params.date);
            res.status(200).json(service);
        } catch (err) {
            res.status(400).json({ errors: { code: "InvalidRequest", description: err.message } });
        }
    }

    private getByServiceId = async (serviceId: string, date: string) => {

    }

}

export default new Services();
