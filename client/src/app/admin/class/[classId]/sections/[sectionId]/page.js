'use client'
import SubjectForm from '@/components/add-subject'
import React, { useEffect, useState } from 'react'
import ClassLayout from '../../../classLayout'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import BreadCrumbsItem from '@/components/dynamic-breadCrumbs'
import axios from 'axios'



const Section = () => {
  const params = useParams()
  const  [sectionDetails ,setSectionDetails] = useState({})
  const fetchSectionDetails =async ()=>{
    const {data} =await axios.get('http://localhost:8000/sections/'+ params.sectionId)
    setSectionDetails(data)
  }
  useEffect(()=>{
    fetchSectionDetails()
  },[])
  return (
    <ClassLayout breadCrumbsItem={<BreadCrumbsItem depth={3}/>}>


    <SubjectForm/>
    {JSON.stringify(sectionDetails)}
    </ClassLayout>
  )
}

export default Section