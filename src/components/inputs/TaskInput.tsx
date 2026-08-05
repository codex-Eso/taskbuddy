import { useState } from 'react';
import Overlay from '../Overlay.js';
import './Inputs.css';
import { api } from '../../../routes/axiosApi.js';
import { ObjectId } from 'mongodb';

interface TaskInputProps {
    setOverlay?: React.Dispatch<React.SetStateAction<boolean>>;
    setActivateBtn?: React.Dispatch<React.SetStateAction<"theme" | "settings" | "add" | null>>;
    mode: 'Add' | 'Update';
    objectId?: ObjectId | null;
    titleInput?: string;
    descInput?: string;
}

function TaskInput({ setOverlay, setActivateBtn, mode, objectId, titleInput, descInput }: TaskInputProps) {
    const [title, setTitle] = useState<string>(titleInput ?? "");
    const [desc, setDesc] = useState<string>(descInput ?? "");
    const inputTask = () => {
        if (title.trim() === "" || desc.trim() === "") {
            alert("Title & Description cannot be empty!");
        } else {
            if (mode === 'Add') {
                createTask({ title: title, description: desc });
            } else if (mode === 'Update') {
                updateTask({ title: title, description: desc });
            }
        }
    };
    const createTask = async (newTask: { title: string; description: string; }) => {
        try {
            const res = await api.post(`/tasks`, { ...newTask, completed: false });
            alert(res.data.message);
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert("Something went wrong, please refresh.");
        }
    }
    const updateTask = async (updatedTask: { title: string; description: string; }) => {
        try {
            const res = await api.patch(`/tasks/${objectId}`, { ...updatedTask });
            alert(res.data.message);
            if (res.data.message != "No task modified!") window.location.reload();
        } catch (err) {
            console.error(err);
            alert("Something went wrong, please refresh.");
        }
    }
    return (
        <>
            {mode === "Add" && <Overlay setOverlay={setOverlay!} setActivateBtn={setActivateBtn!} />}
            <div className='formContainer'>
                <div className='formField'>
                    <label htmlFor="titleInput">Title:</label>
                    <input type="text" id="titleInput" placeholder="Title..." value={title} onChange={(e) => { setTitle(e.target.value) }} onKeyDown={(e) => { if (e.key === "Enter") inputTask(); }} />
                    <label htmlFor="descInput">Description:</label>
                    <input type="text" id="descInput" placeholder="Description..." value={desc} onChange={(e) => { setDesc(e.target.value) }} onKeyDown={(e) => { if (e.key === "Enter") inputTask(); }} />
                    <button onClick={inputTask}>
                        {mode === "Add" && <span>Add</span>}
                        {mode === "Update" && <span>Update</span>}
                    </button>
                </div>
            </div>
        </>
    )
}

export default TaskInput