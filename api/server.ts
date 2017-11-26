import log from "./config/logger";
const app = require("./config/express")();

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    log.info(`Trainline departures API listening on port ${port}. Environment: ${process.env.NODE_ENV}`);
});
