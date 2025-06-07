import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ttsRoutes from "./routes/tts.routes";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", ttsRoutes);
app.use(errorHandler);

export default app;
