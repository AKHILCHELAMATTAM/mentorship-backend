require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const llmRoutes = require("./routes/llmRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/students", studentRoutes);
app.use("/lessons", lessonRoutes);
app.use("/bookings", bookingRoutes);
app.use("/sessions", sessionRoutes);
app.use("/llm", llmRoutes);

app.listen(process.env.PORT, () =>
  console.log("Server running on " + process.env.PORT)
);
