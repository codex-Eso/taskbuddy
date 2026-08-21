import { ObjectId } from "mongodb";

export interface Task {
    _id: ObjectId;
    title: string;
    description: string;
    completed: boolean;
    in_progress: boolean;
    completedAt?: Date;
}