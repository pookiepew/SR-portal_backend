import connect from "./connect.js";

// USER
import addRoleToUser from "./user/addRoleToUser.js";
import findUserByEmail from "./user/findUserByEmail.js";
import findUserById from "./user/findUserById.js";
import removeRoleFromUser from "./user/removeRoleFromUser.js";
import saveUser from "./user/saveUser.js";
import saveInvitedUser from "./user/saveInvitedUser.js";
import findInvitedUser from "./user/findInvitedUser.js";
import findInvitedUserByToken from "./user/findInvitedUserByToken.js";
import tokenMatchInviteToken from "./user/tokenMatchInviteToken.js";
import updateUser from "./user/updateUser.js";
import deleteUser from "./user/deleteUser.js";

// TRIP
import fieldsAreMissing from "./trip/fieldsAreMissing.js";
import createNewTrip from "./trip/createNewTrip.js";
import addJobToTrip from "./trip/addJobToTrip.js";
import findTripByNumber from "./trip/findTripByNumber.js";
import tripAlreadyExists from "./trip/tripAlreadyExists.js";

// ROLE
import addUserToRole from "./role/addUserToRole.js";
import createRole from "./role/createRole.js";
import deleteRole from "./role/deleteRole.js";
import findRoleByAccess from "./role/findRoleByAccess.js";
import findRoleById from "./role/findRoleById.js";
import findRoleByFeature from "./role/findRoleByFeature.js";
import removeUserFromRole from "./role/removeUserFromRole.js";

// TRAILER
import createTrailer from "./trailer/createTrailer.js";
import findTrailerById from "./trailer/findTrailerById.js";

// TRAILER TYPE
import createTrailerType from "./trailer-type/createTrailerType.js";

// LANE

import laneAlreadyExists from "./lane/laneAlreadyExists.js";
import createNewLane from "./lane/createNewLane.js";
import findLaneByName from "./lane/findLaneByName.js";

import area from "./area/index.js";
import areaCode from "./area-code/index.js";
import company from "./company/index.js";
import job from "./job/index.js";
import location from "./location/index.js";
import team from "./team/index.js";

export default {
  connect,
  addRoleToUser,
  findUserByEmail,
  findUserById,
  removeRoleFromUser,
  saveUser,
  saveInvitedUser,
  findInvitedUser,
  findInvitedUserByToken,
  fieldsAreMissing,
  createNewTrip,
  addJobToTrip,
  findTripByNumber,
  tripAlreadyExists,
  tokenMatchInviteToken,
  updateUser,
  deleteUser,
  addUserToRole,
  createRole,
  deleteRole,
  findRoleByAccess,
  findRoleById,
  findRoleByFeature,
  removeUserFromRole,
  createTrailer,
  findTrailerById,
  createTrailerType,
  laneAlreadyExists,
  createNewLane,
  findLaneByName,
  area,
  areaCode,
  company,
  job,
  location,
  team,
};
