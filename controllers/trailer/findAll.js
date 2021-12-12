import Trailer from "../../models/Trailer.js";

import websocket from "../websocket.js";

const findAll = async (req, res, next) => {
  try {
    const socket = websocket.getIO();
    const trailers = await Trailer.find()
      .populate({
        path: "location.current.areaCode",
        select: "code",
      })
      .populate({
        path: "location.next.areaCode",
        select: "code",
      })
      .populate({
        path: "type",
        select: "type",
      })
      .populate({
        path: "team",
        select: "name",
      })
      .populate({
        path: "creator",
        select: "name email",
      })
      .sort({ license: 1 });
    if (socket) {
      socket.emit("trailer", { msg: "socket - message" });
    }
    res.json({ trailers });
  } catch (error) {
    next(error);
  }
};

export default findAll;
