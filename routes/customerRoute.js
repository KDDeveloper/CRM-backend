const route = require("express").Router();
const cRModule = require("../module/customerRequestModule");

route.post("/",cRModule.insertCustomer);

module.exports = route