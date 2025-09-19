const express = require("express");
const { exec } = require("child_process");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.json());


const CHATBOT_PASSWORD = "Pratyaybera124";


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


app.post("/chat", (req, res) => {
  const userMessage = req.body.message;

  
  exec(`python chatbot.py "${CHATBOT_PASSWORD}" "${userMessage}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error: ${error.message}`);
      return res.status(500).send("Chatbot error");
    }
    if (stderr) {
      console.error(`⚠️ Stderr: ${stderr}`);
    }

    
    res.json({ reply: stdout.trim() });
  });
});


app.listen(3000, () => {
  console.log("✅ Node app running at http://localhost:3000");
});



