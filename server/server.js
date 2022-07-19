const express = require("express");
const cors = require("cors");
const { model } = require("mongoose");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");

const authRoute = require("./route/Auth.routes");
const  productsRouter = require('./route/product.route');
const app = express();

//midleware
app.use(cors());
app.use(express.json());
//port 
const port = process.env.PORT || 5000

// route
//http://localhost:5000/api/auth*
app.use("/api/auth", authRoute);
//http://localhost:5000/product
app.use('/product', productsRouter);


app.listen(port, () => {
    console.log(`server is renning on ${port}...`);
})