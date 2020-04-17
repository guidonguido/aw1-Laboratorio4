'use strict';

class App {
    tasks = [];
    taskManager = null;
    filter = null;

    constructor()
    {   this.taskManager = new TaskManager();
        this.filter = new Filter(this.taskManager);

        this.filter.changeDisplayedTasks();
    }


    
}