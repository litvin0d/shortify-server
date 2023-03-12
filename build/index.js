import express from "express";
import dotenv from "dotenv";
import { summarizeText } from "./summarize.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.post("/gpt", async (req, res) => {
    summarizeText(req.body.text).then((result) => {
        res.status(200).json({ result });
    }).catch((e) => {
        res.sendStatus(500);
        console.error(e.response.data);
    });
});
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}. Process pid: ${process.pid}`);
});
//# sourceMappingURL=index.js.map