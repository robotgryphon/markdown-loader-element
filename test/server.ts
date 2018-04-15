import express from "express";
import { join } from "path";

let app = express();

app.use("/markdown", express.static("./markdown"));
app.use(express.static("./dist"));

app.get("*", (req, res, next) => {
    res.sendFile(join(__dirname, "index.html"));
});

app.listen(8080);