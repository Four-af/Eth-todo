//require s_c

const { assert } = require("chai");

const TodoList = artifacts.require("./TodoList.sol");

//callback function
contract("TodoList", (accounts) => {
  //will inject all the accounts
  //get a deployed copy of smart contract
  before(async () => {
    this.todoList = await TodoList.deployed();
  });

  //test
  it("Four says its deployed", async () => {
    const address = await this.todoList.address;
    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
  });

  //list out the tasks
  it('lists tasks', async()=>{
    const taskCount = await this.todoList.taskCount();
    const task = await this.todoList.tasks(taskCount);
    assert.equal(task.id.toNumber(), taskCount.toNumber())
    assert.equal(task.content, 'Four says this is the default task')
    assert.equal(task.completed, false)
    assert.equal(taskCount.toNumber(), 1)

  })


});
