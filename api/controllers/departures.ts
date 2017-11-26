import Departure from "../models/departure";

class Departures {

    public async getAll(req, res): Promise<void> {
        try {
            Departure.getByStation();
        } catch (err) {

        }
    }

}

export default new Departures();
