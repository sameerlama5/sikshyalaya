const Subject = require("../models/subject");

const getsSubjectBySectionId = async (req, res) => {
  const data = await  Subject.find({class: req.params.sectionId})
    res.send(data)
  };

  const postNewSubjectInSectionId = async (req, res) => {
    Subject.create({...req.body, class: req.params.sectionId})
  };

  module.exports = { postNewSubjectInSectionId, getsSubjectBySectionId}; 