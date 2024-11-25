const Section = require("../models/section");
const Subject = require("../models/subject");

const postNewSubjectInSectionId = async (req, res) => {
  const {sectionId: section} = req.params
  Subject.create({section, ...req.body })
  res.send({msg: 'Subject created!!'})
};


const getsSubjectBySectionId = async (req, res) => {
};



module.exports = {postNewSubjectInSectionId,getsSubjectBySectionId}