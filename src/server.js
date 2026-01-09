import express from "express";
import { config } from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";

// Import Routes
import movieRoutes from "./routes/moviewRoutes.js";

config();
connectDB();

const app = express();
const PORT = 5001;

// API Routes
app.use("/movies", movieRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

//
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception", err);
  await disconnectDB();
  process.exit(1);
});

// Gracefully Shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});

// GET, POST, PUT, DELETE
// http://localhost:5001

// AUTH - Signin, Signup
// Get Movies
// Users - Profiles
// Watchlist
