import './State.css';
import stickyNote from '../../assets/themes/notes/standard/orange.png';
import Delete from '../../assets/icons/delete.png';
import Complete from '../../assets/icons/complete.png';
import Update from '../../assets/icons/update.png';
import { Task } from '../tasksProp.js';
import { ObjectId } from 'mongodb';
import { api } from '../../../routes/axiosApi.js';
import { useEffect, useState } from 'react';
import TaskInput from '../inputs/TaskInput.js';
import Overlay from '../Overlay.js';

interface ActiveTaskProps {
    currentTask: Task | null;
    setOverlay: React.Dispatch<React.SetStateAction<boolean>>;
}

function ActiveTaskState({ currentTask, setOverlay }: ActiveTaskProps) {
    const [activateEle, setActivateEle] = useState<"update" | null>(null);
    const [objectId, setObjectId] = useState<ObjectId | null>(null);
    const [title, setTitle] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
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
        setObjectId(currentTask!._id);
        setTitle(currentTask!.title);
        setDesc(currentTask!.description);
    }, [])
    return (
        <>
            <Overlay setOverlay={setOverlay} activateEle={setActivateEle} />
            <div id='currentTask'>
                <div id='taskDetails'>
                    <img src={stickyNote} height={280} width={280} />
                    <div id='detailsText'>
                        <h2>{currentTask!.title}</h2>
                        <p>{currentTask!.description}</p>
                    </div>
                </div>
                <div id='actionPngs'>
                    <img className='png' src={Delete} title='Delete Task' onClick={() => deleteTask(currentTask!._id)} />
                    <img className='png' src={Complete} title='Mark As Completed' onClick={() => taskCompleted(currentTask!._id)} />
                    <img className='png' src={Update} title='Update Task' onClick={() => setActivateEle('update')} />
                </div>
            </div>
            {activateEle === 'update' && <TaskInput mode="Update" objectId={objectId} titleInput={title} descInput={desc} />}
        </>
    )
}

export default ActiveTaskState