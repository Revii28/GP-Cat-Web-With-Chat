const app = require("../app");
const request = require("supertest");
const { sequelize, User, Cat } = require("../models");
const { queryInterface } = sequelize;

beforeAll(async () => {
  await queryInterface.bulkDelete("Cats", null, {
    truncate: true,
    restartIdentity: true,
  });
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    restartIdentity: true,
  });

  const user1 = await User.create({
    userName: "testuser",
    email: "testuser@gmail.com",
    password: "123456",
  });
  const user2 = await User.create({
    userName: "test",
    email: "test@gmail.com",
    password: "123456",
  });

  await Cat.bulkCreate([
    {
      name: "Cat 1",
      breed: "Siamese",
      age: "2 years old",
      gender: "female",
      description: "Cat 1 description",
      adoptionStatus: "Available",
      UserId: user1.id,
    },
    {
      name: "Cat 2",
      breed: "Maine Coon",
      age: "3 years old",
      gender: "male",
      description: "Cat 2 description",
      adoptionStatus: "Available",
      UserId: user1.id,
    },
  ]);
});

describe("/pub/cats Endpoint Tests", () => {
  test("should return all available cats with their details", async () => {
    const { status, body } = await request(app).get("/pub/cats").expect(200);

    expect(status).toBe(200);
    expect(body.cats).toHaveLength(2);
    expect(body.cats[0].name).toBe("Cat 1");
    expect(body.cats[0].adoptionStatus).toBe("Available");
    expect(body.cats[0].User.userName).toBe("testuser");
    expect(body.cats[1].name).toBe("Cat 2");
    expect(body.cats[1].adoptionStatus).toBe("Available");
    expect(body.cats[1].User.userName).toBe("testuser");
  });
});
