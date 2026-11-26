const URGENT_WORDS = ["urgent", "asap", "immediately", "emergency", "right now"];
const IMPORTANT_WORDS = ["contract", "meeting", "interview", "deadline", "proposal", "review"];

function classifyEmail({ subject, body }) {
  const text = `${subject} ${body}`.toLowerCase();

  const urgentHit = URGENT_WORDS.find((word) => text.includes(word));
  if (urgentHit) {
    return { category: "urgent", reason: `contains "${urgentHit}"` };
  }

  const importantHit = IMPORTANT_WORDS.find((word) => text.includes(word));
  if (importantHit) {
    return { category: "important", reason: `contains "${importantHit}"` };
  }

  return { category: "normal", reason: "no important keywords found" };
}

module.exports = { classifyEmail };