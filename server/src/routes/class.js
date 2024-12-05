const express = require("express");
const router = express.Router();

const {
    addNewClass,
    getAllClass,
    postNewSectionInClassId,
    getSectionsByClassId,
    deleteSectionById,
    getSectionById
} = require("../controllers/class");

router.post("/class", addNewClass);
router.get("/class", getAllClass);
router.get("/class/:classId/sections", getSectionsByClassId);
router.post("/class/:classId/sections", postNewSectionInClassId);
router.get("/sections/:sectionId",getSectionById );
router.delete("/sections/:sectionId", deleteSectionById);

module.exports = router;

