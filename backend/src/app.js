import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";  
import cookieParser from "cookie-parser";

dotenv.config(); 
const app = express();

app.use(express.json());

app.use(cookieParser());


app.use(
  cors({
    origin: true, 
    credentials: true,
  })
);


app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
