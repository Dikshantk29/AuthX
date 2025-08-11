import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import userRoutes from "./routes/user.route.js";
import currentUserRoutes from "./routes/currentUser.route.js";


const app = express();
const port = process.env.PORT || 4000;
//database connection
connectDB();
const allowOrigins = ["http://localhost:5173"];

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ 
  credentials: true,
  origin: allowOrigins
}));

//api endpoints
app.get("/", (req, res) => {res.send("Welcome to the Authentication App!");});
app.use("/api/auth", userRoutes);
app.use("/api/current-user",  currentUserRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
