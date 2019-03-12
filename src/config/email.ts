import SGmail from "@sendgrid/mail";
import { UserModel } from "../models/user";

SGmail.setApiKey("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");

function newUserEmail(user: UserModel) {
  const message = {
    to: user.email,
    from: {
      email: "no-reply@helpee.fr",
      name: "No-Reply Helpee",
    },
    subject: "You account on Helpee",
    text: `Hi ${user.firstname} ${user.lastname}, you account has been created!`,
    html: `Hi <u>${user.firstname} ${user.lastname}</u>, you account has been created!`,
  };

  SGmail.send(message)
    .catch((err) => {
      return console.log(err);
    });
}

export { newUserEmail };
