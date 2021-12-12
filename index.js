import fs from "fs";

import express from "express";
import cors from "cors";
import volleyball from "volleyball";
import helmet from "helmet";

import db from "./db/index.js";
import websocket from "./controllers/websocket.js";

import HttpError from "./models/HttpError.js";
import config from "./config.js";

import areaCodeRoutes from "./routes/area-code.js";
import fileRoutes from "./routes/file.js";
import jobRoutes from "./routes/job.js";
import laneRoutes from "./routes/lane.js";
import roleRoutes from "./routes/role.js";
import trailerTypeRoutes from "./routes/trailer-type.js";
import trailerRoutes from "./routes/trailer.js";
import tripRoutes from "./routes/trip.js";
import userRoutes from "./routes/user.js";
import locationRoutes from "./routes/location.js";
import teamRoutes from "./routes/team.js";
import companyRoutes from "./routes/company.js";

const app = express();

app.use(cors());
app.use(volleyball);
app.use(helmet());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/area-code", areaCodeRoutes);
app.use("/file", fileRoutes);
app.use("/job", jobRoutes);
app.use("/lane", laneRoutes);
app.use("/role", roleRoutes);
app.use("/trailer-type", trailerTypeRoutes);
app.use("/trailer", trailerRoutes);
app.use("/trip", tripRoutes);
app.use("/user", userRoutes);
app.use("/location", locationRoutes);
app.use("/team", teamRoutes);
app.use("/company", companyRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({
    msg: error.message || "An unknown error occurred!",
    code: error.code || 500,
  });
});

const port = config.PORT || 2000;

const server = app.listen(port, async () => {
  console.log(`http://${config.HOST}:` + server.address().port);
  await db.connect();
  const io = websocket.init(server);

  io.on("connection", (socket) => {
    console.log("Websocket client connected. ID:", socket.id);
    websocket.listen(socket);
  });
});
