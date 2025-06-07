import textToSpeech from "@google-cloud/text-to-speech";

const client = new textToSpeech.TextToSpeechClient();

export const synthesizeSpeech = async (text: string): Promise<Buffer> => {
  const request = {
    input: { text },
    voice: { languageCode: "en-US", name: "en-US-Wavenet-D" },
    audioConfig: { audioEncoding: "MP3" },
  };

  const [response] = await client.synthesizeSpeech(request);
  return response.audioContent as Buffer;
};
