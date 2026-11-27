const express = require("express");
const { classifyEmail } = require("./classify");
const { classify } = require("./ai");

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "agent" });
});

app.post("/classify", async (req, res) => {
  const { subject, body } = req.body;

  if (typeof subject !== "string" || typeof body !== "string") {
    return res.status(400).json({ error: "subject and body must be text" });
  }

  res.json(await classify({ subject, body }));
});

module.exports = app;