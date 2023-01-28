const express = require("express");
const app = express();
const dotenv = require("dotenv")//not required
const mongoose = require("mongoose")
const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
/*
"scripts": {
    "start": "nodemon index.js"
  }
*/


mongoose.set('strictQuery', true)
//node --trace-deprecation

dotenv.config();
app.use(express.json())

mongoose.connect(process.env.MONGO_URL, {//Don't change this to the next line because of the indentation. mongoose.[dt etr here]connect
    useNewUrlParser: true,
    useUnifiedTopology: true,

})
.then(console.log("Connect to MongoDB"))
.catch((err) => console.log(err));


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.listen("5000", () => {
    console.log("Backend is running.")
})
