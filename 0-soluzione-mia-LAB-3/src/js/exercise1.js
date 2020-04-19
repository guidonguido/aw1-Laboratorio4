'use strict';

let uid=0;
const tasks = [];

function Task(description, project, urgent, privacy, deadline)
{   this.description = description;
    this.project = project;
    this.id = uid;
    uid++;
    this.important = urgent;
    this.privacy = privacy;     //"private/shared” properties are flags
    this.deadline = deadline;
    if(!Number.isNaN(deadline.getTime()))
    {   const timeOut = this.deadline.getTime() - new Date().getTime();
        setTimeout(() =>{
            tasks.splice(tasks.indexOf(this),1);
            console.log("Il task con scadenza " +deadline.toDateString() +"è stato rimosso"); 
        }, timeOut > 2147483647 ? 2147483646 : timeOut);
    }
}

/* C
 * Creo e popolo un array di task
 */
const today = new Date();
//const prototype = new Task("Descrizione del Task", "Esercizio1", true, true, today.setDate(today.getDate() + this.id));
for(let i=0; i<10; i++)
{
    //tasks.push(new Task("Descrizione del Task" +uid, "Esercizio1", true, true, new Date(today.setDate(today.getDate() + this.id))));
    tasks.push(new Task("Descrizione del Task" +uid, "Esercizio1", true, true, new Date(today.getFullYear(),today.getMonth(),today.getDate()+1)));
}


/*
 * Inserisco i task nella pagina HTML
 */
let parentUL = document.getElementById("taskList");       //il tag <ol>
const listElement = parentUL.firstElementChild;             //il primo element <li>

let displayedTasks=[...allTask];

for(let task of displayedTasks)
{   let tempElement = listElement.cloneNode(true);             //il primo element <li>
    tempElement.setAttribute("id", task.id);
    tempElement.getElementsByTagName("label")[0].innerText = task.description;
    tempElement.getElementsByTagName("span")[0].innerText = task.project;
    tempElement.getElementsByClassName("custom-data")[0].innerText = task.deadline;
    parentUL.appendChild(tempElement);
}





