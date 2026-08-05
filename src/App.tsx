import './App.css';
import EmptyState from './components/states/EmptyState.js';
import { useState, useEffect, useRef } from 'react';
import { api } from "../routes/axiosApi.js";
import LoadingState from './components/states/LoadingState.js';
import { Task } from './components/tasksProp.js';
import TaskState from './components/states/TaskState.js';
import ActiveTaskState from './components/states/ActiveTaskState.js';
import Buttons from './components/Buttons.js';

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const hasRun = useRef<boolean>(false);
    const [isEmpty, setIsEmpty] = useState<boolean | undefined>(undefined);
    const [currentTask, setCurrentTask] = useState<Task | null>(null);
    const [overlay, setOverlay] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const taskOnload = async () => {
            try {
                const res = await api.get("/tasks?completed=false");
                setTasks(res.data);
                if (res.data.length != 0) {
                    setIsEmpty(false);
                } else {
                    setIsEmpty(true);
                }
            } catch (err) {
                console.error(err);
                alert("Something went wrong, please refresh.");
            } finally {
                setLoading(false);
            }
        }
        if (!hasRun.current) {
            taskOnload();
            hasRun.current = true;
        }
    }, []);
    return (
        <>
            {loading && <LoadingState />}
            {!loading &&
                <>
                    <div id='taskContainer' ref={containerRef}>
                        {isEmpty == true && <EmptyState />}
                        {isEmpty == false && tasks.map((task) => {
                            return <TaskState key={task._id.toString()} taskDetails={task} containerRef={containerRef} onSelect={() => { setCurrentTask(task); setOverlay(true); }} />
                        })}
                    </div>
                    {overlay && <ActiveTaskState currentTask={currentTask} setOverlay={setOverlay} />}
                    <Buttons />
                </>}
        </>
    )
}

export default App