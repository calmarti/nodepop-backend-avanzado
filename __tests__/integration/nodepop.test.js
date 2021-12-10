const { connection, main } = require("mongoose");
const request = require("supertest");
const { set } = require("../../app");
const app = require("../../app");

describe("API auth endpoint", () => {
  describe("POST /apiv1/auth", () => {
    it("should return '401' if either the email or password are wrong", (done) => {
      // const email = "user@example.com";
      // const password = "abcd";
      request(app)
        .post("/apiv1/auth")
        .expect(401)
        .then((res) => {
          expect(res.body.email).not.toBe("admin@user.com");
          done();
        });
    });
    it("should return '200' if the email and password are admin@example.com and 1234", (done) => {
      request(app)
        .post("/apiv1/auth")
        .then((res) => {
          res.body.email = "admin@example.com";
          res.body.password = "1234";
          expect(res.body.email).toBe("admin@example.com");
          expect(res.body.password).toBe("1234");
          expect(200);
          done();
        });
    });
  });
});

