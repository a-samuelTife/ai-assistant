const express = require("express");
const { listEmails, getEmail } = require("./inbox");

const app = express();

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "connector" });
});

app.get("/emails", (req, res) => {
  res.json(listEmails());
});

app.get("/emails/:id", (req, res) => {
  const email = getEmail(req.params.id);
  if (!email) {
    return res.status(404).json({ error: "Email not found" });
  }
  res.json(email);
});

module.exports = app;