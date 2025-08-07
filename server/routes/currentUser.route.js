import express from "express";
import { currentUser } from "../controllers/currentUser.controller.js";
import userAuth from "../middleware/user.middleware.js";

const currentUserRouter = express.Router();

currentUserRouter.get("/data", userAuth, currentUser);

export default currentUserRouter;