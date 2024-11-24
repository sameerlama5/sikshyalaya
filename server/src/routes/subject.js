const express = require("express");
const { getsSubjectBySectionId, postNewSubjectInSectionId } = require("../controllers/subject");
const router = express.Router();

router.post("/subject/:sectionId/subject", postNewSubjectInSectionId);

// GET route for fetching subjects by sectionId
router.get("/subject/:sectionId/subject", getsSubjectBySectionId);

module.exports = router;
