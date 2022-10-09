import imageResizer from "../../utilities/imageProcessor";

describe("Test imageProcessor utility", () => {
  describe("Test imageResizer function", () => {
    it("should return the path of the new image", async () => {
      await expectAsync(
        imageResizer({
          filename: "first_image",
          width: 250,
          height: 250,
        })
      ).toBeResolvedTo("assets/thumb/first_image_250_250.jpg");
    });

    it("should return the error because image does not exists", async () => {
      await expectAsync(
        imageResizer({
          filename: "image_not_exists",
          width: 250,
          height: 250,
        })
      ).toBeRejectedWithError(
        "Input file is missing: assets/full/image_not_exists.jpg"
      );
    });
  });
});
