import * as moment from "moment";
import Validation from "../helpers/validation";
import Service from "../models/service";
import { formatError } from "../models/error";

class Services {

    public async getOne(req, res): Promise<void> {
        try {
            Validation.serviceRequest(req);

            let service = await this.getByServiceId(req.params.serviceId, req.params.date);
            res.status(200).json(service);
        } catch (err) {
            res.status(400).json(formatError("InvalidRequest", err.message));
        }
    }

    private getByServiceId = async (serviceId: string, date: string) => {

    }

}

export default new Services();
