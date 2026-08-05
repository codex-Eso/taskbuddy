import './State.css';
import stickyNote from '../../assets/themes/notes/standard/orange.png';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Task } from '../tasksProp.js';

interface TaskStateProps {
    taskDetails: Task;
    containerRef: React.RefObject<HTMLDivElement | null>;
    onSelect: () => void;
}

function TaskState({ taskDetails, containerRef, onSelect }: TaskStateProps) {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const taskRef = useRef<HTMLDivElement | null>(null);
    const reposition = () => {
        if (taskRef.current && containerRef.current) {
            const container = containerRef.current.getBoundingClientRect();
            const taskEle = taskRef.current.getBoundingClientRect();
            const x = Math.floor(Math.random() * (container.width - taskEle.width));
            const y = Math.floor(Math.random() * (container.height - taskEle.height));
            taskRef.current.style.position = "absolute";
            taskRef.current.style.left = `${x}px`;
            taskRef.current.style.top = `${y}px`;
            // console.log(container.height, container.width, taskEle.height, taskEle.width, taskRef.current.style.left, taskRef.current.style.top);
            //will implement a fixed random positioning soon :))
        }
    }
    useEffect(() => {
        reposition();
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        }
        window.addEventListener("resize", handleResize);
    }, [])
    useLayoutEffect(() => {
        reposition();
    }, [isMobile]);
    return (
        <div id='taskState' title={taskDetails.title} ref={taskRef} onClick={onSelect}>
            <img src={stickyNote} height={180} width={180} />
            <h2>{taskDetails.title}</h2>
        </div>
    )
}

export default TaskState