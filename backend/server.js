const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config(); 

const app = express();
const port = 5000;


app.use(cors());
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


app.post('/generate', async (req, res) => {
    const { prompt } = req.body;
    try {
        const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent([prompt]);
        let responseText = result.response.text();
        
        responseText = responseText.replace(/## (.*)/g, '<h2>$1</h2>');
        responseText = responseText.replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>');
        responseText = responseText.replace(/\* (.*)/g, '<li>$1</li>');

        res.json({ response: responseText });
    } catch (error) {
        console.error('Error interacting with Google Gemini API:', error);
        res.status(500).json({ error: 'Failed to generate content from AI' });
    }
    });

    
    app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
