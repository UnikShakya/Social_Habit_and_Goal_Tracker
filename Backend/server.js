const dotenv = require("dotenv");
dotenv.config();

const express = require('express');
const cors = require("cors");
const UserRouter = require('./User/UserRoute')
const GoalRouter = require("./Goal/GoalRoute");
const db = require('./db');
// const bcrypt = require("bcrypt");


const app = express();
db();

app.use(cors()); // Allow all origins
app.use(express.json());

app.use('/api/user', UserRouter); 
app.use("/api/goals", GoalRouter);


app.get("/", (req, res) => {
    res.send("API Working");
});

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server running in http://localhost:${PORT}`)
})