import './App.css';
import EmptyState from './components/states/EmptyState.js';
import { useState, useEffect, useRef } from 'react';
import { api } from "../routes/axiosApi.js";
import LoadingState from './components/states/LoadingState.js';
import { Task } from './components/tasksProp.js';
import TaskState from './components/states/TaskState.js';
import ActiveTaskState from './components/states/ActiveTaskState.js';
import Buttons from './components/Buttons.js';
import { Analytics } from "@vercel/analytics/react";
import ErrorState from './components/states/ErrorState.js';
import Dropdown from './components/Dropdown.js';

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isEmpty, setIsEmpty] = useState<boolean | undefined>(undefined);
    const [currentTask, setCurrentTask] = useState<Task | null>(null);
    const [overlay, setOverlay] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [apiCall, setApiCall] = useState<string>("?completed=false");
    useEffect(() => {
        const taskOnload = async () => {
            try {
                const res = await api.get(`/tasks${apiCall}?ts=${Date.now()}`);
                setTasks(res.data);
                if (res.data.length != 0) {
                    setIsEmpty(false);
                } else {
                    setIsEmpty(true);
                }
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        taskOnload();
    }, [apiCall]);
    return (
        <>
            <Analytics />
            {loading && <LoadingState />}
            {error && <ErrorState />}
            {(!loading && !error) &&
                <>
                    <Dropdown open={open} setOpen={setOpen} setApiCall={setApiCall} />
                    <div id='taskContainer' ref={containerRef}>
                        {isEmpty == true && <EmptyState />}
                        {isEmpty == false && tasks.map((task) => {
                            return <TaskState key={task._id.toString()} taskDetails={task} containerRef={containerRef} onSelect={() => { setCurrentTask(task); setOverlay(true); }} />
                        })}
                    </div>
                    {overlay && <ActiveTaskState currentTask={currentTask} setOverlay={setOverlay} apiCall={apiCall} />}
                    {apiCall === "?completed=true" && <span id='completedNote'>Note: All completed tasks stored will be deleted after 3 days</span>}
                    <Buttons />
                </>}
        </>
    )
}

export default App