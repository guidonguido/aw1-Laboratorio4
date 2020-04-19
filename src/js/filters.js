'use strict';

class Filter{
    taskManager = null;
    displayedTasks= null;
    currentFilter = null;
    currentMainName = "All";

    parentUL = null;
    listElement = null;


    allFilter = null;
    importantFilter = null;
    todayFilter = null;
    next7Filter = null;
    privateFilter = null;
    sharedFilter = null;

    constructor( taskManager )
    {   this.taskManager = taskManager;
        this.currentMainName = "All";
        this.displayedTasks = [...this.taskManager.allTasks];
        this.currentFilter = this.allFilter;

        this.parentUL = document.getElementById("taskList");                      //il tag <ol>
        this.listElement = this.parentUL.firstElementChild.cloneNode(true);            //il primo element <li>

        this.allFilter       =   document.getElementById("allFilter");
        this.importantFilter =   document.getElementById("importantFilter");
        this.todayFilter     =   document.getElementById("todayFilter");
        this.next7Filter     =   document.getElementById("next7Filter");
        this.privateFilter   =   document.getElementById("privateFilter");
        this.sharedFilter    =   document.getElementById("sharedFilter");

        this.allFilter.addEventListener('click', event =>{
            this.currentFilter? this.currentFilter.classList.toggle("custom-selected-filter") : null;
            this.currentFilter = this.allFilter;
            this.currentMainName = "All";
            this.displayedTasks = [...this.taskManager.allTasks];                
            this.allFilter.classList.add("custom-selected-filter");
            this.changeDisplayedTasks();
            event.stopPropagation();
        });
       
        this.importantFilter.addEventListener('click', event =>{
            this.currentFilter? this.currentFilter.classList.toggle("custom-selected-filter") : null;
            this.currentFilter = this.importantFilter;
            this.currentMainName = "Important";
            this.displayedTasks = [...this.taskManager.importantTasks];
       
            this.importantFilter.classList.add("custom-selected-filter");
            this.changeDisplayedTasks();
            event.stopPropagation();
        });
       
        this.todayFilter.addEventListener('click', event =>{
            this.currentFilter? this.currentFilter.classList.toggle("custom-selected-filter") : null;
            this.currentFilter = this.todayFilter;
            this.currentMainName = "Expiring Today";
            this.displayedTasks = [...this.taskManager.todayTasks];

            this.todayFilter.classList.add("custom-selected-filter");
            this.changeDisplayedTasks();
            event.stopPropagation();
        });
       
        this.next7Filter.addEventListener('click', event =>{
            this.currentFilter? this.currentFilter.classList.toggle("custom-selected-filter") : null;
            this.currentFilter = this.next7Filter;
            this.currentMainName = "Expiring on a Week";
            this.displayedTasks = [...this.taskManager.next7Tasks];
       
            this.next7Filter.classList.add("custom-selected-filter");
            this.changeDisplayedTasks();
            event.stopPropagation();
        });
       
        this.privateFilter.addEventListener('click', event =>{
            this.currentFilter? this.currentFilter.classList.toggle("custom-selected-filter") : null;
            this.currentFilter = this.privateFilter;
            this.currentMainName = "Private Tasks";
            this.displayedTasks = [...this.taskManager.privateTasks];
       
            this.privateFilter.classList.add("custom-selected-filter");
            this.changeDisplayedTasks();
            event.stopPropagation();
        });
       
        this.sharedFilter.addEventListener('click', event =>{
            this.currentFilter? this.currentFilter.classList.toggle("custom-selected-filter") : null;
            this.currentFilter = this.sharedFilter;
            this.currentMainName = "Shared Tasks";
            this.displayedTasks = [...this.taskManager.sharedTasks];
       
            this.sharedFilter.classList.add("custom-selected-filter");
            this.changeDisplayedTasks();
            event.stopPropagation();
        });
    }

    newTaskAdded = () =>
        {   this.currentFilter? this.currentFilter.classList.toggle("custom-selected-filter") : null;
            this.currentFilter = this.allFilter;
            this.currentMainName = "All";
            this.displayedTasks = [...this.taskManager.allTasks];                
            this.allFilter.classList.add("custom-selected-filter");
            this.changeDisplayedTasks();

        }

    /*
    * Visualizzo i task fitrati nella finestra principale
    */
    changeDisplayedTasks = () =>{

        this.parentUL.textContent = '';
        document.getElementById("mainPageName").firstElementChild.innerText = this.currentMainName;

        for(let task of this.displayedTasks)
        {   let tempElement = this.listElement.cloneNode(true);             //il primo element <li>
            tempElement.setAttribute("id", "task"+task.id);
            tempElement.getElementsByTagName("label")[0].innerText = task.description;
            tempElement.getElementsByTagName("label")[0].setAttribute("for", "customCheck"+task.id);

            tempElement.getElementsByTagName("span")[0].innerText = task.project;

            if(task.important)
                tempElement.getElementsByTagName("input")[0].classList.add("important-task");

            tempElement.getElementsByTagName("input")[0].setAttribute("id", "customCheck"+task.id);
            
            tempElement.getElementsByClassName("custom-data")[0].innerText = 
                task.deadline.format("dddd, MMMM Do YYYY");

            if(task.private)
                tempElement.getElementsByClassName("custom-shared")[0].remove();

            if(this.currentMainName == "All" && task.expired)
                tempElement.getElementsByClassName("custom-data")[0].classList.toggle("costom-expired-data");

            this.parentUL.appendChild(tempElement);
        }
    }
}