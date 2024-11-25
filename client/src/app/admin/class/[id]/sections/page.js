'use client'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Sections = () => {
  const params = useParams()
  const [sectionList, setSectionList] =useState([])
  const fetchSections = async ()=>{
    const {data} =await axios.get(`http://localhost:8000/class/${params.id}/sections`)
    setSectionList(data)
  }
  useEffect(()=>{
    fetchSections()
  },[])

  return (
    <>
      <Button className="rounded bg-black m-4 text-white">Add New Section</Button>

    <div className='flex gap-4'>
      {
        sectionList.length>0 && sectionList.map((item)=>{
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