'use strict';

let uid=0;
const tasks = [];

function Task(description, project, urgent, privacy, deadline)
{   this.description = description;
    this.project = project;
    this.id = uid;
    uid++;
    this.important = urgent;
    this.privacy = privacy;     // 1 = private; 0 = shared
    this.deadline = deadline;
    this.expired = false;
    if(!Number.isNaN(deadline.getTime()))
    {   const timeOut = this.deadline.getTime() - new Date().getTime();
        setTimeout(() =>{
            console.log("Il task con scadenza " +deadline.toDateString() +"è scaduto"); 
            this.expired = true;
        }, timeOut > 2147483647 ? 2147483646 : timeOut);
    }
}

/*
 * Creo e popolo un array di task
 */
const today = new Date();
//const prototype = new Task("Descrizione del Task", "Esercizio1", true, true, today.setDate(today.getDate() + this.id));

//tasks.push(new Task("Descrizione del Task" +uid, "Esercizio1", true, true, new Date(today.setDate(today.getDate() + this.id))));
tasks.push(new Task("Descrizione del Task" +uid, "Esercizio1A", false, true, new Date(today.getFullYear(),today.getMonth(),today.getDate()+1)));
tasks.push(new Task("Descrizione del Task" +uid, "Esercizio1B", true, false, new Date(today.getFullYear(),today.getMonth(),today.getDate()+3)));
tasks.push(new Task("Descrizione del Task" +uid, "Esercizio1c", false, true, new Date(today.getFullYear(),today.getMonth(),today.getDate())));
tasks.push(new Task("Descrizione del Task" +uid, "Esercizio1D", true, true, new Date(today.getFullYear(),today.getMonth(),today.getDate()+2)));



/*
 * Inserisco i task nella pagina HTML
 */
let parentUL = document.getElementById("taskList");                      //il tag <ol>
const listElement = parentUL.firstElementChild.cloneNode(true);             //il primo element <li>


let displayedTasks=[...allTask];


/*
 * Gestisco eventi per la visualizzazione secondo i filtri
 */
let currentFilter = null;
let currentMainName = "All";

let allFilter       =   document.getElementById("allFilter");
let importantFilter =   document.getElementById("importantFilter");
let todayFilter     =   document.getElementById("todayFilter");
let next7Filter     =   document.getElementById("next7Filter");
let privateFilter   =   document.getElementById("privateFilter");
let sharedFilter    =   document.getElementById("sharedFilter");


allFilter.addEventListener('click', event =>{
     currentFilter? currentFilter.classList.toggle("custom-selected-filter") : null;
     currentFilter = allFilter;
     currentMainName = "All";
     displayedTasks = [...allTask];
     allFilter.classList.add("custom-selected-filter");
     changeDispayedTasks();
     event.stopPropagation();
 });

 importantFilter.addEventListener('click', event =>{
     currentFilter? currentFilter.classList.toggle("custom-selected-filter") : null;
     currentFilter = importantFilter;
     currentMainName = "Important";
     displayedTasks = [];
     for(let task of tasks)
     {  if(task.important)
            displayedTasks.push(task);
     }

     importantFilter.classList.add("custom-selected-filter");
     changeDispayedTasks();
     event.stopPropagation();
 });

 todayFilter.addEventListener('click', event =>{
     currentFilter? currentFilter.classList.toggle("custom-selected-filter") : null;
     currentFilter = todayFilter;
     currentMainName = "Expiring Today";
     displayedTasks = [];

     const today = new Date();
     today.setHours(0,0,0,0);
     for(let task of tasks)
     {  task.deadline.setHours(0,0,0,0);
        if(task.deadline.getTime() === today.getTime())
            displayedTasks.push(task);
     }

     todayFilter.classList.add("custom-selected-filter");
     changeDispayedTasks();
     event.stopPropagation();
 });

 next7Filter.addEventListener('click', event =>{
     currentFilter? currentFilter.classList.toggle("custom-selected-filter") : null;
     currentFilter = next7Filter;
     currentMainName = "Expiring on a Week";
     displayedTasks = [];

     const nextWeek = new Date();
     nextWeek.setHours(0,0,0);
     nextWeek.setDate(nextWeek.getDate() + 7);
     for(let task of tasks)
     {  task.deadline.setHours(0,0,0);
         if(task.deadline.getTime() <= nextWeek.getTime())
            displayedTasks.push(task);
     }

     next7Filter.classList.add("custom-selected-filter");
     changeDispayedTasks();
     event.stopPropagation();
 });

 privateFilter.addEventListener('click', event =>{
     currentFilter? currentFilter.classList.toggle("custom-selected-filter") : null;
     currentFilter = privateFilter;
     currentMainName = "Private Tasks";
     displayedTasks = [];

     for(let task of tasks)
     {  if(task.privacy)
            displayedTasks.push(task);
     }

     privateFilter.classList.add("custom-selected-filter");
     changeDispayedTasks();
     event.stopPropagation();
 });

 sharedFilter.addEventListener('click', event =>{
     currentFilter? currentFilter.classList.toggle("custom-selected-filter") : null;
     currentFilter = sharedFilter;
     currentMainName = "Shared Tasks";
     displayedTasks = [];

     for(let task of tasks)
     {  if(!task.privacy)
            displayedTasks.push(task);
     }

     sharedFilter.classList.add("custom-selected-filter");
     changeDispayedTasks();
     event.stopPropagation();
 });



/*
 * Visualizzo i task fitrati nella finestra principale
 */
const changeDispayedTasks = () =>{

    parentUL.textContent = '';
    document.getElementById("mainPageName").firstElementChild.innerText = currentMainName;

    for(let task of displayedTasks)
    {   let tempElement = listElement.cloneNode(true);             //il primo element <li>
        tempElement.setAttribute("id", task.id);
        tempElement.getElementsByTagName("label")[0].innerText = task.description;
        tempElement.getElementsByTagName("label")[0].setAttribute("for", "customCheck"+task.id);

        tempElement.getElementsByTagName("span")[0].innerText = task.project;

        if(task.important)
            tempElement.getElementsByTagName("input")[0].classList.add("important-task");

        tempElement.getElementsByTagName("input")[0].setAttribute("id", "customCheck"+task.id);
        
        tempElement.getElementsByClassName("custom-data")[0].innerText = task.deadline.toDateString();

        if(task.privacy)
            tempElement.getElementsByClassName("custom-shared")[0].remove();

        if(currentMainName == "All" && task.expired)
            tempElement.getElementsByClassName("custom-data")[0].classList.toggle("costom-expired-data");

        parentUL.appendChild(tempElement);
    }
}

/**
 * Inizializzo la pagina iniziale
 */
changeDispayedTasks();





