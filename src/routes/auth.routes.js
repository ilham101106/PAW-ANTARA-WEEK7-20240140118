/**
 * @file Route untuk Authentication. Di-mount di `routes/index.js` sebagai `/api/auth`.
 */

const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

/**
 * @route POST /api/auth/login
 * @description Login pakai email & password, balikin data user (tanpa token).
 * @access Public
 * @body {string} email
 * @body {string} password
 */
router.post("/login", authController.login);

/**
 * @route POST /api/auth/register
 * @description Register user baru, simpan ke database, dan balikin data user (tanpa password).
 * @access Public
 * @body {string} name
 * @body {string} email
 * @body {string} password
 */
router.post("/register", authController.register);

module.exports = router;
