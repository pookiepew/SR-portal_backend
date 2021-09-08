import HttpError from '../models/HttpError.js';

const checkPermission = async (req, res, next, feature, access) => {
  const user = req.user;
  const permissionError = new HttpError('Permission denied', 403);
  try {
    if (!user) {
      throw new HttpError('Something went wrong, please try again', 500);
    }
    if (!feature || !access) {
      throw permissionError;
    }
    const userIsAdmin = user.roles.some((role) => role.feature === 'admin');
    if (userIsAdmin) {
      return next();
    }
    const userHasCorrectFeature = user.roles.some(
      (role) => role.feature === feature
    );
    const userHasCorrectAccess = user.roles.find(
      (role) => role.access === access
    );
    if (!userHasCorrectFeature || !userHasCorrectAccess) {
      throw permissionError;
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default checkPermission;
