const express = require("express");
const router = express.Router();

const {
    addNewClass,
    getAllClass,
    postNewSectionInClassId,
    getSectionsByClassId
} = require("../controllers/class");

router.post("/class", addNewClass);
router.get("/class", getAllClass);
router.get("/class/:classId/sections", getSectionsByClassId);
router.post("/class/:classId/sections", postNewSectionInClassId);

module.exports = router;

