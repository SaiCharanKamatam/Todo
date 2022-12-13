import React, { useState } from "react";
import "./../styles/Todo.css";

const Todo = () => {
    const [task, setTask] = useState("")
    const [taskList, setTaskList] = useState([])
    const [id,updateId] = useState(0)
    const [edit,updateEdit] = useState(false)
    const [eDitedTask,updateEditTasked] = useState(1)
    const [del,updateDel] = useState(false)
    const handlerAdd = () => {
        updateId((prev)=> prev + 1)
        setTaskList([...taskList,{id:id,task:task}])
        setTask("")
    }
    const DeleteTask =(event)=>{
       let taskId = event.target.parentElement.parentElement.id
        taskList.splice(taskId,1)
        for(let i=taskList.length-1;i>=taskId;i--){
            taskList[i].id = taskList[i].id -1
        }
        setTaskList([...taskList])
        if(taskList.length==0){
            updateId(0)
        }
    }
    const EditTask=(event)=>{
        let taskId = event.target.parentElement.parentElement.id
        updateEditTasked(taskId)
        // console.log(taskList[taskId].task);
        setTask(taskList[taskId].task)
        updateEdit(true)
        updateDel(true)
    }
    const SaveEdit=()=>{
        taskList[eDitedTask].task = task
        updateEdit(false)
        setTask("")
        updateDel(false)
    }
    return (
        <div id="todo-container">
            <h1 id="header">To-Do List</h1>
            <div id="task-contaainer">
                <textarea id="task" placeholder="Enter Here" value={task} onChange={(event) => { setTask(event.target.value) }}></textarea>
                <button id="btn" disabled={task?false  || edit:true} onClick={ handlerAdd }>Add To-Do</button>
                {(task && edit)&&<button id="save-btn"  onClick={SaveEdit}>Save</button>}
            </div>
            <div >
                
                {
                    taskList.length ? taskList.map((task)=> 
                    {
                        return (
                        <div className="taskElements" id={task.id} key={task.id} >
                            <div className="task-item">{task.task} </div> 
                            <div >
                            <button className="delete-btn" disabled={del} onClick={DeleteTask}>X</button>
                            <button className="edit-btn" onClick={EditTask} >Edit</button>
                            </div>
                        </div>
                        )
                    }
                    ) :null
                }
                
            </div>

        </div>
    )
}

export default Todo