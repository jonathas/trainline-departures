import { check } from "express-validator/check";
import Service from "../controllers/services";

export = (app) => {
    const endpoint = process.env.API_BASE + "services";

    /**
     * @api {get} /api/v1/services/:serviceId/:date Returns the service and its stops
     * @apiVersion 1.0.0
     * @apiName getOne
     * @apiGroup Services
     * @apiPermission public
     *
     * @apiParam {String} serviceId The service id obtained in the list of departures for a station.
     * @apiParam {String} date The date of departure (YYYY-MM-DD)
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
     *          "originName": "London Waterloo",
     *          "destinationName": "Windsor & Eton Riverside",
     *          "serviceOperator": "SW",
     *          "stops": [
     *              {
     *                  "location": {
     *                      "crs": "WAT",
     *                      "name": "London Waterloo"
     *                  },
     *                  "arrival": {
     *                      "notApplicable": true
     *                  },
     *                  "departure": {
     *                      "scheduled": {
     *                          "scheduledTime": "2017-11-27T23:28:00+00:00",
     *                          "scheduledPlatform": "16"
     *                      },
     *                      "realTime": {
     *                          "realTimeServiceInfo": {
     *                              "hasDeparted": true,
     *                              "realTime": "2017-11-27T23:28:00+00:00",
     *                              "realTimePlatform": "18",
     *                              "realTimeFlag": "Actual"
     *                          }
     *                      }
     *                  },
     *                 "callingType": "PickUp"
     *              },
     *              {
     *                  "location": {
     *                      "crs": "VXH",
     *                      "name": "Vauxhall"
     *                  },
     *                  "arrival": {
     *                      "scheduled": {
     *                          "scheduledTime": "2017-11-27T23:32:00+00:00"
     *                      },
     *                      "realTime": {
     *                          "realTimeServiceInfo": {
     *                              "hasArrived": false,
     *                              "realTime": "2017-11-27T23:32:00+00:00",
     *                              "realTimePlatform": "3",
     *                              "realTimeFlag": "Estimate"
     *                          }
     *                      }
     *                  },
     *                  "departure": {
     *                      "scheduled": {
     *                          "scheduledTime": "2017-11-27T23:32:00+00:00"
     *                      },
     *                      "realTime": {
     *                          "realTimeServiceInfo": {
     *                              "hasDeparted": false,
     *                              "realTime": "2017-11-27T23:32:00+00:00",
     *                              "realTimePlatform": "3",
     *                              "realTimeFlag": "Estimate"
     *                          }
     *                      }
     *                  },
     *                  "callingType": "Normal"
     *              },
     *              {
     *                  "location": {
     *                      "crs": "CLJ",
     *                      "name": "Clapham Junction"
     *                  },
     *                  "arrival": {
     *                      "scheduled": {
     *                          "scheduledTime": "2017-11-27T23:37:00+00:00",
     *                          "scheduledPlatform": "6"
     *                      },
     *                      "realTime": {
     *                          "realTimeServiceInfo": {
     *                              "hasArrived": false,
     *                              "realTime": "2017-11-27T23:37:00+00:00",
     *                              "realTimePlatform": "6",
     *                              "realTimeFlag": "Estimate"
     *                          }
     *                      }
     *                  },
     *                  "departure": {
     *                      "scheduled": {
     *                          "scheduledTime": "2017-11-27T23:38:00+00:00",
     *                          "scheduledPlatform": "6"
     *                      },
     *                      "realTime": {
     *                          "realTimeServiceInfo": {
     *                              "hasDeparted": false,
     *                              "realTime": "2017-11-27T23:38:00+00:00",
     *                              "realTimePlatform": "6",
     *                              "realTimeFlag": "Estimate"
     *                          }
     *                      }
     *                  },
     *                  "callingType": "Normal"
     *              },
     *              {
     *                  "location": {
     *                      "crs": "WNR",
     *                      "name": "Windsor & Eton Riverside"
     *                  },
     *                  "arrival": {
     *                      "scheduled": {
     *                          "scheduledTime": "2017-11-28T00:25:00+00:00",
     *                          "scheduledPlatform": "1"
     *                      },
     *                      "realTime": {
     *                          "realTimeServiceInfo": {
     *                              "hasArrived": false,
     *                              "realTime": "2017-11-28T00:25:00+00:00",
     *                              "realTimePlatform": "1",
     *                              "realTimeFlag": "Estimate"
     *                          }
     *                      }
     *                  },
     *                  "departure": {
     *                      "notApplicable": true
     *                  },
     *                  "callingType": "SetDown"
     *              }
     *          ]
     *      }
     *
     */
    app.get(endpoint + "/:serviceId/:date", [
        check("serviceId").isAlphanumeric().isLength({ min: 6, max: 6 })
    ], Service.getOne);

};