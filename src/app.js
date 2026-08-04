/**
 * @file Konfigurasi Express app. Dipisah dari `server.js` supaya `app`
 * bisa di-reuse untuk testing tanpa perlu benar-benar listen ke port.
 */

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const routes = require("./routes");
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/errorHandler.middleware");
const { sendSuccess } = require("./utils/ApiResponse");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  return sendSuccess(res, 200, "Express + SQLite MVC API is running", {
    docs: "/api/health",
  });
});

app.use("/api", routes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
