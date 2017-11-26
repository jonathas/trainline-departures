const { check } = require("express-validator/check");
import Service from "../controllers/services";

export = (app) => {
    const endpoint = process.env.API_BASE + "services";

    /**
     * @api {get} /api/v1/departures/:serviceCode/:date Returns the service and its stops
     * @apiVersion 1.0.0
     * @apiName getOne
     * @apiGroup Services
     * @apiPermission public
     *
     * @apiParam {String} serviceCode The service code obtained in the list of departures for a station.
     * @apiParam {String} date The date of departure (YYYY-MM-dd)
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
     *     {
     *      "requestId": "fltDA7q/j0KAwYgFHRobPg",
     *      "isRealTimeDataAvailable": true,
     *      "service": {
     *          "serviceUid": "W34807",
     *          "serviceOperator": "SW",
     *          "transportMode": "TRAIN",
     *          "serviceOrigins": [
     *          "WNR"
     *          ],
     *          "serviceDestinations": [
     *          "WAT"
     *         ],
     *          "stops": [
     *                  {
     *                      "location": {
     *                      "crs": "WNR"
     *                      },
     *                      "arrival": {
     *                      "notApplicable": true
     *                      },
     *                      "departure": {
     *                       "scheduled": {
     *                          "scheduledTime": "2017-11-26T13:40:00+00:00",
     *                          "scheduledPlatform": "1"
     *                      },
     *                      "realTime": {
     *                          "realTimeServiceInfo": {
     *                          "hasDeparted": true,
     *                          "realTime": "2017-11-26T13:40:00+00:00",
     *                          "realTimePlatform": "1",
     *                          "realTimeFlag": "Actual"
     *                          }
     *                      }
     *                      },
     *                      "callingType": "PickUp"
     *                  },
     *                  {
     *                      "location": {
     *                      "crs": "DAT"
     *                      },
     *                      "arrival": {
     *                      "scheduled": {
     *                          "scheduledTime": "2017-11-26T13:43:00+00:00",
     *                          "scheduledPlatform": "1"
     *                      },
     *                      "realTime": {
     *                          "realTimeServiceInfo": {
     *                          "hasArrived": true,
     *                          "realTime": "2017-11-26T13:43:00+00:00",
     *                          "realTimePlatform": "1",
     *                          "realTimeFlag": "Actual"
     *                          }
     *                      }
     *                      },
     *                      "departure": {
     *                      "scheduled": {
     *                          "scheduledTime": "2017-11-26T13:44:00+00:00",
     *                          "scheduledPlatform": "1"
     *                      },
     *                      "realTime": {
     *                          "realTimeServiceInfo": {
     *                          "hasDeparted": true,
     *                          "realTime": "2017-11-26T13:44:00+00:00",
     *                          "realTimePlatform": "1",
     *                          "realTimeFlag": "Estimate"
     *                          }
     *                      }
     *                      },
     *                      "callingType": "Normal"
     *                  }
     *              ]
     *          }
     *      }
     *
     */
    app.get(endpoint + "/:serviceCode/:date", Service.getOne);

};