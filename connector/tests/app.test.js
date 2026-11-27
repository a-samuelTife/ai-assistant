const test = require("node:test");
const assert = require("node:assert");
const app = require("../src/app");

async function get(path) {
  const server = app.listen(0);
  const { port } = server.address();
  const res = await fetch(`http://localhost:${port}${path}`);
  const body = await res.json();
  server.close();
  return { status: res.status, body };
}

test("GET /health returns ok", async () => {
  const { status, body } = await get("/health");
  assert.strictEqual(status, 200);
  assert.strictEqual(body.status, "ok");
});

test("GET /emails returns a list of emails", async () => {
  const { status, body } = await get("/emails");
  assert.strictEqual(status, 200);
  assert.ok(body.length > 0);
  assert.strictEqual(typeof body[0].subject, "string");
  assert.strictEqual(typeof body[0].body, "string");
});

test("GET /emails/2 returns one email", async () => {
  const { status, body } = await get("/emails/2");
  assert.strictEqual(status, 200);
  assert.strictEqual(body.id, "2");
});

test("GET /emails/999 returns 404", async () => {
  const { status } = await get("/emails/999");
  assert.strictEqual(status, 404);
});