import React, { useRef } from "react";
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
    glow: "rgba(200,220,255,0.18)",
  },
  {
    transform: `rotateY(180deg) translateZ(${HALF}px)`,
    label: "Apps",
    icon: <Code2 className="w-10 h-10 mb-5" strokeWidth={1} />,
    bg: "rgba(255,255,255,0.05)",
    glow: "rgba(255,200,200,0.16)",
  },
  {
    transform: `rotateY(90deg) translateZ(${HALF}px)`,
    label: "Brands",
    icon: <BoxSelect className="w-10 h-10 mb-5" strokeWidth={1} />,
    bg: "rgba(255,255,255,0.06)",
    glow: "rgba(200,255,230,0.14)",
  },
  {
    transform: `rotateY(-90deg) translateZ(${HALF}px)`,
    label: "Ideas",
    icon: <Sparkles className="w-10 h-10 mb-5" strokeWidth={1} />,
    bg: "rgba(255,255,255,0.06)",
    glow: "rgba(220,200,255,0.18)",
  },
  {
    transform: `rotateX(90deg) translateZ(${HALF}px)`,
    label: "Box of",
    icon: <Layers className="w-10 h-10 mb-5" strokeWidth={1} />,
    bg: "rgba(255,255,255,0.04)",
    glow: "rgba(255,255,200,0.12)",
  },
  {
    transform: `rotateX(-90deg) translateZ(${HALF}px)`,
    label: "Sparks",
    icon: <Sparkles className="w-10 h-10 mb-5" strokeWidth={1} />,
    bg: "rgba(255,255,255,0.04)",
    glow: "rgba(255,220,180,0.12)",
  },
];

const ORBIT_PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  angle: (i / 12) * 360,
  radius: 210 + (i % 3) * 28,
  size: i % 4 === 0 ? 4 : i % 3 === 0 ? 3 : 2,
  duration: 14 + (i % 5) * 2.5,
  delay: -(i * 1.2),
  opacity: 0.15 + (i % 4) * 0.08,
}));

function OrbitParticle({ angle, radius, size, duration, delay, opacity }: typeof ORBIT_PARTICLES[0]) {
  return (
    <motion.div
      className="absolute rounded-full bg-white pointer-events-none"
      style={{
        width: size,
        height: size,
        top: "50%",
        left: "50%",
        marginTop: -size / 2,
        marginLeft: -size / 2,
        opacity,
      }}
      animate={{
        rotate: [angle, angle + 360],
        x: [
          Math.cos((angle * Math.PI) / 180) * radius,
          Math.cos(((angle + 360) * Math.PI) / 180) * radius,
        ],
        y: [
          Math.sin((angle * Math.PI) / 180) * radius * 0.38,
          Math.sin(((angle + 360) * Math.PI) / 180) * radius * 0.38,
        ],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        delay,
      }}
    />
  );
}

