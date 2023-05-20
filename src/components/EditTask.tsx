import React, {useState} from 'react';
import {ITodo} from "../types/types";

interface EditTaskProps {
    cancelEdit: () => void;
    editTaskName: string;

    editTaskId: string;

    tasks: ITodo[];
    setTasks: React.Dispatch<React.SetStateAction<ITodo[]>>;

}

const EditTask: React.FC<EditTaskProps> = (props) => {
    const {cancelEdit, editTaskName, tasks, setTasks, editTaskId} = props
    const [inputValue, setInputValue] = useState(editTaskName)
    const saveEdit = () => {
        setTasks(tasks.map(el => el.id === editTaskId ? {...el, name: inputValue} : el))
        cancelEdit()
    }
    return (
        <div>
            <h2>Edit your task</h2>
            <div className="d-flex flex-md-row-reverse mx-5">
                <input className="form-control m-1" value={inputValue} onChange={e => setInputValue(e.target.value)}/>
                <button type="button" className="btn btn-outline-success m-1" onClick={saveEdit}>Save</button>
                <button type="button" className="btn btn-outline-danger m-1" onClick={cancelEdit}>Cancel</button>
            </div>
        </div>
    );
};

export default EditTask;
