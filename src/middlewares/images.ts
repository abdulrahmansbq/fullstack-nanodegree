import express from "express";
import { promises as fs } from "fs";
import sharp from "sharp";

/**
 * This middleware is concerned with validating the inputs and checking their presences.
 * @param req
 * @param res
 * @param next
 */
const inputValidator = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const reqData = req.query;
  if(reqData.filename === undefined){
    next("File name is missing");
  }
  if(reqData.width === undefined){
    next("Width is missing");
  }
  if(reqData.height === undefined){
    next("Height is missing");
  }
  next();
}

/**
 * This middleware is concerned with checking if the image is already processed or not.
 * @param req
 * @param res
 * @param next
 */
const imageCaching = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const reqData = req.query;
  const imagePath = `assets/thumb/${reqData.filename}_thumb.jpg`;
  await fs.readFile(imagePath)
    .then(async (file) => {
      const metadata = await sharp(file).metadata()
       if(metadata.height == reqData.height && metadata.width == reqData.width)
         res.end(file);
       else
         next();
    }).catch(() => {
      next();
    });
}

export {
  imageCaching,
  inputValidator
};