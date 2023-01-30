const express = require("express");
const app = express();
const dotenv = require("dotenv") //not required
const mongoose = require("mongoose")
const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const postRoute = require("./routes/posts")
const categoryRoute = require("./routes/categories")
const multer = require("multer");
const {
    db
} = require("./models/User");

/*
"scripts": {
    "start": "nodemon index.js"
  }
*/


mongoose.set('strictQuery', true)
//node --trace-deprecation

dotenv.config();
app.use(express.json())

mongoose.connect(process.env.MONGO_URL, { //Don't change this to the next line because of the indentation. mongoose.[dt etr here]connect
        useNewUrlParser: true,
        useUnifiedTopology: true,

    })
    .then(console.log("Connect to MongoDB"))
    .catch((err) => console.log(err));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename: (req, file, cb) => {
        cb(null, "hello.jpeg")
    }
})

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded")
})

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen("5000", () => {
    console.log("Backend is running.")
})