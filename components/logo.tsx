interface LogoProps {
  size?: number
  className?: string
  showText?: boolean
}

export function NetMindLogo({ size = 40, className = "", showText = true }: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      {/* Logo Icon */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2"
      >
        {/* Background Circle */}
        <circle cx="50" cy="50" r="45" fill="url(#gradient)" stroke="#1e40af" strokeWidth="2" />

        {/* Network Nodes */}
        <circle cx="30" cy="25" r="4" fill="#ffffff" />
        <circle cx="70" cy="25" r="4" fill="#ffffff" />
        <circle cx="20" cy="50" r="4" fill="#ffffff" />
        <circle cx="50" cy="40" r="5" fill="#ffffff" />
        <circle cx="80" cy="50" r="4" fill="#ffffff" />
        <circle cx="35" cy="75" r="4" fill="#ffffff" />
        <circle cx="65" cy="75" r="4" fill="#ffffff" />

        {/* Network Connections */}
        <g stroke="#ffffff" strokeWidth="2" opacity="0.8">
          <line x1="30" y1="25" x2="50" y2="40" />
          <line x1="70" y1="25" x2="50" y2="40" />
          <line x1="20" y1="50" x2="50" y2="40" />
          <line x1="50" y1="40" x2="80" y2="50" />
          <line x1="50" y1="40" x2="35" y2="75" />
          <line x1="50" y1="40" x2="65" y2="75" />
          <line x1="35" y1="75" x2="65" y2="75" />
        </g>

        {/* Brain/AI Element in Center */}
        <path d="M45 35 Q50 30 55 35 Q60 40 55 45 Q50 50 45 45 Q40 40 45 35" fill="#fbbf24" opacity="0.9" />

        {/* Pulse Animation Circles */}
        <circle cx="50" cy="40" r="8" fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.6">
          <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* Gradient Definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#1e40af" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
        </defs>
      </svg>

      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-bold text-blue-600">NetMind</span>
          <span className="text-xs text-gray-500 -mt-1">ENSA FES</span>
        </div>
      )}
    </div>
  )
}

export function NetMindLogoCompact({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background Circle */}
      <circle cx="50" cy="50" r="45" fill="url(#compactGradient)" stroke="#1e40af" strokeWidth="3" />

      {/* Simplified Network Pattern */}
      <g stroke="#ffffff" strokeWidth="2" opacity="0.9">
        {/* Hexagonal network pattern */}
        <polygon points="50,20 65,35 65,65 50,80 35,65 35,35" fill="none" stroke="#ffffff" strokeWidth="2" />
        <circle cx="50" cy="50" r="8" fill="#fbbf24" />
        <circle cx="50" cy="35" r="3" fill="#ffffff" />
        <circle cx="35" cy="50" r="3" fill="#ffffff" />
        <circle cx="65" cy="50" r="3" fill="#ffffff" />
        <circle cx="50" cy="65" r="3" fill="#ffffff" />

        {/* Connections */}
        <line x1="50" y1="35" x2="50" y2="42" />
        <line x1="35" y1="50" x2="42" y2="50" />
        <line x1="65" y1="50" x2="58" y2="50" />
        <line x1="50" y1="65" x2="50" y2="58" />
      </g>

      {/* Letter N in center */}
      <text
        x="50"
        y="55"
        textAnchor="middle"
        fill="#1e40af"
        fontSize="16"
        fontWeight="bold"
        fontFamily="Arial, sans-serif"
      >
        N
      </text>

      <defs>
        <linearGradient id="compactGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Alternative Logo Variations
export function NetMindLogoMinimal({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Simple geometric design */}
      <rect x="10" y="10" width="80" height="80" rx="20" fill="#3b82f6" />

      {/* Network grid */}
      <g stroke="#ffffff" strokeWidth="2" opacity="0.8">
        <line x1="30" y1="30" x2="70" y2="30" />
        <line x1="30" y1="50" x2="70" y2="50" />
        <line x1="30" y1="70" x2="70" y2="70" />
        <line x1="30" y1="30" x2="30" y2="70" />
        <line x1="50" y1="30" x2="50" y2="70" />
        <line x1="70" y1="30" x2="70" y2="70" />
      </g>

      {/* Central brain/AI dot */}
      <circle cx="50" cy="50" r="6" fill="#fbbf24" />

      {/* Corner nodes */}
      <circle cx="30" cy="30" r="3" fill="#ffffff" />
      <circle cx="70" cy="30" r="3" fill="#ffffff" />
      <circle cx="30" cy="70" r="3" fill="#ffffff" />
      <circle cx="70" cy="70" r="3" fill="#ffffff" />
    </svg>
  )
}
