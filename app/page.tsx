import Link from "next/link"
import { Button } from "@/components/ui/button"
import { NetMindLogo } from "@/components/logo"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <NetMindLogo size={48} />
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/about"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                About
              </Link>
              <div className="relative group">
                <Link
                  href="/team"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium flex items-center"
                >
                  Team
                  <svg
                    className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <Link
                      href="/team"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium border-b border-gray-100"
                    >
                      NetMind Team
                    </Link>
                    <Link
                      href="/team/member-1"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      First Member of the Team
                    </Link>
                    <Link
                      href="/team/member-2"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      Second Member of the Team
                    </Link>
                    <Link
                      href="/team/member-3"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      Third Member of the Team
                    </Link>
                    <Link
                      href="/team/member-4"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      Fourth Member of the Team
                    </Link>
                    <Link
                      href="/team/member-5"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      Fifth Member of the Team
                    </Link>
                    <Link
                      href="/team/member-6"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      Sixth Member of the Team
                    </Link>
                  </div>
                </div>
              </div>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-3">
                <Link href="/login">
                  <Button variant="ghost" className="text-gray-600 hover:text-blue-600 hover:bg-blue-50">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">Get Started</Button>
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" className="text-gray-600">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <div className="flex items-center mb-6">
                <NetMindLogo size={64} showText={false} />
                <div className="ml-4">
                  <h1 className="text-5xl font-bold text-gray-900">NetMind</h1>
                  <p className="text-lg text-blue-600 font-medium">Your Intelligent Network Assistant</p>
                </div>
              </div>

              <p className="text-xl mb-8 text-gray-600 leading-relaxed">
                Master computer networks and telecommunications with AI-powered assistance. Get instant, expert-level
                answers to all your networking questions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>

              <div className="mt-8 flex items-center text-sm text-gray-500">
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold mr-3">
                  ENSA FES
                </div>
                <span>GenIA-TEXT v1.0 Competition Project</span>
              </div>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                {/* Large logo with animation */}
                <div className="w-80 h-80 relative">
                  <svg
                    width="320"
                    height="320"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-2xl"
                  >
                    {/* Animated background */}
                    <circle cx="50" cy="50" r="45" fill="url(#heroGradient)" stroke="#1e40af" strokeWidth="1" />

                    {/* Animated network connections */}
                    <g stroke="#ffffff" strokeWidth="1.5" opacity="0.9">
                      <line x1="30" y1="25" x2="50" y2="40">
                        <animate
                          attributeName="opacity"
                          values="0.3;1;0.3"
                          dur="3s"
                          repeatCount="indefinite"
                          begin="0s"
                        />
                      </line>
                      <line x1="70" y1="25" x2="50" y2="40">
                        <animate
                          attributeName="opacity"
                          values="0.3;1;0.3"
                          dur="3s"
                          repeatCount="indefinite"
                          begin="0.5s"
                        />
                      </line>
                      <line x1="20" y1="50" x2="50" y2="40">
                        <animate
                          attributeName="opacity"
                          values="0.3;1;0.3"
                          dur="3s"
                          repeatCount="indefinite"
                          begin="1s"
                        />
                      </line>
                      <line x1="50" y1="40" x2="80" y2="50">
                        <animate
                          attributeName="opacity"
                          values="0.3;1;0.3"
                          dur="3s"
                          repeatCount="indefinite"
                          begin="1.5s"
                        />
                      </line>
                      <line x1="50" y1="40" x2="35" y2="75">
                        <animate
                          attributeName="opacity"
                          values="0.3;1;0.3"
                          dur="3s"
                          repeatCount="indefinite"
                          begin="2s"
                        />
                      </line>
                      <line x1="50" y1="40" x2="65" y2="75">
                        <animate
                          attributeName="opacity"
                          values="0.3;1;0.3"
                          dur="3s"
                          repeatCount="indefinite"
                          begin="2.5s"
                        />
                      </line>
                    </g>

                    {/* Network nodes with pulse */}
                    <g fill="#ffffff">
                      <circle cx="30" cy="25" r="3">
                        <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" begin="0s" />
                      </circle>
                      <circle cx="70" cy="25" r="3">
                        <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" begin="0.3s" />
                      </circle>
                      <circle cx="20" cy="50" r="3">
                        <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" begin="0.6s" />
                      </circle>
                      <circle cx="80" cy="50" r="3">
                        <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" begin="0.9s" />
                      </circle>
                      <circle cx="35" cy="75" r="3">
                        <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" begin="1.2s" />
                      </circle>
                      <circle cx="65" cy="75" r="3">
                        <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" begin="1.5s" />
                      </circle>
                    </g>

                    {/* Central AI brain */}
                    <circle cx="50" cy="40" r="8" fill="#fbbf24">
                      <animate attributeName="r" values="8;10;8" dur="4s" repeatCount="indefinite" />
                    </circle>

                    {/* Pulse rings */}
                    <circle cx="50" cy="40" r="12" fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.6">
                      <animate attributeName="r" values="12;20;12" dur="3s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite" />
                    </circle>

                    <defs>
                      <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#60a5fa" />
                        <stop offset="50%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#1e40af" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold animate-bounce">
                  AI Powered
                </div>
                <div className="absolute -bottom-4 -left-4 bg-green-400 text-green-900 px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                  24/7 Available
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <NetMindLogo size={40} />
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm">© 2025 NetMind - ENSA FES Team</p>
              <p className="text-xs text-gray-500">GenIA-TEXT v1.0 Competition</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
