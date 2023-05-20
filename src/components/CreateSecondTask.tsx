import React, {useState} from 'react';
import {ITodo} from '../types/types';
// @ts-ignore
import {v4 as uuidv4} from 'uuid';

interface CreateTaskProps {
    tasks: ITodo[];
    setTasks: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

const CreateSecondTask: React.FC<CreateTaskProps> = ({tasks, setTasks}) => {
    const [inputValue, setInputValue] = useState('');

    const createTask = () => {
        if (inputValue) {
            const newTask: ITodo = {
                id: uuidv4(),
                name: inputValue,
                done: false,
                trash: false,
            };
            setTasks([...tasks, newTask]);
            setInputValue('');
        }
    };
    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter')
            createTask()
    }
    return (
        <div className="d-flex flex-row col-md-5">
            <input type="text" placeholder="another task..."
                   onChange={e => setInputValue(e.target.value)}
                   value={inputValue} onKeyDown={handleKeyDown}
                   className="form-control m-1"/>
            <button type="button" className="btn btn-outline-primary m-1"
                    disabled={inputValue === ''} onClick={createTask}
            >AddTask
            </button>
        </div>
    );
};

export default CreateSecondTask;
