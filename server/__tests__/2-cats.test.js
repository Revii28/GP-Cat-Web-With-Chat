const app = require("../app");
const request = require("supertest");
const { encrypt } = require("../helpers/bcryptjs");
const { sequelize, User, Cat } = require("../models");
const { signToken } = require("../helpers/jwt");
const { queryInterface } = sequelize;

let access_token = "";

const user_test_1 = {
  userName: "test",
  email: "test2@gmail.com",
  password: "123456",
};

beforeAll(async () => {
  await queryInterface.bulkInsert(
    "Users",
    [
      {
        ...user_test_1,
        password: encrypt(user_test_1.password),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  );

  const user = await User.findOne({ where: { email: user_test_1.email } });
  access_token = signToken({
    id: user.id,
  });
});

afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
  await sequelize.close();
});

describe("Cat Controller Tests", () => {
  test("should fetch user cats successfully", async () => {
    const { status, body } = await request(app)
      .get("/cats")
      .set("Authorization", `Bearer ${access_token}`);

    expect(status).toBe(200);
    expect(body.cats).toBeDefined();
  });

  test("should create a new cat successfully", async () => {
    const { status, body } = await request(app)
      .post("/cats")
      .set("Authorization", `Bearer ${access_token}`)
      .field("name", "test cat")
      .field("breed", "Siamese")
      .field("age", "2 years old")
      .field("gender", "female")
      .field("description", "any desc");
    //   .attach(
    //     "images",
    //     "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    //   );

    console.log(body);
    expect(status).toBe(201);
    expect(body.cat).toBeDefined();
  });
});

describe("changeCatStatus Test", () => {
  let catId;

  beforeAll(async () => {
    const cat = await Cat.create({
      name: "Test Cat",
      breed: "Siamese",
      age: "2 years old",
      gender: "female",
      description: "Test cat description",
      adoptionStatus: "Available",
      UserId: 1,
    });

    catId = cat.id;
  });

  test("should change cat status from Available to Unavailable", async () => {
    const { status, body } = await request(app)
      .patch(`/cats/${catId}`)
      .set("Authorization", `Bearer ${access_token}`);

    expect(status).toBe(200);
    expect(body.updateCat.adoptionStatus).toBe("Unavailable");
  });

  test("should change cat status from Unavailable to Available", async () => {
    await Cat.update(
      { adoptionStatus: "Unavailable" },
      { where: { id: catId } }
    );

    const { status, body } = await request(app)
      .patch(`/cats/${catId}`)
      .set("Authorization", `Bearer ${access_token}`);

    expect(status).toBe(200);
    expect(body.updateCat.adoptionStatus).toBe("Available");
  });

  test("should return 404 if cat is not found", async () => {
    const invalidCatId = 999;
    const { status, body } = await request(app)
      .patch(`/cats/${invalidCatId}`)
      .set("Authorization", `Bearer ${access_token}`);

    expect(status).toBe(404);
    expect(body.message).toBe("Cat Not found");
  });
});

describe("deleteCat Test", () => {
  let catId;

  beforeAll(async () => {
    const cat = await Cat.create({
      name: "Test Cat",
      breed: "Siamese",
      age: "2 years old",
      gender: "female",
      description: "Test cat description",
      UserId: 1,
    });

    catId = cat.id;
  });

  test("should delete a cat by ID", async () => {
    const { status, body } = await request(app)
      .delete(`/cats/${catId}`)
      .set("Authorization", `Bearer ${access_token}`);

    expect(status).toBe(200);
    expect(body.message).toBe("Delete success");
  });

  test("should return 404 if cat is not found", async () => {
    const invalidCatId = 999;
    const { status, body } = await request(app)
      .delete(`/cats/${invalidCatId}`)
      .set("Authorization", `Bearer ${access_token}`);

    expect(status).toBe(404);
    expect(body.message).toBe("Cat Not found");
  });
});
