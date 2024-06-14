const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes");
// const cors = require('cors');
const bodyParser = require("body-parser");
// const cookieParser = require('cookie-parser')

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// app.use(cors())
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(bodyParser.json());
// app.use(cookieParser())

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
