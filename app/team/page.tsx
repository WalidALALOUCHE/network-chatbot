"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Team Member 1",
      role: "3IACN - Frontend Developer",
      image: "/placeholder.svg?height=300&width=300",
      description: "Worked on the chat interface and user experience design.",
      github: "https://github.com/",
      linkedin: "https://linkedin.com/in/",
    },
    {
      name: "Team Member 2",
      role: "3IACN - Backend Developer",
      image: "/placeholder.svg?height=300&width=300",
      description: "Developed the Python model training pipeline and Flask API.",
      github: "https://github.com/",
      linkedin: "https://linkedin.com/in/",
    },
    {
      name: "Team Member 3",
      role: "3IACN - Data Engineer",
      image: "/placeholder.svg?height=300&width=300",
      description: "Handled data processing and model fine-tuning.",
      github: "https://github.com/",
      linkedin: "https://linkedin.com/in/",
    },
    {
      name: "Team Member 4",
      role: "3IACN - DevOps Engineer",
      image: "/placeholder.svg?height=300&width=300",
      description: "Managed deployment and system integration.",
      github: "https://github.com/",
      linkedin: "https://linkedin.com/in/",
    },
    {
      name: "Team Member 5",
      role: "GSCSI - AI Researcher",
      image: "/placeholder.svg?height=300&width=300",
      description: "Researched and implemented network domain knowledge for the AI model.",
      github: "https://github.com/",
      linkedin: "https://linkedin.com/in/",
    },
    {
      name: "Team Member 6",
      role: "GSCSI - Project Manager",
      image: "/placeholder.svg?height=300&width=300",
      description: "Coordinated the team and ensured project milestones were met.",
      github: "https://github.com/",
      linkedin: "https://linkedin.com/in/",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Meet Our Team</h1>
          <p className="text-xl max-w-2xl mx-auto text-blue-100">
            The talented students from ENSA FES who built NetworkBot for the GenIA-TEXT v1.0 Competition
          </p>
        </div>
      </header>

      {/* Team section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer hover:scale-105 transform transition-transform"
              >
                <Link href={`/team/member-${index + 1}`} className="block">
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 mb-4">{member.description}</p>
                  </CardContent>
                </Link>
                <div className="flex space-x-3 px-6 pb-6">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-800"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                      />
                    </svg>
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-800"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                      />
                    </svg>
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* School section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block p-3 bg-blue-50 rounded-full mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-4">About ENSA FES</h2>
            <p className="text-lg text-gray-600 mb-6">
              École Nationale des Sciences Appliquées de Fès (ENSA Fès) is a prestigious engineering school in Morocco,
              known for its excellence in technical education and innovation. Our team consists of students from the
              3IACN (Computer Engineering) and GSCSI (Information Systems Management) programs.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-2">3IACN Program</h3>
                <p className="text-gray-600">
                  Computer Engineering program focusing on software development, networking, and systems architecture.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-2">GSCSI Program</h3>
                <p className="text-gray-600">
                  Information Systems Management program specializing in IT project management and business
                  intelligence.
                </p>
              </div>
            </div>
            <Link href="https://ensaf.ac.ma" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Visit ENSA FES Website
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Competition section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">About the Competition</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            The GenIA-TEXT v1.0 Competition challenged students to create a custom AI chatbot without using external
            APIs. Our team built NetworkBot, a specialized assistant for computer networks and telecommunications.
          </p>
          <Link href="/">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Back to Home
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 NetworkBot - ENSA FES Team - GenIA-TEXT v1.0 Competition</p>
        </div>
      </footer>
    </div>
  )
}
