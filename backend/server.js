// server.js
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/universalScavengerHunt', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const souvenirSchema = new mongoose.Schema({
    title: String,
    uri: String,
    id: { type: String, default: uuidv4 },
});

const Souvenir = mongoose.model('Souvenir', souvenirSchema);

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage });

// Endpoint to upload a photo
app.post('/upload', upload.single('photo'), async (req, res) => {
    try {
        const { huntTitle } = req.body;
        const photoUri = `http://localhost:3000/uploads/${req.file.filename}`;
        const souvenir = new Souvenir({ title: huntTitle, uri: photoUri });
        await souvenir.save();
        res.json({ success: true, photoUri });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to fetch all souvenirs
app.get('/souvenirs', async (req, res) => {
    try {
        const souvenirs = await Souvenir.find();
        res.json(souvenirs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to share the collection
app.post('/share', async (req, res) => {
    try {
        const { ids } = req.body;
        const collectionId = uuidv4();
        const collectionUrl = `https://universalscavengerhunt.co/souvenirs/${collectionId}`;
        res.json({ collectionUrl });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});