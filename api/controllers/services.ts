import * as moment from "moment";
import Service from "../models/service";

class Services {

    public async getOne(req, res): Promise<void> {
        try {
            let service = await Service.getByServiceId();
        } catch (err) {

        }
    }

}

export default new Services();
