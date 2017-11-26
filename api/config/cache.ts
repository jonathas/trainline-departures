import log from "./logger";
import * as bluebird from "bluebird";
const redis = bluebird.Promise.promisifyAll(require("redis"));

const cacheAddress = process.env.CACHE_HOST || "127.0.0.1";
const cachePort = process.env.CACHE_PORT || 6379;

let cache = redis.createClient(cachePort, cacheAddress);

if (process.env.CACHE_AUTH === "true") {
    cache.auth(process.env.CACHE_PASS);
}

cache.on("error", (err) => {
    if (err.message.indexOf("ECONNREFUSED") !== -1) {
        log.error("Error: The server was not able to reach Redis. Maybe it's not running?");
        process.exit(1);
    } else {
        throw err;
    }
});

export default cache;