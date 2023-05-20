import React from 'react';
import {ITodo} from "../types/types";

interface ITodoListProps {
    items: ITodo[];

    setTasks: React.Dispatch<React.SetStateAction<ITodo[]>>;

    moveToTrashOrBack: (id: string) => void;
    editTask: (id: string, name: string) => void;
}

const TodoList: React.FC<ITodoListProps> = (props) => {
    const {items, moveToTrashOrBack, setTasks, editTask} = props

    const doneTask = (id: string) => {
        setTasks(items.map(el => el.id === id ? {...el, done: !el.done} : el))
    }
    return (
        <div>
            <h2>Tasks List</h2>
            <div>
                {items.filter(el => !el.trash).map(el => (
                    <div key={el.id}
                         className="d-flex flex-md-row-reverse mx-5">
                        <div className="form-control m-1">
                            {el.done ? <s>{el.name}</s> : el.name}
                        </div>
                        <button onClick={() => editTask(el.id, el.name)}
                                type="button" className="btn btn-outline-success m-1">Edit
                        </button>
                        <button type="button" className="btn btn-outline-primary m-1"
                                onClick={() => doneTask(el.id)}>Done
                        </button>
                        <button type="button" className="btn btn-outline-danger m-1"
                                onClick={() => moveToTrashOrBack(el.id)}>Trash
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TodoList;
