'use strict';

class App {
  tasks = [];
  taskManager = null;
  filter = null;

  constructor() {
    this.taskManager = new TaskManager();
    this.filter = new Filter(this.taskManager);
    /*
     * Configurazione del Form new Task
     */
    this.privateCheckbox = document.getElementById("checkboxesSettings-1");
    this.sharedInputForm = document.getElementById("sharedInputForm");
    this.privateCheckbox.addEventListener('click', event => {
      this.privateCheckbox.checked ? this.sharedInputForm.setAttribute("disabled", "true") 
                                    : this.sharedInputForm.removeAttribute("disabled", "false");
    })
    //At LOAD
    window.addEventListener('load', () => {

      //Set shared with enabled|disabled
      this.privateCheckbox.checked ? this.sharedInputForm.setAttribute("disabled", "true") 
                                    : this.sharedInputForm.removeAttribute("disabled", "false");

      const minDeadline = new Date();
      document.getElementById("deadlineInput").min = minDeadline.toISOString().split("T")[0];

      const maxDeadline = new Date();
      maxDeadline.setMonth(maxDeadline.getMonth() + 12);
      document.getElementById("deadlineInput").max = maxDeadline.toISOString().split("T")[0];


      this.filter.changeDisplayedTasks();
    }, false);

    //NEW TASK FORM SUBMIT
    const form = document.getElementById("newTaskForm");
    addEventListener('submit', event => {
      console.log(event.target.elements[6].valueAsDate)
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');

      this.taskManager.addTask(new Task(event.target.elements[1].value, 
                                        event.target.elements[2].value,
                                        event.target.elements[3].checked,
                                        event.target.elements[4].checked,
                                        event.target.elements[6].valueAsDate,
                                        event.target.elements[5].value))
    }, false);
  }



}