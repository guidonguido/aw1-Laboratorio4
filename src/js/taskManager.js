'use strict';

class TaskManager{
    allTasks = [];
    today = null;
    

    constructor()
    {   this.today = new Date();
        this.allTasks.push(new Task("Descrizione del Task", "Esercizio1A", false, true, 
                            new Date(this.today.getFullYear(),this.today.getMonth(),this.today.getDate()+1), "Guido"));
        this.allTasks.push(new Task("Descrizione del Task", "Esercizio1B", true, false, 
                            new Date(this.today.getFullYear(),this.today.getMonth(),this.today.getDate()+3)));
        this.allTasks.push(new Task("Descrizione del Task", "Esercizio1c", false, true, 
                            new Date(this.today.getFullYear(),this.today.getMonth(),this.today.getDate()), "Petre"));
        this.allTasks.push(new Task("Descrizione del Task", "Esercizio1D", true, true, 
                            new Date(this.today.getFullYear(),this.today.getMonth(),this.today.getDate()+2)));
    }

    addTask = (task) => {
        if(Object.getPrototypeOf(task) === Object.getPrototypeOf(new Task()))
        {   console.log(task) 
            this.allTasks.push(task);
        }
    }

    get allTasks() {
        return [...allTasks];
    }

    get importantTasks() {
        return this.allTasks.filter(task => task.important);
    }

    get todayTasks() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return this.allTasks.filter(task =>{
            task.deadline.setHours(0, 0, 0, 0);
            return task.deadline.getTime() === today.getTime();
        })
    }

    get next7Tasks() {
        const nextWeek = new Date();
        nextWeek.setHours(0,0,0);
        nextWeek.setDate(nextWeek.getDate() + 7);

        return this.allTasks.filter(task =>{
            task.deadline.setHours(0, 0, 0, 0);
            return task.deadline.getTime() <= nextWeek.getTime();
        })
    }

    get privateTasks() {
        return this.allTasks.filter(task => task.private);      
    }

    get sharedTasks() {
        return this.allTasks.filter(task => !task.private);
    }

}