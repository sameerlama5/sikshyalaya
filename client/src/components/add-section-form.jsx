'use client';
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function AddSectionForm({
  onSuccess
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [section, setSection] = useState('')
  const [totalStudents, setTotalStudents] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('https://localhost:8000/class/section', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          section: section,
          "Total Students": totalStudents
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to add section')
      }

      // Reset form and call onSuccess to close dialog and refresh sections
      setSection('')
      setTotalStudents('')
      onSuccess()
      
    } catch (error) {
      console.error('Error adding section:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    (<form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="section" className="text-gray-200">
          Section
        </Label>
        <Input
          id="section"
          placeholder="Enter section (e.g. A)"
          value={section}
          onChange={(e) => setSection(e.target.value)}
          className="bg-gray-900 border-gray-800 text-white"
          required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="totalStudents" className="text-gray-200">
          Total Students
        </Label>
        <Input
          id="totalStudents"
          type="number"
          placeholder="Enter total number of students"
          value={totalStudents}
          onChange={(e) => setTotalStudents(e.target.value)}
          className="bg-gray-900 border-gray-800 text-white"
          required />
      </div>
      <Button
        type="submit"
        className="w-full bg-white text-black hover:bg-gray-200"
        disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add Section'}
      </Button>
    </form>)
  );
}

