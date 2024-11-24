const Section = require("../models/section");
const Subject = require("../models/subject");

const postNewSubjectInSectionId = async (req, res) => {
  try {
    const { sectionId } = req.params;  
    const subjectData = req.body; 

    const newSubject = new Subject({...subjectData,section: sectionId});

    await newSubject.save();

    const updatedSection = await Section.findByIdAndUpdate(sectionId,{ $push: { subjects: newSubject._id } },{new:true });

    res.status(201).json(updatedSection); 
  } catch (error) {
    console.error("Error creating subject:", error.message);
    res.status(500).json({ message: "Error creating subject", error: error.message });
  }
};


const getsSubjectBySectionId = async (req, res) => {
  try {
    const { sectionId } = req.params;
    const subjects = await Subject.find({ section: sectionId }); 

    if (!subjects || subjects.length === 0) {
      return res.status(404).json({ message: "No subjects found for this section" });
    }

    res.status(200).json(subjects);
  } catch (error) {
    console.error("Error fetching subjects:", error.message);
    res.status(500).json({
      message: "Error fetching subjects",
      error: error.message,
    });
  }
};



module.exports = {postNewSubjectInSectionId,getsSubjectBySectionId}