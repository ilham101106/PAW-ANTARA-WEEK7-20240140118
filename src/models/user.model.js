/**
 * @file Model untuk resource `User`.
 * Di pola MVC, Model bertugas urusan data: query ke database dan
 * operasi terkait data (di sini termasuk verifikasi password).
 */

const bcrypt = require("bcryptjs");
const db = require("../config/database");

const User = {
  /**
   * Cari user berdasarkan email.
   *
   * @param {string} email
   * @returns {Object|undefined} Row user, atau undefined kalau tidak ketemu.
   */
  findByEmail(email) {
    return db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  },

  /**
   * Cari user berdasarkan ID.
   *
   * @param {number} id
   * @returns {Object|undefined}
   */
  findById(id) {
    return db.prepare("SELECT * FROM users WHERE id = ?").get(id);
  },

  /**
   * Buat user baru. Dipakai oleh seeder.
   * Untuk fitur register publik nanti, tinggal panggil method ini
   * dari controller baru (lihat TODO di `auth.controller.js`).
   *
   * @param {Object} payload
   * @param {string} payload.name
   * @param {string} payload.email
   * @param {string} payload.password - Password polos (akan di-hash di sini).
   * @returns {Object} User yang baru dibuat.
   */
  create({ name, email, password }) {
    const hashed = bcrypt.hashSync(password, 10);
    const result = db
      .prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)")
      .run(name, email, hashed);
    return this.findById(result.lastInsertRowid);
  },

  /**
   * Cocokkan password polos dengan hash yang tersimpan.
   *
   * @param {string} plainPassword
   * @param {string} hashedPassword
   * @returns {boolean}
   */
  comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  },

  /**
   * Hilangkan field password sebelum data dikirim ke client.
   *
   * @param {Object} user
   * @returns {Object} User tanpa field password.
   */
  toSafeObject(user) {
    const { password, ...safeUser } = user;
    return safeUser;
  },
};

module.exports = User;
