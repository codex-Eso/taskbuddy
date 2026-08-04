import './State.css';
import stickyNote from '../../assets/themes/notes/standard/orange.png';
import Delete from '../../assets/icons/delete.png';
import Complete from '../../assets/icons/complete.png';
import Update from '../../assets/icons/update.png';
import { Task } from '../tasksProp';
import { ObjectId } from 'mongodb';
import { api } from '../../../routes/axiosApi';
import Overlay from '../Overlay';
import { useEffect, useState } from 'react';
import TaskInput from '../inputs/TaskInput.js';

interface ActiveTaskProps {
    activeTask: Task;
    setActiveTask: React.Dispatch<React.SetStateAction<boolean>>;
}

function ActiveTaskState({ activeTask, setActiveTask }: ActiveTaskProps) {
    const [active, setActive] = useState<"update" | false>(false);
    const [objectId, setObjectId] = useState<ObjectId | null>(null);
    const [title, setTitle] = useState<String>("");
    const [desc, setDesc] = useState<String>("");
    const deleteTask = async (id: ObjectId) => {
        try {
            const res = await api.delete(`/tasks/${id}`);
            alert(res.data.message);
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert("Something went wrong, please refresh.");
        }
    };
    const taskCompleted = async (id: ObjectId) => {
        try {
            const res = await api.patch(`/tasks/${id}`, { "completed": true });
            alert(res.data.message);
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert("Something went wrong, please refresh.");
        }
    };
    useEffect(() => {
        setObjectId(activeTask._id);
        setTitle(activeTask.title);
        setDesc(activeTask.description);
    }, [])
    return (
        <>
            <Overlay setOverlay={setActiveTask} />
            <div id='activeTask'>
                <div id='taskDetails'>
                    <img src={stickyNote} height={280} width={280} />
                    <div id='detailsText'>
                        <h2>{activeTask.title}</h2>
                        <p>{activeTask.description}</p>
                    </div>
                </div>
                <div id='actionPngs'>
                    <img className='png' src={Delete} title='Delete Task' onClick={() => deleteTask(activeTask._id)} />
                    <img className='png' src={Complete} title='Mark As Completed' onClick={() => taskCompleted(activeTask._id)} />
                    <img className='png' src={Update} title='Update Task' onClick={() => setActive('update')} />
                </div>
            </div>
            {active === 'update' && <TaskInput setActive={setActive} mode="Update" objectId={objectId} titleInput={title} descInput={desc} />}
        </>
    )
}

export default ActiveTaskState