//changing blockchain state
//migrations
//
//artifact extracts the todolist.json
//abstraction of the smart contract
const TodoList = artifacts.require("TodoList");

module.exports = function(deployer) {
  deployer.deploy(TodoList);
};
