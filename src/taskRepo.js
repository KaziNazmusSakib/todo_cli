const fs = require("fs");
const path = require("path");

const taskFilePath = path.join( "./.data/tasks.json");
const logger = require("./logger");


function loadTasks() {
    if (!fs.existsSync(taskFilePath)) {
        logger.warn("no task found");
        return [];
    }
    const data = fs.readFileSync(taskFilePath, "utf-8");
    const taskList = JSON.parse(data);
    logger.info(`Loaded ${taskList.length} tasks`);
    return taskList;
}


function saveTasks(taskList) {
    if (!Array.isArray(taskList)) {
        throw new Error("taskList must be an array");
    }
    logger.info(`saving ${taskList.length} tasks...`);
    fs.writeFileSync(taskFilePath, JSON.stringify(taskList));
}


function generateNextId(taskList) {
    const maxId = Math.max(...taskList.map((task) => task.id), 0);
    return maxId + 1;
}

function addTask(taskTitle) {
    if (!taskTitle){
        throw new Error("No task title is provided.");
    }
    
    const taskList = loadTasks();
     
    const newTask = {
        id : generateNextId(taskList),
        title: taskTitle,
        date: new Date(),
    };
    taskList.push(newTask);
    saveTasks(taskList);
    logger.info(`Added: ${taskTitle}`)
}

function viewTasks() {
    const taskList = loadTasks();;
    logger.info("========================*========================");
    logger.info(taskList.map((task) => `[${task.date}]ID: ${task.id}: ${task.title}`).join('\n')) ;
    logger.info("========================*========================");
}

function deleteTasks(id) {
    const taskList = loadTasks();
    logger.warn(`Deleting task with ID ${id}`)
    saveTasks(taskList.filter((task) => task.id !== parseInt(id)));
}

module.exports = {
    loadTasks,
    addTask,   
    viewTasks,
    deleteTasks,
}