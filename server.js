// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// --- ✅ CORS CONFIGURATION ---
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      // Allow from whitelisted origins
      if (allowedOrigins.includes(origin)) return callback(null, true);

      console.warn("Blocked CORS request from:", origin);
      return callback(
        new Error("CORS policy does not allow access from this origin."),
        false
      );
    },
    credentials: true,
  })
);

// --- ✅ MongoDB Connection ---
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Atlas Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// --- ✅ Routes ---
app.use("/api/auth", require("./routes/auth"));
app.use("/api/departments", require("./routes/departments"));
app.use("/api/appointments", require("./routes/appointments"));

// --- ✅ Feedback Route ---
const Feedback = require("./models/Feedback");
app.post("/api/feedback", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const feedback = await Feedback.create({ name, email, message });
    res.json({ success: true, data: feedback });
  } catch (err) {
    console.error("Feedback Error:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to save feedback." });
  }
});

// --- ✅ Health Check Route ---
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "HealthLink API is running smoothly" });
});

// --- ✅ Deployment Config ---
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () =>
    console.log(`🚀 Server running locally on port ${PORT}`)
  );
} else {
  // Export app for Vercel or serverless hosting
  module.exports = app;
}
