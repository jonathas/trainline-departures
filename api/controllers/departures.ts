import Departure from "../models/departure";

class Departures {

    public async getAll(req, res): Promise<void> {
        try {
            let departures = await Departure.getByStationCode();
        } catch (err) {

        }
    }

}

export default new Departures();
