import * as util from "util";
import * as fs from "fs";
import cache from "../config/cache";
const readFile = util.promisify(fs.readFile);

class Stations {

    private stations = null;

    constructor() {
        this.load();
    }

    public load = async () => {
        this.stations = await cache.getAsync("stations");
        if (this.stations) return JSON.parse(this.stations);

        this.stations = await readFile(`${__dirname}/../config/populate/stations.json`, "utf8");

        await cache.setAsync("stations", this.stations);

        return this.stations;
    }

    public getName = (stationCode: string): string => {
        try {
            return this.stations[stationCode];
        } catch (err) {
            return stationCode;
        }
    }

}

export default new Stations();