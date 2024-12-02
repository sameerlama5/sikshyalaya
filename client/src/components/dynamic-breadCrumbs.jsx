'use client'

import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

const BreadCrumbsItem = ({depth})=>{
    const params = useParams()
    const pathName = usePathname()
    return (
      <>
      {depth >0 &&  <Link href="/admin/class">Class /</Link> }
      { depth>1 &&  <Link href={`/admin/class/${params.classId}/sections`}>Sections /</Link> }
       {depth>2 && <Link href={`/admin/class/${params.classId}/sections/${params.sectionId}`}>Section A /</Link>}
      </>
    )
  }

  export default BreadCrumbsItem