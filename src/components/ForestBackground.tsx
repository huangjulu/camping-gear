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
        <defs>
          <radialGradient id="fire-glow" cx="50%" cy="80%" r="50%">
            <stop offset="0%" stopColor="#ff8c00" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ff8c00" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="lantern-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffcc44" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#ffcc44" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="moon-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f5e88a" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#f5e88a" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── 月亮 ───────────────────────────────────── */}
        <ellipse cx="1355" cy="38" rx="30" ry="30" fill="url(#moon-glow)" className="animate-glow" />
        {/* Crescent: yellow circle + bg-colour overlay = crescent shape */}
        <circle cx="1352" cy="38" r="18" fill="#f5e060" opacity="0.92" />
        <circle cx="1363" cy="33" r="13" fill="#f0faf7" />

        {/* ── 星星 ───────────────────────────────────── */}
        {[
          { cx: 90,   cy: 18, delay: '0s',    r: 1.8 },
          { cx: 310,  cy: 10, delay: '0.8s',  r: 1.4 },
          { cx: 490,  cy: 28, delay: '1.5s',  r: 1.6 },
          { cx: 640,  cy: 8,  delay: '0.3s',  r: 1.2 },
          { cx: 830,  cy: 22, delay: '2.0s',  r: 1.5 },
          { cx: 1020, cy: 14, delay: '1.1s',  r: 1.7 },
          { cx: 1180, cy: 32, delay: '0.5s',  r: 1.3 },
          { cx: 1270, cy: 6,  delay: '1.7s',  r: 1.4 },
          { cx: 430,  cy: 5,  delay: '2.3s',  r: 1.0 },
          { cx: 750,  cy: 38, delay: '0.9s',  r: 1.2 },
        ].map(({ cx, cy, delay, r }, i) => (
          <circle
            key={i}
            cx={cx} cy={cy} r={r}
            fill="#fff8d0"
            opacity="0.85"
            className="animate-twinkle"
            style={{ animationDelay: delay }}
          />
        ))}

        {/* ── 後排樹（最暗）─────────────────────────── */}
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

        {/* ── 天幕 (tarp) ────────────────────────────── */}
        {/* 掛在後排樹之間，x=820~1000，y≈148 */}
        {/* 固定繩從樹上 */}
        <line x1="810" y1="132" x2="832" y2="148" stroke="#5a4a2a" strokeWidth="0.9" opacity="0.4" />
        <line x1="1095" y1="128" x2="1068" y2="148" stroke="#5a4a2a" strokeWidth="0.9" opacity="0.4" />
        {/* 天幕布面 */}
        <path d="M832,148 Q950,162 1068,148 L1062,155 Q950,170 838,155 Z" fill="#6b9c5a" opacity="0.38" />
        <path d="M832,148 Q950,162 1068,148" fill="none" stroke="#4a7a3a" strokeWidth="1.2" opacity="0.45" />
        {/* 地釘繩 */}
        <line x1="835" y1="152" x2="815" y2="205" stroke="#5a4a2a" strokeWidth="0.8" opacity="0.3" />
        <line x1="1065" y1="152" x2="1085" y2="205" stroke="#5a4a2a" strokeWidth="0.8" opacity="0.3" />
        {/* 地釘 */}
        <line x1="812" y1="203" x2="818" y2="210" stroke="#5a4a2a" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
        <line x1="1082" y1="203" x2="1088" y2="210" stroke="#5a4a2a" strokeWidth="2" strokeLinecap="round" opacity="0.45" />

        {/* ── 中排樹 ─────────────────────────────────── */}
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

        {/* ── 帳篷 1（橘棕色，x≈480）────────────────── */}
        {/* 左牆面（稍暗） */}
        <polygon points="450,213 482,178 482,213" fill="#b07848" opacity="0.92" />
        {/* 右牆面 */}
        <polygon points="482,178 514,213 482,213" fill="#c98b55" opacity="0.92" />
        {/* 帳篷門 */}
        <polygon points="474,213 482,196 490,213" fill="#1e0f05" opacity="0.4" />
        {/* 頂端裝飾 */}
        <circle cx="482" cy="178" r="2.5" fill="#8b5e30" />
        {/* 營釘繩 */}
        <line x1="482" y1="178" x2="442" y2="218" stroke="#8b5e30" strokeWidth="0.9" opacity="0.35" />
        <line x1="482" y1="178" x2="522" y2="218" stroke="#8b5e30" strokeWidth="0.9" opacity="0.35" />
        {/* 營釘 */}
        <line x1="440" y1="216" x2="444" y2="221" stroke="#6b4a20" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <line x1="520" y1="216" x2="524" y2="221" stroke="#6b4a20" strokeWidth="2" strokeLinecap="round" opacity="0.5" />

        {/* ── 帳篷 2（綠色，x≈1150）───────────────── */}
        <polygon points="1122,213 1152,180 1152,213" fill="#607a50" opacity="0.92" />
        <polygon points="1152,180 1182,213 1152,213" fill="#728f60" opacity="0.92" />
        <polygon points="1145,213 1152,197 1159,213" fill="#1e0f05" opacity="0.4" />
        <circle cx="1152" cy="180" r="2.5" fill="#4a6030" />
        <line x1="1152" y1="180" x2="1112" y2="218" stroke="#4a6030" strokeWidth="0.9" opacity="0.35" />
        <line x1="1152" y1="180" x2="1192" y2="218" stroke="#4a6030" strokeWidth="0.9" opacity="0.35" />
        <line x1="1110" y1="216" x2="1114" y2="221" stroke="#3a5020" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <line x1="1190" y1="216" x2="1194" y2="221" stroke="#3a5020" strokeWidth="2" strokeLinecap="round" opacity="0.5" />

        {/* ── 前排樹（最亮）─────────────────────────── */}
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

        {/* ── 營火（x≈720）──────────────────────────── */}
        {/* 光暈 */}
        <ellipse cx="720" cy="215" rx="28" ry="9" fill="url(#fire-glow)" className="animate-glow" />
        {/* 柴火 */}
        <line x1="700" y1="216" x2="742" y2="209" stroke="#4a2c0a" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="706" y1="209" x2="742" y2="216" stroke="#5a3a18" strokeWidth="3.5" strokeLinecap="round" />
        {/* 火焰（帶動畫） */}
        <g style={{ transformOrigin: '720px 210px' }} className="animate-flicker">
          <path d="M714,210 Q710,198 720,190 Q730,198 726,210 Z" fill="#ff5e1a" opacity="0.82" />
          <path d="M716,210 Q713,200 720,194 Q727,200 724,210 Z" fill="#ff8c00" opacity="0.88" />
          <path d="M718,210 Q716,203 720,198 Q724,203 722,210 Z" fill="#ffc200" opacity="0.95" />
        </g>
        {/* 火星 */}
        <circle cx="713" cy="203" r="1.2" fill="#ff6b35" className="animate-twinkle" style={{ animationDelay: '0.2s' }} />
        <circle cx="727" cy="200" r="1"   fill="#ffaa00" className="animate-twinkle" style={{ animationDelay: '0.6s' }} />
        <circle cx="720" cy="197" r="0.8" fill="#ffcc00" className="animate-twinkle" style={{ animationDelay: '1.1s' }} />

        {/* ── 提燈（掛在前排樹旁，x≈1050）──────────── */}
        {/* 光暈 */}
        <ellipse cx="1050" cy="163" rx="20" ry="16" fill="url(#lantern-glow)" className="animate-glow" style={{ animationDelay: '0.5s' }} />
        {/* 提燈整體加旋轉動畫 */}
        <g style={{ transformOrigin: '1050px 143px' }} className="animate-lantern">
          {/* 掛繩 */}
          <line x1="1050" y1="143" x2="1050" y2="150" stroke="#5a3a1a" strokeWidth="1.2" opacity="0.7" />
          {/* 頂蓋 */}
          <polygon points="1042,150 1058,150 1055,144 1045,144" fill="#8b4a10" />
          {/* 燈身 */}
          <rect x="1043" y="150" width="14" height="20" rx="3" fill="#c47a1a" opacity="0.88" />
          {/* 燈光面板 */}
          <rect x="1045" y="152" width="10" height="16" rx="2" fill="#ffcc44" opacity="0.72" />
          {/* 底蓋 */}
          <polygon points="1043,170 1057,170 1055,176 1045,176" fill="#8b4a10" />
          {/* 提把 */}
          <path d="M1047,144 Q1050,139 1053,144" stroke="#5a3a1a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </g>

        {/* ── 地面 ───────────────────────────────────── */}
        <rect x="0" y="200" width="1440" height="20" fill="#1a3a2a" />
      </svg>
    </div>
  )
}
