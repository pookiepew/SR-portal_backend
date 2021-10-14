import Trailer from '../../models/Trailer.js';

import websocket from '../websocket.js';

const findAll = async (req, res, next) => {
  try {
    const socket = websocket.getIO();
    const trailers = await Trailer.find()
      .populate({
        path: 'currentLocation.areaCode',
        select: 'name',
      })
      .populate({
        path: 'nextLocation.areaCode',
        select: 'name',
      })
      .populate({
        path: 'type',
        select: 'name',
      })
      .populate({
        path: 'creator',
        select: 'name email',
      });
    if (socket) {
      socket.emit('trailer', { msg: 'socket - message' });
    }
    res.json({ count: trailers.length, trailers });
  } catch (error) {
    next(error);
  }
};

export default findAll;
