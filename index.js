const btnAdd = document.querySelector(".btn-add");
const sectionAddTask = document.querySelector(".section-add-task");
const formulario = document.querySelector(".form");
const taskInput = document.getElementById("task-input");
const noteInput = document.getElementById("note-input");
const buttonSubmit = document.getElementById("button-submit");
const alertTask = document.querySelector(".alert-task");
const alertNote = document.querySelector(".alert-note");

const containerList = document.querySelector("#container-lista");

let update = false;
let listTask = [];
let dataTask = {
    id: "",
    task: "",
    nota: ""
};

const limpiarAlert=()=>{
    alertTask.style.display = "none"; 
    alertNote.style.display = "none";
}
const showContainerForm =(display)=>{
    sectionAddTask.style.display = `${display}`;
}
const validarForm=(e)=>{
    e.preventDefault();
    if(taskInput.value == "" || noteInput.value == ""){
        if(taskInput.value == "")alertTask.style.display = "block";
        else alertTask.style.display = "none"; 
        if(noteInput.value == "") alertNote.style.display = "block";
        else alertNote.style.display = "none";
    }else if(update){
        limpiarAlert();
        updateTask();
    }else{
        limpiarAlert();
        setDataTask();
    }
}
const updateTask=()=>{
    listTask.map(taskElement =>{
        if(taskElement.id == dataTask.id){
            taskElement.task = taskInput.value;
            taskElement.nota = noteInput.value;
        }
    });
    showListTask();
    showContainerForm("none");
    update = false;
    formulario.reset();
    buttonSubmit.textContent = "Add Task";
}
const setDataTask=()=>{
    dataTask.id = Date.now();
    dataTask.task = taskInput.value;
    dataTask.nota = noteInput.value;

    showContainerForm("none");
    listTask.push({...dataTask});
    showListTask();
    formulario.reset();
}
const showListTask=()=>{
    containerList.innerHTML = ``;
    listTask.forEach(elementTask => {
        const paragrahp = document.createElement("p");
        const hr = document.createElement("hr");
        const containerButton = document.createElement("div");

        const btnUpdate = document.createElement("i");
        const btnDelete = document.createElement("i");
        btnUpdate.classList.add("btn-update","fa-sharp","fa-solid","fa-pen");
        btnDelete.classList.add("btn-delete","fa-sharp","fa-solid","fa-trash");
        btnUpdate.onclick = ()=> showUpdateTask(elementTask);
        btnDelete.onclick = ()=> deleteTask(elementTask.id);

        containerButton.append(btnUpdate);
        containerButton.append(btnDelete);

        paragrahp.textContent = `${elementTask.id} - ${elementTask.task} - ${elementTask.nota}`;
        paragrahp.classList.add("num-task");
        paragrahp.append(containerButton);

        containerList.append(paragrahp);
        containerList.appendChild(hr);
    });
}
const showUpdateTask=(taskToUpdate)=>{
    buttonSubmit.textContent = "Update Task";
    update = true;
    showContainerForm("block");
    taskInput.value = taskToUpdate.task;
    noteInput.value = taskToUpdate.nota;
    dataTask.id = taskToUpdate.id;
}
const deleteTask=(id)=>{
    listTask = listTask.filter(task=> task.id != id);
    showListTask();
}

btnAdd.onclick =()=> showContainerForm("block");
formulario.addEventListener("submit",validarForm);