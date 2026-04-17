const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const OpenAI = require("openai");



const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message) {
      return res.json({ reply: "اكتب سؤال الأول" });
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
أنت مدرس فيزياء مصري للثانوية العامة.
اشرح بطريقة بسيطة + خطوات + أمثلة.
          `
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    const reply = response.choices[0].message.content;

    res.json({ reply });

  } catch (error) {
    console.log("ERROR:", error.message); // 👈 مهم جدًا
    res.json({
      reply: "حصل خطأ في السيرفر: " + error.message
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});