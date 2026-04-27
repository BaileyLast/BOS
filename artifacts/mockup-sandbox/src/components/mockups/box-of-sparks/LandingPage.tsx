import React, { useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Code2, MonitorSmartphone, Sparkles, Layers, BoxSelect } from "lucide-react";

const FACE_SIZE = 300;
const HALF = FACE_SIZE / 2;

const faces = [
  {
    transform: `translateZ(${HALF}px)`,
    label: "Websites",
    icon: <MonitorSmartphone className="w-10 h-10 mb-5" strokeWidth={1} />,
    bg: "rgba(255,255,255,0.07)",
    glow: "rgba(120,200,255,0.22)",
    scanColor: "rgba(120,200,255,0.25)",
  },
  {
    transform: `rotateY(180deg) translateZ(${HALF}px)`,
    label: "Apps",
    icon: <Code2 className="w-10 h-10 mb-5" strokeWidth={1} />,
    bg: "rgba(255,255,255,0.05)",
    glow: "rgba(255,150,180,0.20)",
    scanColor: "rgba(255,150,180,0.25)",
  },
  {
    transform: `rotateY(90deg) translateZ(${HALF}px)`,
    label: "Brands",
    icon: <BoxSelect className="w-10 h-10 mb-5" strokeWidth={1} />,
    bg: "rgba(255,255,255,0.06)",
    glow: "rgba(120,255,190,0.18)",
    scanColor: "rgba(120,255,190,0.25)",
  },
  {
    transform: `rotateY(-90deg) translateZ(${HALF}px)`,
    label: "Ideas",
    icon: <Sparkles className="w-10 h-10 mb-5" strokeWidth={1} />,
    bg: "rgba(255,255,255,0.06)",
    glow: "rgba(200,160,255,0.22)",
    scanColor: "rgba(200,160,255,0.25)",
  },
  {
    transform: `rotateX(90deg) translateZ(${HALF}px)`,
    label: "Box of",
    icon: <Layers className="w-10 h-10 mb-5" strokeWidth={1} />,
    bg: "rgba(255,255,255,0.04)",
    glow: "rgba(255,240,160,0.16)",
    scanColor: "rgba(255,240,160,0.25)",
  },
  {
    transform: `rotateX(-90deg) translateZ(${HALF}px)`,
    label: "Sparks",
    icon: <Sparkles className="w-10 h-10 mb-5" strokeWidth={1} />,
    bg: "rgba(255,255,255,0.04)",
    glow: "rgba(255,180,100,0.16)",
    scanColor: "rgba(255,180,100,0.25)",
  },
];

// Particle color palette — subtle tints
const PARTICLE_COLORS = [
  "120,200,255",   // cool blue
  "255,160,200",   // warm pink
  "140,255,200",   // mint green
  "210,180,255",   // soft purple
  "255,220,140",   // warm gold
  "255,255,255",   // pure white
];

function getColor(i: number) {
  return PARTICLE_COLORS[i % PARTICLE_COLORS.length];
}

// Three orbital rings — different tilt planes
const ORBIT_RINGS = [
  { count: 20, minR: 170, maxR: 195, minD: 9,  maxD: 13, tiltX: 0,   tiltZ: 0   },
  { count: 26, minR: 215, maxR: 248, minD: 15, maxD: 22, tiltX: 20,  tiltZ: 10  },
  { count: 18, minR: 258, maxR: 310, minD: 26, maxD: 38, tiltX: -12, tiltZ: 18  },
];

const ORBIT_PARTICLES = ORBIT_RINGS.flatMap((ring, ri) =>
  Array.from({ length: ring.count }, (_, i) => {
    const t = i / ring.count;
    return {
      id:       ri * 100 + i,
      angle:    t * 360 + ri * 13,
      radius:   ring.minR + (i % 5) * ((ring.maxR - ring.minR) / 4),
      size:     i % 7 === 0 ? 5 : i % 3 === 0 ? 3 : 2,
      duration: ring.minD + (i % 6) * ((ring.maxD - ring.minD) / 5),
      delay:    -(i * (ring.maxD / ring.count)),
      baseOpacity: 0.25 + (i % 4) * 0.12,
      color:    getColor(ri * 7 + i),
      tiltX:    ring.tiltX,
      tiltZ:    ring.tiltZ,
    };
  })
);

