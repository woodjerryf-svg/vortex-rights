import { useState, useEffect, useRef } from "react";

const GA_ID = "G-2QTMF62BSY";

const IMGS = {
  heroArtist: "./Public/images/hero.jpg",
  studio:     "./Public/images/studio.jpg",
  performer:  "./Public/images/performer.jpg",
  mixing:     "./Public/images/mixing.jpg",
  artist2:    "./Public/images/artist.jpg",
  concert:    "./Public/images/concert.jpg",
  headphones: "./Public/images/headphones.jpg",
  teamwork:   "./Public/images/performer.jpg",
  vinyl:      "./Public/images/logo.jpg",
  phone:      "./Public/images/logo.jpg",
};

const NAV_LINKS = ["Accueil","Services","Tarifs","À Propos","Contact"];

const PACKS = [
  {
    name:"Pack Décollage", price:"50", originalPrice:"100", badge:"Lancement",
    featured:false,
    features:["Distribution single/album","ISRC & UPC inclus","Métadonnées optimisées","Livraison sous 7 jours"],
    cta:"Décoller maintenant",
  },
  {
    name:"Pack Pro & Protection", price:"150", originalPrice:"300", badge:"Populaire ★",
    featured:true,
    features:["Tout du Pack Décollage","Content ID YouTube & TikTok","Claim Spotify for Artists","OAC YouTube activé","Veille des droits 30 jours"],
    cta:"Me protéger",
  },
  {
    name:"Pack Label", price:"300", originalPrice:"600", badge:"Premium",
    featured:false,
    features:["Gestion multi-artistes","Support prioritaire 7j/7","Tableau de bord catalogue","Conseil stratégique mensuel","Branding complet inclus"],
    cta:"Construire mon label",
  },
];

/* ── VORTEX SPIRAL CANVAS ── */
function VortexSpiral({ size=600, opacity=1 }) {
  const ref = useRef(null);
  useEffect(()=>{
    const c = ref.current; if(!c) return;
    const ctx = c.getContext("2d");
    let raf, t=0;
    c.width=size; c.height=size;
    const draw=()=>{
      ctx.clearRect(0,0,size,size);
      const cx=size/2, cy=size/2;
      const ARMS=3;
      for(let arm=0;arm<ARMS;arm++){
        const ao=(arm/ARMS)*Math.PI*2;
        for(let layer=0;layer<5;layer++){
          ctx.beginPath();
          for(let i=0;i<=500;i++){
            const frac=i/500;
            const r=frac*size*0.46;
            const theta=frac*Math.PI*6+ao+t+layer*0.12;
            const x=cx+Math.cos(theta)*r;
            const y=cy+Math.sin(theta)*r*0.9;
            i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
          }
          const alpha=Math.max(0,(0.18-layer*0.03));
          const lw=Math.max(0.3,2.5-layer*0.5);
          ctx.strokeStyle=`rgba(50,150,255,${alpha})`;
          ctx.lineWidth=lw; ctx.stroke();
        }
        ctx.beginPath();
        for(let i=0;i<=250;i++){
          const frac=i/250;
          const r=frac*size*0.3;
          const theta=frac*Math.PI*6+ao+t;
          const x=cx+Math.cos(theta)*r;
          const y=cy+Math.sin(theta)*r*0.9;
          i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
        }
        ctx.strokeStyle="rgba(140,210,255,0.5)";
        ctx.lineWidth=1.2; ctx.stroke();
      }
      for(let p=0;p<100;p++){
        const frac=((p/100)+t*0.025)%1;
        const arm=p%ARMS;
        const ao=(arm/ARMS)*Math.PI*2;
        const r=frac*size*0.44;
        const theta=frac*Math.PI*6+ao+t;
        const x=cx+Math.cos(theta)*r;
        const y=cy+Math.sin(theta)*r*0.9;
        const sz=(1-frac)*2.8+0.3;
        ctx.beginPath();ctx.arc(x,y,sz,0,Math.PI*2);
        ctx.fillStyle=`rgba(180,225,255,${(1-frac)*0.85})`;ctx.fill();
      }
      const cg=ctx.createRadialGradient(cx,cy,0,cx,cy,size*0.12);
      cg.addColorStop(0,"rgba(255,255,255,0.9)");
      cg.addColorStop(0.25,"rgba(160,210,255,0.5)");
      cg.addColorStop(0.6,"rgba(40,120,255,0.12)");
      cg.addColorStop(1,"transparent");
      ctx.beginPath();ctx.arc(cx,cy,size*0.12,0,Math.PI*2);
      ctx.fillStyle=cg;ctx.fill();
      const halo=ctx.createRadialGradient(cx,cy,size*0.08,cx,cy,size*0.42);
      halo.addColorStop(0,"rgba(30,100,255,0.18)");
      halo.addColorStop(0.5,"rgba(15,70,200,0.06)");
      halo.addColorStop(1,"transparent");
      ctx.beginPath();ctx.arc(cx,cy,size*0.42,0,Math.PI*2);
      ctx.fillStyle=halo;ctx.fill();
      t+=0.005; raf=requestAnimationFrame(draw);
    };
    draw();
    return()=>cancelAnimationFrame(raf);
  },[size]);
  return <canvas ref={ref} style={{width:size,height:size,opacity,display:"block",maxWidth:"100%"}}/>;
}

/* ── SCROLL TO TOP ── */
function ScrollTop(){
  const [vis,setVis]=useState(false);
  useEffect(()=>{
    const h=()=>setVis(window.scrollY>400);
    window.addEventListener("scroll",h);
    return()=>window.removeEventListener("scroll",h);
  },[]);
  if(!vis) return null;
  return(
    <button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}
      style={{position:"fixed",bottom:28,right:28,zIndex:999,width:46,height:46,borderRadius:"50%",
        background:"linear-gradient(135deg,#0044FF,#0099FF)",border:"none",color:"#fff",
        fontSize:"1.1rem",cursor:"pointer",boxShadow:"0 0 22px rgba(0,100,255,0.5)",
        display:"flex",alignItems:"center",justifyContent:"center",transition:"transform 0.2s",
      }}
      onMouseEnter={e=>e.currentTarget.style.transform="translateY(-3px)"}
      onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}
    >↑</button>
  );
}

