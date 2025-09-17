import express from"express"
import { checkToken } from "../middlewares/AuthMiddleware.js";
import { getGroupMessages, getUserGroups, groupCreate } from "../controllers/GroupController.js";
const groupRouter=express.Router();

groupRouter.post("/create-group",checkToken,groupCreate)

groupRouter.get("/get-user-groups",checkToken,getUserGroups);

groupRouter.get("/get-group-messages/:channelId",checkToken,getGroupMessages);

export default groupRouter