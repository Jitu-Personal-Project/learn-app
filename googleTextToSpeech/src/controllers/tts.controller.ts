import { Request, Response, NextFunction } from "express";
import { synthesizeSpeech } from "../services/tts.service";

export const generateSpeech = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    const audioBuffer = await synthesizeSpeech(text);
    res.set({ "Content-Type": "audio/mpeg" });
    res.send(audioBuffer);
  } catch (err) {
    next(err);
  }
};
