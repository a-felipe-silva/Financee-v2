import express from "express";
import { requireAuth } from "../middlewares/requireAuth";

const testRouter = express.Router();

testRouter.route("/auth").get(requireAuth, (req, res) => {
  res.status(200).json(req.user);
});

export default testRouter;
