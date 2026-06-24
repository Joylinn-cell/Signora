import { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════════════
   HAND GESTURE SVGs — one per sign
   All drawn as clean anatomical hand silhouettes
   ══════════════════════════════════════════════ */

const skin = "#FDDBB4";
const skinD = "#F0B97A";
const outline = "#3D2B1F";
const nail = "#F8E0D0";

/* shared palm base */
const Palm = ({ cx = 60, cy = 120, w = 64, h = 60 }) => (
  <>
    <ellipse cx={cx} cy={cy} rx={w / 2} ry={h / 2} fill={skin} stroke={outline} strokeWidth="2.2" />
    <ellipse cx={cx} cy={cy + 10} rx={w / 2 - 2} ry={h / 2 - 8} fill={skinD} stroke="none" opacity="0.25" />
  </>
);

/* finger helper */
const Finger = ({ x, y, w = 16, h = 48, rx = 8, rotate = 0, cx, cy }) => (
  <g transform={`rotate(${rotate},${cx ?? x + w / 2},${cy ?? y + h})`}>
    <rect x={x} y={y} width={w} height={h} rx={rx} fill={skin} stroke={outline} strokeWidth="2" />
    <rect x={x + 3} y={y + h - 12} width={w - 6} height={10} rx={4} fill={nail} stroke={skinD} strokeWidth="1" opacity="0.7" />
    {/* knuckle lines */}
    <line x1={x + 3} y1={y + h * 0.35} x2={x + w - 3} y2={y + h * 0.35} stroke={skinD} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
    <line x1={x + 3} y1={y + h * 0.6} x2={x + w - 3} y2={y + h * 0.6} stroke={skinD} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
  </g>
);

/* HELLO – open flat hand, all 5 fingers spread */
function HandHello() {
  return (
    <svg viewBox="0 0 120 180" width="90" height="135">
      <ellipse cx="60" cy="128" rx="38" ry="44" fill={skin} stroke={outline} strokeWidth="2.2" />
      <Finger x={13} y={58} w={15} h={52} rotate={-14} cx={20} cy={110} />
      <Finger x={31} y={42} w={16} h={58} rotate={-5} cx={39} cy={100} />
      <Finger x={51} y={40} w={16} h={58} rotate={3} cx={59} cy={98} />
      <Finger x={71} y={44} w={15} h={54} rotate={11} cx={78} cy={98} />
      {/* thumb */}
      <path d="M22 100 C10 90,4 76,8 64 C12 52,24 50,30 62 L32 90Z" fill={skin} stroke={outline} strokeWidth="2" strokeLinejoin="round" />
      <rect x="14" y="52" width="12" height="10" rx="5" fill={nail} stroke={skinD} strokeWidth="1" opacity="0.7" />
    </svg>
  );
}

/* YES – fist with nodding motion lines */
function HandYes() {
  return (
    <svg viewBox="0 0 120 160" width="90" height="120">
      <ellipse cx="60" cy="110" rx="36" ry="40" fill={skin} stroke={outline} strokeWidth="2.2" />
      {/* folded fingers shown as rounded row */}
      <rect x="26" y="82" width="68" height="24" rx="12" fill={skin} stroke={outline} strokeWidth="2" />
      <line x1="44" y1="82" x2="44" y2="106" stroke={skinD} strokeWidth="1.5" opacity="0.4" />
      <line x1="60" y1="82" x2="60" y2="106" stroke={skinD} strokeWidth="1.5" opacity="0.4" />
      <line x1="76" y1="82" x2="76" y2="106" stroke={skinD} strokeWidth="1.5" opacity="0.4" />
      {/* fingernails peeking */}
      <ellipse cx="35" cy="83" rx="5" ry="3.5" fill={nail} opacity="0.7" />
      <ellipse cx="52" cy="81" rx="5" ry="3.5" fill={nail} opacity="0.7" />
      <ellipse cx="68" cy="81" rx="5" ry="3.5" fill={nail} opacity="0.7" />
      <ellipse cx="84" cy="83" rx="5" ry="3.5" fill={nail} opacity="0.7" />
      {/* thumb wrapping */}
      <path d="M26 96 C16 92,14 80,20 74 C26 68,34 72,34 82Z" fill={skin} stroke={outline} strokeWidth="2" strokeLinejoin="round" />
      {/* motion lines */}
      <line x1="100" y1="70" x2="112" y2="66" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <line x1="102" y1="80" x2="116" y2="80" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <line x1="100" y1="90" x2="112" y2="94" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

/* NO – index finger wagging left-right */
function HandNo() {
  return (
    <svg viewBox="0 0 140 180" width="105" height="135">
      <ellipse cx="62" cy="130" rx="36" ry="40" fill={skin} stroke={outline} strokeWidth="2.2" />
      {/* folded fingers */}
      <rect x="38" y="108" width="52" height="20" rx="10" fill={skin} stroke={outline} strokeWidth="2" />
      <line x1="54" y1="108" x2="54" y2="128" stroke={skinD} strokeWidth="1.2" opacity="0.4" />
      <line x1="70" y1="108" x2="70" y2="128" stroke={skinD} strokeWidth="1.2" opacity="0.4" />
      {/* index finger pointing up & slightly right */}
      <g transform="rotate(12,56,108)">
        <rect x="47" y="50" width="18" height="60" rx="9" fill={skin} stroke={outline} strokeWidth="2.2" />
        <rect x="50" y="97" width="12" height="11" rx="5" fill={nail} stroke={skinD} strokeWidth="1" opacity="0.7" />
        <line x1="50" y1="73" x2="63" y2="73" stroke={skinD} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        <line x1="50" y1="86" x2="63" y2="86" stroke={skinD} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      </g>
      {/* thumb */}
      <path d="M28 120 C18 114,16 100,22 94 C28 88,36 92,36 104Z" fill={skin} stroke={outline} strokeWidth="2" strokeLinejoin="round" />
      {/* wagging arcs */}
      <path d="M80 58 Q100 46 114 58" fill="none" stroke="#fb7185" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 3" opacity="0.8" />
      <path d="M80 58 Q62 44 50 58" fill="none" stroke="#fb7185" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 3" opacity="0.8" />
    </svg>
  );
}

/* FOOD – fingertips touch thumb, brought to mouth gesture */
function HandFood() {
  return (
    <svg viewBox="0 0 120 180" width="90" height="135">
      <ellipse cx="60" cy="126" rx="38" ry="44" fill={skin} stroke={outline} strokeWidth="2.2" />
      {/* four fingers bunched together pointing up */}
      {[18, 33, 49, 64].map((x, i) => (
        <g key={i} transform={`rotate(${[-6,-2,2,6][i]},${x+8},126)`}>
          <rect x={x} y={62} width={15} height={50} rx={7.5} fill={skin} stroke={outline} strokeWidth="2" />
          <rect x={x+3} y={99} width={9} height={9} rx={4} fill={nail} stroke={skinD} strokeWidth="1" opacity="0.7" />
          <line x1={x+3} y1={79} x2={x+12} y2={79} stroke={skinD} strokeWidth="1.1" strokeLinecap="round" opacity="0.5" />
        </g>
      ))}
      {/* thumb touching index tip */}
      <path d="M26 110 C14 100,12 84,20 76 C26 70,36 74,36 86 C36 96,26 100,22 106Z" fill={skin} stroke={outline} strokeWidth="2" strokeLinejoin="round" />
      <ellipse cx="19" cy="74" rx="6" ry="4.5" fill={nail} stroke={skinD} strokeWidth="1" opacity="0.7" />
      {/* contact dot at pinch */}
      <circle cx="28" cy="80" r="4" fill="#fde68a" stroke="#fb923c" strokeWidth="1.5" opacity="0.9" />
    </svg>
  );
}

/* WATER – W handshape: index, middle, ring up, others folded */
function HandWater() {
  return (
    <svg viewBox="0 0 120 180" width="90" height="135">
      <ellipse cx="60" cy="130" rx="36" ry="40" fill={skin} stroke={outline} strokeWidth="2.2" />
      {/* index up */}
      <rect x="30" y="60" width="16" height="58" rx="8" fill={skin} stroke={outline} strokeWidth="2.2" />
      <rect x="33" y="104" width="10" height="11" rx="5" fill={nail} stroke={skinD} strokeWidth="1" opacity="0.7" />
      <line x1="33" y1="80" x2="44" y2="80" stroke={skinD} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <line x1="33" y1="94" x2="44" y2="94" stroke={skinD} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      {/* middle up */}
      <rect x="50" y="55" width="16" height="62" rx="8" fill={skin} stroke={outline} strokeWidth="2.2" />
      <rect x="53" y="104" width="10" height="11" rx="5" fill={nail} stroke={skinD} strokeWidth="1" opacity="0.7" />
      <line x1="53" y1="78" x2="64" y2="78" stroke={skinD} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <line x1="53" y1="92" x2="64" y2="92" stroke={skinD} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      {/* ring up */}
      <rect x="70" y="60" width="16" height="58" rx="8" fill={skin} stroke={outline} strokeWidth="2.2" />
      <rect x="73" y="104" width="10" height="11" rx="5" fill={nail} stroke={skinD} strokeWidth="1" opacity="0.7" />
      <line x1="73" y1="80" x2="84" y2="80" stroke={skinD} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <line x1="73" y1="94" x2="84" y2="94" stroke={skinD} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      {/* pinky folded */}
      <rect x="88" y="108" width="14" height="20" rx="7" fill={skin} stroke={outline} strokeWidth="1.8" />
      {/* thumb across */}
      <path d="M28 118 C16 110,16 96,24 90 C30 86,36 92,34 102Z" fill={skin} stroke={outline} strokeWidth="2" strokeLinejoin="round" />
      {/* water drop */}
      <path d="M60 20 C60 20,46 36,46 46 C46 54,52 60,60 60 C68 60,74 54,74 46 C74 36,60 20,60 20Z" fill="#93c5fd" stroke="#3b82f6" strokeWidth="1.5" opacity="0.85" />
    </svg>
  );
}

/* PAIN – fist clenched, knuckles forward */
function HandPain() {
  return (
    <svg viewBox="0 0 120 160" width="90" height="120">
      <ellipse cx="60" cy="108" rx="38" ry="40" fill={skin} stroke={outline} strokeWidth="2.2" />
      {/* knuckle row */}
      <rect x="24" y="80" width="72" height="26" rx="13" fill={skin} stroke={outline} strokeWidth="2.2" />
      {/* knuckle bumps */}
      {[36, 52, 68, 84].map((cx, i) => (
        <ellipse key={i} cx={cx} cy={80} rx={7} ry={5} fill={skin} stroke={outline} strokeWidth="1.8" />
      ))}
      {/* finger dividers */}
      {[48, 64, 80].map((x, i) => (
        <line key={i} x1={x} y1={80} x2={x} y2={106} stroke={skinD} strokeWidth="1.3" opacity="0.4" />
      ))}
      {/* thumb tucked */}
      <path d="M24 102 C14 98,12 86,18 80 C24 75,32 80,30 92Z" fill={skin} stroke={outline} strokeWidth="2" strokeLinejoin="round" />
      {/* pain burst */}
      {[[106, 48, 18], [112, 64, 10], [108, 78, 14], [116, 52, 8]].map(([x, y, r], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r} fill="#fde68a" stroke="#fb923c" strokeWidth="1.5" opacity="0.85" />
          <text x={x} y={y + 5} textAnchor="middle" fontSize="10" fill="#c2410c" fontWeight="bold">!</text>
        </g>
      ))}
    </svg>
  );
}

/* HELP – one flat hand on top of fist (thumbs-up lift) */
function HandHelp() {
  return (
    <svg viewBox="0 0 130 190" width="97" height="142">
      {/* bottom fist */}
      <ellipse cx="62" cy="148" rx="38" ry="28" fill={skin} stroke={outline} strokeWidth="2.2" />
      <rect x="28" y="130" width="68" height="22" rx="11" fill={skin} stroke={outline} strokeWidth="2" />
      {[42, 58, 74, 90].map((x, i) => (
        <ellipse key={i} cx={x} cy={130} rx={6.5} ry={4.5} fill={skin} stroke={outline} strokeWidth="1.8" />
      ))}
      {/* flat hand on top */}
      <ellipse cx="64" cy="110" rx="40" ry="18" fill={skin} stroke={outline} strokeWidth="2.2" />
      {/* four fingers of top hand */}
      {[28, 43, 58, 73].map((x, i) => (
        <g key={i} transform={`rotate(${[-4,-1,1,4][i]},${x+8},110)`}>
          <rect x={x} y={68} width={15} height={44} rx={7.5} fill={skin} stroke={outline} strokeWidth="2" />
          <rect x={x+3} y={99} width={9} height={9} rx={4} fill={nail} stroke={skinD} strokeWidth="1" opacity="0.7" />
        </g>
      ))}
      {/* thumb of top hand */}
      <path d="M26 106 C16 100,16 88,22 83 C28 78,36 84,34 96Z" fill={skin} stroke={outline} strokeWidth="2" strokeLinejoin="round" />
      {/* upward arrows */}
      <path d="M108 140 L108 120 M104 126 L108 120 L112 126" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
      <path d="M118 145 L118 128 M114 134 L118 128 L122 134" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.65" />
    </svg>
  );
}

/* TOILET – T handshape: thumb between index and middle */
function HandToilet() {
  return (
    <svg viewBox="0 0 120 180" width="90" height="135">
      <ellipse cx="60" cy="128" rx="36" ry="42" fill={skin} stroke={outline} strokeWidth="2.2" />
      {/* all four fingers folded over */}
      <rect x="30" y="100" width="60" height="26" rx="13" fill={skin} stroke={outline} strokeWidth="2.2" />
      {[44, 58, 72].map((x, i) => (
        <line key={i} x1={x} y1={100} x2={x} y2={126} stroke={skinD} strokeWidth="1.3" opacity="0.4" />
      ))}
      {/* fingernail tops */}
      {[36, 52, 68, 82].map((cx, i) => (
        <ellipse key={i} cx={cx} cy={100} rx={6} ry={4} fill={nail} stroke={skinD} strokeWidth="1" opacity="0.7" />
      ))}
      {/* thumb poking between index & middle */}
      <path d="M52 108 C48 92,50 78,56 72 C62 66,70 70,68 82 C66 92,58 100,54 108Z" fill={skin} stroke={outline} strokeWidth="2.2" strokeLinejoin="round" />
      <ellipse cx="62" cy="70" rx="6.5" ry="4.5" fill={nail} stroke={skinD} strokeWidth="1" opacity="0.7" />
      {/* T letter badge */}
      <rect x="82" y="56" width="30" height="30" rx="8" fill="#dbeafe" stroke="#93c5fd" strokeWidth="2" />
      <text x="97" y="77" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1d4ed8" fontFamily="sans-serif">T</text>
    </svg>
  );
}

/* DOCTOR – D handshape: index up, others curl, thumb touches middle */
function HandDoctor() {
  return (
    <svg viewBox="0 0 120 190" width="90" height="142">
      <ellipse cx="60" cy="138" rx="36" ry="40" fill={skin} stroke={outline} strokeWidth="2.2" />
      {/* curled fingers */}
      <rect x="44" y="110" width="52" height="24" rx="12" fill={skin} stroke={outline} strokeWidth="2" />
      {[56, 70, 84].map((x, i) => (
        <ellipse key={i} cx={x} cy={110} rx={6} ry={4} fill={nail} stroke={skinD} strokeWidth="1" opacity="0.7" />
      ))}
      {/* index finger pointing up */}
      <rect x="32" y="58" width="18" height="64" rx="9" fill={skin} stroke={outline} strokeWidth="2.2" />
      <rect x="35" y="108" width="12" height="11" rx="5.5" fill={nail} stroke={skinD} strokeWidth="1" opacity="0.7" />
      <line x1="35" y1="80" x2="48" y2="80" stroke={skinD} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <line x1="35" y1="94" x2="48" y2="94" stroke={skinD} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      {/* thumb touching middle */}
      <path d="M30 120 C18 112,18 96,24 90 C30 84,40 88,38 100 C38 110,32 116,28 120Z" fill={skin} stroke={outline} strokeWidth="2" strokeLinejoin="round" />
      {/* medical cross */}
      <rect x="82" y="52" width="32" height="32" rx="8" fill="#fce7f3" stroke="#f9a8d4" strokeWidth="2" />
      <rect x="93" y="58" width="10" height="20" rx="3" fill="#fb7185" opacity="0.9" />
      <rect x="87" y="64" width="22" height="10" rx="3" fill="#fb7185" opacity="0.9" />
    </svg>
  );
}

/* ILY – thumb + index + pinky extended */
function HandILY() {
  return (
    <svg viewBox="0 0 120 180" width="90" height="135">
      <ellipse cx="60" cy="130" rx="38" ry="42" fill={skin} stroke={outline} strokeWidth="2.2" />
      {/* index finger up */}
      <rect x="34" y="58" width="17" height="62" rx="8.5" fill={skin} stroke={outline} strokeWidth="2.2" />
      <rect x="37" y="106" width="11" height="11" rx="5.5" fill={nail} stroke={skinD} strokeWidth="1" opacity="0.7" />
      <line x1="37" y1="80" x2="49" y2="80" stroke={skinD} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <line x1="37" y1="94" x2="49" y2="94" stroke={skinD} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      {/* middle & ring folded */}
      <rect x="53" y="106" width="30" height="22" rx="11" fill={skin} stroke={outline} strokeWidth="2" />
      {[61, 75].map((cx, i) => (
        <ellipse key={i} cx={cx} cy={106} rx={6} ry={4} fill={nail} stroke={skinD} strokeWidth="1" opacity="0.7" />
      ))}
      <line x1="68" y1="106" x2="68" y2="128" stroke={skinD} strokeWidth="1.3" opacity="0.35" />
      {/* pinky up */}
      <rect x="85" y="64" width="16" height="56" rx="8" fill={skin} stroke={outline} strokeWidth="2.2" />
      <rect x="88" y="107" width="10" height="10" rx="5" fill={nail} stroke={skinD} strokeWidth="1" opacity="0.7" />
      <line x1="88" y1="84" x2="99" y2="84" stroke={skinD} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <line x1="88" y1="97" x2="99" y2="97" stroke={skinD} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      {/* thumb extended out */}
      <path d="M22 122 C10 114,8 96,14 88 C20 80,32 84,30 100 C28 112,22 118,20 124Z" fill={skin} stroke={outline} strokeWidth="2.2" strokeLinejoin="round" />
      <ellipse cx="13" cy="86" rx="6.5" ry="4.5" fill={nail} stroke={skinD} strokeWidth="1" opacity="0.7" />
      {/* sparkle */}
      <text x="56" y="46" fontSize="18" textAnchor="middle" fill="#fb7185">♥</text>
    </svg>
  );
}

/* map sign word → gesture component */
const GESTURE_MAP = {
  HELLO:  <HandHello />,
  YES:    <HandYes />,
  NO:     <HandNo />,
  FOOD:   <HandFood />,
  WATER:  <HandWater />,
  PAIN:   <HandPain />,
  HELP:   <HandHelp />,
  TOILET: <HandToilet />,
  DOCTOR: <HandDoctor />,
};

/* ══════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════ */
const SIGNS = [
  { word:"FOOD",   en:"I need food",        ml:"എനിക്ക് ഭക്ഷണം വേണം",      conf:82 },
  { word:"WATER",  en:"I need water",       ml:"എനിക്ക് വെള്ളം വേണം",       conf:91 },
  { word:"PAIN",   en:"I am in pain",       ml:"എനിക്ക് വേദനയുണ്ട്",        conf:78 },
  { word:"HELP",   en:"Please help me",     ml:"ദയവായി എന്നെ സഹായിക്കൂ",    conf:95 },
  { word:"HELLO",  en:"Hello",              ml:"നമസ്കാരം",                  conf:97 },
  { word:"TOILET", en:"I need the toilet",  ml:"എനിക്ക് ടോയ്‌ലറ്റ് വേണം",  conf:88 },
  { word:"DOCTOR", en:"I need a doctor",    ml:"എനിക്ക് ഒരു ഡോക്ടർ വേണം",  conf:85 },
  { word:"YES",    en:"Yes",                ml:"അതെ",                       conf:99 },
  { word:"NO",     en:"No",                 ml:"അല്ല",                      conf:96 },
];

const WAVE_H = [14,22,30,18,36,28,16,32,24,20,34,18,26,30,16,22,28,14,32,20];

/* ══════════════════════════════════════════════
   UI COMPONENTS
   ══════════════════════════════════════════════ */
function Pill({ bg, children, style = {} }) {
  return (
    <span style={{
      display:"inline-flex",alignItems:"center",gap:5,background:bg,
      border:"2px solid #2d2d3a",borderRadius:999,padding:"3px 13px",
      fontFamily:"'Patrick Hand',cursive",fontSize:"0.9rem",fontWeight:700,...style
    }}>{children}</span>
  );
}

function Card({ children, style = {}, accent = "#c4b5fd" }) {
  return (
    <div style={{
      background:"white",border:`2.5px solid ${accent}`,borderRadius:18,
      padding:"12px 14px",position:"relative",boxShadow:`4px 4px 0 ${accent}`,
      display:"flex",flexDirection:"column",gap:8,overflow:"hidden",...style
    }}>{children}</div>
  );
}

function CardTitle({ children }) {
  return (
    <div style={{
      display:"inline-flex",alignItems:"center",gap:6,background:"white",
      border:"2px solid #2d2d3a",borderRadius:999,padding:"4px 14px",
      fontFamily:"'Patrick Hand',cursive",fontSize:"1rem",fontWeight:700,
      boxShadow:"2px 2px 0 #d1d5db",alignSelf:"flex-start",flexShrink:0
    }}>{children}</div>
  );
}

function Waveform({ active }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:3,flex:1,height:36}}>
      {WAVE_H.map((h,i)=>(
        <div key={i} style={{
          width:3,height:h,borderRadius:999,background:"#a78bfa",
          animation:active?`wave 1s ease-in-out ${i*0.07}s infinite`:"none",
          transform:active?undefined:"scaleY(0.3)"
        }}/>
      ))}
    </div>
  );
}

