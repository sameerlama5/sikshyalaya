"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";

const Sections = () => {
  const params = useParams();
  const router = useRouter()
  const pathname = usePathname()
  // States
  const [sectionList, setSectionList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  
  const [selectedClassTeacher, setSelectedClassTeacher] = useState(null);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  // Fetch data functions
  const fetchSections = async () => {
    const { data } = await axios.get(`http://localhost:8000/class/${params.id}/sections`);
    setSectionList(data);
  };

  const fetchSubjects = async () => {
    const { data } = await axios.get("http://localhost:8000/subjects");
    const refactoredData = data.map((item) => {
      item.label = item.subjectName;
      item.value = item._id;
      return item;
    });
    setSubjectList(refactoredData);
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/users");
      const refactoredData = data.map((item) => ({
        label: item.fullName,
        value: item._id,
        role: item.role,
      }));

      const teachers = refactoredData.filter((item) => item.role === "teacher");
      const students = refactoredData.filter((item) => item.role !== "teacher");

      setTeacherList(teachers);
      setStudentList(students);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // useEffect to fetch data on mount
  useEffect(() => {
    fetchSections();
    fetchSubjects();
    fetchUser();
  }, []);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    sectionName: Yup.string().required("Section Name is required"),
    class: Yup.number().required("Class is required"),
    subjects: Yup.array()
      .min(1, "At least one subject is required")
      .required("Subjects are required"),
    classTeacher: Yup.object()
      .shape({
        label: Yup.string().required("Class teacher label is required"),
        value: Yup.string().required("Class teacher value is required"),
      })
      .required("Class teacher is required"),
    
    students: Yup.array()
      .min(1, "At least one student is required")
      .required("Students are required"),
    teachers: Yup.array()
      .min(1, "At least one teacher is required")
      .required("Teachers are required"),
    roomNumber: Yup.number().required("Room Number is required"),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const dataToSubmit = {
      ...values,
      class: params.id,
      classTeacher: values.classTeacher.value, 
      subjects: values.subjects.map((subject) => subject.value), 
      students: values.students.map((student) => student.value), 
      teachers: values.teachers.map((teacher) => teacher.value), 
    };

    const { data } = await axios.post(`http://localhost:8000/class/${params.id}/sections`, dataToSubmit)
  
    setSubmitting(false);
    resetForm();
  };

  return (
    <>
      {/* Dialog for adding new section */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="rounded bg-black m-4 text-white" variant="outline">
            Add New Section
          </Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Add New Section</DialogTitle>
            <DialogDescription>Add new section to this class</DialogDescription>
          </DialogHeader>
          <Formik
            initialValues={{
              sectionName: "",
              class: "1",
              subjects: [],
              classTeacher: { label: "", value: "" },
              students: [],
              teachers: [],
              roomNumber: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({value,setFieldValue, isSubmitting }) => (
              <Form>
                <div className="grid gap-4 py-2">
                  {/* Section Name */}
                  <div className="grid grid-cols-4 items-center gap-2">
                    <Label htmlFor="sectionName" className="text-right font-semibold">Section Name</Label>
                    <Field as={Input} id="sectionName" name="sectionName" className="col-span-3" />
                    <ErrorMessage name="sectionName" component="div" className="text-red-500 col-span-4 text-right text-sm" />
                  </div>

                  {/* Class */}
                  <div className="grid grid-cols-4 items-center gap-2">
                    <Label htmlFor="class" className="text-right font-semibold">Class</Label>
                    <Field as={Input} id="class" name="class" className="col-span-3" />
                    <ErrorMessage name="class" component="div" className="text-red-500 col-span-4 text-right text-sm" />
                  </div>

                   {/* Subjects*/}
                   <div className="grid grid-cols-4 items-center gap-2 ">
                    <Label htmlFor="subjects" className="text-right font-semibold">
                      Subjects
                    </Label>
                    <Select
                      isMulti
                      value={selectedSubjects}
                      className="w-72"
                      onChange={(selectedOptions) => {
                        setSelectedSubjects(selectedOptions); 
                        setFieldValue("subjects", selectedOptions); 
                      }}
                      options={subjectList}
                    />
                    <ErrorMessage name="subjects" component="div" className="text-red-500 col-span-4 text-right text-sm" />
                  </div>

                  {/* Class Teacher */}
                  <div className="grid grid-cols-4 items-center gap-2">
                    <Label htmlFor="classTeacher" className="text-right font-semibold">Class Teacher</Label>
                    <Select
                      options={teacherList}
                      className="w-72"
                      value={selectedClassTeacher} 
                      onChange={(selectedOption) => {
                        setSelectedClassTeacher(selectedOption); 
                        setFieldValue("classTeacher", selectedOption); 
                      }}
                    />
                    <ErrorMessage name="classTeacher" component="div" className="text-red-500 col-span-4 text-right text-sm" />
                  </div>

                  {/* Students */}
                  <div className="grid grid-cols-4 items-center gap-2">
                    <Label htmlFor="students" className="text-right font-semibold">Students</Label>
                    <Select
                      isMulti
                      value={selectedStudents}
                      className="w-72"
                      onChange={(selectedOptions) => {
                        setSelectedStudents(selectedOptions); 
                        setFieldValue("students", selectedOptions); 
                      }}
                      options={studentList}
                    />
                    <ErrorMessage name="students" component="div" className="text-red-500 col-span-4 text-right text-sm" />
                  </div>

                  {/* Teachers */}
                  <div className="grid grid-cols-4 items-center gap-2">
                    <Label htmlFor="teachers" className="text-right font-semibold">Teachers</Label>
                    <Select
                      isMulti
                      value={selectedTeachers}
                      className="w-72"
                      onChange={(selectedOptions) => {
                        setSelectedTeachers(selectedOptions); 
                        setFieldValue("teachers", selectedOptions); 
                      }}
                      options={teacherList}
                    />
                    <ErrorMessage name="teachers" component="div" className="text-red-500 col-span-4 text-right text-sm" />
                  </div>

                  {/* Room Number */}
                  <div className="grid grid-cols-4 items-center gap-2">
                    <Label htmlFor="roomNumber" className="text-right font-semibold">Room Number</Label>
                    <Field as={Input} id="roomNumber" name="roomNumber" className="col-span-3" />
                    <ErrorMessage name="roomNumber" component="div" className="text-red-500 col-span-4 text-right text-sm" />
                  </div>

                  {/* Submit Button */}
                  <DialogFooter>
                    <Button type="submit" disabled={isSubmitting} className="rounded bg-black text-white">
                      Submit
                    </Button>
                  </DialogFooter>
                </div>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
      <div

      className='flex  inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]  gap-4'>
        {
          sectionList.length > 0 && sectionList.map((item) => {
            return (
              <div
              onClick={()=>router.push(pathname+'/'+item._id)}
              key={item._id} className='bg-black/10 h-12 m-16'>
                Section - {item.sectionName}
                Total Students: {item.students.length}
              </div>
            )
          })
        }
      </div>
    </>
  );
};

export default Sections;
