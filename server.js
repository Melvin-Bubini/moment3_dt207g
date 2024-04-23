const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// connect to mongodb
mongoose.connect("mongodb://127.0.0.1:27017/cv").then(() => {
    console.log("Connected to mongodb");
}).catch((error) => {
    console.log("Error connecting to database: " + error);
})

// job schema 
const jobSchema = new mongoose.Schema({
    companyname: {
        type: String, 
        required: true,
    },
    jobtitle: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    }
});

const job = mongoose.model("Job", jobSchema);


// routes
app.get("/api", (req, res) => {
    res.json({message: "Welcome to my api"});
});

app.get("/jobs", async (req, res) => {
    try {
        let result = await job.find({});

        return res.json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
});

app.post("/jobs", async (req, res) => {
    try {
        let result = await job.create(req.body);

        res.json(result);
    } catch (error) {
        return res.status(400).json(error);
    }
});

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});