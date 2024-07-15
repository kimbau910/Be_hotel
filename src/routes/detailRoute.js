const express = require("express");
const router = express.Router();
const detailController = require("../controller/DetailController");
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post("/create", detailController.createDetail);
router.put("/update/:id", detailController.updateDetail);
router.get("/get_details/:id", detailController.getDetail);
router.delete("/delete/:id", authMiddleWare, detailController.deleteDetail);
router.get("/get_all", detailController.getAllDetail);
router.post("/delete-many", authMiddleWare, detailController.deleteMany);
router.get("/get-all-type", detailController.getAllType);

module.exports = router;
