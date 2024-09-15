const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
const cors = require("cors");
const router = require("./routes/Routes");
require("dotenv").config();

const { PORT, MONGO_PATH, MONGO_USER, MONGO_PASSWORD } = process.env;

const app = express();

const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`;
const clientOptions = {
  serverApi: {
    version: "1",
    strict: true,
    deprecationErrors: true,
    useNEWUrlParser: true,
    useUnifiedTopology: true,
  },
};
mongoose
  .connect(uri, clientOptions)
  .then((result) => app.listen(PORT))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(morgan("dev"));
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/drawings", router);
