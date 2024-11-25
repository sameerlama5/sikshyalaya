'use client';
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation';

export default function ClassManagement() {
  const [classes, setClasses] = useState([])
  const [gradeLevel, setGradeLevel] = useState('')
  const [academicYear, setAcademicYear] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  useEffect(() => {
    fetchClasses()
  }, [])

  const fetchClasses = async () => {
    try {
      const response = await fetch('http://localhost:8000/class')
      if (!response.ok) throw new Error('Failed to fetch classes')
      const data = await response.json()
      setClasses(data)
    } catch (error) {
      toast.error('Failed to fetch classes')
    }
  }

  const addClass = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch('http://localhost:8000/class', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gradeLevel: Number(gradeLevel), academicYear }),
      })
      if (!response.ok) throw new Error('Failed to add class')
      toast.success('Class added successfully')
      setGradeLevel('')
      setAcademicYear('')
      fetchClasses()
    } catch (error) {
      toast.error('Failed to add class')
    } finally {
      setLoading(false)
    }
  }

  return (
    (<div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Class Management</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New Class</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={addClass} className="space-y-4">
            <Input
              type="number"
              placeholder="Grade Level"
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
              required />
            <Input
              type="text"
              placeholder="Academic Year"
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              required />
            <Button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Class'}
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Existing Classes</CardTitle>
        </CardHeader>
        <CardContent>
          {classes.length > 0 ? (
            <ul className="space-y-2 text-black">
              {classes.map((cls) => (
                <li onClick={()=>router.push(`class/${cls._id}/sections`)} key={cls._id} className="bg-gray-100 p-2 rounded">
                  Grade {cls.gradeLevel} - {cls.academicYear}
                </li>
              ))}
            </ul>
          ) : (
            <p>No classes found.</p>
          )}
        </CardContent>
      </Card>
      <ToastContainer />
    </div>)
  );
}

