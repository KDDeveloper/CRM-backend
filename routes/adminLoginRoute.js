const route = require("express").Router();
const adminModule = require("../module/adminLoginModule");

route.post('/register',adminModule.adminRegister);
route.post('/login',adminModule.adminLogin);
route.get("/logout",adminModule.adminLogout)

module.exports = route