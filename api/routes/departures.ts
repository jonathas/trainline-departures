import { check } from "express-validator/check";
import Departure from "../controllers/departures";

export = (app) => {
    const endpoint = process.env.API_BASE + "departures";

    /**
     * @api {get} /api/v1/departures/:stationCode?date=2017-11-26&time=14:16&expectedwindow=-360&desidernumberofservices=50 Returns the departures
     * @apiVersion 1.0.0
     * @apiName getAll
     * @apiGroup Departures
     * @apiPermission public
     *
     * @apiParam {String} stationCode The station identifier. You can get the list here: http://www.nationalrail.co.uk/stations_destinations/48541.aspx
     * @apiParam {String} date (optional) The date of departure (YYYY-MM-DD)
     * @apiParam {String} time (optional) The time (HH:mm)
     * @apiParam {Number} expectedwindow (optional) The time window of the departures (3 characters)
     * @apiParam {Number} desirednumberofservices (optional) The number of services that will be returned (Max 100)
     *
     * @apiExample {js} Example usage:
     * $http.get(url)
     *   .success((res, status) => doSomethingHere())
     *   .error((err, status) => doSomethingHere());
     *
     * @apiSuccess {Object} result The departures result
     *
     * @apiSuccessExample {json} Success response:
     *     HTTP 200 OK
     *      [
     *          {
     *              "serviceIdentifier": "W38293",
     *              "platform": "16",
     *              "serviceOperator": "SW",
     *              "scheduledTime": "2017-11-27T23:28:00+00:00",
     *              "realTimeFlag": "Estimate",
     *              "destinationName": "Windsor & Eton Riverside"
     *          },
     *          {
     *              "serviceIdentifier": "W37561",
     *              "platform": "19",
     *              "serviceOperator": "SW",
     *              "scheduledTime": "2017-11-27T23:33:00+00:00",
     *              "realTimeFlag": "Estimate",
     *              "destinationName": "Kingston"
     *          },
     *          {
     *              "serviceIdentifier": "W35232",
     *              "platform": "11",
     *              "serviceOperator": "SW",
     *              "scheduledTime": "2017-11-27T23:35:00+00:00",
     *              "realTimeFlag": "Estimate",
     *              "destinationName": "Southampton Central"
     *          }
     *      ]
     *
     */
    app.get(endpoint + "/:stationCode*", [
        check("stationCode").isAlpha().isLength({ min: 3, max: 3 })
    ], Departure.getAll);

};