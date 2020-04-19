"use strict";


class Task {
    static uid = 0;
    sharedList = [];

    constructor(description, project, important, private_t, deadline, sharedWith = null) {
        this.description = description + " " + Task.uid;
        this.project = project;
        this.important = important;
        this.private = private_t;
        this.deadline = moment(deadline);
        this.deadline.startOf("day");
        this.expired = false;

        this.id = Task.uid;
        Task.uid++;


        this.sharedWith = sharedWith;
        this.sharedList.push(sharedWith);
        console.log(this)

        if (!Number.isNaN(this.deadline.valueOf())) {
            const timeOut = this.deadline.valueOf() - moment().startOf("day");
            setTimeout(() => {
                console.log("Il task con scadenza " + this.deadline.format("dddd, MMMM Do YYYY") + "è scaduto");
                this.expired = true;
            }, timeOut > 2147483647 ? 2147483646 : timeOut);
        }
    }

    addParticipant = (participant) => {
        this.sharedList.push(participant);
    }
}