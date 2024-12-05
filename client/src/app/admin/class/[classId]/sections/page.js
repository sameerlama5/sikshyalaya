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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { useToast } from "@/hooks/use-toast";
import SubjectForm from "@/components/add-subject";
import { Trash2Icon } from "lucide-react";
import ClassLayout from "../../classLayout";
import Link from "next/link";
import BreadCrumbsItem from "@/components/dynamic-breadCrumbs";

const Sections = () => {
  const { toast } = useToast();
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const [sectionList, setSectionList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubjectDialogOpen, setIsSubjectDialogOpen] = useState(false);

  const fetchSections = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/class/${params.classId}/sections`,
    );
    setSectionList(data);
  };

  const fetchSubjects = async () => {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/subjects",
    );
    const refactoredData = data.map((item) => {
      item.label = item.subjectName;
      item.value = item._id;
      return item;
    });
    setSubjectList(refactoredData);
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/users",
      );
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

  useEffect(() => {
    fetchSections();
    fetchSubjects();
    fetchUser();
  }, []);

  // Validation schema using Yup
  const validationSchema = Yup.object({
    sectionName: Yup.string().required("Section Name is required"),
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
      class: params.classId,
      classTeacher: values.classTeacher.value,
      subjects: values.subjects.map((subject) => subject.value),
      students: values.students.map((student) => student.value),
      teachers: values.teachers.map((teacher) => teacher.value),
    };

    try {
      const { data } = await axios.post(
        `http://localhost:8000/class/${params.classId}/sections`,
        dataToSubmit,
      );
      if (data) {
        toast({
          title: data.msg,
        });
        setIsDialogOpen(false);
        fetchSections();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: error?.response?.data?.msg,
      });
    }

    setSubmitting(false);
    resetForm();
  };

  const handleDelete = async (sectionId) => {
    const res = await axios.delete(
      `http://localhost:8000/sections/${sectionId}`,
    );
    if (res.status == 200) alert("deleted successfully");
  };

  return (
    <ClassLayout breadCrumbsItem={<BreadCrumbsItem depth={2} />}>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
              subjects: [],
              classTeacher: null,
              students: [],
              teachers: [],
              roomNumber: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <div className="grid gap-4 py-2">
                  {/* Section Name */}
                  <div className="grid grid-cols-4 items-center gap-2">
                    <Label
                      htmlFor="sectionName"
                      className="text-right font-semibold"
                    >
                      Section Name
                    </Label>
                    <Field
                      as={Input}
                      id="sectionName"
                      name="sectionName"
                      className="col-span-3"
                    />
                    <ErrorMessage
                      name="sectionName"
                      component="div"
                      className="text-red-500 col-span-4 text-right text-sm"
                    />
                  </div>

                  {/* Subjects */}
                  <div className="grid grid-cols-4 items-center gap-2">
                    <Label
                      htmlFor="subjects"
                      className="text-right font-semibold"
                    >
                      Subjects
                    </Label>
                    <Select
                      isMulti
                      name="subjects"
                      onChange={(options) => setFieldValue("subjects", options)}
                      options={subjectList}
                      className="col-span-3"
                    />
                    <ErrorMessage
                      name="subjects"
                      component="div"
                      className="text-red-500 col-span-4 text-right text-sm"
                    />
                  </div>

                  {/* Class Teacher */}
                  <div className="grid grid-cols-4 items-center gap-2">
                    <Label
                      htmlFor="classTeacher"
                      className="text-right font-semibold"
                    >
                      Class Teacher
                    </Label>
                    <Select
                      name="classTeacher"
                      onChange={(option) =>
                        setFieldValue("classTeacher", option)
                      }
                      options={teacherList}
                      className="col-span-3"
                    />
                    <ErrorMessage
                      name="classTeacher"
                      component="div"
                      className="text-red-500 col-span-4 text-right text-sm"
                    />
                  </div>

                  {/* Students */}
                  <div className="grid grid-cols-4 items-center gap-2">
                    <Label
                      htmlFor="students"
                      className="text-right font-semibold"
                    >
                      Students
                    </Label>
                    <Select
                      isMulti
                      name="students"
                      onChange={(options) => setFieldValue("students", options)}
                      options={studentList}
                      className="col-span-3"
                    />
                    <ErrorMessage
                      name="students"
                      component="div"
                      className="text-red-500 col-span-4 text-right text-sm"
                    />
                  </div>

                  {/* Teachers */}
                  <div className="grid grid-cols-4 items-center gap-2">
                    <Label
                      htmlFor="teachers"
                      className="text-right font-semibold"
                    >
                      Teachers
                    </Label>
                    <Select
                      isMulti
                      name="teachers"
                      onChange={(options) => setFieldValue("teachers", options)}
                      options={teacherList}
                      className="col-span-3"
                    />
                    <ErrorMessage
                      name="teachers"
                      component="div"
                      className="text-red-500 col-span-4 text-right text-sm"
                    />
                  </div>

                  {/* Room Number */}
                  <div className="grid grid-cols-4 items-center gap-2">
                    <Label
                      htmlFor="roomNumber"
                      className="text-right font-semibold"
                    >
                      Room Number
                    </Label>
                    <Field
                      as={Input}
                      id="roomNumber"
                      name="roomNumber"
                      className="col-span-3"
                    />
                    <ErrorMessage
                      name="roomNumber"
                      component="div"
                      className="text-red-500 col-span-4 text-right text-sm"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isSubmitting}>
                    Submit
                  </Button>
                </DialogFooter>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      <Dialog open={isSubjectDialogOpen} onOpenChange={setIsSubjectDialogOpen}>
        <DialogTrigger asChild>
          <Button className="rounded bg-black m-4 text-white" variant="outline">
            Add New Subject
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Add New Subject</DialogTitle>
            <DialogDescription>Add new subject for the class</DialogDescription>
          </DialogHeader>
          <Formik
            initialValues={{
              subjectName: "",
              section: "",
              teacher: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <div className="grid gap-4 py-2">
                  {/* Section Name */}
                  <div className="grid grid-cols-4 items-center gap-2">
                    <Label
                      htmlFor="subjectName"
                      className="text-right font-semibold"
                    >
                      Subject Name
                    </Label>
                    <Field
                      as={Input}
                      id="subjectName"
                      name="subjectName"
                      className="col-span-3"
                    />
                    <ErrorMessage
                      name="subjectName"
                      component="div"
                      className="text-red-500 col-span-4 text-right text-sm"
                    />
                  </div>

                  {/* Class Teacher */}
                  <div className="grid grid-cols-4 items-center gap-2">
                    <Label
                      htmlFor="section"
                      className="text-right font-semibold"
                    >
                      Section
                    </Label>
                    <Select
                      name="section"
                      onChange={(option) => setFieldValue("section", option)}
                      options={sectionList.map((item) => {
                        return {
                          label: item.sectionName,
                          value: item._id,
                        };
                      })}
                      className="col-span-3"
                    />
                    <ErrorMessage
                      name="section"
                      component="div"
                      className="text-red-500 col-span-4 text-right text-sm"
                    />
                  </div>

                  {/* Students */}
                  <div className="grid grid-cols-4 items-center gap-2">
                    <Label
                      htmlFor="students"
                      className="text-right font-semibold"
                    >
                      Teacher
                    </Label>
                    <Select
                      name="teacher"
                      onChange={(options) => setFieldValue("teacher", options)}
                      options={teacherList}
                      className="col-span-3"
                    />
                    <ErrorMessage
                      name="teacher"
                      component="div"
                      className="text-red-500 col-span-4 text-right text-sm"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isSubmitting}>
                    Submit
                  </Button>
                </DialogFooter>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      <div className="flex gap-4">
        {sectionList.length > 0 ? (
          sectionList.map((item) => (
            <Card
              key={item._id}
              onClick={() => router.push(pathname + "/" + item._id)}
              className="cursor-pointer w-60"
            >
              <CardHeader>
                <CardTitle>Section - {item.sectionName}</CardTitle>
              </CardHeader>

              <CardContent>
                <Trash2Icon
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item._id);
                    fetchSections();
                  }}
                />
                <p>Room Number: {item.roomNumber}</p>
                <p>Total Students: {item.students.length}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No section in this class</p>
        )}
      </div>
    </ClassLayout>
  );
};

export default Sections;
