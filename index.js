require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require('./route/router')

const connection_string = process.env.CONNECTION_STRING;

const server = express();


server.use(cors({origin: "*"}));
server.use(express.json());
server.use(router)

PORT = 3000 || process.env.PORT;

server.listen(PORT,'0.0.0.0',() => {
  mongoose
    .connect(connection_string)
    .then(() => {
      console.log("Database connected to server");
      console.log(`Server is running in port:${PORT}`);
    })
    .catch((err) => {
      console.log("Database connection failed, Server down");
    });
});
