const fs = require("fs");
const path = require("path");

const taskFilePath = path.join( "./.data/tasks.json");

function loadTasks() {
    if (!fs.existsSync(taskFilePath)) {
        console.warn("no task found");
        return [];
    }
    const data = fs.readFileSync(taskFilePath, "utf-8");
    const taskList = JSON.parse(data);
    console.log(`Loaded ${taskList.length} tasks`);
    return taskList;
}


function saveTasks(taskList) {
    if (!Array.isArray(taskList)) {
        throw new Error("taskList must be an array");
    }
    console.log(`saving ${taskList.length} tasks...`);
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
    console.log(`Added: ${taskTitle}`)
}

function viewTasks() {
    const taskList = loadTasks();;
    console.log("========================*========================");
    console.log(taskList);
    console.log("========================*========================");
}

function deleteTasks(id) {
    const taskList = loadTasks();
    console.warn(`Deleting task with ID ${id}`)
    saveTasks(taskList.filter((task) => task.id !== parseInt(id)));
}

module.exports = {
    loadTasks,
    addTask,   
    viewTasks,
    deleteTasks,
}