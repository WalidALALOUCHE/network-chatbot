import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Github, Linkedin, Mail } from "lucide-react"

export default function Member5Page() {
  const member = {
    name: "Fifth Member of the Team",
    role: "GSCSI - AI Researcher",
    image: "/placeholder.svg?height=400&width=400",
    description:
      "Specialized in AI research and network domain knowledge implementation. Focused on enhancing the AI model's understanding of networking concepts.",
    longDescription:
      "As our AI researcher from the GSCSI program, this team member has brought invaluable expertise in artificial intelligence and domain-specific knowledge integration. They have researched and implemented advanced techniques to enhance NetworkBot's understanding of networking concepts, ensuring that the AI can provide accurate and contextually relevant responses to complex networking questions. Their work bridges the gap between theoretical AI concepts and practical networking applications.",
    skills: [
      "AI Research",
      "Natural Language Processing",
      "Domain Knowledge Engineering",
      "Model Architecture",
      "Research Methodology",
      "Technical Writing",
    ],
    github: "https://github.com/",
    linkedin: "https://linkedin.com/in/",
    email: "member5@ensaf.ac.ma",
    achievements: [
      "Researched and implemented network domain knowledge",
      "Enhanced AI model's understanding of networking concepts",
      "Developed knowledge base for networking terminology",
      "Improved model accuracy through domain-specific training",
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-teal-600 to-cyan-700 text-white">
        <div className="container mx-auto px-4 py-8">
          <Link href="/team" className="inline-flex items-center text-teal-100 hover:text-white mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Team
          </Link>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-48 h-48 rounded-full overflow-hidden bg-white/10 backdrop-blur-sm">
              <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-full object-cover" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">{member.name}</h1>
              <p className="text-xl text-teal-100 mb-4">{member.role}</p>
              <p className="text-lg text-teal-50 max-w-2xl">{member.description}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* About */}
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">About</h2>
                  <p className="text-gray-600 leading-relaxed">{member.longDescription}</p>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Key Achievements</h2>
                  <ul className="space-y-3">
                    {member.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Contact</h3>
                  <div className="space-y-3">
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 hover:text-teal-600 transition-colors"
                    >
                      <Github className="h-5 w-5 mr-3" />
                      GitHub
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 hover:text-teal-600 transition-colors"
                    >
                      <Linkedin className="h-5 w-5 mr-3" />
                      LinkedIn
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center text-gray-600 hover:text-teal-600 transition-colors"
                    >
                      <Mail className="h-5 w-5 mr-3" />
                      Email
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
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
