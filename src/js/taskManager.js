'use strict';

class TaskManager{
    allTasks = [];
    today = null;
    

    constructor()
    {   this.allTasks.push(new Task("Descrizione del Task", "Esercizio1A", false, true, 
                                            moment().add(1, 'days'), "Guido"));
        this.allTasks.push(new Task("Descrizione del Task", "Esercizio1B", true, false, 
                                            moment().add(3, 'days')));
        this.allTasks.push(new Task("Descrizione del Task", "Esercizio1c", false, true, 
                                            moment(), "Petre"));
        this.allTasks.push(new Task("Descrizione del Task", "Esercizio1D", true, true, 
                                            moment().add(2, 'days')));
    }

    addTask = (task) => {
        if(Object.getPrototypeOf(task) === Object.getPrototypeOf(new Task()))
        {   this.allTasks.push(task);
        }
    }

    get couplesProjectQuantity() {
        const count = {};
        this.allTasks.map(task => task.project).forEach(function(i) { count[i] = (count[i]||0) + 1;});
        return count;
    }
    
    get allTasks() {
        return [...allTasks];
    }

    get importantTasks() {
        return this.allTasks.filter(task => task.important);
    }

    get todayTasks() {
        return this.allTasks.filter(task =>{
            return task.deadline.valueOf() === moment().startOf("day").valueOf();
        })
    }

    get next7Tasks() {
        const nextWeek = moment().startOf('day').add(7, 'days');

        return this.allTasks.filter(task =>{
            return task.deadline.valueOf() <= nextWeek.valueOf();
        })
    }

    get privateTasks() {
        return this.allTasks.filter(task => task.private);      
    }

    get sharedTasks() {
        return this.allTasks.filter(task => !task.private);
    }

}