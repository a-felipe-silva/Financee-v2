import express from "express";
import { requireAuth } from "../middlewares/requireAuth";

const testRouter = express.Router();

/**
 * @openapi
 * /auth:
 *  get:
 *    description: Test the authentication.
 *    responses:
 *      200:
 *        description: User is authenticated.
 */
testRouter.route("/auth").get(requireAuth, (req, res) => {
  res.status(200).json(req.user);
});

export default testRouter;
