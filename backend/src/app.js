import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config(); 
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
