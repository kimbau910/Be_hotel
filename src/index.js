// import express from "express";
// import { engine } from "express-handlebars";

const express = require("express");
const handlebars = require("express-handlebars");
const { default: mongoose } = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");

app.get("/tintuc", (req, res) => {
  res.send(`<h1>Hello World!</h1>`);
});

app.use(bodyParser.json());
routes(app);
mongoose
  .connect(
    `mongodb+srv://nguyenkimbau2k2:Nguyenkhobau2k2@cluster0.it33sjf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log("Connect success");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