// Comet streaks — fast, elongated, bright
const COMETS = Array.from({ length: 7 }, (_, i) => ({
  id:       500 + i,
  angle:    (i / 7) * 360 + 5,
  radius:   205 + i * 15,
  duration: 5 + i * 0.9,
  delay:    -(i * 1.1),
  color:    getColor(i * 2),
  length:   22 + i * 6,
}));

interface OrbitParticleProps {
  angle: number; radius: number; size: number; duration: number;
  delay: number; baseOpacity: number; color: string; tiltX: number; tiltZ: number;
}
function OrbitParticle({ angle, radius, size, duration, delay, baseOpacity, color, tiltX, tiltZ }: OrbitParticleProps) {
  const steps = 60;
  const xs = Array.from({ length: steps + 1 }, (_, k) => {
    const a = (angle + (k / steps) * 360) * (Math.PI / 180);
    return Math.cos(a) * radius;
  });
  const ys = Array.from({ length: steps + 1 }, (_, k) => {
    const a = (angle + (k / steps) * 360) * (Math.PI / 180);
    return Math.sin(a) * radius * 0.4;
  });

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        top: "50%",
        left: "50%",
        marginTop: -size / 2,
        marginLeft: -size / 2,
        boxShadow: `0 0 ${size * 3}px rgba(${color},0.9), 0 0 ${size}px rgba(${color},1)`,
        backgroundColor: `rgba(${color},1)`,
      }}
      animate={{
        x: xs,
        y: ys,
        opacity: [
          baseOpacity,
          baseOpacity * 0.4,
          baseOpacity * 1.3,
          baseOpacity * 0.6,
          baseOpacity,
        ],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        delay,
        opacity: { duration: duration * 0.8, repeat: Infinity, ease: "easeInOut", delay },
      }}
    />
  );
}

interface CometProps { angle: number; radius: number; duration: number; delay: number; color: string; length: number; }
function Comet({ angle, radius, duration, delay, color, length }: CometProps) {
  const steps = 60;
  const xs = Array.from({ length: steps + 1 }, (_, k) => {
    const a = (angle + (k / steps) * 360) * (Math.PI / 180);
    return Math.cos(a) * radius;
  });
  const ys = Array.from({ length: steps + 1 }, (_, k) => {
    const a = (angle + (k / steps) * 360) * (Math.PI / 180);
    return Math.sin(a) * radius * 0.4;
  });
  const rotates = Array.from({ length: steps + 1 }, (_, k) => {
    const a = angle + (k / steps) * 360;
    return a + 90;
  });

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        width: 2,
        height: length,
        top: "50%",
        left: "50%",
        marginTop: -length / 2,
        marginLeft: -1,
        borderRadius: 2,
        background: `linear-gradient(to bottom, rgba(${color},0), rgba(${color},0.9) 60%, rgba(${color},1))`,
        boxShadow: `0 0 6px rgba(${color},0.7)`,
        transformOrigin: "center center",
      }}
      animate={{
        x: xs,
        y: ys,
        rotate: rotates,
        opacity: [0, 0.8, 1, 0.8, 0, 0, 0.7, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        delay,
        opacity: { duration: duration * 0.7, repeat: Infinity, ease: "easeInOut", delay },
      }}
    />
  );
}

function FaceScanline({ color, faceDelay }: { color: string; faceDelay: number }) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      <motion.div
        className="absolute left-0 right-0 h-12"
        style={{
          background: `linear-gradient(to bottom, transparent, ${color}, transparent)`,
          top: 0,
        }}
        animate={{ y: ["-100%", "400%"] }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: faceDelay,
          repeatDelay: 3,
        }}
      />
    </motion.div>
  );
}

