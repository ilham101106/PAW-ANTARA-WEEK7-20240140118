/**
 * @file Middleware 404 + global error handler.
 * Didaftarkan paling terakhir di `app.js`.
 */

const { sendError } = require("../utils/ApiResponse");

/** Handle route yang tidak terdaftar. */
function notFoundHandler(req, res) {
  return sendError(
    res,
    404,
    `Route ${req.method} ${req.originalUrl} tidak ditemukan`,
  );
}

/**
 * Global error handler. Menangkap error tak terduga (bug, exception)
 * yang di-`next(err)` dari controller/middleware manapun.
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error("[ERROR]", err);
  const message =
    process.env.NODE_ENV === "development"
      ? err.message
      : "Terjadi kesalahan pada server";
  return sendError(res, 500, message);
}

module.exports = { notFoundHandler, errorHandler };
