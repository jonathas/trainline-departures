import Departure from "../models/departure";

class Departures {

    public async getAll(req, res): Promise<void> {
        try {
            let departures = await Departure.getByStationCode(req.params.station);
            res.status(200).json(departures);
        } catch (err) {
            res.status(400).json({ errors: { code: "InvalidRequest", description: err.message } });
        }
    }

}

export default new Departures();
