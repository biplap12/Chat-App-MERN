import express from "express"
import { isAuthenticate } from "../middleware/verifyToken.js"
import { getUserForSidebar, updateUser } from "../controller/user.controller.js"

const router = express.Router()

router.get("/", isAuthenticate, getUserForSidebar)
router.put("/update/:id",isAuthenticate, updateUser);

export default router
