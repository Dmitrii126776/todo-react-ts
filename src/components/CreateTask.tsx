import React, {useEffect, useRef, useState} from 'react';
import {ITodo} from "../types/types";
// @ts-ignore
import {v4 as uuidv4} from 'uuid';

interface CreateTaskProps {
    addTask: (task: ITodo) => void;
}

const CreateTask: React.FC<CreateTaskProps> = (props) => {
    const {addTask} = props;

    const [inputValue, setInputValue] = useState<string>('')
    const inputRef = useRef<HTMLInputElement>(null)

    const createTask = () => {
        if (inputValue) {
            const newTask: ITodo = {
                id: uuidv4(),
                name: inputValue,
                done: false,
                trash: false,
            }
            addTask(newTask)
            setInputValue('')
        }
    }

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setInputValue(e.target.value)
    }
    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter')
            createTask()
    }
    useEffect(() => {
        if (inputRef.current)
            inputRef.current.focus()
    }, [])
    return (
        <div className="d-flex flex-row col-md-5">
            <input type="text" placeholder="new task..."
                   onChange={handleChange} onKeyDown={handleKeyDown}
                   value={inputValue} ref={inputRef}
                   className="form-control m-1"/>
            <button type="button" className="btn btn-outline-primary m-1"
                    disabled={inputValue === ''} onClick={createTask}
            >AddTask
            </button>
        </div>
    );
};

export default CreateTask;
