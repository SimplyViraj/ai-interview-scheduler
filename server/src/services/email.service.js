import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function formatICSDate(date) {
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .split(".")[0] + "Z";
}

export async function sendInvite(toEmail, slot) {
  console.log("SENDGRID_FROM_EMAIL =", process.env.SENDGRID_FROM_EMAIL);

  const start = formatICSDate(new Date(slot.start));
  const end = formatICSDate(new Date(slot.end));

  const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
BEGIN:VEVENT
DTSTART:${start}
DTEND:${end}
SUMMARY:Interview Scheduled
DESCRIPTION:Your interview has been scheduled.
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR
`.trim();

  const msg = {
  to: toEmail,
  from: process.env.SENDGRID_FROM_EMAIL,
  subject: "Interview Confirmed",
  text: "Your interview is confirmed. Calendar invite attached.",
  attachments: [
    {
      content: Buffer.from(icsContent).toString("base64"),
      filename: "interview.ics",
      type: "text/calendar",
      disposition: "attachment"
    }
  ]
};


const response = await sgMail.send(msg);
console.log("SendGrid response:", response[0].statusCode);

}
