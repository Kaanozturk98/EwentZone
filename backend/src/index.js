// Loading ENV Variables with dotenv
require("dotenv").config();
const express = require("express");
const morganBody = require("morgan-body");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

// Loading Express
const app = express();

// Import Routes
const workshops = require("./routes/workshops");

app.use(cors());
app.use(helmet());
app.use(express.json());

if (!process.env.DEVELOPMENT) morganBody(app, { noColors: true });

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Health Check" });
});

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://kaanozturk:kaan1998@development.ytdje.mongodb.net/EwentZone?retryWrites=true&w=majority"
  );

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });

  // Use routes
  app.use("/workshops", workshops);
}
