import axios from "axios";
import dotenv from "dotenv";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

const charTextSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 512,
    chunkOverlap: 1,
});

export async function summarizeText(text: string): Promise<string> {
    const chunks = await charTextSplitter.splitText(text);

    let summarizedChunks = [];
    let i = 0;
    for (const chunk of chunks) {
        const response = await axios.post("https://api.openai.com/v1/engines/text-davinci-003/completions", {
            prompt: "Максимально сократи текст без сильной потери смыла: " + chunk,
            max_tokens: 512,
            temperature: 0.3,
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
        });

        summarizedChunks.push(response.data.choices[0].text.trim());
        console.log(`${i++}. Chunk summarized...`);
    }

    return summarizedChunks.join(" ");
}
