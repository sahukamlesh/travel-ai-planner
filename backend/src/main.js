import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import express from "express";
import OpenAI from "openai";
const app = express();
app.use(express.json());
app.use(cors());

const openAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const port = process.env.PORT || 5000;

app.post("/ask", async (req, res) => {
  const prompt = req.body.prompt;
  try {
    if (prompt == null) {
      throw new Error("Uh oh, no prompt was provided");
    }
    const response = await openAI.completions.create({
      model: "text-davinci-003",
      temperature: 0,
      max_tokens: 4000,
      prompt,
    });
    const completion = response.choices;
    return res.status(200).json({
      success: true,
      message: completion,
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}!!`));
