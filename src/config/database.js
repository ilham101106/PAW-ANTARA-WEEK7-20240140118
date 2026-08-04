/**
 * @file Koneksi & inisialisasi database SQLite.
 * Pakai `better-sqlite3` (synchronous API, simpel buat MVC kecil).
 */

const path = require("path");
const Database = require("better-sqlite3");
require("dotenv").config();

const DB_PATH = process.env.DB_PATH
  ? path.resolve(process.cwd(), process.env.DB_PATH)
  : path.resolve(__dirname, "../database/app.db");

/** @type {import('better-sqlite3').Database} */
const db = new Database(DB_PATH);

db.pragma("foreign_keys = ON");

// Bikin tabel users kalau belum ada (idempotent, aman dipanggil terus)
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

module.exports = db;
