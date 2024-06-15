const express = require("express");
const router = express.Router();
const DetailController = require("../controller/DetailController");
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post("/create", DetailController.createDetail);
router.put("/update/:id", authMiddleWare, DetailController.updateDetail);
router.get("/get_details/:id", DetailController.getDetail);
router.delete("/delete/:id", authMiddleWare, DetailController.deleteDetail);
router.get("/get-all", DetailController.getAllDetail);
router.post("/delete-many", authMiddleWare, DetailController.deleteMany);
router.get("/get-all-type", DetailController.getAllType);

module.exports = router;
