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
  if(isNaN(<number>(<unknown>reqData.width))){
    next("Width must be a number");
  }
  if(isNaN(<number>(<unknown>reqData.height))){
    next("Height must be a number");
  }
  if(parseInt(<string>reqData.width) <= 0){
    next("Width must be > 0");
  }
  if(parseInt(<string>reqData.height) <= 0){
    next("Height must be > 0");
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
    .then(async (file: Buffer) => {
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