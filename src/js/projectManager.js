'use strict'

class ProjectManager{
    coupleProjectQuantity = null;
    taskManager = null;

    constructor(taskManager)
    {   this.taskManager = taskManager;
        this.coupleProjectQuantity = this.taskManager.couplesProjectQuantity;
        this.changeDisplayedProjects();
    }

    newTaskAdded = () =>
    {   this.coupleProjectQuantity = this.taskManager.couplesProjectQuantity;
        this.changeDisplayedProjects();
    }

    changeDisplayedProjects = () =>
    {   const parentUL = document.getElementById("projectList");
        const listElement = parentUL.firstElementChild.cloneNode(true);  
        parentUL.textContent = '';
        console.log(this.coupleProjectQuantity)
        for(let key of Object.keys(this.coupleProjectQuantity))
        {   let tempElement = listElement.cloneNode(true);
            tempElement.setAttribute('id',"project" +key);
            let tempNumber = tempElement.firstElementChild.cloneNode(true);
            tempElement.innerText = key;
            tempNumber.innerText = this.coupleProjectQuantity[key];
            tempElement.appendChild(tempNumber);
            parentUL.appendChild(tempElement);
        }

    }
}