// index.js
const express = require("express");
const { exec } = require("child_process");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.json());

// Replace with your actual password
const CHATBOT_PASSWORD = "Pratyaybera124";

// Serve the HTML frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Route to send a message to chatbot
app.post("/chat", (req, res) => {
  const userMessage = req.body.message;

  // Run chatbot.py with password + message
  exec(`python chatbot.py "${CHATBOT_PASSWORD}" "${userMessage}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error: ${error.message}`);
      return res.status(500).send("Chatbot error");
    }
    if (stderr) {
      console.error(`⚠️ Stderr: ${stderr}`);
    }

    // Send Python reply back to client
    res.json({ reply: stdout.trim() });
  });
});

// Start Node.js server
app.listen(3000, () => {
  console.log("✅ Node app running at http://localhost:3000");
});



