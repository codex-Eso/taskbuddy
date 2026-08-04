import './App.css';
import EmptyState from './components/states/EmptyState';
import { useState, useEffect, useRef } from 'react';
import { api } from "../routes/axiosApi";
import LoadingState from './components/states/LoadingState';
import React from 'react';
import { Task } from './components/tasksProp';
import TaskState from './components/states/TaskState';
import ActiveTaskState from './components/states/ActiveTaskState';
import Buttons from './components/Buttons';

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const hasRun = useRef<Boolean>(false);
    const [isEmpty, setIsEmpty] = useState<Boolean | undefined>(undefined);
    const [activeTask, setActiveTask] = useState<Task | false>(false);
    const [loading, setLoading] = useState<Boolean>(true);
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
                            return <TaskState key={task._id} taskDetails={task} containerRef={containerRef} onSelect={() => setActiveTask(task)} />
                        })}
                    </div>
                    {activeTask && <ActiveTaskState activeTask={activeTask} setActiveTask={setActiveTask} />}
                    <Buttons />
                </>}
        </>
    )
}

export default App