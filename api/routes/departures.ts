import Departure from "../controllers/departures";

export = (app) => {
    const endpoint = process.env.API_BASE + "departures";

    app.get(endpoint + "/:station*", Departure.getAll);

};