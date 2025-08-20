const express=require("express");
const morgan=require("morgan");
const dotenv=require("dotenv")

/* const UsersTab = require("./models/ratingModel");
(async () => {
    await UsersTab();
})();  */
dotenv.config();
const authRoutes = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const storeRoute = require('./routes/storeRoute');
const ratingRoute = require('./routes/ratingRoute');


const app=express();
const mysqlPool=require("../backend/config/db")


app.use(express.json())
app.use(morgan("dev")); // to see information

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/store", storeRoute);
app.use("/api/v1/rate", ratingRoute); 



app.get("/", (req, res) => {
    res.send("<h1>Welcome to e-commerces app</h1>");
});

app.listen(3030,()=>{
    console.log("Server is started");
})