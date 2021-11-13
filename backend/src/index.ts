// Loading ENV Variables with dotenv
require("dotenv").config();
import express, { Request, Response } from "express";
import morganBody from "morgan-body";
import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose";

// Loading Express
const app = express();

// Import Routes
const workshops = require("./routes/workshops");

app.use(cors());
app.use(helmet());
app.use(express.json());

if (!process.env.DEVELOPMENT) morganBody(app, { noColors: true });

app.get("/", (req: Request, res: Response) => {
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
