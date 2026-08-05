import path from "path";
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import taskRoutes from "./routes/tasks.js";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(express.static(path.join(__dirname, ".")));
const port = process.env.PORT || 4000;

const client = new MongoClient(process.env.MONGO_URI!);

async function main() {
    try {
        await client.connect();
        const db = client.db("taskbuddy");

        app.use('/tasks', taskRoutes(db));

        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    } catch (err) {
        console.error("MongoDB connection failed:", err);
    }
}

main();