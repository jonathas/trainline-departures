process.env.NODE_ENV = "test";

import "mocha";

const express = require("../config/express")();
export const request = require("supertest")(express);

export const chai = require("chai");
export const should = chai.should();

import log from "../config/logger";

log.error = (err, msg) => {
    return {};
};
