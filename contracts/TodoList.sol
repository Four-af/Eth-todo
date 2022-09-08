// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.5.0;
 //declare version of sol pprogramming lang being used

//declare smart contract
contract TodoList{
    //state variable in solididty
    //state in a blockchain
    //menas... changing this changes blockchain state

    uint public taskCount = 0; 

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
    struct Task{
        uint id;
        string content;
        bool completed; //like a checkbox to know task is completed
    }

    //place to put the above modelled tasks
    // to put it on storage in blockchain
    
    //mapping is like an associative array or like a hash
    //mapping(key (datatype)(id of the task) =>value pair (task)) just like a databse
    mapping(uint => Task) public tasks;


    //constructor function
    //called when smart contract is run for the first time
    ///here on deployement it will be called
    //we can add default task in the constructor
    constructor() public{
        createTask("Four says this is the default task");
    }


    //putting struct in mapping
    function createTask(string memory _content) public{
        //detremine id
        taskCount++;

        //reference the mapping->task[taskCount]
        //taskCount->key
        // rhs = new task
        //give arguments of the struct
        //args-> taskCount:id, _contnt:content, completed:false
        tasks[taskCount] = Task(taskCount,_content,false);
        
    }

     
}

