'use client';
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'
import AddSectionForm from './add-section-form'

export default function SectionsPage() {
  const [sections, setSections] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    fetchSections()
  }, [])

  async function fetchSections() {
    try {
      const response = await fetch('https://localhost:8000/class/section')
      const data = await response.json()
      setSections(data)
    } catch (error) {
      console.error('Error fetching sections:', error)
    } finally {
      setIsLoading(false)
    }
  }

  function handleAddSuccess() {
    fetchSections()
    setIsDialogOpen(false)
  }

  return (
    (<div className="min-h-screen bg-black p-4">
      <div className="max-w-4xl mx-auto">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-black text-white border border-white hover:bg-white hover:text-black">
              Add New Section
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-black border-gray-800">
            <DialogHeader>
              <DialogTitle className="text-white">Add New Section</DialogTitle>
            </DialogHeader>
            <AddSectionForm onSuccess={handleAddSuccess} />
          </DialogContent>
        </Dialog>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {isLoading ? (
            <p className="text-white">Loading sections...</p>
          ) : (
            sections.map((section) => (
              <Card key={section._id} className="bg-white">
                <CardContent className="p-4">
                  <h3 className="text-black text-lg font-semibold mb-2">Section {section.section}</h3>
                  <p className="text-gray-600">Total Students: {section["Total Student"]}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>)
  );
}

