// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.9.0;

//declare version of sol pprogramming lang being used
// pragma solidity ^0.5.0;

//declare smart contract
contract TodoList {
    //state variable in solididty
    //state in a blockchain
    //menas... changing this changes blockchain state

    uint256 public taskCount = 0;

    //Model the tasks
    //making a struct
    //solidity allows us to define
    //our own datatypes like structs

    //features of solidity
    //=>statically typed language
    //own datatypes
    //can give our own attributes
    //have strings
    //bolean etc
    struct Task {
        uint256 id;
        string content;
        bool completed; //like a checkbox to know task is completed
    }

    //place to put the above modelled tasks
    // to put it on storage in blockchain

    //mapping is like an associative array or like a hash
    //mapping(key (datatype)(id of the task) =>value pair (task)) just like a databse
    mapping(uint256 => Task) public tasks;

    //solidity allows to create events
    event TaskCreated(uint256 id, string content, bool completed);

    event TaskComplted(
        uint id, bool completed
    );


    //constructor function
    //called when smart contract is run for the first time
    ///here on deployement it will be called
    //we can add default task in the constructor
    constructor() public {
        createTask("Four says this is the default task");
    }

    //putting struct in mapping
    //detremine id
       // taskCount++;
    //reference the mapping->task[taskCount]
        //taskCount->key
        // rhs = new task
        //give arguments of the struct
        //args-> taskCount:id, _contnt:content, completed:false
        //tasks[taskCount] = Task(taskCount, _content, false);
    function createTask(string memory _content) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _content, false);
        //calling event
        emit TaskCreated(taskCount, _content,false);
    }

    function toggleCompleted(uint _id) public{
        Task memory _task = tasks[_id];
        _task.completed = !_task.completed;
        tasks[_id] = _task;
        emit TaskComplted(_id, _task.completed);
    }
    


}
