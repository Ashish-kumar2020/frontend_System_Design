const express = require("express");
const app = express();

let data = "Our initial data here";

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/getData", (req, res) => {
    res.send({ data });
});

app.get("/updatedData", (req, res) => {
    data = "Updated Data";
    res.send({ data });
});

app.listen(5000, () => {
    console.log("App running on port 5000");
});