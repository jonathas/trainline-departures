import Service from "../controllers/services";

export = (app) => {
    const endpoint = process.env.API_BASE + "services";

    app.get(endpoint + "/:serviceCode/:date", Service.getOne);

};