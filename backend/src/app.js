const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const gymRoutes = require("./routes/gym.routes");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Smart Gym API Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/gym",gymRoutes)

module.exports = app;