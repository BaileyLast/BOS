import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Code2, MonitorSmartphone, Sparkles, Layers, BoxSelect, Cpu } from "lucide-react";

const FACE_SIZE = 240;
const HALF_SIZE = FACE_SIZE / 2;

function SpinningCube() {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: FACE_SIZE,
        height: FACE_SIZE,
        perspective: 1200,
      }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Front - Websites */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center border border-white/20 bg-white/5 backdrop-blur-md"
          style={{ transform: `translateZ(${HALF_SIZE}px)` }}
        >
          <MonitorSmartphone className="w-8 h-8 mb-4 text-white/80" strokeWidth={1} />
          <span className="text-xl font-light tracking-widest uppercase">Websites</span>
        </div>

        {/* Back - Apps */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center border border-white/20 bg-white/5 backdrop-blur-md"
          style={{ transform: `rotateY(180deg) translateZ(${HALF_SIZE}px)` }}
        >
          <Code2 className="w-8 h-8 mb-4 text-white/80" strokeWidth={1} />
          <span className="text-xl font-light tracking-widest uppercase">Apps</span>
        </div>

        {/* Right - Brands */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center border border-white/20 bg-white/5 backdrop-blur-md"
          style={{ transform: `rotateY(90deg) translateZ(${HALF_SIZE}px)` }}
        >
          <BoxSelect className="w-8 h-8 mb-4 text-white/80" strokeWidth={1} />
          <span className="text-xl font-light tracking-widest uppercase">Brands</span>
        </div>

        {/* Left - Ideas */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center border border-white/20 bg-white/5 backdrop-blur-md"
          style={{ transform: `rotateY(-90deg) translateZ(${HALF_SIZE}px)` }}
        >
          <Sparkles className="w-8 h-8 mb-4 text-white/80" strokeWidth={1} />
          <span className="text-xl font-light tracking-widest uppercase">Ideas</span>
        </div>

        {/* Top - Box */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center border border-white/20 bg-white/5 backdrop-blur-md"
          style={{ transform: `rotateX(90deg) translateZ(${HALF_SIZE}px)` }}
        >
          <Layers className="w-8 h-8 mb-4 text-white/80" strokeWidth={1} />
          <span className="text-xl font-light tracking-widest uppercase text-white/50">Box of</span>
        </div>

        {/* Bottom - Sparks */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center border border-white/20 bg-white/5 backdrop-blur-md"
          style={{ transform: `rotateX(-90deg) translateZ(${HALF_SIZE}px)` }}
        >
          <Cpu className="w-8 h-8 mb-4 text-white/80" strokeWidth={1} />
          <span className="text-xl font-light tracking-widest uppercase text-white/50">Sparks</span>
        </div>
      </motion.div>
    </div>
  );
}

function RevealText({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function LandingPage() {
  const { scrollYProgress } = useScroll();
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="min-h-[100dvh] bg-[#0a0a0a] text-white selection:bg-white/20 selection:text-white font-sans overflow-x-hidden">
      {/* Background Noise & Gradient */}
      <div className="fixed inset-0 pointer-events-none z-0 mix-blend-screen opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <motion.div
        className="fixed top-0 left-0 right-0 h-[500px] pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 70%)",
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

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        <div className="flex flex-col items-center w-full max-w-7xl mx-auto">
          <RevealText delay={0.2}>
            <div className="mb-16 md:mb-24 scale-75 md:scale-100">
              <SpinningCube />
            </div>
          </RevealText>
          
          <div className="text-center mt-12 md:mt-24">
            <RevealText delay={0.4}>
              <h1 className="text-5xl md:text-8xl font-light tracking-tighter mb-6">
                We build <span className="text-white/40 italic">ideas.</span>
              </h1>
            </RevealText>
            <RevealText delay={0.6}>
              <p className="text-lg md:text-xl text-white/50 font-light max-w-xl mx-auto leading-relaxed">
                A solo creative studio crafting websites, apps, and brands that make people stop and stare. Sharp, self-aware, and quietly confident.
              </p>
            </RevealText>
          </div>
        </div>
        
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="text-xs tracking-widest uppercase mb-4">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </section>

      {/* What We Do */}
      <section className="relative z-10 py-32 px-6 border-t border-white/5 bg-[#0a0a0a]/50">
        <div className="max-w-4xl mx-auto">
          <RevealText>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-16 text-white/80">
              The anti-agency agency.<br />
              <span className="text-white">One mind. Zero friction.</span>
            </h2>
          </RevealText>

          <div className="grid md:grid-cols-2 gap-12 md:gap-24">
            <RevealText delay={0.1}>
              <div className="space-y-6">
                <div className="w-12 h-[1px] bg-white/20" />
                <h3 className="text-xl font-light tracking-widest uppercase">The Approach</h3>
                <p className="text-white/50 leading-relaxed font-light">
                  No account managers, no bloated timelines. Just a direct line to the person building your product. Every detail considered, every pixel intentional. We ship fast, and we ship beautifully.
                </p>
              </div>
            </RevealText>
            <RevealText delay={0.2}>
              <div className="space-y-6">
                <div className="w-12 h-[1px] bg-white/20" />
                <h3 className="text-xl font-light tracking-widest uppercase">The Output</h3>
                <p className="text-white/50 leading-relaxed font-light">
                  Products that feel alive. Interfaces that respect the user. Brands with a pulse. We don't just build things to work; we build things to be remembered. Pure craftsmanship.
                </p>
              </div>
            </RevealText>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <RevealText>
            <div className="text-xs font-medium tracking-widest uppercase text-white/40 mb-16">
              Capabilities
            </div>
          </RevealText>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-8 border-t border-white/10 pt-16">
            {[
              {
                title: "Digital Experiences",
                desc: "Websites that break the mold. Cinematic, performant, and emotionally resonant. From landing pages to immersive brand storytelling.",
                icon: <MonitorSmartphone className="w-6 h-6" strokeWidth={1} />
              },
              {
                title: "Application Design",
                desc: "Complex data made simple. Dashboards and tools that feel intuitive, snappy, and a joy to use. Utility without the sterility.",
                icon: <Code2 className="w-6 h-6" strokeWidth={1} />
              },
              {
                title: "Brand Architecture",
                desc: "Visual identities that scale. Typography, color theory, and motion systems that define how your product feels in the wild.",
                icon: <BoxSelect className="w-6 h-6" strokeWidth={1} />
              }
            ].map((item, idx) => (
              <RevealText key={item.title} delay={idx * 0.1}>
                <div className="group cursor-default">
                  <div className="mb-6 text-white/30 group-hover:text-white transition-colors duration-500">
                    {item.icon}
                  </div>
                  <h4 className="text-2xl font-light mb-4">{item.title}</h4>
                  <p className="text-white/40 leading-relaxed font-light group-hover:text-white/70 transition-colors duration-500">
                    {item.desc}
                  </p>
                </div>
              </RevealText>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto / Vibe Check */}
      <section className="relative z-10 py-48 px-6 bg-white text-[#0a0a0a]">
        <div className="max-w-5xl mx-auto text-center">
          <RevealText>
            <h2 className="text-4xl md:text-7xl font-light tracking-tighter leading-tight mb-12">
              The world has enough generic software. <br className="hidden md:block"/>
              <span className="italic font-serif">Let's build something beautiful.</span>
            </h2>
          </RevealText>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="relative z-10 py-32 px-6 border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <RevealText>
            <div className="inline-flex items-center justify-center p-4 border border-white/10 rounded-full mb-12">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse mr-3" />
              <span className="text-sm font-medium tracking-widest uppercase text-white/80">Available for new projects</span>
            </div>
            
            <h2 className="text-5xl md:text-8xl font-light tracking-tighter mb-12">
              Start a fire.
            </h2>
            
            <a 
              href="mailto:hello@boxofsparks.com"
              className="inline-flex items-center gap-4 text-xl md:text-2xl font-light border-b border-white/30 pb-2 hover:border-white hover:gap-6 transition-all duration-300"
            >
              hello@boxofsparks.com <ArrowRight strokeWidth={1} className="w-6 h-6" />
            </a>
          </RevealText>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 text-white/30 text-sm font-light uppercase tracking-widest flex flex-col md:flex-row justify-between items-center gap-4">
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
