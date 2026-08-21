import { ObjectId } from "mongodb";

export interface ActionProps {
    taskId: ObjectId;
    setActivateEle?: React.Dispatch<React.SetStateAction<"update" | null>>;
}