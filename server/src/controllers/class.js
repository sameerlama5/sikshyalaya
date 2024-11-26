const Class = require("../models/class");
const Section = require("../models/section");

const addNewClass = async (req, res) => {
    Class.create(req.body)
    res.send({msg: 'class  has been created'})
  };

  const getAllClass = async (req, res) => {
    const data = await  Class.find()
    res.send(data)
  };

  
  const getSectionsByClassId = async (req, res) => {
  const data = await  Section.find({class: req.params.classId}).populate("subjects")
    res.send(data)
  };

  const postNewSectionInClassId = async (req, res) => {
    Section.create({...req.body, class: req.params.classId})
    res.send("Posted!!")
  };

  module.exports = {addNewClass,getAllClass,getSectionsByClassId,postNewSectionInClassId }; 
  