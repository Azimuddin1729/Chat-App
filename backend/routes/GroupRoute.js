import express from"express"
import { checkToken } from "../middlewares/AuthMiddleware.js";
import { getUserGroups, groupCreate } from "../controllers/GroupController.js";
const groupRouter=express.Router();

groupRouter.post("/create-group",checkToken,groupCreate)

groupRouter.get("/get-user-groups",checkToken,getUserGroups);

export default groupRouter