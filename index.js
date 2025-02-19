require('dotenv').config();


const express = require('express');
const upload = require('./uploadMiddleware');
const { uploadToMinIO } = require('./uploadService');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: '*', 
}));
app.post('/upload', upload.single('file'), async (req, res) => {
    
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
     
    const imageUrl = await uploadToMinIO(req.file);
    res.json({ imageUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(4000, () => console.log('Server running on port 4000'));
