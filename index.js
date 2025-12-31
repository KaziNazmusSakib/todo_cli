const fs = require("fs");
const path = require("path");

 
let taskList = [];
 

loadTasks();

console.log("Running TODO CLi app");

const command = process.argv[2];
const value = process.argv[3];

 

if (command === "add") {
    addTask(value);
}

function addTask(taskTitle) {
    if (!taskTitle){
        throw new Error("No task title is provided.");
    }

    const newTask = {
        id:crypto.randomUUID(),
        title: taskTitle,
        date: new Date(),
    };
    taskList.push(newTask);
    saveTask();
    console.log(`Added: ${taskTitle}`)
}


 
console.log('Current tasks', taskList);