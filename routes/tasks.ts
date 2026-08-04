import express from "express";
import { ObjectId, Db } from "mongodb";
import { z } from "zod";

const TaskSchema = z.object({
    title: z.string(),
    description: z.string(),
    completed: z.boolean()
});

type TaskType = z.infer<typeof TaskSchema>;

const router = express.Router();

export default function taskRoutes(db: Db) {
    const tasks = db.collection<TaskType>("tasks");

    router.get("/", async (req, res) => {
        try {
            const filter: any = {};
            if (req.query.completed) {
                filter.completed = req.query.completed == "true";
            }
            const docs: TaskType[] = await tasks.find(filter).toArray();
            res.json(docs);
        } catch (err) {
            res.status(500).send("Error fetching tasks");
        }
    });

    router.post("/", async (req, res) => {
        try {
            const parseResult = TaskSchema.safeParse(req.body);
            if (!parseResult.success) {
                return res.status(400).json(parseResult.error.issues);
            }
            const newTask: TaskType = parseResult.data;
            const result = await tasks.insertOne(newTask);
            res.json({ message: "Task Added!" });
        } catch (err) {
            res.status(500).send("Error creating task");
        }
    });

    router.patch("/:id", async (req, res) => {
        try {
            const parseResult = TaskSchema.partial().safeParse(req.body);
            if (!parseResult.success) {
                return res.status(400).json(parseResult.error.issues);
            }
            const updatedTask: Partial<TaskType> = parseResult.data;
            const result = await tasks.updateOne(
                { _id: new ObjectId(req.params.id) },
                { $set: updatedTask }
            );
            if (result.modifiedCount == 0) return res.json({ "message": "No task modified!" });
            res.json({ message: "Task Updated!" });
        } catch (err) {
            res.status(500).send("Error updating task");
        }
    });

    router.delete("/:id", async (req, res) => {
        try {
            const result = await tasks.deleteOne({ _id: new ObjectId(req.params.id) });
            if (result.deletedCount == 0) {
                return res.send("No task deleted!");
            }
            res.json({ message: "Task Deleted!" });
        } catch (err) {
            res.status(500).send("Error deleting task");
        }
    });

    return router;
}