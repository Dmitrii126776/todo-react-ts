import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
// @ts-ignore
import {v4 as uuidv4} from 'uuid';
import {ITodo} from "./types/types";
import TodoList from "./components/TodoList";
import TrashItems from "./components/TrashItems";
import CreateTask from "./components/CreateTask";
import CreateSecondTask from "./components/CreateSecondTask";
import EditTask from "./components/EditTask";
import todolist from "./images/todolist.jpg";

const initialList = [
    {id: uuidv4(), name: 'Learn React', done: false, trash: false},
]

function App() {
    const [tasks, setTasks] = useState<ITodo[]>([])
    const [editTaskId, setEditTaskId] = useState<null | string>(null)
    const [editTaskName, setEditTaskName] = useState<string>('')

    const editTask = (id: string, name: string) => {
        setEditTaskName(name)
        setEditTaskId(id)
    }
    const cancelEdit = () => {
        setEditTaskId(null)
    }
    const addTask = (task: ITodo) => {
        setTasks([...tasks, task])
    }

    const moveToTrashOrBack = (id: string) => {
        setTasks(tasks.map(el => el.id === id ? {...el, trash: !el.trash} : el))
    }

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');

        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        } else {
            setTasks(initialList);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    return (
        <div className="app-container" style={{backgroundImage: `url(${todolist})`}}>
            <div>
                <h1>What would you like to do today?</h1>
                <div className="d-flex flex-row justify-content-around row">
                    <CreateTask addTask={addTask}/>
                    <CreateSecondTask tasks={tasks} setTasks={setTasks}/>
                </div>
            </div>
            <TodoList items={tasks} moveToTrashOrBack={moveToTrashOrBack} setTasks={setTasks} editTask={editTask}/>
            {editTaskId && <EditTask
                cancelEdit={cancelEdit} tasks={tasks} editTaskId={editTaskId}
                setTasks={setTasks} editTaskName={editTaskName}/>}
            <TrashItems tasks={tasks} moveToTrashOrBack={moveToTrashOrBack} setTasks={setTasks}/>
        </div>
    );
}

export default App;
