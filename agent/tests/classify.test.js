const test = require("node:test");
const assert = require("node:assert");
const { classifyEmail } = require("../src/classify");
const app = require("../src/app");

test("urgent words give urgent", () => {
  const result = classifyEmail({ subject: "URGENT: server down", body: "Fix it" });
  assert.strictEqual(result.category, "urgent");
});

test("important words give important", () => {
  const result = classifyEmail({ subject: "Contract review", body: "Please check" });
  assert.strictEqual(result.category, "important");
});

test("no keywords give normal", () => {
  const result = classifyEmail({ subject: "Lunch", body: "Pizza on Friday?" });
  assert.strictEqual(result.category, "normal");
});

test("urgent wins over important", () => {
  const result = classifyEmail({ subject: "Meeting", body: "Reply immediately" });
  assert.strictEqual(result.category, "urgent");
});

test("POST /classify rejects bad input with 400", async () => {
  const server = app.listen(0);
  const { port } = server.address();

  const res = await fetch(`http://localhost:${port}/classify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subject: 123 }),
  });

  assert.strictEqual(res.status, 400);
  server.close();
});