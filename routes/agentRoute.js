const route = require("express").Router();
const agentModule = require("../module/agentModule");
const authenticate = require("../module/authenticate")

route.get('/personal/:id',agentModule.findAgent)

route.get('/all',authenticate.authAdmin,agentModule.getAgents);

route.post('/add',agentModule.addAgent);

route.post('/login', agentModule.agentLogin);

route.get('/allotedRequest/:id',authenticate.authAgent, agentModule.requestAlloted);

route.patch('/changeStatus/:id',authenticate.authAgent, agentModule.updateCustomerStatusByAgent);

route.patch('/agentcompletedreq/:id',authenticate.authAgent, agentModule.updateCompletedReqByAgent);

module.exports = route;
