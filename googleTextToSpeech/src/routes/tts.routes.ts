import { Router } from "express";
import { generateSpeech } from "../controllers/tts.controller";

const router = Router();

router.post("/speak", generateSpeech);

export default router;
