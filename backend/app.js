const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { OpenAI, OpenAIApi } = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

const openAi = new OpenAI({
  apiKey: "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",
});

app.get("/api/data", async (req, res) => {
  try {
    const response = await openAi.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `This is a test run. What are 3 goals I can work on this year? One for fitness, one for finance, one as a hobby. 
                    Please send them in the format of one sentence ending in a period for each goal. Each goal should begin with 
                    the type followed by "Goal". For example, my fitness goal sentence should be of this structure: Fitness Goal:
                    Improve your 5 km speed.`,
        },
      ],
      max_tokens: 3000,
      temperature: 0.8,
    });

    if (response && response.choices) {
      // Access the completion text
      const completionText = response.choices[0].message.content;
      // .split(
      //   "Here is the updated version:"
      // )[1];
      console.log("completion: \n", completionText);

      res.json({ completionText });
    } else {
      console.error("Response structure is unexpected:", response);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

app.post("/api/breakdown", async (req, res) => {
  var datetime = new Date();
  console.log("date ", datetime);
  const goal = req.body.goal;
  console.log("goal ", req.goal);

  try {
    const response = await openAi.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `I am going to provide you with a goal. Today's date is ${datetime}. I would like this goal achieved by the end of the year.
                    Can you please provide me an actionable plan I can follow consisting of 3-4 actions I can take on a weekly basis to achieve
                    this goal? Please provide the frequency and intensity as well, to make it more clear to me. Here is the goal: ${goal}`,
        },
      ],
      max_tokens: 3000,
      temperature: 0.8,
    });

    if (response && response.choices) {
      // Access the completion text
      const completionText = response.choices[0].message.content;
      // .split(
      //   "Here is the updated version:"
      // )[1];
      console.log("completion: \n", completionText);

      res.json({ completionText });
    } else {
      console.error("Response structure is unexpected:", response);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`server listening on ${port}`));
