const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const upload = multer({ dest: 'uploads/' });

app.post('/api/chat', (req, res) => {
 const { message } = req.body;
 // Logika AI sini
 const response = `AI response to: ${message}`;
 res.json({ response });
});

app.post('/api/upload', upload.single('file'), (req, res) => {
 const file = req.file;
 // Logika untuk menganalisis file sini
 res.json({ message: 'File uploaded successfully' });
});

app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});
