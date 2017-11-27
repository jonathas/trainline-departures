import * as util from "util";
import * as fs from "fs";
import cache from "../config/cache";
const readFile = util.promisify(fs.readFile);

class Stations {

    private stations = null;

    constructor() {
        this.load();
    }

    public load = async (): Promise<void> => {
        if (!this.stations) {
            let stations = await cache.getAsync("stations");
            /* istanbul ignore next */
            if (stations) this.stations = JSON.parse(stations);

            stations = await readFile(`${__dirname}/../config/populate/stations.json`, "utf8");

            await cache.setAsync("stations", stations);

            this.stations = JSON.parse(stations);
        }
    }

    public getName = (stationCode: string): string => {
        let stationName = this.stations[stationCode.toUpperCase()];
        if (!stationName) return stationCode;
        return stationName;
    }

}

export default new Stations();