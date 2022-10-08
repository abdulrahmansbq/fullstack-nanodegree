import express from "express";
import imageResizer from "../../utilities/imageProcessor";
import { imageCaching, inputValidator } from "../../middlewares/images";
import {promises as fs} from "fs";

const images = express.Router();

images.get('/', [inputValidator, imageCaching], async (req: express.Request, res: express.Response) => {
  const data = {
    filename: (req.query.filename as unknown) as string,
    width: parseInt(<string>req.query.width),
    height: parseInt(<string>req.query.height)
  }

  await imageResizer(data)
    .then(async (newImagePath) => {

      res.writeHead(200, {
        "Content-Type": "image/jpeg"
      });
      const newImage = await fs.readFile(newImagePath);
      res.end(newImage);

    })
    .catch(() => { res.end("Error: the image is not found")});

});

export default images;