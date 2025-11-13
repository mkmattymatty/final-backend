const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

// --- CORS ---
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// --- MongoDB Connection ---
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Atlas Connected Successfully");

    // --- Routes ---
    app.use("/api/auth", require("./routes/auth"));
    app.use("/api/departments", require("./routes/departments"));
    app.use("/api/appointments", require("./routes/appointments"));

    // --- Feedback ---
    const Feedback = require("./models/Feedback");
    app.post("/api/feedback", async (req, res) => {
      const { name, email, message } = req.body;
      try {
        const feedback = await Feedback.create({ name, email, message });
        res.json({ success: true, data: feedback });
      } catch (err) {
        console.error("Feedback Error:", err);
        res.status(500).json({ success: false, message: "Failed to save feedback." });
      }
    });

    // --- Health check ---
    app.get("/api/health", (req, res) => {
      res.json({ status: "OK", message: "HealthLink API is running smoothly" });
    });

    // --- Start server ---
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  }
};

startServer();
