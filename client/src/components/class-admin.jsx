'use client';

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { toast, ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { useRouter } from 'next/navigation';

export default function ClassManagement() {
  const [classes, setClasses] = useState([])
  const [gradeLevel, setGradeLevel] = useState('')
  const [academicYear, setAcademicYear] = useState('')
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
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
      toast({
        title: "Error",
        description: error.response?.message,
        variant: "destructive",
      })
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
      const data = await response.json()
      toast({
        title: response.status ==200 ? "Success": "Failed",
        description: data.msg,
      })
      setGradeLevel('')
      setAcademicYear('')
      fetchClasses()
    } catch (error) {
      debugger;
      toast({
        title: "Error",
        description:  error.response?.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Class Management</h1>
      <div className='flex flex-col gap-4'>
        <Card className="bg-transparent border-black border border-opacity-30 w-1/3">
          <CardHeader>
            <CardTitle className="text-xl text-black bg-gray-200 p-2">Add New Class</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={addClass} className="space-y-4">
              <div>
                <label htmlFor="gradeLevel" className="block text-sm font-medium text-black mb-1">
                  Grade Level
                </label>
                <Input
                  id="gradeLevel"
                  type="number"
                  placeholder="Enter grade level"
                  value={gradeLevel}
                  onChange={(e) => setGradeLevel(e.target.value)}
                  className='text-black'
                  required
                  min="1"
                  max="12"
                />
              </div>
              <div>
                <label htmlFor="academicYear" className="block text-sm font-medium text-black mb-1">
                  Academic Year
                </label>
                <Input
                  id="academicYear"
                  type="text"
                  placeholder="Enter academic year"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  className='text-black'
                  required
                  title="Please enter the academic year"
                />
              </div>
              <Button type="submit" disabled={loading} className="rounded bg-black text-white mt-20" variant="outline">{loading ? 'Adding...' : 'Add Class'}</Button>
            </form>
          </CardContent>
        </Card>
        <Card className="bg-transparent  border-black border border-opacity-30 w-full">
          <CardHeader>
            <CardTitle className="text-xl text-black bg-gray-200 p-2">Existing Classes</CardTitle>
          </CardHeader>
          <CardContent>
            {classes.length > 0 ? (
              <div className=" text-black flex gap-4 flex-wrap">
                {classes.map((item) => (
                  <Card key={item._id} onClick={() => router.push(`class/${item._id}/sections`)} className='cursor-pointer w-[229px] hover:opacity-95 rounded-none'>
                    <CardHeader>
                      <CardTitle>Grade - {item.gradeLevel}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Year: {item.academicYear}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className='text-black'>No classes found.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Toaster />
    </div>
  );
}