/* ── COUNTDOWN BANNER ── */
function CountdownBanner(){
  const [time,setTime]=useState({d:0,h:0,m:0,s:0});
  useEffect(()=>{
    const end=new Date();end.setDate(end.getDate()+27);
    const tick=()=>{
      const d=end-new Date();if(d<=0)return;
      setTime({d:Math.floor(d/86400000),h:Math.floor((d%86400000)/3600000),m:Math.floor((d%3600000)/60000),s:Math.floor((d%60000)/1000)});
    };tick();const id=setInterval(tick,1000);return()=>clearInterval(id);
  },[]);
  const U=({v,l})=>(
    <div style={{textAlign:"center",minWidth:32}}>
      <div style={{fontFamily:"'Space Mono',monospace",fontSize:"1rem",fontWeight:700,color:"#fff",lineHeight:1}}>{String(v).padStart(2,"0")}</div>
      <div style={{fontFamily:"'Space Mono',monospace",fontSize:"0.48rem",color:"#5599FF",letterSpacing:"0.12em",marginTop:1}}>{l}</div>
    </div>
  );
  return(
    <div style={{background:"linear-gradient(90deg,#010820,#011540,#010820)",borderBottom:"1px solid rgba(0,80,200,0.3)",padding:"8px 20px",display:"flex",alignItems:"center",justifyContent:"center",gap:20,flexWrap:"wrap"}}>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <span style={{width:5,height:5,borderRadius:"50%",background:"#0099FF",display:"inline-block"}}/>
        <span style={{fontFamily:"'Syne',sans-serif",fontSize:"0.7rem",color:"#aac8ff",letterSpacing:"0.04em"}}>
          <strong style={{color:"#fff"}}>OFFRE LANCEMENT — 50% DE RÉDUCTION</strong> · Expire dans :
        </span>
      </div>
      <div style={{display:"flex",gap:7,alignItems:"center"}}>
        <U v={time.d} l="J"/><span style={{color:"#1a6dff",fontWeight:700}}>:</span>
        <U v={time.h} l="H"/><span style={{color:"#1a6dff",fontWeight:700}}>:</span>
        <U v={time.m} l="M"/><span style={{color:"#1a6dff",fontWeight:700}}>:</span>
        <U v={time.s} l="S"/>
      </div>
    </div>
  );
}

