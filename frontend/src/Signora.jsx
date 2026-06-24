import { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════════════
   IMAGE PLACEHOLDER — fallback when image missing
   ══════════════════════════════════════════════ */
function HandPlaceholder({ word }) {
  return (
    <div style={{
      width: 90, height: 120,
      border: "2px dashed #c4b5fd", borderRadius: 14,
      background: "#f5f3ff", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 6, flexShrink: 0,
    }}>
      <span style={{ fontSize: "1.6rem", opacity: 0.4 }}>🖼️</span>
      <span style={{ fontFamily: "'Patrick Hand', cursive", fontSize: "0.72rem",
        color: "#9c6bcc", textAlign: "center", lineHeight: 1.3, padding: "0 6px" }}>
        {word}<br />
        <span style={{ color: "#c4b5fd", fontSize: "0.65rem" }}>image here</span>
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════
   SIGN IMAGE — shows image or falls back to placeholder
   ══════════════════════════════════════════════ */
function SignImage({ word }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <HandPlaceholder word={word} />;
  return (
    <img
      src={`/signs/${word.toLowerCase()}.png`}
      alt={word}
      onError={() => setFailed(true)}
      style={{ width: 90, height: 120, objectFit: "contain", flexShrink: 0 }}
    />
  );
}

/* ══════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════ */
const SIGNS = [
  { word: "ACCIDENT", en: "There was an accident",   ml: "ഒരു അപകടം ഉണ്ടായി",           conf: 84 },
  { word: "BED",      en: "I need a bed",            ml: "എനിക്ക് ഒരു കിടക്ക വേണം",      conf: 90 },
  { word: "DOCTOR",   en: "I need a doctor",         ml: "എനിക്ക് ഒരു ഡോക്ടർ വേണം",     conf: 85 },
  { word: "DRINK",    en: "I want a drink",          ml: "എനിക്ക് കുടിക്കാൻ വേണം",       conf: 88 },
  { word: "EAT",      en: "I want to eat",           ml: "എനിക്ക് കഴിക്കണം",             conf: 92 },
  { word: "FINE",     en: "I am fine",               ml: "ഞാൻ സുഖമാണ്",                 conf: 97 },
  { word: "GIVE",     en: "Please give me",          ml: "ദയവായി എനിക്ക് തരൂ",           conf: 86 },
  { word: "HELP",     en: "Please help me",          ml: "ദയവായി എന്നെ സഹായിക്കൂ",       conf: 95 },
  { word: "MEDICINE", en: "I need medicine",         ml: "എനിക്ക് മരുന്ന് വേണം",         conf: 83 },
  { word: "WANT",     en: "I want something",        ml: "എനിക്ക് എന്തോ വേണം",           conf: 89 },
];

const WAVE_H = [14,22,30,18,36,28,16,32,24,20,34,18,26,30,16,22,28,14,32,20];

/* landmark names for the 21 MediaPipe hand points */
const LANDMARK_NAMES = [
  "Wrist",
  "Thumb CMC","Thumb MCP","Thumb IP","Thumb Tip",
  "Index MCP","Index PIP","Index DIP","Index Tip",
  "Middle MCP","Middle PIP","Middle DIP","Middle Tip",
  "Ring MCP","Ring PIP","Ring DIP","Ring Tip",
  "Pinky MCP","Pinky PIP","Pinky DIP","Pinky Tip",
];

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
  const [current, setCurrent]       = useState(SIGNS[0]);
  const [camActive, setCamActive]   = useState(false);
  const [camMode, setCamMode]       = useState("idle");
  const [wordAnim, setWordAnim]     = useState(false);
  const [handDetected, setHandDetected] = useState(false);
  const [landmarks, setLandmarks]   = useState([]);
  const [features, setFeatures]     = useState([]);

  const videoRef  = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const handsRef  = useRef(null);
  const rafRef    = useRef(null);
  const camActiveRef = useRef(false); // ← ref so processFrame always sees current value
  const lastPredictRef = useRef(0);
  /* ── MediaPipe setup ── */
  function initMediaPipe() {
    // ✅ FIX: use window.Hands (loaded from index.html <script> tag)
    const hands = new window.Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915/${file}`,
    });

    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.5,
    });

    hands.onResults((results) => {
      const canvas = canvasRef.current;
      const video  = videoRef.current;
      if (!canvas || !video) return;

      canvas.width  = video.videoWidth  || canvas.offsetWidth;
      canvas.height = video.videoHeight || canvas.offsetHeight;

      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const fingerColors = ["#f87171","#fb923c","#facc15","#4ade80","#60a5fa"];
        const fingerOf = (i) => i === 0 ? 0 : Math.ceil(i / 4) - 1;
 
        results.multiHandLandmarks.forEach((lms) => {
          window.drawConnectors(ctx, lms, window.HAND_CONNECTIONS, {
            color: "#a78bfa",
            lineWidth: 2,
          });
 
          lms.forEach((lm, i) => {
            const x = lm.x * canvas.width;
            const y = lm.y * canvas.height;
            const color = fingerColors[fingerOf(i)];
 
            ctx.beginPath();
            ctx.arc(x, y, i === 0 ? 6 : 4, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.strokeStyle = "white";
            ctx.lineWidth = 1.5;
            ctx.stroke();
 
            if ([4,8,12,16,20].includes(i)) {
              ctx.beginPath();
              ctx.arc(x, y, 7, 0, 2 * Math.PI);
              ctx.strokeStyle = color;
              ctx.lineWidth = 2.5;
              ctx.stroke();
            }
          });
        });
 
        // use first hand for feature extraction / landmarks panel
        const primaryLms = results.multiHandLandmarks[0];
        const flat = primaryLms.flatMap((lm) => [lm.x, lm.y, lm.z]);
        setFeatures(flat);
        setLandmarks(primaryLms);
        setHandDetected(true);

        // throttle: only predict every 2 seconds
        const now = Date.now();
        if (now - lastPredictRef.current > 2000) {
          lastPredictRef.current = now;
          fetch("http://localhost:5000/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ features: flat }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("Backend returned:", data);
              const matched = SIGNS.find(
                (s) => s.word.toLowerCase() === data.english.toLowerCase()
              );
              if (matched) {
                setCurrent({
                  ...matched,
                  ml: data.malayalam
                });
              }
            })
            .catch(() => {});
        }
      } else {
        setHandDetected(false);
        setLandmarks([]);
        setFeatures([]);
      }
    });
 
    handsRef.current = hands;
  }

  /* ── send frames to MediaPipe ── */
  async function processFrame() {
    if (
      camActiveRef.current &&           // ✅ FIX: use ref, not state
      handsRef.current &&
      videoRef.current &&
      videoRef.current.readyState >= 2
    ) {
      await handsRef.current.send({ image: videoRef.current });
    }
    if (camActiveRef.current) {         // ✅ only keep looping if camera is on
      rafRef.current = requestAnimationFrame(processFrame);
    }
  }

  async function startCam() {
    setCamActive(true);
    camActiveRef.current = true;        // ✅ set ref immediately
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: "user" },
      });
      streamRef.current = stream;
      const video = videoRef.current;
      if (video) {
        video.srcObject = stream;
        await video.play();
      }
      setCamMode("live");

      initMediaPipe();
      rafRef.current = requestAnimationFrame(processFrame);
    } catch (e) {
      console.error("Camera error:", e);
      setCamMode("demo");
    }
  }

  function stopCam() {
    camActiveRef.current = false;       // ✅ stop the loop via ref
    setCamActive(false);
    setCamMode("idle");
    setHandDetected(false);
    setLandmarks([]);
    setFeatures([]);

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (handsRef.current) { handsRef.current.close(); handsRef.current = null; }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }

    const canvas = canvasRef.current;
    if (canvas) canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

    setCurrent(SIGNS[0]);
  }

  function speak() {
    if ("speechSynthesis" in window) {
      const u = new SpeechSynthesisUtterance(current.ml);
      speechSynthesis.cancel();
      speechSynthesis.speak(u);
    }
  }

  // cleanup on unmount
  useEffect(() => {
    return () => {
      camActiveRef.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (handsRef.current) handsRef.current.close();
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const KEY_LANDMARKS = [
    { idx: 4,  label: "Thumb Tip",   color: "#f87171" },
    { idx: 8,  label: "Index Tip",   color: "#fb923c" },
    { idx: 12, label: "Middle Tip",  color: "#facc15" },
    { idx: 16, label: "Ring Tip",    color: "#4ade80" },
    { idx: 20, label: "Pinky Tip",   color: "#60a5fa" },
    { idx: 0,  label: "Wrist",       color: "#c084fc" },
  ];

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
        @keyframes pulseRing{0%{transform:scale(1);opacity:.7}100%{transform:scale(1.5);opacity:0}}
        .word-pop{animation:pop .22s ease;}
        .gesture-in{animation:gestureIn .35s cubic-bezier(.34,1.56,.64,1);}
        .amb{position:fixed;pointer-events:none;z-index:0;opacity:.08;animation:floaty 7s ease-in-out infinite;font-family:serif;}
        .speak-btn:hover{transform:translate(-2px,-2px)!important;box-shadow:4px 4px 0 #1a1a2e!important;}
        .speak-btn:active{transform:translate(1px,1px)!important;box-shadow:1px 1px 0 #1a1a2e!important;}
        .act-btn:hover{transform:translate(-2px,-2px)!important;box-shadow:4px 4px 0 #1a1a2e!important;}
        .act-btn:active{transform:translate(1px,1px)!important;box-shadow:1px 1px 0 #1a1a2e!important;}
        .pulse-ring{animation:pulseRing 1.2s ease-out infinite;}
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
          <div style={{
            position:"absolute",left:0,top:-6,
            width:97,height:142,
            border:"2px dashed #c4b5fd",borderRadius:14,background:"#f5f3ff",
            display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
            gap:4,pointerEvents:"none"
          }}>
            <span style={{fontSize:"1.4rem",opacity:0.35}}>🖼️</span>
            <span style={{fontFamily:"'Patrick Hand',cursive",fontSize:"0.65rem",color:"#c4b5fd",textAlign:"center"}}>logo / image</span>
          </div>

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
              }}>Hear My Hands</span>
            </div>
          </div>

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
              border:"2px dashed #d1d5db",borderRadius:12,padding:"8px 12px",
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
              border:"2px dashed #f9a8d4",borderRadius:12,padding:"8px 12px",
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
              <Waveform active={camActive && handDetected}/>
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
              {handDetected && (
                <span style={{position:"relative",display:"inline-flex",alignItems:"center",justifyContent:"center",width:12,height:12}}>
                  <span className="pulse-ring" style={{position:"absolute",width:12,height:12,borderRadius:"50%",background:"#4ade80"}}/>
                  <span style={{width:8,height:8,borderRadius:"50%",background:"#4ade80",zIndex:1}}/>
                </span>
              )}
            </CardTitle>

            <div style={{
              flex:1,minHeight:0,border:"2.5px solid #2d2d3a",borderRadius:14,
              overflow:"hidden",position:"relative",background:"#1a1a2e"
            }}>
              {[{top:8,right:9,borderWidth:"2.5px 2.5px 0 0",borderRadius:"0 4px 0 0"},
                {bottom:9,left:8,borderWidth:"0 0 2.5px 2.5px",borderRadius:"0 0 0 4px"}
              ].map((s,i)=>(
                <div key={i} style={{position:"absolute",width:20,height:20,
                  borderColor:"white",borderStyle:"solid",zIndex:4,...s}}/>
              ))}

              {camActive && (
                <div style={{position:"absolute",top:8,left:10,zIndex:4,background:"white",
                  border:"1.5px solid #e5e7eb",borderRadius:999,padding:"2px 9px",
                  fontFamily:"'Patrick Hand',cursive",fontSize:".84rem",fontWeight:700,
                  display:"flex",alignItems:"center",gap:5}}>
                  <span style={{width:9,height:9,borderRadius:"50%",background:"#fb7185",
                    animation:"blink 1s step-end infinite",display:"inline-block"}}/> REC
                </div>
              )}

              {camActive && (
                <div style={{position:"absolute",top:8,right:10,zIndex:4,
                  background: handDetected ? "#dcfce7" : "rgba(255,255,255,0.7)",
                  border:`1.5px solid ${handDetected ? "#4ade80" : "#e5e7eb"}`,
                  borderRadius:999,padding:"2px 8px",
                  fontFamily:"'Patrick Hand',cursive",fontSize:".78rem",fontWeight:700,
                  display:"flex",alignItems:"center",gap:4,transition:"all .3s"}}>
                  <span>{handDetected ? "✋ Hand found" : "🤚 No hand"}</span>
                </div>
              )}

              <video ref={videoRef} muted playsInline style={{
                position:"absolute",inset:0,width:"100%",height:"100%",
                objectFit:"cover",borderRadius:12,
                display:camMode==="live"?"block":"none",
                transform:"scaleX(-1)",
              }}/>

              <canvas ref={canvasRef} style={{
                position:"absolute",inset:0,width:"100%",height:"100%",
                borderRadius:12,zIndex:3,
                display:camMode==="live"?"block":"none",
                transform:"scaleX(-1)",
              }}/>

              {camMode==="demo" && (
                <div style={{position:"absolute",inset:0,background:"#b0b0a8",
                  display:"flex",alignItems:"center",justifyContent:"center",borderRadius:12}}>
                  <span style={{fontFamily:"'Patrick Hand',cursive",fontSize:".95rem",color:"#555"}}>📷 Demo mode</span>
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
            </div>

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
                {handDetected
                  ? <span style={{color:"#4ade80",fontWeight:700}}>✓ Hand tracking active</span>
                  : <span>Show your hand to the camera… ♡</span>
                }
              </div>
            </div>

            {features.length > 0 && (
              <div style={{
                background:"#f0fdf4",border:"1.5px solid #4ade80",borderRadius:10,
                padding:"4px 10px",fontFamily:"'Patrick Hand',cursive",fontSize:".8rem",
                color:"#166534",display:"flex",alignItems:"center",gap:6,flexShrink:0
              }}>
                <span style={{width:8,height:8,borderRadius:"50%",background:"#4ade80",flexShrink:0}}/>
                {features.length} features captured (21 pts × xyz) — ready for model
              </div>
            )}

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
                <div className={wordAnim ? "gesture-in" : ""}>
                  <SignImage word={current.word} />
                </div>
              </div>
            </div>

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

            <div style={{flexShrink:0}}>
              <Pill bg="#d1fae5">Key Landmarks <span style={{fontWeight:400}}>(Live)</span></Pill>
              <div style={{marginTop:5,display:"flex",flexDirection:"column",gap:3}}>
                {KEY_LANDMARKS.map(({ idx, label, color }) => {
                  const lm = landmarks[idx];
                  return (
                    <div key={label} style={{display:"flex",alignItems:"center",gap:6,
                      fontFamily:"'Patrick Hand',cursive",fontSize:".8rem"}}>
                      <span style={{width:9,height:9,borderRadius:"50%",background:color,
                        display:"inline-block",flexShrink:0}}/>
                      <span style={{flex:1,color:"#374151"}}>{label}</span>
                      {lm ? (
                        <span style={{color:"#6b7280",fontFamily:"monospace",fontSize:".72rem"}}>
                          {lm.x.toFixed(2)}, {lm.y.toFixed(2)}
                        </span>
                      ) : (
                        <span style={{color:"#d1d5db",fontSize:".72rem"}}>—</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{flex:1,minHeight:0}}>
              <Pill bg="#fce7f3">Reason <span style={{fontWeight:400}}>(Model Interpretation)</span></Pill>
              <div style={{border:"1.5px dashed #fca5a5",borderRadius:12,
                padding:"8px 12px",background:"#fff8f8",marginTop:5}}>
                {(handDetected ? [
                  `${features.length} landmark values extracted`,
                  `Gesture most similar to ${current.word} training data`,
                  "Connect backend to get real prediction"
                ] : [
                  "Waiting for hand in frame…",
                  "MediaPipe tracking ready",
                  "Show hand to camera to extract landmarks"
                ]).map((r,i)=>(
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

        </div>
      </div>
    </>
  );
}