import InvitedUser from '../../models/InvitedUser.js';
import HttpError from '../../models/HttpError.js';

const deleteInvite = async (req, res, next) => {
  const { email } = req.body;
  try {
    if (!email) {
      throw new HttpError('Email must be provided', 400);
    }
    const invitationEmail = email.toLowerCase().trim();
    await InvitedUser.deleteOne({ email: invitationEmail });
    res.send();
  } catch (error) {
    next(error);
  }
};

export default deleteInvite;