function Donut({ pct }) {
  const dash = (pct / 100) * 100;
  return (
    <div style={{position:"relative",width:76,height:76,flexShrink:0}}>
      <svg viewBox="0 0 36 36" width="76" height="76">
        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" strokeWidth="3.5"/>
        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#6ee7b7" strokeWidth="3.5"
          strokeDasharray={`${dash} ${100-dash}`} strokeDashoffset="25"
          strokeLinecap="round" style={{transition:"stroke-dasharray .7s ease"}}/>
      </svg>
      <div style={{
        position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",
        fontFamily:"'Baloo 2',cursive",fontSize:"1.05rem",fontWeight:800,color:"#1e1b4b"
      }}>{pct}%</div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN APP
   ══════════════════════════════════════════════ */
export default function Signora() {
  const [current, setCurrent] = useState(SIGNS[0]);
  const [camActive, setCamActive] = useState(false);
  const [camMode, setCamMode]   = useState("idle");
  const [wordAnim, setWordAnim] = useState(false);
  const videoRef  = useRef(null);
  const streamRef = useRef(null);
  const timerRef  = useRef(null);
  const idxRef    = useRef(1);

  useEffect(() => {
    if (!camActive) return;
    timerRef.current = setInterval(() => {
      const s = SIGNS[idxRef.current % SIGNS.length]; idxRef.current++;
      setWordAnim(true);
      setTimeout(() => { setCurrent(s); setWordAnim(false); }, 200);
    }, 2400);
    return () => clearInterval(timerRef.current);
  }, [camActive]);

  async function startCam() {
    setCamActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) { videoRef.current.srcObject = stream; videoRef.current.play(); }
      setCamMode("live");
    } catch { setCamMode("demo"); }
  }

  function stopCam() {
    setCamActive(false); setCamMode("idle");
    if (streamRef.current) { streamRef.current.getTracks().forEach(t=>t.stop()); streamRef.current=null; }
    clearInterval(timerRef.current);
    setCurrent(SIGNS[0]); idxRef.current=1;
  }

  function speak() {
    if ("speechSynthesis" in window) {
      const u = new SpeechSynthesisUtterance(current.ml);
      speechSynthesis.cancel(); speechSynthesis.speak(u);
    }
  }

  const gesture = GESTURE_MAP[current.word] || <HandFood/>;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Baloo+2:wght@700;800;900&family=Patrick+Hand&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{overflow:hidden;height:100vh;background:#f3eeff;}
        @keyframes wave{0%,100%{transform:scaleY(1)}50%{transform:scaleY(0.22)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.08}}
        @keyframes pop{0%{transform:scale(0.75);opacity:0}100%{transform:scale(1);opacity:1}}
        @keyframes floaty{0%,100%{transform:translateY(0)rotate(0deg)}50%{transform:translateY(-9px)rotate(7deg)}}
        @keyframes gestureIn{0%{transform:scale(0.8) rotate(-6deg);opacity:0}100%{transform:scale(1) rotate(0deg);opacity:1}}
        .word-pop{animation:pop .22s ease;}
        .gesture-in{animation:gestureIn .35s cubic-bezier(.34,1.56,.64,1);}
        .amb{position:fixed;pointer-events:none;z-index:0;opacity:.08;animation:floaty 7s ease-in-out infinite;font-family:serif;}
        .speak-btn:hover{transform:translate(-2px,-2px)!important;box-shadow:4px 4px 0 #1a1a2e!important;}
        .speak-btn:active{transform:translate(1px,1px)!important;box-shadow:1px 1px 0 #1a1a2e!important;}
        .act-btn:hover{transform:translate(-2px,-2px)!important;box-shadow:4px 4px 0 #1a1a2e!important;}
        .act-btn:active{transform:translate(1px,1px)!important;box-shadow:1px 1px 0 #1a1a2e!important;}
        ::-webkit-scrollbar{display:none;}
      `}</style>

      {/* dot grid */}
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,
        backgroundImage:"radial-gradient(circle,#c4b5fd55 1.3px,transparent 1.3px)",
        backgroundSize:"24px 24px"}}/>

      {/* ambient doodles */}
      {["✦","★","◆","♡","✿","✎"].map((d,i)=>(
        <div key={i} className="amb" style={{
          top:`${[8,22,62,80,44,30][i]}%`,left:`${[86,3,90,5,92,87][i]}%`,
          animationDelay:`${i*1.3}s`,fontSize:`${[1.4,1.1,.9,1.1,.85,1.2][i]}rem`
        }}>{d}</div>
      ))}

      {/* ════ PAGE ════ */}
      <div style={{
        position:"relative",zIndex:1,width:"100%",height:"100vh",
        display:"flex",flexDirection:"column",padding:"8px 14px",gap:8,
        fontFamily:"'Nunito',sans-serif",color:"#2d2d3a"
      }}>

        {/* ── HEADER ── */}
        <div style={{flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",padding:"2px 0"}}>
          {/* ILY hand */}
          <div style={{position:"absolute",left:0,top:-6,pointerEvents:"none"}}>
            <HandILY/>
          </div>
          {/* title center */}
          <div style={{textAlign:"center"}}>
            <div style={{
              fontFamily:"'Baloo 2',cursive",fontWeight:900,
              fontSize:"clamp(1.9rem,3.8vw,2.9rem)",letterSpacing:4,lineHeight:1,
              display:"flex",justifyContent:"center",alignItems:"center",gap:1
            }}>
              <span style={{color:"#bbb",fontSize:"1rem",margin:"0 6px"}}>—</span>
              {[["S","#f87171"],["I","#fb923c"],["G","#facc15"],["N","#4ade80"],["O","#60a5fa"],["R","#c084fc"],["A","#f87171"]].map(([l,c])=>(
                <span key={l+c} style={{color:c}}>{l}</span>
              ))}
              <span style={{color:"#bbb",fontSize:"1rem",margin:"0 6px"}}>—</span>
            </div>
            <div>
              <span style={{
                display:"inline-block",background:"#fde68a",border:"2px solid #2d2d3a",
                borderRadius:999,padding:"2px 18px",fontFamily:"'Patrick Hand',cursive",
                fontSize:"0.92rem",fontWeight:700,marginTop:3,boxShadow:"2px 2px 0 #2d2d3a"
              }}>Bridging Silence Through AI</span>
            </div>
            <div style={{fontFamily:"'Patrick Hand',cursive",fontSize:"0.84rem",color:"#6b7280",marginTop:2,
              display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
              <span style={{width:6,height:6,borderRadius:"50%",background:"#fb7185",display:"inline-block"}}/>
              Hospital Communication Assistant
              <span style={{width:6,height:6,borderRadius:"50%",background:"#fb7185",display:"inline-block"}}/>
            </div>
          </div>
          {/* speech bubble */}
          <div style={{
            position:"absolute",right:0,top:0,background:"white",
            border:"2px solid #c4b5fd",borderRadius:"16px 16px 4px 16px",
            padding:"7px 12px",fontFamily:"'Patrick Hand',cursive",fontSize:"0.84rem",
            lineHeight:1.4,boxShadow:"2px 2px 0 #c4b5fd",maxWidth:130
          }}>Let's communicate<br/>better, together! 😊</div>
        </div>

        {/* ── 3-COLUMN GRID ── */}
        <div style={{flex:1,minHeight:0,display:"grid",gridTemplateColumns:"1fr 1.05fr 1fr",gap:12}}>

          {/* ══ LEFT: COMMUNICATION ══ */}
          <Card accent="#c4b5fd">
            <CardTitle>✏️ Communication</CardTitle>

            <Pill bg="#ede9fe" style={{alignSelf:"flex-start"}}>
              English <span style={{fontWeight:400,fontSize:".78rem"}}>(Detected Meaning)</span>
            </Pill>
            <div style={{
              border:"2px dashed #d1d5db",borderRadius:12,padding:"8px 12px 8px 12px",
              background:"#fafafa",fontFamily:"'Patrick Hand',cursive",fontSize:"1.08rem",
              color:"#1e1b4b",position:"relative",flexShrink:0,minHeight:52
            }}>
              {current.en}
              <span style={{position:"absolute",bottom:6,right:8,fontSize:"1.1rem",opacity:.7}}>📣</span>
            </div>

            <svg width="100%" height="10" style={{flexShrink:0}}>
              <path d="M0 5 Q20 1,40 5 T80 5 T120 5 T160 5 T200 5 T240 5"
                stroke="#e5e7eb" strokeWidth="1.5" fill="none" strokeDasharray="5 4"/>
            </svg>

            <Pill bg="#fce7f3" style={{alignSelf:"flex-start"}}>
              Malayalam <span style={{fontWeight:400,fontSize:".78rem"}}>(Translation)</span>
            </Pill>
            <div style={{
              border:"2px dashed #f9a8d4",borderRadius:12,padding:"8px 12px 8px 12px",
              background:"#fff5f8",fontFamily:"'Patrick Hand',cursive",fontSize:"1.08rem",
              color:"#1e1b4b",position:"relative",flexShrink:0,minHeight:52
            }}>
              {current.ml}
              <span style={{position:"absolute",bottom:6,right:8,fontSize:"1rem"}}>❤️</span>
            </div>

            <Pill bg="#dbeafe" style={{alignSelf:"flex-start"}}>
              🔊 Speaker <span style={{fontWeight:400,fontSize:".78rem"}}>(Malayalam)</span>
            </Pill>
            <div style={{
              border:"1.5px solid #e5e7eb",borderRadius:12,padding:"8px 12px",
              display:"flex",alignItems:"center",gap:10,background:"#f9fafb",flexShrink:0
            }}>
              <div style={{width:38,height:38,borderRadius:"50%",background:"#a78bfa",
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem",flexShrink:0}}>🔊</div>
              <Waveform active={camActive}/>
            </div>

            <button className="speak-btn" onClick={speak} style={{
              display:"flex",alignItems:"center",justifyContent:"center",gap:6,
              background:"#7c3aed",color:"white",border:"2.5px solid #2d2d3a",borderRadius:999,
              padding:"9px",fontFamily:"'Baloo 2',cursive",fontSize:"1.08rem",fontWeight:800,
              cursor:"pointer",boxShadow:"3px 3px 0 #2d2d3a",
              transition:"transform .1s,box-shadow .1s",flexShrink:0
            }}>▶ Speak</button>

            <div style={{position:"absolute",bottom:10,left:10,fontSize:".8rem",color:"#fde68a",opacity:.8,pointerEvents:"none"}}>♩ ♪ ♫</div>
          </Card>

          {/* ══ MIDDLE: LIVE DETECTION ══ */}
          <Card accent="#f9a8d4">
            <CardTitle>
              📷 Live Detection
              <svg width="16" height="16" viewBox="0 0 20 20" style={{opacity:.6}}>
                <path d="M12 2 L6 11 L10 11 L8 18 L14 9 L10 9 Z" fill="#fde68a" stroke="#2d2d3a" strokeWidth="1.5"/>
              </svg>
            </CardTitle>

            {/* Camera */}
            <div style={{
              flex:1,minHeight:0,border:"2.5px solid #2d2d3a",borderRadius:14,
              overflow:"hidden",position:"relative",background:"#c8c8c0"
            }}>
              {[{top:8,right:9,borderWidth:"2.5px 2.5px 0 0",borderRadius:"0 4px 0 0"},
                {bottom:9,left:8,borderWidth:"0 0 2.5px 2.5px",borderRadius:"0 0 0 4px"}
              ].map((s,i)=>(
                <div key={i} style={{position:"absolute",width:20,height:20,
                  borderColor:"white",borderStyle:"solid",zIndex:2,...s}}/>
              ))}
              {camActive && (
                <div style={{position:"absolute",top:8,left:10,zIndex:3,background:"white",
                  border:"1.5px solid #e5e7eb",borderRadius:999,padding:"2px 9px",
                  fontFamily:"'Patrick Hand',cursive",fontSize:".84rem",fontWeight:700,
                  display:"flex",alignItems:"center",gap:5}}>
                  <span style={{width:9,height:9,borderRadius:"50%",background:"#fb7185",
                    animation:"blink 1s step-end infinite",display:"inline-block"}}/> REC
                </div>
              )}
              <video ref={videoRef} muted style={{
                position:"absolute",inset:0,width:"100%",height:"100%",
                objectFit:"cover",borderRadius:12,display:camMode==="live"?"block":"none"
              }}/>
              {camMode==="demo" && (
                <div style={{position:"absolute",inset:0,background:"#b0b0a8",
                  display:"flex",alignItems:"center",justifyContent:"center",borderRadius:12}}>
                  <span style={{fontFamily:"'Patrick Hand',cursive",fontSize:".95rem",color:"#555",opacity:.8}}>📷 Demo mode</span>
                </div>
              )}
              {camMode==="idle" && (
                <div onClick={startCam} style={{position:"absolute",inset:0,background:"#d0cfc8",
                  display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",borderRadius:12}}>
                  <span style={{fontFamily:"'Patrick Hand',cursive",fontSize:"1rem",color:"#555",textAlign:"center"}}>
                    📷<br/>Tap to start<br/>live detection
                  </span>
                </div>
              )}
              <div style={{position:"absolute",bottom:8,left:10,fontSize:"1.1rem",zIndex:2}}>⭐</div>
              <div style={{position:"absolute",bottom:8,right:10,fontSize:".85rem",zIndex:2,
                background:"rgba(255,255,255,.6)",borderRadius:7,padding:"2px 5px"}}>📷</div>
            </div>

            {/* Start/Stop */}
            <div style={{display:"flex",gap:8,flexShrink:0}}>
              {!camActive
                ? <button className="act-btn" onClick={startCam} style={{
                    flex:1,background:"#a78bfa",color:"white",border:"2.5px solid #2d2d3a",
                    borderRadius:999,padding:"7px",fontFamily:"'Baloo 2',cursive",
                    fontSize:"1.05rem",fontWeight:800,cursor:"pointer",
                    boxShadow:"3px 3px 0 #2d2d3a",transition:"transform .1s,box-shadow .1s"
                  }}>▶ Start</button>
                : <button className="act-btn" onClick={stopCam} style={{
                    flex:1,background:"#fb7185",color:"white",border:"2.5px solid #2d2d3a",
                    borderRadius:999,padding:"7px",fontFamily:"'Baloo 2',cursive",
                    fontSize:"1.05rem",fontWeight:800,cursor:"pointer",
                    boxShadow:"3px 3px 0 #2d2d3a",transition:"transform .1s,box-shadow .1s"
                  }}>⏹ Stop</button>
              }
            </div>

            {/* Detected sign box */}
            <div style={{border:"2px dashed #f9a8d4",borderRadius:14,padding:"8px 12px",
              textAlign:"center",background:"white",flexShrink:0}}>
              <span style={{display:"inline-block",border:"1.5px solid #2d2d3a",borderRadius:999,
                background:"#dbeafe",padding:"2px 12px",fontFamily:"'Patrick Hand',cursive",
                fontSize:".84rem",fontWeight:700,marginBottom:5}}>Detected Sign</span>
              <div className={wordAnim?"word-pop":""} style={{
                fontFamily:"'Baloo 2',cursive",fontSize:"2.1rem",fontWeight:900,color:"#7c3aed",
                display:"flex",alignItems:"center",justifyContent:"center",gap:8
              }}>
                <span style={{fontSize:".9rem",color:"#fde68a"}}>꩜</span>
                {current.word}
                <span style={{fontSize:".9rem",color:"#fde68a"}}>꩜</span>
              </div>
              <div style={{fontFamily:"'Patrick Hand',cursive",fontSize:".82rem",color:"#6b7280",
                display:"flex",alignItems:"center",justifyContent:"center",gap:4,marginTop:2}}>
                <svg width="16" height="10" viewBox="0 0 20 12">
                  <path d="M2 6 C6 2,10 10,14 6 L18 8" stroke="#9ca3af" strokeWidth="1.5" fill="none"/>
                  <polygon points="18,8 14,5 14,11" fill="#9ca3af"/>
                </svg>
                Keep showing the sign… ♡
              </div>
            </div>

            {/* blob */}
            <div style={{display:"flex",justifyContent:"flex-end",flexShrink:0}}>
              <svg width="52" height="52" viewBox="0 0 52 52">
                <path d="M26 5 C36 3,46 9,48 19 C50 29,46 42,36 47 C26 52,13 48,7 40 C1 32,3 18,9 12 C15 6,16 7,26 5 Z"
                  fill="#c4b5fd" stroke="#7c3aed" strokeWidth="2"/>
                <circle cx="18" cy="23" r="3.2" fill="white"/><circle cx="19" cy="23" r="1.6" fill="#1a1a2e"/>
                <circle cx="32" cy="23" r="3.2" fill="white"/><circle cx="33" cy="23" r="1.6" fill="#1a1a2e"/>
                <path d="M18 32 Q26 38 34 32" stroke="#7c3aed" strokeWidth="2" fill="none" strokeLinecap="round"/>
                <path d="M44 12 C48 8,52 10,50 16" stroke="#7c3aed" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
                <circle cx="50" cy="16" r="2.2" fill="#7c3aed"/>
              </svg>
            </div>
          </Card>

          {/* ══ RIGHT: MODEL INSIGHTS ══ */}
          <Card accent="#6ee7b7">
            <CardTitle>🤖 Trained Model Insights</CardTitle>
            <div style={{position:"absolute",top:10,right:14,fontSize:"1.3rem",pointerEvents:"none"}}>💡</div>

            {/* Predicted sign + gesture illustration */}
            <div style={{flexShrink:0}}>
              <Pill bg="#ede9fe">Predicted Sign</Pill>
              <div style={{
                border:"2px dashed #a78bfa",borderRadius:12,background:"white",
                marginTop:5,display:"flex",alignItems:"center",justifyContent:"space-between",
                padding:"4px 12px"
              }}>
                <div style={{fontFamily:"'Baloo 2',cursive",fontSize:"1.8rem",fontWeight:900,color:"#7c3aed"}}>
                  {current.word}
                </div>
                {/* GESTURE ILLUSTRATION */}
                <div className={wordAnim?"gesture-in":""} style={{flexShrink:0}}>
                  {gesture}
                </div>
              </div>
            </div>

            {/* Confidence */}
            <div style={{flexShrink:0}}>
              <Pill bg="#fefce8">Confidence</Pill>
              <div style={{display:"flex",alignItems:"center",gap:10,marginTop:5}}>
                <Donut pct={current.conf}/>
                <div style={{flex:1,fontFamily:"'Patrick Hand',cursive",fontSize:".9rem",color:"#6b7280",lineHeight:1.4}}>
                  Model is<br/>fairly confident<br/>about this gesture
                </div>
                <span style={{fontSize:"1.5rem"}}>👍</span>
              </div>
            </div>

            {/* Key Landmarks */}
            <div style={{flexShrink:0}}>
              <Pill bg="#d1fae5">Key Landmarks <span style={{fontWeight:400}}>(Used)</span></Pill>
              <div style={{display:"flex",alignItems:"center",gap:8,marginTop:5}}>
                <div style={{flex:1}}>
                  {[["#22c55e","Thumb Tip"],["#ef4444","Index Tip"]].map(([c,l])=>(
                    <div key={l} style={{display:"flex",alignItems:"center",gap:7,
                      fontFamily:"'Patrick Hand',cursive",fontSize:".92rem",marginBottom:4}}>
                      <span style={{width:10,height:10,borderRadius:"50%",background:c,display:"inline-block",flexShrink:0}}/>
                      {l}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reason */}
            <div style={{flex:1,minHeight:0}}>
              <Pill bg="#fce7f3">Reason <span style={{fontWeight:400}}>(Model Interpretation)</span></Pill>
              <div style={{border:"1.5px dashed #fca5a5",borderRadius:12,
                padding:"8px 12px",background:"#fff8f8",marginTop:5}}>
                {[
                  "Thumb and index finger formed a pinch-like shape",
                  `Gesture most similar to ${current.word} training data`,
                  "Similarity score: 91%"
                ].map((r,i)=>(
                  <div key={i} style={{fontFamily:"'Patrick Hand',cursive",fontSize:".9rem",
                    lineHeight:1.4,color:"#1e1b4b",paddingLeft:13,position:"relative",marginBottom:i<2?5:0}}>
                    <span style={{position:"absolute",left:2,color:"#fb7185"}}>•</span>{r}
                  </div>
                ))}
              </div>
            </div>

            <div style={{display:"flex",justifyContent:"flex-end",flexShrink:0}}>
              <span style={{fontSize:"1.3rem"}}>🎯</span>
            </div>
          </Card>

        </div>{/* /grid */}
      </div>{/* /page */}
    </>
  );
}