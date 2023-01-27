const express = require("express");
const dbConnect = require("./config/dbconnect");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;
dbConnect();

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
});