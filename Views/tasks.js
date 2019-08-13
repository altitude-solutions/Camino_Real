// ===============================================
// Imports
// ===============================================

// ===============================================
// Localstorage as local database
// ===============================================
exports.taskList = JSON.parse(localStorage.getItem('tasks')) || [];


// ===============================================
// Create a new Client
// ===============================================
exports.addNewTask = (task) => {
    this.taskList.push(task);
    localStorage.setItem('tasks', JSON.stringify(this.taskList));
};

// ===============================================
// Get uncompleted tasks
// ===============================================
exports.getTaskstoDo = () => {
    // let todo = this.taskList.filter(task => {
    //     return task.entregado === false;
    // });
    // return todo;
    return this.taskList;
};

// ===============================================
// Mark some task as complete
// ===============================================
exports.markAsDone = (index) => {
    this.taskList[index].entregado = true;
    localStorage.setItem('tasks', JSON.stringify(this.taskList));
};