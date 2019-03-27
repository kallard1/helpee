import sgMail from '@sendgrid/mail';

sgMail.setApiKey('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');

export default function newUserEmail(user) {
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

  sgMail.send(message).catch(err => console.error(err));
}
