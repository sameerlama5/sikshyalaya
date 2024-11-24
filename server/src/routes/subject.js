const express = require("express");
const { getsSubjectBySectionId, postNewSubjectInSectionId } = require("../controllers/subject");
const router = express.Router();

router.get("/subject/:sectionId/subject", getsSubjectBySectionId);
router.post("/subject/:sectionId/subject", postNewSubjectInSectionId);

module.exports = router;