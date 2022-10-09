import express from "express";
import images from "./images/images";
const routes = express.Router();

routes.use("/images", images);

export default routes;
