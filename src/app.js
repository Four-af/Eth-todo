// import '@metamask/legacy-web3'
// require('@metamask/legacy-web3')

// var { web3 } = window
// const selectedAddress = web3.eth.defaultAccount

App = {
  loading: false,
  contracts: {},
  
  load: async () => {
    //Loading the app...
    // console.log("Four says its loading...")
    await App.loadWeb3();
    await App.loadAccount();
    await App.loadContract();
    await App.render();
  },
  ////////////////////////

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    if (typeof web3 !== "undefined") {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      window.alert("Please connect to Metamask.");
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
        // Request account access if needed
        await ethereum.enable();
        // Acccounts now exposed
        web3.eth.sendTransaction({
          /* ... */
        });
      } catch (error) {
        // User denied account access...
      }
    }

    // Legacy dapp browsers...
    else if (window.web3) {
      console.log("unfit");
      App.web3Provider = web3.currentProvider;

      window.web3 = new Web3(web3.currentProvider);
      // Acccounts always exposed
      web3.eth.sendTransaction({
        /* ... */
      });
    }
    // Non-dapp browsers...
    else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  },

  ////////////////////

  //loading accounts
  loadAccount: async () => {
    App.account = web3.eth.accounts[0];
  },

  loadContract: async () => {
    //the js version of smart contract
    const todoList = await $.getJSON("TodoList.json");
    App.contracts.TodoList = TruffleContract(todoList);
    App.contracts.TodoList.setProvider(App.web3Provider);
    //hydrating values from blckchn to smrtcontract
    App.todoList = await App.contracts.TodoList.deployed();
    // console.log(todoList)
  },

  //Render acc
  render: async () => {
    //to prevent double rendering
    if(App.loading){
      return
    }
    //Update app loading state
    App.setLoading(true)
    $('#account').html(App.account);

    //render tasks
    await App.renderTasks()

    App.setLoading(false) //updating status of loaing
  },

  renderTasks: async()=>{
    //loading total task count
    const taskCount = await App.todoList.taskCount()
    const $taskTemplate = $('.taskTemplate')

    //rendering each task with new template
    for(var i =1 ; i<=taskCount;i++){
      const task = await App.todoList.tasks(i)//fetching task data
      const taskId = task[0].toNumber()
      const taskContent = task[1]
      const taskCompleted = task[2]

      //create html for the task
      const $newTaskTemplate = $taskTemplate.clone()
      $newTaskTemplate.find('.content').html(taskContent)
      $newTaskTemplate.find('input')
                      .prop('name',taskId)
                      .prop('checked',taskCompleted)
                      .on('click',App.toggleCompleted)
    
      //putting task on correcct list
      if(taskCompleted){
        $('#completedTaskList').append($newTaskTemplate)
      }else{
        $('#taskList').append($newTaskTemplate)
      }
      //show task
      $newTaskTemplate.show()
    }

  },


  createTask: async()=>{
    App.setLoading(true)
    const content = $('#newTask').val()
    await App.todoList.createTask(content)
    window.location.reload()
  },

  toggleCompleted: async(e)=>{
    App.setLoading(true)
    const taskId = e.target.name
    await App.todoList.toggleCompleted(taskId)
    window.location.reload()
  },

  setLoading: (boolean) => {
    App.loading = boolean
    const loader = $('#loader')
    const content = $('#content')
    if (boolean) {
      loader.show()
      content.hide()
    } else {
      loader.hide()
      content.show()
    }
  }

}

$(() => {
  $(window).load(() => {
    App.load()
  })
})
