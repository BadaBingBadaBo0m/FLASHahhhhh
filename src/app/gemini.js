const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export async function runGemini(subject, count) {
  const prompt = `You are generating Flash cards for studying ${subject}. Please generate me a set of ${count} flash cards about ${subject}. Please write a short description (no more than 100 characters) about the deck. Format the JSON as such: {"Cards": [{"question": "", "answer": ""}], "Description": ""}`
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
    ],
  });

  const result = await chatSession.sendMessage(prompt);
  return JSON.parse(result.response.text())
}

export async function randomDeck() {
  const prompt = `You are generating Flash cards for studying. Please generate me a set of 5 flash unique cards about a random subject. Different subjects every time. Do not do General Knowledge. Be Specific. Format the JSON as such: {"Cards": [{"question": "", "answer": ""}], "Subject": ""}`
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
    ],
  });

  const result = await chatSession.sendMessage(prompt);
  return JSON.parse(result.response.text())
}
