const test = require("node:test");
const assert = require("node:assert/strict");
const { once } = require("node:events");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const readConfig = require("../src/config/env");
const createApp = require("../src/app");
const User = require("../src/models/userModel");

const env = {
    MONGO_URI: "mongodb://localhost/library",
    JWT_SECRET: "x".repeat(32),
    FRONTEND_URL: "http://localhost:5173"
};

test("User model toSafeObject excludes passwordHash and includes safe fields", () => {
    const user = new User({
        name: "Test User",
        email: "Test@Example.Com",
        passwordHash: "hashedsecret",
        role: "User"
    });

    assert.equal(user.email, "test@example.com"); // normalized lowercase
    const safe = user.toSafeObject();
    assert.equal(safe.name, "Test User");
    assert.equal(safe.email, "test@example.com");
    assert.equal(safe.role, "User");
    assert.equal(safe.passwordHash, undefined);
    assert.ok(safe.id);
});

test("User model validation rejects missing required fields", async () => {
    const emptyUser = new User({});
    const error = await emptyUser.validate().catch((err) => err);
    assert.ok(error.errors.name);
    assert.ok(error.errors.email);
    assert.ok(error.errors.passwordHash);
});

test("Auth API rejects invalid registration payloads with 400", async (t) => {
    const server = createApp(readConfig(env)).listen(0);
    await once(server, "listening");
    t.after(() => new Promise((resolve) => server.close(resolve)));

    const url = `http://localhost:${server.address().port}/api/auth/register`;

    // Missing name
    const res1 = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "user@test.com", password: "password123" })
    });
    assert.equal(res1.status, 400);
    const body1 = await res1.json();
    assert.equal(body1.error.message, "Name is required");

    // Missing email
    const res2 = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "User", password: "password123" })
    });
    assert.equal(res2.status, 400);
    const body2 = await res2.json();
    assert.equal(body2.error.message, "Email is required");

    // Invalid email format
    const res3 = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "User", email: "notanemail", password: "password123" })
    });
    assert.equal(res3.status, 400);
    const body3 = await res3.json();
    assert.equal(body3.error.message, "Enter a valid email address");

    // Short password
    const res4 = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "User", email: "user@test.com", password: "123" })
    });
    assert.equal(res4.status, 400);
    const body4 = await res4.json();
    assert.equal(body4.error.message, "Password must be at least 8 characters");
});

test("Auth API rejects invalid login payloads with 400", async (t) => {
    const server = createApp(readConfig(env)).listen(0);
    await once(server, "listening");
    t.after(() => new Promise((resolve) => server.close(resolve)));

    const url = `http://localhost:${server.address().port}/api/auth/login`;

    // Missing password
    const res1 = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "user@test.com" })
    });
    assert.equal(res1.status, 400);
    const body1 = await res1.json();
    assert.equal(body1.error.message, "Email and password are required");

    // Missing email
    const res2 = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: "password123" })
    });
    assert.equal(res2.status, 400);
    const body2 = await res2.json();
    assert.equal(body2.error.message, "Email and password are required");
});
