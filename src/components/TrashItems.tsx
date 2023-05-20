import React, {FC} from 'react';
import {ITodo} from "../types/types";

interface ITrashItemsProps {
    tasks: ITodo[];
    moveToTrashOrBack: (id: string) => void;

    setTasks: React.Dispatch<React.SetStateAction<ITodo[]>>

}

const TrashItems: FC<ITrashItemsProps> = (props) => {
    const {tasks, moveToTrashOrBack, setTasks} = props

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(el => el.id !== id))
    }

    return (
        <div>
            <h2>Trash List</h2>
            <div>
                {tasks.filter(el => el.trash).map(el =>
                    (<div key={el.id} className="d-flex flex-md-row mx-5">
                    <span className="form-control m-1">
                    {el.done ? <s>{el.name}</s> : el.name}
                    </span>
                        <button type="button" className="btn btn-outline-success m-1" onClick={() => moveToTrashOrBack(el.id)}>Restore</button>
                        <button type="button" className="btn btn-outline-danger m-1" onClick={() => deleteTask(el.id)}>Delete</button>
                    </div>))}
            </div>
        </div>
    );
};

export default TrashItems;
