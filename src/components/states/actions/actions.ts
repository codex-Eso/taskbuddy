import { ObjectId } from "mongodb";
import { api } from "../../../../routes/axiosApi.js";

export const deleteTask = async (id: ObjectId) => {
    try {
        const res = await api.delete(`/tasks/${id}`);
        alert(res.data.message);
        window.location.reload();
    } catch (err) {
        console.error(err);
        alert("Something went wrong, please refresh.");
    }
};

export const updateTask = async (id: ObjectId, toUpdateAs: string) => {
    try {
        let res;
        if (toUpdateAs === 'in_progress') {
            res = await api.patch(`/tasks/${id}`, { "in_progress": true });
        } else if (toUpdateAs === 'completed') {
            res = await api.patch(`/tasks/${id}`, { "in_progress": false, "completed": true, "completedAt": new Date() });
        }
        alert(res!.data.message);
        window.location.reload();
    } catch (err) {
        console.error(err);
        alert("Something went wrong, please refresh.");
    }
};

export const undoTask = async (id: ObjectId) => {
    try {
        const res = await api.patch(`/tasks/${id}?undo=true`, { "in_progress": false, "completed": false });
        alert(res.data.message);
        window.location.reload();
    } catch (err) {
        console.error(err);
        alert("Something went wrong, please refresh.");
    }
}