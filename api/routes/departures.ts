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
     *      {
     *      "requestId": "XUo2nmzcaU2tbjwaMeUDvg",
     *      "queryEarlierServices": "https://realtime.thetrainline.com/Departures/BGN?Date=2017-11-26&Time=14:16&ExpectedWindow=-360&DesiredNumberOfServices=50",
     *      "queryLaterServices": "https://realtime.thetrainline.com/Departures/BGN?Date=2017-11-27&Time=07:40&DesiredNumberOfServices=50",
     *      "realTimeDataSourceAvailable": true,
     *      "timestamp": "2017-11-26T14:17:00+00:00",
     *      "services": [
     *          {
     *          "serviceIdentifier": "P75609",
     *          "serviceOperator": "AW",
     *          "transportMode": "TRAIN",
     *          "scheduledInfo": {
     *              "scheduledTime": "2017-11-26T14:17:00+00:00",
     *              "scheduledPlatform": "2"
     *          },
     *          "callingType": "Normal",
     *          "destinationList": [
     *              {
     *              "crs": "MAN"
     *             }
     *          ],
     *          "realTimeUpdatesInfo": {
     *              "realTimeServiceInfo": {
     *              "realTime": "2017-11-26T14:17:00+00:00",
     *              "realTimePlatform": "2",
     *              "realTimeFlag": "Estimate"
     *              }
     *          },
     *          "callingPatternUrl": "https://realtime.thetrainline.com/callingPattern/P75609/2017-11-26"
     *          }
     *      ]
     *      }
     *
     */
    app.get(endpoint + "/:stationCode*", [
        check("stationCode").isAlpha().isLength({ min: 3, max: 3 })
    ], Departure.getAll);

};