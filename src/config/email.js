import sgMail from '@sendgrid/mail';

sgMail.setApiKey('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');

export function newUserEmail(user) {
  const message = {
    to: user.email,
    from: {
      email: 'no-reply@helpee.fr',
      name: 'No-Reply Helpee'
    },
    subject: 'You account on Helpee',
    text: `Hi ${user.firstname} ${user.lastname}, you account has been created!`,
    html: `Hi <u>${user.firstname} ${user.lastname}</u>, you account has been created!`
  };

  sgMail.send(message)
    .catch(err => console.error(err));
}

export function forgotPassword(user, done) {
  const message = {
    to: user.email,
    from: {
      email: 'no-reply@helpee.fr',
      name: 'No-Reply Helpee'
    },
    subject: 'Helpee: Forgot password',
    text: `Hi ${user.firstname} ${user.lastname},\n
    You are receiving this because you (or someone else) have requested the reset of the password for your account.\n
    Please click on the following link, or paste this into your browser to complete the process:\n\n
    https://www.helpee.fr/auth/reset-password/${user.resetPasswordToken}\n\n
    If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    html: `Hi ${user.firstname} ${user.lastname},\n
    You are receiving this because you (or someone else) have requested the reset of the password for your account.\n
    Please click on the following link, or paste this into your browser to complete the process:\n\n
    http://www.helpee.fr/auth/reset-password/${user.resetPasswordToken}\n\n
    If you did not request this, please ignore this email and your password will remain unchanged.\n`
  };

  sgMail.send(message)
    .then(() => {
      done(null, 'done');
    })
    .catch(err => console.error(err));
}
