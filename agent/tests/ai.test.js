const test = require("node:test");
const assert = require("node:assert");
const { classify } = require("../src/ai");

function fakeAI(content, ok = true) {
  return async () => ({
    ok,
    status: ok ? 200 : 500,
    json: async () => ({ choices: [{ message: { content } }] }),
  });
}

const email = { subject: "Update", body: "This is not urgent at all" };

function configure() {
  process.env.AI_API_KEY = "test-key";
  process.env.AI_MODEL = "test-model";
}

test("uses the AI answer when it is valid", async () => {
  configure();
  const result = await classify(email, fakeAI('{"category":"normal","reason":"says not urgent"}'));
  assert.strictEqual(result.category, "normal");
  assert.strictEqual(result.source, "ai");
});

test("accepts a reply with extra words around the JSON", async () => {
  configure();
  const result = await classify(email, fakeAI('Sure! {"category":"normal","reason":"ok"} Done.'));
  assert.strictEqual(result.source, "ai");
});

test("falls back to rules if the AI returns a bad category", async () => {
  configure();
  const result = await classify(email, fakeAI('{"category":"hacked","reason":"x"}'));
  assert.strictEqual(result.source, "rules");
});

test("falls back to rules if the AI service errors", async () => {
  configure();
  const result = await classify(email, fakeAI("{}", false));
  assert.strictEqual(result.source, "rules");
});

test("falls back to rules if there is no API key", async () => {
  delete process.env.AI_API_KEY;
  const result = await classify(email, fakeAI('{"category":"normal","reason":"x"}'));
  assert.strictEqual(result.source, "rules");
});