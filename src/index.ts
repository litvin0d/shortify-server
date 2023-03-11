import express from "express";
import dotenv from "dotenv";
import { summarizeText } from "./summarized.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.post("/gpt", async (req, res) => {
    summarizeText(req.body.text).then((result) => {
        res.status(200).json({result});
    }).catch((e) => {
        res.sendStatus(500);
        console.error(e.response.data);
    })
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});


