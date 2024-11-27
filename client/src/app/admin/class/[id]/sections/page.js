'use client'

import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Select from 'react-select'

const Sections = () => {
  const params = useParams()
  const [sectionList, setSectionList] = useState([])

  const fetchSections = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/class/${params.id}/sections`)
      setSectionList(data)
    } catch (error) {
      console.error('Error fetching sections:', error)
    }
  }

  useEffect(() => {
    fetchSections()
  }, [])

  const validationSchema = Yup.object({
    sectionName: Yup.string().required('Section Name is required'),
    class: Yup.number().required('Class is required'),
    subjects: Yup.array().min(1, 'Select at least one subject').required('Subjects are required'),
    classTeacher: Yup.object().required('Class teacher name is required'),
    students: Yup.array().min(1, 'Select at least one student').required('Students are required'),
    teachers: Yup.array().min(1, 'Select at least one teacher').required('Teachers are required'),
    roomNumber: Yup.number().required('Room Number is required'),
  })

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log(values)
      resetForm()
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const [subjectList, setSubjectList] = useState([])
  const [teacherList, setTeacherList] = useState([])
  const [studentList, setStudentList] = useState([])

  const fetchSubjects = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/subjects')
      setSubjectList(data.map(({ subjectName, _id }) => ({ label: subjectName, value: _id })))
    } catch (error) {
      console.error('Error fetching subjects:', error)
    }
  }

  // fetch users according to the role and store it to the respective state
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/users')
      const teachers = data.filter(user => user.role === 'teacher').map(({ fullName, _id }) => ({ label: fullName, value: _id }))
      const students = data.filter(user => user.role === 'student').map(({ fullName, _id }) => ({ label: fullName, value: _id }))
      setTeacherList(teachers)
      setStudentList(students)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  useEffect(() => {
    fetchSubjects()
    fetchUsers()
  }, [])

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="rounded bg-black m-4 text-white" variant="outline">Add New Section</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Add New Section</DialogTitle>
            <DialogDescription>
              Add new section to this class
            </DialogDescription>
          </DialogHeader>
          <Formik
            initialValues={{
              sectionName: '',
              class: '',
              subjects: [],
              classTeacher: null,
              students: [],
              teachers: [],
              roomNumber: ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <div className="grid gap-4 py-2">

                  {/* Section Name */}
                  <div className="grid grid-cols-4 items-center gap-2">
                    <Label htmlFor="sectionName" className="text-right font-semibold">
                      Section Name
                    </Label>
                    <Field
                      as={Input}
                      id="sectionName"
                      name="sectionName"
                      className="col-span-3"
                    />
                    <ErrorMessage name="sectionName" component="div" className="text-red-500 col-span-4 text-right text-sm" />
                  </div>

                  {/* Class */}
                  <div className="grid grid-cols-4 items-center gap-2">
                    <Label htmlFor="subjects" className="text-right font-semibold">
                      Subjects
                    </Label>
                    <Select
                      isMulti
                      name="subjects"
                      onChange={options => setFieldValue('subjects', options)}
                      options={subjectList}
                      className="col-span-3"
                    />
                    <ErrorMessage name="subjects" component="div" className="text-red-500 col-span-4 text-right text-sm" />
                  </div>

                  {/* Class Teacher */}
                  <div className="grid grid-cols-4 items-center gap-2">
                    <Label htmlFor="classTeacher" className="text-right font-semibold">
                      Class Teacher
                    </Label>
                    <Select
                      name="classTeacher"
                      onChange={option => setFieldValue('classTeacher', option)}
                      options={teacherList}
                      className="col-span-3"
                    />
                    <ErrorMessage name="classTeacher" component="div" className="text-red-500 col-span-4 text-right text-sm" />
                  </div>

                  {/* Students */}
                  <div className="grid grid-cols-4 items-center gap-2">
                    <Label htmlFor="students" className="text-right font-semibold">
                      Students
                    </Label>
                    <Select
                      isMulti
                      name="students"
                      onChange={options => setFieldValue('students', options)}
                      options={studentList}
                      className="col-span-3"
                    />
                    <ErrorMessage name="students" component="div" className="text-red-500 col-span-4 text-right text-sm" />
                  </div>

                  {/* Teachers */}
                  <div className="grid grid-cols-4 items-center gap-2">
                    <Label htmlFor="teachers" className="text-right font-semibold">
                      Teachers
                    </Label>
                    <Select
                      isMulti
                      name="teachers"
                      onChange={options => setFieldValue('teachers', options)}
                      options={teacherList}
                      className="col-span-3"
                    />
                    <ErrorMessage name="teachers" component="div" className="text-red-500 col-span-4 text-right text-sm" />
                  </div>

                  {/* Room Number */}
                  <div className="grid grid-cols-4 items-center gap-2">
                    <Label htmlFor="roomNumber" className="text-right font-semibold">
                      Room Number
                    </Label>
                    <Field
                      as={Input}
                      id="roomNumber"
                      name="roomNumber"
                      className="col-span-3"
                    />
                    <ErrorMessage name="roomNumber" component="div" className="text-red-500 col-span-4 text-right text-sm" />
                  </div>

                </div>
                <DialogFooter>
                  <Button type='submit' disabled={isSubmitting}>Submit</Button>
                </DialogFooter>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      <div className='flex gap-4'>
        {sectionList.length > 0 && sectionList.map(item => (
          <div key={item._id} className='bg-black text-white p-4 w-36'>
            <div>Section - {item.sectionName}</div>
            <div>Total Students: {item.students.length}</div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Sections
