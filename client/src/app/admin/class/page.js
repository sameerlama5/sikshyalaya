import ClassManagement from '@/components/class-admin'
import React from 'react'
import ClassLayout from './classLayout'
import Link from 'next/link'
import BreadCrumbsItem from '@/components/dynamic-breadCrumbs'

const Class = () => {
  return (
    <ClassLayout breadCrumbsItem ={<BreadCrumbsItem depth={1}/>}>
      <ClassManagement/>
    </ClassLayout>
  )
}

export default Class