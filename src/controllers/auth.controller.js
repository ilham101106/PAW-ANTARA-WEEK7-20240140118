/**
 * @file Controller untuk Authentication.
 * Menangani request langsung: validasi input dasar, panggil Model,
 * kirim response. Tanpa JWT — login di sini cuma verifikasi kredensial
 * dan mengembalikan data user (cocok untuk API sederhana / dipakai
 * bareng session di kemudian hari kalau perlu).
 */

const User = require("../models/user.model");
const { sendSuccess, sendError } = require("../utils/ApiResponse");

const authController = {
  /**
   * Handle `POST /api/auth/login`.
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  login(req, res) {
    const { email, password } = req.body;

    // Validasi dasar (manual, tanpa library validasi eksternal)
    if (!email || !password) {
      return sendError(res, 400, "Email dan password wajib diisi");
    }

    const user = User.findByEmail(email);

    // Pesan generik sengaja disamakan untuk email tidak ada / password salah,
    // supaya tidak membocorkan info email mana yang terdaftar.
    if (!user) {
      return sendError(res, 401, "Email atau password salah");
    }

    const isPasswordValid = User.comparePassword(password, user.password);
    if (!isPasswordValid) {
      return sendError(res, 401, "Email atau password salah");
    }

    return sendSuccess(res, 200, "Login berhasil", {
      user: User.toSafeObject(user),
    });
  },

  /**
   * Handle `POST /api/auth/register`.
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  register(req, res) {
    const { name, email, password } = req.body;

    // Validasi input dasar
    if (!name || !email || !password || !name.trim() || !email.trim() || !password.trim()) {
      return sendError(res, 400, "Nama, email, dan password wajib diisi");
    }

    // Cek apakah email sudah terdaftar
    const existingUser = User.findByEmail(email.trim());
    if (existingUser) {
      return sendError(res, 400, "Email sudah terdaftar");
    }

    // Buat user baru (password di-hash di dalam User.create)
    const newUser = User.create({
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
    });

    return sendSuccess(res, 201, "Register berhasil", {
      user: User.toSafeObject(newUser),
    });
  },
};

module.exports = authController;
