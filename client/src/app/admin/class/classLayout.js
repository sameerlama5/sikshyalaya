import Link from 'next/link'
import React from 'react'

const ClassLayout = ({children, breadCrumbsItem}) => {
  return (
    <div >
        {breadCrumbsItem}
        {children}
        </div>
  )
}

export default ClassLayout