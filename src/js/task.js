"use strict";


class Task {
    static uid = 0;
    sharedList = [];

    constructor(description, project, important, private_t, deadline, sharedWith = null) {
        this.description = description + " " + Task.uid;
        this.project = project;
        this.important = important;
        this.private = private_t;
        this.deadline = deadline;
        this.expired = false;

        this.id = Task.uid;
        Task.uid++;


        this.sharedWith = sharedWith;
        this.sharedList.push(sharedWith);

        if (!Number.isNaN(deadline.getTime())) {
            const timeOut = this.deadline.getTime() - new Date().getTime();
            setTimeout(() => {
                console.log("Il task con scadenza " + deadline.toDateString() + "è scaduto");
                this.expired = true;
            }, timeOut > 2147483647 ? 2147483646 : timeOut);
        }
    }

    addParticipant = (participant) => {
        this.sharedList.push(participant);
    }
}