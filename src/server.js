/**
 * @file Entry point. Menjalankan server & jaga-jaga error tak tertangani.
 */

require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
  server.close(() => process.exit(1));
});

module.exports = server;
