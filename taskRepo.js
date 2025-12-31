const taskFilePath = path.join(__dirname, "tasks.josn");

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


function saveTask(taskList) {
    fs.writeFileSync(taskFilePath, JSON.stringify(taskList));
}

module.exports = {
    loadTasks,
    saveTasks,   
}