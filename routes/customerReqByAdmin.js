const route = require("express").Router();
const cRModule = require("../module/customerRequestModule");
const agentModule = require("../module/agentModule")
const authenticate = require("../module/authenticate");

route.get("/",authenticate.authAdmin,cRModule.getCustomers);

route.get("/:id",authenticate.authAdmin,cRModule.getOneCustomerByAdmin)

route.patch('/assign/:id',authenticate.authAdmin,cRModule.updateCustomerStatusByAdmin);

route.patch('/agentassigned/:id',authenticate.authAdmin,agentModule.addCustomersToAgentArray);

route.delete('/agentunassigned/:id',agentModule.removeCustomersToAgentArray);

route.patch('/unassign/:id',authenticate.authAdmin,cRModule.uassignRequestByAdmin);

route.delete("/:id",authenticate.authAdmin,cRModule.deleteCustomerRequest);

module.exports = route