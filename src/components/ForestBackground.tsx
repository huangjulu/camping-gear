export function ForestBackground() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 pointer-events-none z-0"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 220"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMax meet"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      >
        {/* Back row - darkest */}
        <g fill="#1a3a2a" className="animate-sway-slow" style={{ animationDelay: '0s' }}>
          <polygon points="80,180 110,100 140,180" />
          <polygon points="105,180 110,90 115,180" />
        </g>
        <g fill="#1a3a2a" className="animate-sway-slow" style={{ animationDelay: '1s' }}>
          <polygon points="280,180 320,80 360,180" />
          <polygon points="310,180 320,68 330,180" />
        </g>
        <g fill="#1a3a2a" className="animate-sway-slow" style={{ animationDelay: '2s' }}>
          <polygon points="500,180 540,90 580,180" />
        </g>
        <g fill="#1a3a2a" className="animate-sway-slow" style={{ animationDelay: '0.5s' }}>
          <polygon points="720,180 760,75 800,180" />
          <polygon points="748,180 760,62 772,180" />
        </g>
        <g fill="#1a3a2a" className="animate-sway-slow" style={{ animationDelay: '1.5s' }}>
          <polygon points="960,180 995,85 1030,180" />
        </g>
        <g fill="#1a3a2a" className="animate-sway-slow" style={{ animationDelay: '0.8s' }}>
          <polygon points="1180,180 1220,78 1260,180" />
          <polygon points="1208,180 1220,65 1232,180" />
        </g>
        <g fill="#1a3a2a" className="animate-sway-slow" style={{ animationDelay: '2.2s' }}>
          <polygon points="1360,180 1400,88 1440,180" />
        </g>

        {/* Mid row */}
        <g fill="#1f4a2f" className="animate-sway" style={{ animationDelay: '0.3s' }}>
          <polygon points="0,200 50,110 100,200" />
          <polygon points="35,200 50,98 65,200" />
        </g>
        <g fill="#1f4a2f" className="animate-sway" style={{ animationDelay: '1.2s' }}>
          <polygon points="180,200 230,105 280,200" />
          <polygon points="212,200 230,92 248,200" />
        </g>
        <g fill="#244d33" className="animate-sway" style={{ animationDelay: '0.7s' }}>
          <polygon points="400,200 445,115 490,200" />
        </g>
        <g fill="#1f4a2f" className="animate-sway" style={{ animationDelay: '1.8s' }}>
          <polygon points="620,200 665,100 710,200" />
          <polygon points="648,200 665,88 682,200" />
        </g>
        <g fill="#244d33" className="animate-sway" style={{ animationDelay: '0.4s' }}>
          <polygon points="840,200 885,108 930,200" />
        </g>
        <g fill="#1f4a2f" className="animate-sway" style={{ animationDelay: '1.4s' }}>
          <polygon points="1060,200 1110,102 1160,200" />
          <polygon points="1093,200 1110,90 1127,200" />
        </g>
        <g fill="#244d33" className="animate-sway" style={{ animationDelay: '2.5s' }}>
          <polygon points="1280,200 1330,112 1380,200" />
        </g>
        <g fill="#1f4a2f" className="animate-sway" style={{ animationDelay: '0.9s' }}>
          <polygon points="1380,200 1420,118 1460,200" />
        </g>

        {/* Front row - lightest */}
        <g fill="#2d6040" className="animate-sway" style={{ animationDelay: '0.6s' }}>
          <polygon points="-20,220 40,130 100,220" />
          <polygon points="18,220 40,118 62,220" />
        </g>
        <g fill="#286038" className="animate-sway" style={{ animationDelay: '1.6s' }}>
          <polygon points="130,220 185,125 240,220" />
          <polygon points="162,220 185,112 208,220" />
        </g>
        <g fill="#2d6040" className="animate-sway" style={{ animationDelay: '0.2s' }}>
          <polygon points="350,220 400,132 450,220" />
        </g>
        <g fill="#286038" className="animate-sway" style={{ animationDelay: '1.1s' }}>
          <polygon points="550,220 610,120 670,220" />
          <polygon points="582,220 610,108 638,220" />
        </g>
        <g fill="#2d6040" className="animate-sway" style={{ animationDelay: '2.1s' }}>
          <polygon points="780,220 835,128 890,220" />
        </g>
        <g fill="#286038" className="animate-sway" style={{ animationDelay: '0.1s' }}>
          <polygon points="990,220 1050,122 1110,220" />
          <polygon points="1022,220 1050,110 1078,220" />
        </g>
        <g fill="#2d6040" className="animate-sway" style={{ animationDelay: '1.9s' }}>
          <polygon points="1200,220 1260,130 1320,220" />
          <polygon points="1232,220 1260,118 1288,220" />
        </g>
        <g fill="#286038" className="animate-sway" style={{ animationDelay: '0.4s' }}>
          <polygon points="1380,220 1430,135 1480,220" />
        </g>

        {/* Ground */}
        <rect x="0" y="200" width="1440" height="20" fill="#1a3a2a" />
      </svg>
    </div>
  )
}
