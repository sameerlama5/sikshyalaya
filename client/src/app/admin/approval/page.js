'use client'
import UserApprovalTable from '@/hooks/user-approval-table'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Approval = () => {

  const [userList, setUserList] = useState([])
  const fetchUsers =  async()=>{
    const {data} = await axios.get('http://localhost:8080/users')
    setUserList(data)
  }
  useEffect(()=>{
    fetchUsers()
  },[])
  if(userList.length == 0)  return "loading..."
  // const rowClass = 'w-[100px] border border-black p-4'
  // const rowClassHeader = 'w-[100px] border border-black p-4 bg-black text-white'

  return (
    <div className='flex flex-col gap-6'>
     <span className='text-4xl font-mono '>Pending Approvals:</span> 
      <UserApprovalTable userList={userList} fetchUsers={fetchUsers}  />

    </div>
  )
}

export default Approval



// <table>
// <td className={rowClassHeader}>role</td>
// <td className={rowClassHeader}>father name</td>
// <td className={rowClassHeader}>mother name</td>
// </table>

// {userList.map((item)=>{
// return (
//   <tr >
//             <td className={rowClass}>{item.role}</td>
//             <td className={rowClass}>{item.motherName}</td>
//             <td className={rowClass}>{item.fatherName}</td>
//   </tr>

// )
// })}

