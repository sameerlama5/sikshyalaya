'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, BarChart, Settings, MessageCircle, Lightbulb } from 'lucide-react'
import Link from "next/link"

export default function HomePageComponent() {
  const features = [
    {
      title: "Smart Learning",
      description: "AI-driven personalized learning experiences adapting in real-time to student performance. Engage with interactive virtual classrooms and gamified modules.",
      icon: <Lightbulb className="h-8 w-8 text-[#F5FF80]" />,
    },
    {
      title: "Community Hub",
      description: "Foster strong school-family-community connections. Facilitate seamless communication, event organization, and alumni networking.",
      icon: <Users className="h-8 w-8 text-[#F5FF80]" />,
    },
    {
      title: "Student Growth",
      description: "Nurture well-rounded individuals with extracurricular tracking, mental health resources, and career guidance programs.",
      icon: <BarChart className="h-8 w-8 text-[#F5FF80]" />,
    },
    {
      title: "Efficient Admin",
      description: "Streamline operations with automated timetables, digital document management, and integrated finance systems.",
      icon: <Settings className="h-8 w-8 text-[#F5FF80]" />,
    },
    {
      title: "Data Insights",
      description: "Make informed decisions with predictive analytics, performance tracking, and resource optimization tools.",
      icon: <BarChart className="h-8 w-8 text-[#F5FF80]" />,
    },
    {
      title: "Seamless Comms",
      description: "Keep everyone informed with multi-channel notifications, announcements, and secure messaging platforms.",
      icon: <MessageCircle className="h-8 w-8 text-[#F5FF80]" />,
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="relative">
   
        <div className="absolute top-4 right-4 space-x-4 mb-6">
          <Link href='/login'>
          <Button  variant="outline" className="bg-transparent text-[#F5FF80] border-[#F5FF80] hover:bg-[#F5FF80] hover:text-black">
            Login
            </Button>
            </Link>   

         
          <Link href='/register'>
          <Button className="bg-[#F5FF80] text-black hover:bg-[#F5FF80]/90">
            Register
            </Button>
            </Link>   
     
        </div>
       
        <div className="max-w-6xl mx-auto px-4  sm:px-6 lg:px-8 py-12">
          <header className="text-center m-[120px]  relative">
            
            <h1 className="text-8xl  sm:text-9xl font-mono italic font-bold mb-4 bg-gradient-to-r from-[#d5d6c0] via-[#FFFF00] to-[#dcdeca] inline-block text-transparent bg-clip-text">
              Sikshyalaya
            </h1>
            <span className="absolute  top-1/3 -translate-y-1/2 text-2xl sm:text-6xl font-mono italic font-bold -rotate-90 origin-center bg-gradient-to-r from-[#F5FF80] via-[#FFFF00] to-[#F5FF80] inline-block text-transparent bg-clip-text">
              Pro
            </span>
            <p className="text-xl text-gray-400 mt-8">Revolutionizing School Management for the Digital Age</p>
          </header>

          <main>
            <section className="mb-16 text-center">
              <h2 className="text-3xl font-bold mb-6 text-[#F5FF80]">Welcome to the Future of Education Management</h2>
              <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
                EduSync Pro is an all-in-one platform designed to empower schools, teachers, students, and parents with
                cutting-edge tools for seamless educational experiences. Discover how our innovative features can transform your institution.
              </p>
              <Button className="bg-[#F5FF80] hover:bg-[#F5FF80]/90 text-black text-lg py-2 px-4">
                Explore Features <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </section>

            <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="max-w-2xl mx-auto backdrop-blur-sm bg-white/10 rounded-2xl shadow-[0_0_15px_rgba(255,255,255,0.07)] p-8 border border-white/10"
                >
                  <CardHeader>
                    <CardTitle className="text-xl text-white font-bold flex items-center gap-3">
                      {feature.icon}
                      <span>{feature.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </section>
          </main>

          <footer className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-4 text-[#F5FF80]">Ready to transform your school?</h3>
            <p className="text-lg mb-8 text-gray-300">Join the growing number of institutions using EduSync Pro to revolutionize education management.</p>
            <Button className="bg-[#F5FF80] hover:bg-[#F5FF80]/90 text-black text-lg py-2 px-4">
              Request a Demo
            </Button>
            <p className="mt-8 text-gray-500">
              &copy; 2023 EduSync Pro. Empowering educational institutions worldwide.
            </p>
          </footer>
        </div>
      </div>
    </div>
  )
}