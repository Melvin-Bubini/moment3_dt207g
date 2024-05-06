const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3001;

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
    res.json({ message: "Welcome to my api" });
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
    let companyname = req.body.companyname;
    let jobtitle = req.body.jobtitle;
    let location = req.body.location;

    try {
        if (!companyname || !jobtitle || !location) {
            throw new Error("companyname, jobtitle, or location not included");
        }

        let newJob = new job({
            companyname: companyname,
            jobtitle: jobtitle,
            location: location
        });

        let result = await newJob.save();

        res.json(result);
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
});

// delete job
app.delete("/jobs/:id", async (req, res) => {
    let id = req.params.id;

    try {
        let result = await job.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No job found" });
        }

        return res.json({ message: "Job deleted with id: " + id });
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong: " + error });
    }
});

// Update job
app.put("/jobs/:id", async (req, res) => {
    const id = req.params.id;
    const updates = req.body;

    try {
        const updatedJob = await job.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedJob) {
            return res.status(404).json({ message: "Job not found" });
        }

        return res.json(updatedJob);
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong: " + error });
    }
});

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});