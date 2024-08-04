const app = require("../app");
const request = require("supertest");
const { sequelize, User } = require("../models");
const { queryInterface } = sequelize;

const user_test_1 = {
  userName: "test",
  email: "test1@gmail.com",
  confirmPassword: "123456",
  password: "123456",
};

// beforeAll(async () => {
//   await queryInterface.bulkDelete("Users", null, {
//     truncate: true,
//     restartIdentity: true,
//     cascade: true,
//   });
// });

afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
  // await sequelize.close();
});

describe("POST /register", () => {
  describe("Success", () => {
    test("success add new user", async () => {
      const { status, body } = await request(app)
        .post("/register")
        .send(user_test_1);

      console.log(body);
      expect(status).toBe(201);
      expect(body).toHaveProperty("email", user_test_1.email);
      expect(body).toHaveProperty("username", user_test_1.userName);
      expect(body).toHaveProperty("message", "Register Success");
    });
  });
  describe("Failed", () => {
    test("failed when user register with registered email", async () => {
      const { status, body } = await request(app)
        .post("/register")
        .send(user_test_1);

      console.log(body);
      expect(status).toBe(201);
      expect(body).toHaveProperty("email", user_test_1.email);
      expect(body).toHaveProperty("username", user_test_1.userName);
      expect(body).toHaveProperty("message", "Register Success");
    });

    test("failed when user doesn't input password", async () => {
      const { status, body } = await request(app).post("/register").send({
        userName: "test",
        email: "haha@gmail.com",
        password: "",
        confirmPassword: "",
      });

      console.log(body);
      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "Password is required");
    });

    test("failed when user doesn't input username", async () => {
      const { status, body } = await request(app).post("/register").send({
        userName: "",
        email: "haha@gmail.com",
        password: "12345456",
        confirmPassword: "12345456",
      });

      console.log(body);
      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "Username is required");
    });

    test("failed when user doesn't input email", async () => {
      const { status, body } = await request(app).post("/register").send({
        password: "1234567",
        userName: "test",
        confirmPassword: "1234567",
      });

      console.log(body);
      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "Email is required");
    });

    test("failed when user input invalid email format", async () => {
      const { status, body } = await request(app).post("/register").send({
        email: "hahaa",
        password: "1241245",
        confirmPassword: "1241245",
        userName: "test",
      });

      console.log(body);
      expect(status).toBe(400);
      expect(body).toHaveProperty(
        "message",
        "Please provide a valid email address"
      );
    });

    test("failed when user input password is less than 6 characters", async () => {
      const { status, body } = await request(app).post("/register").send({
        userName: "test2",
        email: "cat@gmail.com",
        password: "abc",
        confirmPassword: "abc",
      });

      console.log(body);
      expect(status).toBe(400);
      expect(body).toHaveProperty(
        "message",
        "Password must be at least 6 characters"
      );
    });
  });
});

describe("POST /login", () => {
  describe("Success", () => {
    test("success login with registered user", async () => {
      const { status, body } = await request(app)
        .post("/login")
        .send(user_test_1);

      console.log(body);
      expect(status).toBe(200);
      expect(body).toHaveProperty("access_token", expect.any(String));
    });
  });

  describe("Failed", () => {
    test("failed login with unregistered user", async () => {
      const { status, body } = await request(app)
        .post("/login")
        .send({ email: "hahaa@gmail.com", password: "121312312" });

      console.log(body);
      expect(status).toBe(401);
      expect(body).toHaveProperty("message", "Email has not been registered");
    });

    test("failed login when user doesn't input email", async () => {
      const { status, body } = await request(app)
        .post("/login")
        .send({ password: "121312312" });

      console.log(body);
      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "Email is required");
    });

    test("failed login when user doesn't input password", async () => {
      const { status, body } = await request(app)
        .post("/login")
        .send({ email: "hahaa@gmail.com" });

      console.log(body);
      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "Password is required");
    });

    test("failed login when user input the invalid password", async () => {
      const { status, body } = await request(app)
        .post("/login")
        .send({ email: "test1@gmail.com", password: "32442532" });

      console.log(body);
      expect(status).toBe(401);
      expect(body).toHaveProperty("message", "Invalid password");
    });
  });
});
