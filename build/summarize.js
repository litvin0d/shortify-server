import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const apiKey = process.env.OPENAI_API_KEY;
function splitString(str) {
    const MAX_LENGTH = 512;
    const words = str.split(" ");
    let result = [];
    if (str.length <= MAX_LENGTH) {
        return [str];
    }
    let currentLine = words[0];
    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const newLine = `${currentLine} ${word}`;
        if (newLine.length > MAX_LENGTH) {
            result.push(currentLine);
            currentLine = word;
        }
        else {
            currentLine = newLine;
        }
    }
    if (currentLine.length > 0) {
        result.push(currentLine);
    }
    return result;
}
async function gpt(text) {
    const response = await axios.post("https://api.openai.com/v1/engines/text-davinci-003/completions", {
        prompt: `Сократи этот текст: "${text}"`,
        max_tokens: 512,
        temperature: 0.3,
    }, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
        },
    });
    return response.data.choices[0].text.trim();
}
export async function summarizeText(text) {
    const chunks = splitString(text);
    let result = await gpt(chunks[0]);
    for (let i = 1; i < chunks.length; i++) {
        let next = chunks[i];
        result += ` ${next}`;
        result = await gpt(result);
    }
    return result;
}
//# sourceMappingURL=summarize.js.map