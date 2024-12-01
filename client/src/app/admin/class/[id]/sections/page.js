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
    const { data } = await axios.get(`http://localhost:8000/class/${params.id}/sections`)
    setSectionList(data)
  }

  useEffect(() => {
    fetchSections()
  }, [])

  const validationSchema = Yup.object({
    sectionName: Yup.string().required('Section Name is required'),
    class: Yup.number().required('Class is required'),
    subjects: Yup.string().required('Subject are required'),
    classTeacher: Yup.string().required('Class teacher name is required'),
    students: Yup.string().required('Students are required'),
    teachers: Yup.string().required('Teachers are required'),
    roomNumber: Yup.number().required('Room Number is required'),
  })

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    // Handle form submission
    console.log(values)
    // You can make your API request here
    setSubmitting(false)
    resetForm()
  }

  const [selectedSubjects, setSelectedSubjects] = useState([])
  const [subjectList, setSubjectList] = useState([])

  const setHandleChange = (item)=>{
    setSelectedSubjects(item)
  }

  const fetchSubjects = async() => {
  const {data} = await  axios.get('http://localhost:8000/subjects')
  const refactoredData = data.map((item)=>{
    item.label = item.subjectName
    item.value= item._id
    return item
  })
  setSubjectList(refactoredData)
  }
  useEffect(()=>{
    fetchSubjects()
    
  },[])
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
            initialValues={{ sectionName: '', class: '', subjects: '', classTeacher: '', students: '', teachers: '', roomNumber: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="grid gap-4 py-2 ">

                  {/* Section Name */}
                  <div className="grid grid-cols-4 items-center gap-2 ">
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

                  {/* Class*/}
                  <div className="grid grid-cols-4 items-center gap-2 ">
                    <Label htmlFor="class" className="text-right font-semibold">
                      Class
                    </Label>
                    <Field
                      as={Input}
                      disabled
                      value={2}
                      id="class"
                      name="class"
                      className="col-span-3"
                    />
                    <ErrorMessage name="class" component="div" className="text-red-500 col-span-4 text-right text-sm" />
                  </div>

                   {/* Subjects*/}
                   <div className="grid grid-cols-4 items-center gap-2 ">
                    <Label htmlFor="subjects" className="text-right font-semibold">
                      Subjects
                    </Label>
                    <Select   //here select id imported form the different component of react select library.
                      isMulti
                      value={selectedSubjects}
                      className='w-72'
                      onChange={setHandleChange}
                      options={subjectList}
                    />
                    <ErrorMessage name="subjects" component="div" className="text-red-500 col-span-4 text-right text-sm" />
                  </div>

                  {/* Class Teacher*/}
                  <div className="grid grid-cols-4 items-center gap-2 ">
                    <Label htmlFor="classTeacher" className="text-right font-semibold">
                      Class Teacher
                    </Label>
                    <Field
                      as={Input}
                      id="classTeacher"
                      name="classTeacher"
                      className="col-span-3"
                    />
                    <ErrorMessage name="classTeacher" component="div" className="text-red-500 col-span-4 text-right text-sm" />
                  </div>

                   {/* Students*/}
                   <div className="grid grid-cols-4 items-center gap-2 ">
                    <Label htmlFor="students" className="text-right font-semibold">
                      Students
                    </Label>
                    <Field
                      as={Input}
                      id="students"
                      name="students"
                      className="col-span-3"
                    />
                    <ErrorMessage name="students" component="div" className="text-red-500 col-span-4 text-right text-sm" />
                  </div>

                   {/* Teachers*/}
                   <div className="grid grid-cols-4 items-center gap-2 ">
                    <Label htmlFor="teachers" className="text-right font-semibold">
                    Teachers
                    </Label>
                    <Field
                      as={Input}
                      id="teachers"
                      name="teachers"
                      className="col-span-3"
                    />
                    <ErrorMessage name="teachers" component="div" className="text-red-500 col-span-4 text-right text-sm" />
                  </div>

                   {/* Room Number*/}
                   <div className="grid grid-cols-4 items-center gap-2 ">
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
                  <Button type="submit" disabled={isSubmitting}>Save </Button>
                </DialogFooter>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      <div className='flex gap-4'>
        {
          sectionList.length > 0 && sectionList.map((item) => {
            return (
              <div key={item._id} className='bg-black text-white p-4 w-36'>
                Section - {item.sectionName}
                Total Students: {item.students.length}
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default Sections
