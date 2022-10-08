import supertest from "supertest";
import app from '../index';

const request = supertest(app);

describe("Test endpoints response", () => {

  describe("get api/images endpoint", () => {

    it("should show the new image", async () => {
      const response = await request.get("/api/images?filename=first_image&width=250&height=250");
      expect(response.status).toBe(200);
    });

    it("should show show an error message", async () => {
      const response = await request.get("/api/images?width=250&height=250");
      expect(response.status).toBe(500);
    });

  });

});