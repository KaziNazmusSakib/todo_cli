const {  addTask, viewTasks, deleteTasks } = require("./taskRepo");
const logger = require("./logger");

logger.info("Running TODO CLi app");

const command = process.argv[2];
const value = process.argv[3];

 

if (command === "add") {
    addTask(value);
} else if (command === 'view') {
    viewTasks();
}else if (command === 'delete') {
    deleteTasks(value);
}

 
