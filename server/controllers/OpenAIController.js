// const axios = require("axios");
// const { OpenAI } = require("openai");
// const openai = new OpenAI({
//   apiKey: process.env.OPEN_AI_KEY,
// });

// module.exports = class OpenAIController {
//   static async generatePromt(req, res, next) {
//     try {
//       const { preferences } = req.body;
//       const { data } = await axios.get("https://api.thecatapi.com/v1/breeds", {
//         headers: {
//           common: {
//             "x-api-key": process.env.CAT_API_KEY,
//           },
//         },
//       });
//       const prompt = `My website is called "Cat Adoption App", where users are able to adopt cat based on the user preferences on the cat's breed temperament. Choose at least 1 and max 5 cat breeds that match the most with this data: ${data}. And the user preferences are ${preferences}. Please response with array of objects and include name,temperament, description, and reference_image_id`;

//       const result = await openai.chat.completions.create({
//         messages: [{ role: "user", content: prompt }],
//         model: "gpt-3.5-turbo",
//       });

//       let response = result.choices[0].message.content;
//       response = JSON.parse(response);

//       res.status(200).json(response);
//     } catch (err) {
//       next(err);
//     }
//   }
// };
