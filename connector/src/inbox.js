const SAMPLE_EMAILS = [
  {
    id: "1",
    from: "ops@example.com",
    subject: "Production down",
    body: "Customers cannot log in. We need someone on this now.",
    receivedAt: "2026-11-27T08:15:00Z",
  },
  {
    id: "2",
    from: "hr@example.com",
    subject: "Interview schedule",
    body: "Your interview is on Thursday at 2pm. Please confirm.",
    receivedAt: "2026-11-27T09:00:00Z",
  },
  {
    id: "3",
    from: "news@example.com",
    subject: "Weekly newsletter",
    body: "Here are this week's top stories and offers.",
    receivedAt: "2026-11-27T07:30:00Z",
  },
  {
    id: "4",
    from: "friend@example.com",
    subject: "Update",
    body: "This is not urgent at all, just saying hi.",
    receivedAt: "2026-11-27T10:05:00Z",
  },
];

function listEmails() {
  return SAMPLE_EMAILS;
}

function getEmail(id) {
  return SAMPLE_EMAILS.find((email) => email.id === id) || null;
}

module.exports = { listEmails, getEmail };