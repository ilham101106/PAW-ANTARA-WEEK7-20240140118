/**
 * @file Standardized API response helper.
 * Biar semua response (sukses/error) punya bentuk yang konsisten:
 * { success, statusCode, message, data, timestamp }
 */

/**
 * Kirim response sukses.
 *
 * @param {import('express').Response} res
 * @param {number} statusCode - HTTP status code (200, 201, dst).
 * @param {string} message - Pesan sukses.
 * @param {*} [data=null] - Payload data.
 * @returns {import('express').Response}
 *
 * @example
 * return sendSuccess(res, 200, 'Login berhasil', { user });
 */
function sendSuccess(res, statusCode, message, data = null) {
  return res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    data,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Kirim response error.
 *
 * @param {import('express').Response} res
 * @param {number} statusCode - HTTP status code (400, 401, 404, 500, dst).
 * @param {string} message - Pesan error.
 * @param {Array<Object>} [errors=[]] - Detail error tambahan (mis. per-field validasi).
 * @returns {import('express').Response}
 *
 * @example
 * return sendError(res, 401, 'Email atau password salah');
 */
function sendError(res, statusCode, message, errors = []) {
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors: errors.length ? errors : undefined,
    timestamp: new Date().toISOString(),
  });
}

module.exports = { sendSuccess, sendError };
