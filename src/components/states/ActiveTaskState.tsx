import './State.css';
import stickyNote from '../../assets/themes/notes/standard/orange.png';
import { Task } from '../tasksProp.js';
import { ObjectId } from 'mongodb';
import { useEffect, useState } from 'react';
import TaskInput from '../inputs/TaskInput.js';
import Overlay from '../Overlay.js';
import Incompleted from './actions/Incompleted.js';
import InProgress from './actions/InProgress.js';
import Completed from './actions/Completed.js';

interface ActiveTaskProps {
    currentTask: Task | null;
    setOverlay: React.Dispatch<React.SetStateAction<boolean>>;
    apiCall: string;
}

function ActiveTaskState({ currentTask, setOverlay, apiCall }: ActiveTaskProps) {
    const [activateEle, setActivateEle] = useState<"update" | null>(null);
    const [objectId, setObjectId] = useState<ObjectId | null>(null);
    const [title, setTitle] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
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
                {apiCall === "?completed=false" && <Incompleted taskId={currentTask!._id} setActivateEle={setActivateEle} />}
                {apiCall === "?in_progress=true" && <InProgress taskId={currentTask!._id} setActivateEle={setActivateEle} />}
                {apiCall === "?completed=true" && <Completed taskId={currentTask!._id} />}
            </div>
            {activateEle === 'update' && <TaskInput mode="Update" objectId={objectId} titleInput={title} descInput={desc} />}
        </>
    )
}

export default ActiveTaskState