function SpinningCube() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const tiltX = useSpring(rawX, { stiffness: 60, damping: 25 });
  const tiltY = useSpring(rawY, { stiffness: 60, damping: 25 });

  const handleMouse = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rawX.set(((e.clientY - cy) / rect.height) * 18);
    rawY.set(((e.clientX - cx) / rect.width) * -18);
  }, [rawX, rawY]);

  const handleLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center select-none cursor-none"
      style={{ width: 680, height: 680 }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
    >
      {/* Ambient colored halo */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 480,
          height: 480,
          background: "radial-gradient(circle, rgba(100,180,255,0.07) 0%, rgba(200,140,255,0.04) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7], rotate: [0, 180, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Pulsing rings */}
      {[1, 1.6, 2.2].map((delayOffset, ri) => (
        <motion.div
          key={ri}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 360 + ri * 40,
            height: 360 + ri * 40,
            border: `1px solid rgba(${ri === 0 ? "100,200,255" : ri === 1 ? "200,150,255" : "255,180,120"},0.12)`,
          }}
          animate={{ scale: [0.9, 1.25, 0.9], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: delayOffset }}
        />
      ))}

      {/* Orbit particles */}
      {ORBIT_PARTICLES.map((p) => (
        <OrbitParticle key={p.id} {...p} />
      ))}

      {/* Comet streaks */}
      {COMETS.map((c) => (
        <Comet key={c.id} {...c} />
      ))}

      {/* Ground glow */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          width: 240,
          height: 32,
          background: "radial-gradient(ellipse, rgba(140,200,255,0.10) 0%, transparent 70%)",
          filter: "blur(10px)",
        }}
        animate={{ opacity: [0.5, 1, 0.5], scaleX: [0.9, 1.1, 0.9] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Bob + tilt + spin */}
      <motion.div
        style={{ width: FACE_SIZE, height: FACE_SIZE, perspective: 1400 }}
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            rotateX: tiltX,
            rotateY: tiltY,
          }}
        >
          <motion.div
            className="relative w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateX: [15, 375], rotateY: [0, 360] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          >
            {faces.map((face, i) => (
              <div
                key={i}
                className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
                style={{
                  transform: face.transform,
                  background: face.bg,
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  boxShadow: `inset 0 0 50px ${face.glow}, 0 0 28px ${face.glow}`,
                }}
              >
                {/* Shimmer */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.09) 0%, transparent 50%, rgba(255,255,255,0.04) 100%)",
                  }}
                />
                {/* Scanline */}
                <FaceScanline color={face.scanColor} faceDelay={i * 0.6} />
                {/* Corner accents */}
                {[0, 1, 2, 3].map((corner) => (
                  <div
                    key={corner}
                    className="absolute w-4 h-4 pointer-events-none"
                    style={{
                      top: corner < 2 ? 8 : "auto",
                      bottom: corner >= 2 ? 8 : "auto",
                      left: corner % 2 === 0 ? 8 : "auto",
                      right: corner % 2 === 1 ? 8 : "auto",
                      borderTop: corner < 2 ? `1px solid ${face.glow.replace("0.22", "0.5").replace("0.20","0.5").replace("0.18","0.5").replace("0.16","0.5")}` : "none",
                      borderBottom: corner >= 2 ? `1px solid ${face.glow.replace("0.22", "0.5").replace("0.20","0.5").replace("0.18","0.5").replace("0.16","0.5")}` : "none",
                      borderLeft: corner % 2 === 0 ? `1px solid ${face.glow.replace("0.22", "0.5").replace("0.20","0.5").replace("0.18","0.5").replace("0.16","0.5")}` : "none",
                      borderRight: corner % 2 === 1 ? `1px solid ${face.glow.replace("0.22", "0.5").replace("0.20","0.5").replace("0.18","0.5").replace("0.16","0.5")}` : "none",
                    }}
                  />
                ))}
                <div className="relative z-10 flex flex-col items-center text-white/85">
                  {face.icon}
                  <span className="text-lg font-extralight tracking-[0.3em] uppercase">{face.label}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function RevealText({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function LandingPage() {
  const { scrollYProgress } = useScroll();
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="min-h-[100dvh] bg-[#0a0a0a] text-white selection:bg-white/20 font-sans overflow-x-hidden">
      {/* Noise */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.025] mix-blend-screen">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <motion.div
        className="fixed top-0 left-0 right-0 h-[600px] pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 70%)",
          y: yBackground,
        }}
      />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 mix-blend-difference">
        <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
          <div className="text-sm font-medium tracking-widest uppercase">Box of Sparks</div>
          <a href="#contact" className="text-sm font-medium tracking-widest uppercase hover:opacity-70 transition-opacity">
            Contact
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        <div className="flex flex-col items-center w-full max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <SpinningCube />
          </motion.div>

          <div className="text-center">
            <RevealText delay={0.3}>
              <h1 className="text-5xl md:text-8xl font-light tracking-tighter mb-6">
                We build <span className="text-white/35 italic">ideas.</span>
              </h1>
            </RevealText>
            <RevealText delay={0.5}>
              <p className="text-lg md:text-xl text-white/45 font-light max-w-xl mx-auto leading-relaxed">
                A solo creative studio crafting websites, apps, and brands that make people stop and stare. Sharp, self-aware, and quietly confident.
              </p>
            </RevealText>
          </div>
        </div>

        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/25"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
        >
          <span className="text-xs tracking-widest uppercase mb-4">Scroll</span>
          <motion.div
            className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent"
            animate={{ scaleY: [0, 1, 0], originY: 0 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />
        </motion.div>
      </section>

      {/* What We Do */}
      <section className="relative z-10 py-32 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <RevealText>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-16 text-white/80">
              The anti-agency agency.<br />
              <span className="text-white">One mind. Zero friction.</span>
            </h2>
          </RevealText>
          <div className="grid md:grid-cols-2 gap-12 md:gap-24">
            {[
              { title: "The Approach", body: "No account managers, no bloated timelines. Just a direct line to the person building your product. Every detail considered, every pixel intentional. We ship fast, and we ship beautifully." },
              { title: "The Output", body: "Products that feel alive. Interfaces that respect the user. Brands with a pulse. We don't just build things to work — we build things to be remembered. Pure craftsmanship." },
            ].map((item, i) => (
              <RevealText key={item.title} delay={i * 0.15}>
                <div className="space-y-6">
                  <div className="w-12 h-[1px] bg-white/20" />
                  <h3 className="text-xl font-light tracking-widest uppercase">{item.title}</h3>
                  <p className="text-white/45 leading-relaxed font-light">{item.body}</p>
                </div>
              </RevealText>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <RevealText>
            <div className="text-xs font-medium tracking-widest uppercase text-white/35 mb-16">Capabilities</div>
          </RevealText>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-8 border-t border-white/10 pt-16">
            {[
              { title: "Digital Experiences", desc: "Websites that break the mold. Cinematic, performant, and emotionally resonant. From landing pages to immersive brand storytelling.", icon: <MonitorSmartphone className="w-6 h-6" strokeWidth={1} /> },
              { title: "Application Design", desc: "Complex data made simple. Dashboards and tools that feel intuitive, snappy, and a joy to use. Utility without the sterility.", icon: <Code2 className="w-6 h-6" strokeWidth={1} /> },
              { title: "Brand Architecture", desc: "Visual identities that scale. Typography, color theory, and motion systems that define how your product feels in the wild.", icon: <BoxSelect className="w-6 h-6" strokeWidth={1} /> },
            ].map((item, idx) => (
              <RevealText key={item.title} delay={idx * 0.12}>
                <motion.div className="group cursor-default" whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
                  <div className="mb-6 text-white/25 group-hover:text-white/80 transition-colors duration-500">{item.icon}</div>
                  <h4 className="text-2xl font-light mb-4">{item.title}</h4>
                  <p className="text-white/35 leading-relaxed font-light group-hover:text-white/65 transition-colors duration-500">{item.desc}</p>
                </motion.div>
              </RevealText>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="relative z-10 py-48 px-6 bg-white text-[#0a0a0a]">
        <div className="max-w-5xl mx-auto text-center">
          <RevealText>
            <h2 className="text-4xl md:text-7xl font-light tracking-tighter leading-tight mb-12">
              The world has enough generic software.<br className="hidden md:block" />
              <span className="italic font-serif">Let's build something beautiful.</span>
            </h2>
          </RevealText>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="relative z-10 py-32 px-6 border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <RevealText>
            <div className="inline-flex items-center justify-center px-6 py-3 border border-white/10 rounded-full mb-12">
              <motion.div className="w-2 h-2 rounded-full bg-white mr-3" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.8, repeat: Infinity }} />
              <span className="text-sm font-medium tracking-widest uppercase text-white/75">Available for new projects</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-light tracking-tighter mb-12">Start a fire.</h2>
            <a href="mailto:hello@boxofsparks.com" className="inline-flex items-center gap-4 text-xl md:text-2xl font-light border-b border-white/25 pb-2 hover:border-white hover:gap-6 transition-all duration-300">
              hello@boxofsparks.com <ArrowRight strokeWidth={1} className="w-6 h-6" />
            </a>
          </RevealText>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 text-white/25 text-sm font-light uppercase tracking-widest flex flex-col md:flex-row justify-between items-center gap-4">
        <div>© {new Date().getFullYear()} Box of Sparks</div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">Read.cv</a>
          <a href="#" className="hover:text-white transition-colors">Github</a>
        </div>
        <div>All rights reserved.</div>
      </footer>
    </div>
  );
}

export default LandingPage;