function SpinningCube() {
  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: 500, height: 500 }}
    >
      {/* Deep halo glow */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 420,
          height: 420,
          background:
            "radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 40%, transparent 70%)",
          filter: "blur(32px)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Pulse ring */}
      <motion.div
        className="absolute rounded-full border border-white/[0.06] pointer-events-none"
        style={{ width: 380, height: 380 }}
        animate={{ scale: [0.95, 1.15, 0.95], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full border border-white/[0.04] pointer-events-none"
        style={{ width: 460, height: 460 }}
        animate={{ scale: [0.9, 1.2, 0.9], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Orbit particles */}
      {ORBIT_PARTICLES.map((p) => (
        <OrbitParticle key={p.id} {...p} />
      ))}

      {/* Ground reflection ellipse */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          bottom: 18,
          left: "50%",
          transform: "translateX(-50%)",
          width: 200,
          height: 28,
          background: "radial-gradient(ellipse, rgba(255,255,255,0.07) 0%, transparent 70%)",
          filter: "blur(8px)",
        }}
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Bob + spin wrapper */}
      <motion.div
        style={{ width: FACE_SIZE, height: FACE_SIZE, perspective: 1400 }}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{
            rotateX: [15, 375],
            rotateY: [0, 360],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {faces.map((face, i) => (
            <div
              key={i}
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{
                transform: face.transform,
                background: face.bg,
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.15)",
                boxShadow: `inset 0 0 40px ${face.glow}, 0 0 20px ${face.glow}`,
              }}
            >
              {/* Shimmer overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 50%, rgba(255,255,255,0.03) 100%)",
                }}
              />
              <div className="relative z-10 flex flex-col items-center text-white/80">
                {face.icon}
                <span className="text-lg font-extralight tracking-[0.3em] uppercase">
                  {face.label}
                </span>
              </div>
            </div>
          ))}
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
      {/* Noise texture */}
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
          background:
            "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.035) 0%, transparent 70%)",
          y: yBackground,
        }}
      />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 mix-blend-difference">
        <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
          <div className="text-sm font-medium tracking-widest uppercase">Box of Sparks</div>
          <a
            href="#contact"
            className="text-sm font-medium tracking-widest uppercase hover:opacity-70 transition-opacity"
          >
            Contact
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        <div className="flex flex-col items-center w-full max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 md:mb-16"
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
                A solo creative studio crafting websites, apps, and brands that make people stop
                and stare. Sharp, self-aware, and quietly confident.
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
              The anti-agency agency.
              <br />
              <span className="text-white">One mind. Zero friction.</span>
            </h2>
          </RevealText>

          <div className="grid md:grid-cols-2 gap-12 md:gap-24">
            {[
              {
                title: "The Approach",
                body: "No account managers, no bloated timelines. Just a direct line to the person building your product. Every detail considered, every pixel intentional. We ship fast, and we ship beautifully.",
              },
              {
                title: "The Output",
                body: "Products that feel alive. Interfaces that respect the user. Brands with a pulse. We don't just build things to work — we build things to be remembered. Pure craftsmanship.",
              },
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
            <div className="text-xs font-medium tracking-widest uppercase text-white/35 mb-16">
              Capabilities
            </div>
          </RevealText>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-8 border-t border-white/10 pt-16">
            {[
              {
                title: "Digital Experiences",
                desc: "Websites that break the mold. Cinematic, performant, and emotionally resonant. From landing pages to immersive brand storytelling.",
                icon: <MonitorSmartphone className="w-6 h-6" strokeWidth={1} />,
              },
              {
                title: "Application Design",
                desc: "Complex data made simple. Dashboards and tools that feel intuitive, snappy, and a joy to use. Utility without the sterility.",
                icon: <Code2 className="w-6 h-6" strokeWidth={1} />,
              },
              {
                title: "Brand Architecture",
                desc: "Visual identities that scale. Typography, color theory, and motion systems that define how your product feels in the wild.",
                icon: <BoxSelect className="w-6 h-6" strokeWidth={1} />,
              },
            ].map((item, idx) => (
              <RevealText key={item.title} delay={idx * 0.12}>
                <motion.div
                  className="group cursor-default"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6 text-white/25 group-hover:text-white/80 transition-colors duration-500">
                    {item.icon}
                  </div>
                  <h4 className="text-2xl font-light mb-4">{item.title}</h4>
                  <p className="text-white/35 leading-relaxed font-light group-hover:text-white/65 transition-colors duration-500">
                    {item.desc}
                  </p>
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
              The world has enough generic software.
              <br className="hidden md:block" />
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
              <motion.div
                className="w-2 h-2 rounded-full bg-white mr-3"
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
              <span className="text-sm font-medium tracking-widest uppercase text-white/75">
                Available for new projects
              </span>
            </div>

            <h2 className="text-5xl md:text-8xl font-light tracking-tighter mb-12">
              Start a fire.
            </h2>

            <a
              href="mailto:hello@boxofsparks.com"
              className="inline-flex items-center gap-4 text-xl md:text-2xl font-light border-b border-white/25 pb-2 hover:border-white hover:gap-6 transition-all duration-300"
            >
              hello@boxofsparks.com{" "}
              <ArrowRight strokeWidth={1} className="w-6 h-6" />
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
