const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const connectDB = require("./src/config/db");
const exportRoutes = require("./src/routes/exportRoutes");
const authRoutes = require("./src/routes/authRoutes");
const studentRoutes = require("./src/routes/studentRoutes");
const companyRoutes = require("./src/routes/companyRoutes");
const driveRoutes = require("./src/routes/driveRoutes");
const testReportRoutes = require("./src/routes/testReportRoutes");
const notificationRoutes = require("./src/routes/notificationRoutes");
const scheduleRoutes = require("./src/routes/scheduleRoutes");
const userRoutes = require("./src/routes/userRoutes");

const app = express();

connectDB();
app.use("/api/export", exportRoutes);
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "API working successfully" });
});

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/drives", driveRoutes);
app.use("/api/testreports", testReportRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});