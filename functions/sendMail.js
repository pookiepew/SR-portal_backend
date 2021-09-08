import sgMail from '@sendgrid/mail';

const sendMail = async (
  email,
  reasonForEmail = null,
  HTML,
  token = null,
  config,
  HttpError
) => {
  sgMail.setApiKey(config.SENDGRID_API_KEY);

  const mail = {
    to: email,
    from: 'noreply@glensorbo.com',
    subject: '',
    text: '',
    html: ``,
  };

  if (reasonForEmail === 'invite-user' && token) {
    mail.subject = 'You have been invited to join SR Portal!';
    mail.text = 'This is the text thingy in mail.text';
    mail.html = HTML;
  }

  try {
    if (!reasonForEmail) {
      throw new HttpError('No reason for email', 400);
    }
    await sgMail.send(mail);
  } catch (error) {
    if (error.response) {
      console.error(error.response.body);
    }
  }
};

export default sendMail;
