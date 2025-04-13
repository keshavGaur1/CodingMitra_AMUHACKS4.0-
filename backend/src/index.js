// require('dotenv').config()
import dotenv from "dotenv";
import connectDb from "./db/indexDB.js";
import express from "express";

import app from "./app.js"
dotenv.config()

connectDb()
  .then(() => {
    app.on("error", (err) => {
      console.log("Error : ", err)
    })
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server is running on port ${process.env.PORT}`)
    })
  })
  .catch((err) => {
    console.log(err)
  })


