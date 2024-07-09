const OpenAI = require("openai");

const openai = new OpenAI();

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a job matcher who receives a user data and a job list, and then matches the best jobs to the users based on some preferences.",
      },
    ],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

module.exports = main;
