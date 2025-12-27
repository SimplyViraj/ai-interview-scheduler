import sgMail from "@sendgrid/mail";
import { createICS } from "../utils/ics.util.js";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendInvite(email, slot) {
  const ics = createICS(slot.start, slot.end);

  await sgMail.send({
    to: email,
    from: process.env.SENDGRID_FROM,
    subject: "Interview Invitation",
    text: "Calendar invite attached",
    attachments: [{
      content: Buffer.from(ics).toString("base64"),
      filename: "interview.ics",
      type: "text/calendar",
      disposition: "attachment"
    }]
  });
}
