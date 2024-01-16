const express = require("express");
const userRouter = require("./routes/userRoute");
const noteRouter = require("./routes/noteRoute");
const { Pool } = require("pg");
const bodyParser = require("body-parser");
const { Sequelize } = require("sequelize");
const userModel = require("./model/userModel");
const { sequelize } = require("./config/database");


const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use("/user",userRouter);
app.use("/notes",noteRouter);


sequelize.sync().then(()=>{
    console.log("Synced DB");
}).catch(err =>{
    console.log("Error in syncing")
})


app.get("/test",(req,res)=>{
    res.send("API Working!");
});


app.listen(port,()=>{
    console.log(`server started on port ${port}`);
});