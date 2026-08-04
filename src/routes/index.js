/**
 * @file Aggregator semua route. `app.js` cukup import file ini.
 */

const express = require("express");
const authRoutes = require("./auth.routes");
const { sendSuccess } = require("../utils/ApiResponse");

const router = express.Router();

/** @route GET /api/health */
router.get("/health", (req, res) => {
  return sendSuccess(res, 200, "Service is healthy", {
    uptime: process.uptime(),
  });
});

router.use("/auth", authRoutes);

// TODO: mount route lain di sini, misal: router.use('/users', userRoutes);

module.exports = router;