/* ── NAVBAR ── */
function Navbar({page,setPage}){
  const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{const h=()=>setScrolled(window.scrollY>50);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h);},[]);
  return(
    <nav style={{position:"sticky",top:0,zIndex:200,background:scrolled?"rgba(0,0,0,0.97)":"rgba(0,0,0,0.88)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(26,109,255,0.18)",padding:"0 clamp(20px,4vw,60px)",display:"flex",alignItems:"center",height:68,gap:36,transition:"background 0.4s"}}>
      {/* LOGO */}
      <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer",flexShrink:0}} onClick={()=>setPage("Accueil")}>
        <svg width="36" height="36" viewBox="0 0 38 38">
          <defs><linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0044FF"/><stop offset="100%" stopColor="#00AAFF"/></linearGradient></defs>
          <circle cx="19" cy="19" r="17.5" fill="none" stroke="url(#lg1)" strokeWidth="1.2"/>
          <path d="M10 12 L19 26 L28 12" fill="none" stroke="url(#lg1)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 12 L19 21 L24 12" fill="none" stroke="rgba(100,180,255,0.45)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:900,fontSize:"1.1rem",color:"#fff",letterSpacing:"0.06em",lineHeight:1.1}}>VORTEX</div>
          <div style={{fontFamily:"'Space Mono',monospace",fontSize:"0.5rem",color:"#3a88ff",letterSpacing:"0.3em",lineHeight:1}}>RIGHTS</div>
        </div>
      </div>
      <div style={{flex:1}}/>
      <div style={{display:"flex",gap:2,alignItems:"center"}}>
        {NAV_LINKS.map(l=>(
          <button key={l} onClick={()=>setPage(l)} style={{background:"transparent",border:"none",borderBottom:`2px solid ${page===l?"#1a6dff":"transparent"}`,color:page===l?"#fff":"rgba(190,205,230,0.65)",fontFamily:"'Syne',sans-serif",fontSize:"0.8rem",fontWeight:page===l?700:500,letterSpacing:"0.04em",padding:"8px 14px",cursor:"pointer",transition:"all 0.2s"}}
          onMouseEnter={e=>{if(page!==l)e.currentTarget.style.color="#fff"}}
          onMouseLeave={e=>{if(page!==l)e.currentTarget.style.color="rgba(190,205,230,0.65)"}}
          >{l}</button>
        ))}
      </div>
      <button onClick={()=>setPage("Contact")} style={{background:"linear-gradient(135deg,#1a4dff,#0099ff)",border:"none",color:"#fff",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.78rem",letterSpacing:"0.07em",padding:"9px 22px",borderRadius:100,cursor:"pointer",boxShadow:"0 0 18px rgba(0,100,255,0.4)",transition:"all 0.2s",flexShrink:0}}
        onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 0 32px rgba(0,100,255,0.65)";e.currentTarget.style.transform="translateY(-1px)"}}
        onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 0 18px rgba(0,100,255,0.4)";e.currentTarget.style.transform="translateY(0)"}}
      >Contactez-Nous</button>
    </nav>
  );
}

/* ── HERO ── */
function Hero({setPage}){
  return(
    <section style={{position:"relative",minHeight:"calc(100vh - 68px)",background:"#000",overflow:"hidden",display:"flex",flexDirection:"column"}}>
      {/* faint bg artist */}
      <div style={{position:"absolute",inset:0,backgroundImage:`url(${IMGS.heroArtist})`,backgroundSize:"cover",backgroundPosition:"center",opacity:0.045,pointerEvents:"none"}}/>
      {/* grid */}
      <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(26,109,255,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(26,109,255,0.035) 1px,transparent 1px)",backgroundSize:"70px 70px",pointerEvents:"none"}}/>
      {/* VORTEX centered-right exactly like screen */}
      <div style={{position:"absolute",top:"50%",left:"58%",transform:"translate(-50%,-50%)",pointerEvents:"none"}}>
        <VortexSpiral size={700} opacity={1}/>
      </div>
      {/* bottom fade */}
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:130,background:"linear-gradient(transparent,#000)",pointerEvents:"none"}}/>
      {/* Content bottom-left */}
      <div style={{position:"relative",zIndex:2,flex:1,display:"flex",alignItems:"flex-end",padding:"0 clamp(28px,5vw,80px) clamp(60px,8vh,100px)"}}>
        <div style={{maxWidth:540}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(0,60,180,0.14)",border:"1px solid rgba(0,100,255,0.28)",borderRadius:100,padding:"5px 16px",marginBottom:24}}>
            <span style={{width:5,height:5,borderRadius:"50%",background:"#0099FF",display:"inline-block"}}/>
            <span style={{fontFamily:"'Space Mono',monospace",fontSize:"0.6rem",color:"#3a88ff",letterSpacing:"0.18em"}}>LABEL SERVICES & ADMINISTRATION MUSICALE</span>
          </div>
          <h1 style={{fontFamily:"'Anton','Impact','Syne',sans-serif",fontWeight:900,fontSize:"clamp(2.6rem,5.5vw,4.4rem)",lineHeight:1.05,color:"#fff",margin:"0 0 8px",letterSpacing:"0.01em"}}>
            Le pont entre
          </h1>
          <h1 style={{fontFamily:"'Anton','Impact','Syne',sans-serif",fontWeight:900,fontSize:"clamp(2.6rem,5.5vw,4.4rem)",lineHeight:1.05,margin:"0 0 24px",letterSpacing:"0.01em",background:"linear-gradient(95deg,#ffffff 0%,#88ccff 55%,#1a6dff 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
            votre talent et vos revenus.
          </h1>
          <p style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(0.88rem,1.4vw,1rem)",color:"rgba(175,200,240,0.75)",lineHeight:1.75,marginBottom:36,maxWidth:450}}>
            Nous sommes le back-office technique et juridique de l'artiste indépendant. Distribution, protection des droits, branding — tout en un.
          </p>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            <button onClick={()=>setPage("Services")} style={{background:"linear-gradient(135deg,#1a44ff,#0099ff)",border:"none",color:"#fff",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.86rem",letterSpacing:"0.07em",padding:"13px 30px",borderRadius:100,cursor:"pointer",boxShadow:"0 0 36px rgba(0,100,255,0.45)",transition:"all 0.2s"}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 0 52px rgba(0,100,255,0.68)"}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 0 36px rgba(0,100,255,0.45)"}}
            >Découvrir nos services →</button>
            <button onClick={()=>setPage("Contact")} style={{background:"transparent",border:"1px solid rgba(100,160,255,0.38)",color:"rgba(180,210,255,0.88)",fontFamily:"'Syne',sans-serif",fontWeight:600,fontSize:"0.86rem",padding:"13px 26px",borderRadius:100,cursor:"pointer",transition:"all 0.2s"}}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(0,60,180,0.14)";e.currentTarget.style.borderColor="rgba(100,160,255,0.65)"}}
              onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor="rgba(100,160,255,0.38)"}}
            >Contacter l'équipe</button>
          </div>
          <div style={{display:"flex",gap:36,marginTop:48,flexWrap:"wrap"}}>
            {[{n:"100+",l:"Plateformes"},{n:"3",l:"Piliers"},{n:"-50%",l:"Lancement"},{n:"24/7",l:"Veille droits"}].map(({n,l})=>(
              <div key={l}>
                <div style={{fontFamily:"'Anton','Impact',sans-serif",fontWeight:900,fontSize:"1.65rem",color:"#fff",lineHeight:1}}>{n}</div>
                <div style={{fontFamily:"'Space Mono',monospace",fontSize:"0.58rem",color:"#3a88ff",letterSpacing:"0.14em",marginTop:3}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── SERVICES ── */
function Services({setPage}){
  const items=[
    {num:"01",title:"Administration",img:IMGS.studio,color:"#1a4fd6",
      desc:"Distribution mondiale, codes ISRC/UPC, optimisation complète de votre catalogue sur toutes les plateformes.",
      items:["Distribution mondiale multi-plateformes","Gestion des métadonnées (ISRC / UPC)","Optimisation & nettoyage du catalogue"],
      icon:<svg width="26" height="26" viewBox="0 0 26 26" fill="none"><circle cx="13" cy="13" r="11" stroke="#3a88ff" strokeWidth="1.4"/><path d="M7 13h12M13 7v12" stroke="#3a88ff" strokeWidth="2" strokeLinecap="round"/></svg>},
    {num:"02",title:"Protection",img:IMGS.performer,color:"#1a6dff",
      desc:"Content ID, claim de profils, veille permanente. Votre son vous appartient — nous le défendons.",
      items:["Content ID YouTube, TikTok, Meta","Claim Spotify for Artists & OAC","Veille & sécurisation des droits"],
      icon:<svg width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M13 2L22 6v7.5c0 4.5-4 8.5-9 9.5-5-1-9-5-9-9.5V6L13 2z" stroke="#3a88ff" strokeWidth="1.4" fill="none"/><path d="M9 13l2.5 2.5L17 9.5" stroke="#3a88ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>},
    {num:"03",title:"Branding",img:IMGS.mixing,color:"#38a0ff",
      desc:"Covers professionnelles, identité visuelle digitale, cohérence de marque artistique complète.",
      items:["Conception de covers professionnelles","Identité visuelle digitale complète","Cohérence de marque artistique"],
      icon:<svg width="26" height="26" viewBox="0 0 26 26" fill="none"><rect x="3" y="5" width="20" height="16" rx="2" stroke="#3a88ff" strokeWidth="1.4"/><path d="M7 17l3.5-4.5 2.5 3 2-2.5 3 4" stroke="#3a88ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="10" r="1.5" fill="#3a88ff"/></svg>},
  ];
  const [hov,setHov]=useState(null);
  return(
    <section style={{background:"#000",padding:"clamp(70px,10vw,130px) clamp(20px,5vw,80px)",position:"relative"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:`url(${IMGS.concert})`,backgroundSize:"cover",backgroundPosition:"center top",opacity:0.035,pointerEvents:"none"}}/>
      <div style={{maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1}}>
        <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:56,flexWrap:"wrap",gap:20}}>
          <div>
            <p style={{fontFamily:"'Space Mono',monospace",fontSize:"0.62rem",color:"#3a88ff",letterSpacing:"0.25em",marginBottom:12}}>— NOS SERVICES</p>
            <h2 style={{fontFamily:"'Anton','Impact','Syne',sans-serif",fontWeight:900,fontSize:"clamp(2rem,4.5vw,3.2rem)",color:"#fff",lineHeight:1.1,margin:0}}>
              Trois piliers.<br/><span style={{color:"#1a6dff"}}>Une vision totale.</span>
            </h2>
          </div>
          <button onClick={()=>setPage("Tarifs")} style={{background:"transparent",border:"1px solid rgba(100,160,255,0.32)",color:"rgba(180,210,255,0.78)",fontFamily:"'Syne',sans-serif",fontSize:"0.78rem",padding:"9px 20px",borderRadius:100,cursor:"pointer",transition:"all 0.2s"}}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(0,60,180,0.12)";e.currentTarget.style.borderColor="rgba(100,160,255,0.58)"}}
            onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor="rgba(100,160,255,0.32)"}}
          >Voir les tarifs →</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:22}}>
          {items.map((s,i)=>(
            <div key={s.title} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)} style={{background:hov===i?"rgba(8,25,80,0.6)":"rgba(255,255,255,0.022)",border:`1px solid ${hov===i?"rgba(26,109,255,0.52)":"rgba(255,255,255,0.055)"}`,borderRadius:10,overflow:"hidden",transition:"all 0.35s",boxShadow:hov===i?"0 0 45px rgba(26,109,255,0.13)":"none"}}>
              <div style={{height:175,overflow:"hidden",position:"relative"}}>
                <img src={s.img} alt={s.title} style={{width:"100%",height:"100%",objectFit:"cover",filter:"brightness(0.5) saturate(0.75)",transition:"transform 0.6s",transform:hov===i?"scale(1.06)":"scale(1)"}}/>
                <div style={{position:"absolute",inset:0,background:`linear-gradient(transparent 35%,${hov===i?"rgba(8,25,80,0.92)":"#000"} 100%)`}}/>
                <div style={{position:"absolute",top:14,left:14,background:"rgba(0,0,0,0.55)",border:`1px solid ${s.color}44`,borderRadius:6,padding:"3px 10px",fontFamily:"'Space Mono',monospace",fontSize:"0.57rem",color:s.color,letterSpacing:"0.2em"}}>PILIER {s.num}</div>
              </div>
              <div style={{padding:"26px 26px 30px"}}>
                <div style={{marginBottom:10}}>{s.icon}</div>
                <h3 style={{fontFamily:"'Anton','Impact','Syne',sans-serif",fontWeight:900,fontSize:"1.45rem",color:"#fff",margin:"0 0 10px"}}>{s.title}</h3>
                <p style={{fontFamily:"'Syne',sans-serif",fontSize:"0.81rem",color:"rgba(155,185,225,0.7)",lineHeight:1.7,marginBottom:18}}>{s.desc}</p>
                <ul style={{listStyle:"none",padding:0,margin:0,display:"flex",flexDirection:"column",gap:7}}>
                  {s.items.map(it=>(
                    <li key={it} style={{display:"flex",gap:9,alignItems:"flex-start"}}>
                      <span style={{color:s.color,fontSize:"0.65rem",marginTop:3,flexShrink:0}}>◆</span>
                      <span style={{fontFamily:"'Syne',sans-serif",fontSize:"0.78rem",color:"rgba(195,215,245,0.8)",lineHeight:1.5}}>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div style={{marginTop:56,display:"grid",gridTemplateColumns:"1fr 1fr",gap:18,borderRadius:10,overflow:"hidden"}}>
          <div style={{position:"relative",height:210,overflow:"hidden",borderRadius:10}}>
            <img src={IMGS.artist2} alt="Artist" style={{width:"100%",height:"100%",objectFit:"cover",filter:"brightness(0.45) saturate(0.7)"}}/>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(45deg,rgba(0,20,80,0.7),transparent)"}}/>
            <div style={{position:"absolute",bottom:18,left:18}}>
              <p style={{fontFamily:"'Space Mono',monospace",fontSize:"0.57rem",color:"#3a88ff",letterSpacing:"0.2em",marginBottom:4}}>ARTISTE INDÉPENDANT</p>
              <p style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.95rem",color:"#fff"}}>Votre talent mérite<br/>les meilleurs outils.</p>
            </div>
          </div>
          <div style={{position:"relative",height:210,overflow:"hidden",borderRadius:10}}>
            <img src={IMGS.headphones} alt="Production" style={{width:"100%",height:"100%",objectFit:"cover",filter:"brightness(0.42) saturate(0.7)"}}/>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(0,20,80,0.55),transparent)"}}/>
            <div style={{position:"absolute",bottom:18,left:18}}>
              <p style={{fontFamily:"'Space Mono',monospace",fontSize:"0.57rem",color:"#3a88ff",letterSpacing:"0.2em",marginBottom:4}}>PRODUCTION & DROITS</p>
              <p style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.95rem",color:"#fff"}}>Chaque son protégé,<br/>chaque revenu capturé.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── TARIFS ── */
function Tarifs({setPage}){
  return(
    <section style={{background:"#000",padding:"clamp(70px,10vw,130px) clamp(20px,5vw,80px)",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none",opacity:0.055}}>
        <VortexSpiral size={680}/>
      </div>
      <div style={{maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1}}>
        <div style={{textAlign:"center",marginBottom:14}}>
          <p style={{fontFamily:"'Space Mono',monospace",fontSize:"0.62rem",color:"#3a88ff",letterSpacing:"0.25em",marginBottom:12}}>— TARIFICATION</p>
          <h2 style={{fontFamily:"'Anton','Impact','Syne',sans-serif",fontWeight:900,fontSize:"clamp(2rem,4.5vw,3.2rem)",color:"#fff",lineHeight:1.1,margin:"0 0 14px"}}>
            Investissez dans<br/><span style={{color:"#1a6dff"}}>votre ascension.</span>
          </h2>
        </div>
        <div style={{background:"linear-gradient(135deg,rgba(0,45,150,0.18),rgba(0,110,255,0.1))",border:"1px solid rgba(0,110,255,0.28)",borderRadius:8,padding:"13px 22px",textAlign:"center",marginBottom:48,display:"flex",alignItems:"center",justifyContent:"center",gap:10,flexWrap:"wrap"}}>
          <span>⚡</span>
          <span style={{fontFamily:"'Syne',sans-serif",fontSize:"0.82rem",color:"#aaccff"}}>
            <strong style={{color:"#fff"}}>OFFRE LANCEMENT :</strong> Tous les prix incluent déjà la réduction de <strong style={{color:"#0099FF"}}>–50%</strong>. Durée limitée.
          </span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:22,alignItems:"start"}}>
          {PACKS.map(pack=>(
            <div key={pack.name} style={{background:pack.featured?"linear-gradient(145deg,rgba(0,38,120,0.52),rgba(0,65,190,0.22))":"rgba(255,255,255,0.022)",border:`1px solid ${pack.featured?"rgba(26,109,255,0.65)":"rgba(255,255,255,0.065)"}`,borderRadius:10,padding:"34px 28px",position:"relative",overflow:"hidden",boxShadow:pack.featured?"0 0 65px rgba(26,109,255,0.2)":"none",transform:pack.featured?"scale(1.03)":"scale(1)"}}>
              {pack.featured&&<div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg,#0044ff,#00aaff,#0044ff)"}}/>}
              <div style={{display:"inline-block",background:pack.featured?"rgba(26,109,255,0.18)":"rgba(255,255,255,0.055)",border:`1px solid ${pack.featured?"rgba(26,109,255,0.48)":"rgba(255,255,255,0.09)"}`,borderRadius:100,padding:"3px 13px",fontFamily:"'Space Mono',monospace",fontSize:"0.58rem",color:pack.featured?"#5599ff":"#666",letterSpacing:"0.14em",marginBottom:22}}>{pack.badge}</div>
              <h3 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.05rem",color:"#fff",margin:"0 0 18px"}}>{pack.name}</h3>
              <div style={{display:"flex",alignItems:"flex-end",gap:9,marginBottom:4}}>
                <span style={{fontFamily:"'Anton','Impact',sans-serif",fontWeight:900,fontSize:"clamp(2.2rem,4vw,2.9rem)",color:"#fff",lineHeight:1}}>${pack.price}</span>
                <span style={{fontFamily:"'Space Mono',monospace",fontSize:"0.72rem",color:"#3a3a4a",textDecoration:"line-through",marginBottom:7}}>${pack.originalPrice}</span>
              </div>
              <p style={{fontFamily:"'Space Mono',monospace",fontSize:"0.57rem",color:"#3a88ff",letterSpacing:"0.1em",marginBottom:26}}>PRIX LANCEMENT</p>
              <ul style={{listStyle:"none",padding:0,margin:"0 0 28px",display:"flex",flexDirection:"column",gap:9}}>
                {pack.features.map(f=>(
                  <li key={f} style={{display:"flex",gap:9,alignItems:"flex-start"}}>
                    <span style={{color:"#0099FF",fontSize:"0.65rem",marginTop:3,flexShrink:0}}>✓</span>
                    <span style={{fontFamily:"'Syne',sans-serif",fontSize:"0.78rem",color:"rgba(192,214,244,0.85)",lineHeight:1.4}}>{f}</span>
                  </li>
                ))}
              </ul>
              <a href="https://wa.me/50943469043" target="_blank" rel="noopener noreferrer" style={{display:"block",background:pack.featured?"linear-gradient(135deg,#0044ff,#0099ff)":"transparent",border:`1px solid ${pack.featured?"transparent":"rgba(26,109,255,0.38)"}`,color:"#fff",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.8rem",letterSpacing:"0.07em",padding:"12px 16px",borderRadius:100,cursor:"pointer",textAlign:"center",textDecoration:"none",boxShadow:pack.featured?"0 0 28px rgba(0,100,255,0.38)":"none",transition:"all 0.22s"}}
                onMouseEnter={e=>{if(!pack.featured)e.currentTarget.style.background="rgba(0,60,180,0.12)";e.currentTarget.style.transform="translateY(-2px)"}}
                onMouseLeave={e=>{if(!pack.featured)e.currentTarget.style.background="transparent";e.currentTarget.style.transform="translateY(0)"}}
              >{pack.cta} →</a>
            </div>
          ))}
        </div>
        {/* Modalités */}
        <div style={{marginTop:44,background:"linear-gradient(135deg,rgba(0,38,110,0.22),rgba(0,75,195,0.11))",border:"1px solid rgba(26,109,255,0.22)",borderRadius:10,padding:"26px 34px",display:"flex",gap:16,alignItems:"flex-start"}}>
          <div style={{fontSize:"1.5rem",flexShrink:0,marginTop:1}}>💳</div>
          <div>
            <p style={{fontFamily:"'Space Mono',monospace",fontSize:"0.6rem",color:"#3a88ff",letterSpacing:"0.2em",marginBottom:8}}>MODALITÉS DE PAIEMENT FLEXIBLES</p>
            <p style={{fontFamily:"'Syne',sans-serif",fontSize:"0.88rem",color:"rgba(198,218,248,0.9)",lineHeight:1.75,margin:0}}>
              <strong style={{color:"#fff"}}>70% à la commande</strong> pour lancer les procédures techniques, <strong style={{color:"#fff"}}>30% à la livraison finale</strong> de vos liens et certificats.
            </p>
          </div>
        </div>
        {/* CTA banner */}
        <div style={{marginTop:52,borderRadius:10,overflow:"hidden",position:"relative",height:210}}>
          <img src={IMGS.vinyl} alt="Music" style={{width:"100%",height:"100%",objectFit:"cover",filter:"brightness(0.28) saturate(0.45)"}}/>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,rgba(0,8,35,0.93) 0%,rgba(0,20,80,0.55) 60%,transparent 100%)"}}/>
          <div style={{position:"absolute",top:"50%",left:44,transform:"translateY(-50%)",maxWidth:480}}>
            <p style={{fontFamily:"'Space Mono',monospace",fontSize:"0.6rem",color:"#3a88ff",letterSpacing:"0.2em",marginBottom:10}}>UNE QUESTION ?</p>
            <p style={{fontFamily:"'Anton','Impact',sans-serif",fontWeight:900,fontSize:"clamp(1.4rem,3vw,2rem)",color:"#fff",marginBottom:18,lineHeight:1.2}}>On est là pour vous guider.</p>
            <button onClick={()=>setPage("Contact")} style={{background:"linear-gradient(135deg,#1a44ff,#0099ff)",border:"none",color:"#fff",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.82rem",letterSpacing:"0.08em",padding:"11px 26px",borderRadius:100,cursor:"pointer",boxShadow:"0 0 28px rgba(0,100,255,0.4)"}}>Parler à l'équipe →</button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── À PROPOS ── */
function About({setPage}){
  return(
    <section style={{background:"#000",padding:"clamp(70px,10vw,130px) clamp(20px,5vw,80px)"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:72,alignItems:"center",marginBottom:72}}>
          {/* Visual */}
          <div style={{position:"relative"}}>
            <div style={{borderRadius:10,overflow:"hidden",height:460,position:"relative"}}>
              <img src={IMGS.teamwork} alt="Team" style={{width:"100%",height:"100%",objectFit:"cover",filter:"brightness(0.42) saturate(0.65)"}}/>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,transparent 35%,rgba(0,8,35,0.9) 100%)"}}/>
            </div>
            <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none",opacity:0.28}}>
              <VortexSpiral size={300}/>
            </div>
            <div style={{position:"absolute",bottom:-20,left:20,right:20,background:"linear-gradient(135deg,rgba(0,18,72,0.97),rgba(0,40,120,0.97))",border:"1px solid rgba(26,109,255,0.38)",borderRadius:10,padding:"18px 22px",boxShadow:"0 0 36px rgba(0,55,180,0.28)"}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:44,height:44,borderRadius:"50%",background:"linear-gradient(135deg,#0044FF,#0099FF)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem",flexShrink:0}}>◎</div>
                <div>
                  <p style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"0.95rem",color:"#fff",margin:0}}>Wood Jerry Fils-Aimé</p>
                  <p style={{fontFamily:"'Space Mono',monospace",fontSize:"0.55rem",color:"#3a88ff",letterSpacing:"0.14em",margin:"2px 0 0"}}>PDG — VORTEX RIGHTS</p>
                </div>
                <div style={{marginLeft:"auto",textAlign:"right",flexShrink:0}}>
                  <p style={{fontFamily:"'Space Mono',monospace",fontSize:"0.55rem",color:"#445",margin:0}}>PARTENAIRE</p>
                  <p style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.82rem",color:"#fff",margin:"2px 0 0"}}>Blaka Recordz</p>
                </div>
              </div>
            </div>
          </div>
          {/* Text */}
          <div style={{paddingTop:18}}>
            <p style={{fontFamily:"'Space Mono',monospace",fontSize:"0.62rem",color:"#3a88ff",letterSpacing:"0.25em",marginBottom:14}}>— NOTRE VISION</p>
            <h2 style={{fontFamily:"'Anton','Impact','Syne',sans-serif",fontWeight:900,fontSize:"clamp(1.8rem,3.5vw,2.7rem)",color:"#fff",lineHeight:1.1,margin:"0 0 22px"}}>
              Le back-office de<br/><span style={{color:"#1a6dff"}}>l'artiste indépendant.</span>
            </h2>
            <p style={{fontFamily:"'Syne',sans-serif",fontSize:"0.9rem",color:"rgba(168,192,232,0.8)",lineHeight:1.8,marginBottom:18}}>
              Vortex Rights est né d'une conviction : les artistes de la diaspora haïtienne méritent les mêmes outils que les grands labels. La technologie musicale ne doit plus être un obstacle — elle doit devenir votre plus grand atout.
            </p>
            <p style={{fontFamily:"'Syne',sans-serif",fontSize:"0.86rem",color:"rgba(138,168,212,0.68)",lineHeight:1.8,marginBottom:36}}>
              Nous prenons en charge tout ce que vous ne devriez pas avoir à gérer : droits, codes, plateformes, protection. Pour que vous puissiez vous concentrer sur ce qui compte vraiment — créer.
            </p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              {[{icon:"🌍",l:"Diaspora haïtienne",s:"Notre communauté"},{icon:"⚡",l:"Rapidité",s:"Livraison 7 jours"},{icon:"🔒",l:"Sécurité totale",s:"Droits défendus"},{icon:"📈",l:"Croissance",s:"Revenus optimisés"}].map(({icon,l,s})=>(
                <div key={l} style={{background:"rgba(255,255,255,0.018)",border:"1px solid rgba(255,255,255,0.055)",borderRadius:8,padding:"13px",display:"flex",gap:9,alignItems:"center"}}>
                  <span style={{fontSize:"1.25rem"}}>{icon}</span>
                  <div>
                    <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.78rem",color:"#fff"}}>{l}</div>
                    <div style={{fontFamily:"'Space Mono',monospace",fontSize:"0.54rem",color:"#3a88ff",marginTop:2}}>{s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Concert banner */}
        <div style={{borderRadius:10,overflow:"hidden",position:"relative",height:260,marginTop:28}}>
          <img src={IMGS.concert} alt="Concert" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 30%",filter:"brightness(0.32) saturate(0.55)"}}/>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,rgba(0,4,25,0.94) 0%,rgba(0,18,70,0.52) 50%,transparent 100%)"}}/>
          <div style={{position:"absolute",top:"50%",left:44,transform:"translateY(-50%)",maxWidth:460}}>
            <p style={{fontFamily:"'Space Mono',monospace",fontSize:"0.62rem",color:"#3a88ff",letterSpacing:"0.2em",marginBottom:10}}>DIASPORA HAÏTIENNE</p>
            <p style={{fontFamily:"'Anton','Impact',sans-serif",fontWeight:900,fontSize:"clamp(1.4rem,3vw,2.1rem)",color:"#fff",lineHeight:1.2,marginBottom:18}}>Simplifier la technologie musicale pour les artistes à travers le monde.</p>
            <button onClick={()=>setPage("Contact")} style={{background:"linear-gradient(135deg,#1a44ff,#0099ff)",border:"none",color:"#fff",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.8rem",letterSpacing:"0.08em",padding:"11px 24px",borderRadius:100,cursor:"pointer",boxShadow:"0 0 28px rgba(0,100,255,0.4)"}}>Rejoindre Vortex Rights →</button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CONTACT ── */
function Contact(){
  const [form,setForm]=useState({name:"",email:"",service:"",message:""});
  const [sent,setSent]=useState(false);
  const set=(k,v)=>setForm(p=>({...p,[k]:v}));
  const base={width:"100%",boxSizing:"border-box",background:"rgba(6,10,32,0.85)",border:"1px solid rgba(28,75,175,0.22)",borderRadius:7,padding:"11px 15px",color:"#fff",fontFamily:"'Syne',sans-serif",fontSize:"0.83rem",outline:"none",transition:"border-color 0.2s"};
  return(
    <section style={{background:"#000",padding:"clamp(70px,10vw,130px) clamp(20px,5vw,80px)",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:"50%",right:"-10%",transform:"translateY(-50%)",pointerEvents:"none",opacity:0.065}}>
        <VortexSpiral size={580}/>
      </div>
      <div style={{maxWidth:1100,margin:"0 auto",position:"relative",zIndex:1}}>
        <div style={{textAlign:"center",marginBottom:56}}>
          <p style={{fontFamily:"'Space Mono',monospace",fontSize:"0.62rem",color:"#3a88ff",letterSpacing:"0.25em",marginBottom:12}}>— CONTACT</p>
          <h2 style={{fontFamily:"'Anton','Impact','Syne',sans-serif",fontWeight:900,fontSize:"clamp(2rem,4.5vw,3.2rem)",color:"#fff",lineHeight:1.1,margin:"0 0 14px"}}>
            Votre ascension<br/><span style={{color:"#1a6dff"}}>commence ici.</span>
          </h2>
          <p style={{fontFamily:"'Syne',sans-serif",fontSize:"0.87rem",color:"rgba(155,185,230,0.7)"}}>Prêt à protéger votre musique et monétiser votre talent ?</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1.5fr",gap:44,alignItems:"start"}}>
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            <div style={{borderRadius:10,overflow:"hidden",height:195,marginBottom:4,position:"relative"}}>
              <img src={IMGS.phone} alt="Contact" style={{width:"100%",height:"100%",objectFit:"cover",filter:"brightness(0.38) saturate(0.55)"}}/>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,transparent 25%,rgba(0,4,25,0.92) 100%)"}}/>
              <div style={{position:"absolute",bottom:14,left:14}}>
                <p style={{fontFamily:"'Space Mono',monospace",fontSize:"0.57rem",color:"#3a88ff",letterSpacing:"0.14em",marginBottom:3}}>ON VOUS RÉPOND</p>
                <p style={{fontFamily:"'Syne',sans-serif",fontWeight:700,color:"#fff",fontSize:"0.88rem"}}>Dans les 2 heures.</p>
              </div>
            </div>
            {[{icon:"💬",label:"WhatsApp",value:"+509 4346-9043",href:"https://wa.me/50943469043",sub:"Réponse sous 2h"},{icon:"✉️",label:"Email",value:"contact@vortexrights.com",href:"mailto:contact@vortexrights.com",sub:"Réponse sous 24h"},{icon:"📱",label:"Réseaux sociaux",value:"@VortexRights",href:"#",sub:"Instagram · TikTok · Facebook"}].map(({icon,label,value,href,sub})=>(
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{display:"flex",gap:13,alignItems:"center",background:"rgba(255,255,255,0.018)",border:"1px solid rgba(255,255,255,0.055)",borderRadius:8,padding:"16px",textDecoration:"none",transition:"all 0.22s"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(26,109,255,0.42)";e.currentTarget.style.background="rgba(0,38,120,0.11)"}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.055)";e.currentTarget.style.background="rgba(255,255,255,0.018)"}}
              >
                <span style={{fontSize:"1.45rem"}}>{icon}</span>
                <div>
                  <div style={{fontFamily:"'Space Mono',monospace",fontSize:"0.56rem",color:"#3a88ff",letterSpacing:"0.14em",marginBottom:3}}>{label}</div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.85rem",color:"#fff"}}>{value}</div>
                  <div style={{fontFamily:"'Space Mono',monospace",fontSize:"0.55rem",color:"#444",marginTop:2}}>{sub}</div>
                </div>
              </a>
            ))}
          </div>
          {!sent?(
            <div style={{background:"rgba(6,9,35,0.72)",border:"1px solid rgba(26,109,255,0.16)",borderRadius:10,padding:"36px 32px"}}>
              <div style={{display:"flex",flexDirection:"column",gap:16}}>
                {[{k:"name",l:"Nom / Nom d'artiste",t:"text",ph:"Ex: Junior Beats"},{k:"email",l:"Email",t:"email",ph:"votre@email.com"}].map(({k,l,t,ph})=>(
                  <div key={k}>
                    <label style={{fontFamily:"'Space Mono',monospace",fontSize:"0.57rem",color:"#3a88ff",letterSpacing:"0.14em",display:"block",marginBottom:6}}>{l}</label>
                    <input type={t} placeholder={ph} value={form[k]} onChange={e=>set(k,e.target.value)} style={base}
                      onFocus={e=>e.target.style.borderColor="rgba(26,109,255,0.58)"}
                      onBlur={e=>e.target.style.borderColor="rgba(28,75,175,0.22)"}
                    />
                  </div>
                ))}
                <div>
                  <label style={{fontFamily:"'Space Mono',monospace",fontSize:"0.57rem",color:"#3a88ff",letterSpacing:"0.14em",display:"block",marginBottom:6}}>Service d'intérêt</label>
                  <select value={form.service} onChange={e=>set("service",e.target.value)} style={{...base,color:form.service?"#fff":"#444"}}>
                    <option value="">Choisir un pack…</option>
                    {PACKS.map(p=><option key={p.name} value={p.name}>{p.name} — ${p.price}</option>)}
                    <option value="Info">Demande d'information</option>
                  </select>
                </div>
                <div>
                  <label style={{fontFamily:"'Space Mono',monospace",fontSize:"0.57rem",color:"#3a88ff",letterSpacing:"0.14em",display:"block",marginBottom:6}}>Message</label>
                  <textarea placeholder="Décrivez votre projet…" rows={4} value={form.message} onChange={e=>set("message",e.target.value)} style={{...base,resize:"vertical"}}
                    onFocus={e=>e.target.style.borderColor="rgba(26,109,255,0.58)"}
                    onBlur={e=>e.target.style.borderColor="rgba(28,75,175,0.22)"}
                  />
                </div>
                <button onClick={()=>{if(form.name&&form.email)setSent(true)}} style={{background:"linear-gradient(135deg,#0044ff,#0099ff)",border:"none",color:"#fff",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"0.86rem",letterSpacing:"0.09em",padding:"13px",borderRadius:100,cursor:"pointer",boxShadow:"0 0 28px rgba(0,100,255,0.38)",transition:"all 0.2s",marginTop:4}}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 0 45px rgba(0,100,255,0.58)"}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 0 28px rgba(0,100,255,0.38)"}}
                >Envoyer le message →</button>
              </div>
            </div>
          ):(
            <div style={{background:"linear-gradient(135deg,rgba(0,48,155,0.2),rgba(0,98,255,0.1))",border:"1px solid rgba(0,145,255,0.38)",borderRadius:10,padding:"65px 36px",textAlign:"center"}}>
              <div style={{fontSize:"2.8rem",marginBottom:18}}>◎</div>
              <h3 style={{fontFamily:"'Anton','Impact',sans-serif",fontWeight:900,fontSize:"1.4rem",color:"#fff",marginBottom:10}}>Message envoyé !</h3>
              <p style={{fontFamily:"'Syne',sans-serif",fontSize:"0.88rem",color:"rgba(175,208,255,0.8)",lineHeight:1.75}}>Notre équipe vous recontactera dans les 24h.<br/>Votre ascension commence maintenant.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function Footer({setPage}){
  return(
    <footer style={{background:"#000",borderTop:"1px solid rgba(26,109,255,0.1)",padding:"36px clamp(20px,5vw,80px)"}}>
      <div style={{maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:22}}>
        <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={()=>setPage("Accueil")}>
          <svg width="28" height="28" viewBox="0 0 38 38"><defs><linearGradient id="flg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0044FF"/><stop offset="100%" stopColor="#00AAFF"/></linearGradient></defs><circle cx="19" cy="19" r="17" fill="none" stroke="url(#flg)" strokeWidth="1.2"/><path d="M10 12 L19 26 L28 12" fill="none" stroke="url(#flg)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <div>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:900,fontSize:"0.88rem",color:"#fff",letterSpacing:"0.06em",lineHeight:1.1}}>VORTEX RIGHTS</div>
            <div style={{fontFamily:"'Space Mono',monospace",fontSize:"0.48rem",color:"#3a88ff",letterSpacing:"0.2em"}}>LABEL SERVICES</div>
          </div>
        </div>
        <div style={{display:"flex",gap:2,flexWrap:"wrap"}}>
          {NAV_LINKS.map(l=>(
            <button key={l} onClick={()=>setPage(l)} style={{background:"transparent",border:"none",color:"#3a3a55",fontFamily:"'Space Mono',monospace",fontSize:"0.6rem",letterSpacing:"0.1em",cursor:"pointer",padding:"4px 9px",transition:"color 0.2s"}}
              onMouseEnter={e=>e.currentTarget.style.color="#fff"}
              onMouseLeave={e=>e.currentTarget.style.color="#3a3a55"}
            >{l}</button>
          ))}
        </div>
        <div style={{fontFamily:"'Space Mono',monospace",fontSize:"0.55rem",color:"#2a2a3a",letterSpacing:"0.1em",textAlign:"right",lineHeight:1.9}}>
          © 2025 VORTEX RIGHTS. Tous droits réservés.<br/>
          <span style={{color:"#1a3d7a"}}>Partenaire : Blaka Recordz</span>
        </div>
      </div>
    </footer>
  );
}

/* ── APP ── */
export default function App(){
  const [page,setPage]=useState("Accueil");
  const go=(p)=>{setPage(p);window.scrollTo({top:0,behavior:"smooth"});};
  const render=()=>{
    switch(page){
      case "Accueil": return <Hero setPage={go}/>;
      case "Services": return <Services setPage={go}/>;
      case "Tarifs": return <Tarifs setPage={go}/>;
      case "À Propos": return <About setPage={go}/>;
      case "Contact": return <Contact/>;
      default: return <Hero setPage={go}/>;
    }
  };
  return(
    <div style={{background:"#000",minHeight:"100vh",color:"#fff",fontFamily:"'Syne',sans-serif",overflowX:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800;900&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Anton&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;}
        html{scroll-behavior:smooth;}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-track{background:#000;}
        ::-webkit-scrollbar-thumb{background:#1a4dff;border-radius:2px;}
        input::placeholder,textarea::placeholder{color:#2e2e45;}
        select option{background:#05071a;}
        /* META SECURITY HEADERS (reference for Next.js next.config.js):
           X-Frame-Options: DENY
           X-Content-Type-Options: nosniff
           X-XSS-Protection: 1; mode=block
           Referrer-Policy: strict-origin-when-cross-origin
           Permissions-Policy: camera=(), microphone=(), geolocation=()
           Content-Security-Policy: default-src 'self'; ...
        */
      `}</style>
      {/* Google Analytics G-2QTMF62BSY */}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}/>
      <script dangerouslySetInnerHTML={{__html:`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{send_page_view:true});`}}/>
      <CountdownBanner/>
      <Navbar page={page} setPage={go}/>
      <main>{render()}</main>
      <Footer setPage={go}/>
      <ScrollTop/>
    </div>
  );
}
