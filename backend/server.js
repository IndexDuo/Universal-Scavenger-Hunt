require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());

// Use the correct MongoDB URI from the .env file
const mongoURI = process.env.MONGO_URI || "your-mongodb-connection-string-here";
console.log("Mongo URI:", mongoURI);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(mongoURI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
    tls: true,
    family: 4, // Use IPv4, skip trying IPv6
});

// Connect to MongoDB
async function connectToMongoDB() {
    try {
        await client.connect(); // Connect to MongoDB
        await client.db("admin").command({ ping: 1 }); // Ping the database
        console.log(
            "Pinged your deployment. Successfully connected to MongoDB!"
        );
    } catch (err) {
        console.error("MongoDB connection error: ", err);
    }
}

// Run the MongoDB connection
connectToMongoDB();

// REST API Endpoints
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Sample Endpoint: Fetch all recaps (example use case)
app.get("/recap/all", async (req, res) => {
    try {
        const database = client.db("recap"); // Use your database name
        const recaps = await database.collection("recaps").find({}).toArray(); // Access the "recaps" collection
        res.json(recaps);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Define Port and Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);
