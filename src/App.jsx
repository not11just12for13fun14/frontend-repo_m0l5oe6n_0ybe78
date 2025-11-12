import React, { useEffect, useMemo, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Moon, Sun, Mail, Linkedin, Instagram, Menu, X, GraduationCap, Sparkles, FileText, Brain, BarChart3, MessageCircleHeart } from 'lucide-react'
import Spline from '@splinetool/react-spline'

function useDarkMode() {
  const [isDark, setIsDark] = useState(() =>
    typeof window !== 'undefined' ? document.documentElement.classList.contains('dark') : false
  )

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored) {
      if (stored === 'dark') document.documentElement.classList.add('dark')
      if (stored === 'light') document.documentElement.classList.remove('dark')
      setIsDark(stored === 'dark')
    }
    // Smooth scrolling globally
    document.documentElement.classList.add('scroll-smooth')
  }, [])

  const toggle = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return { isDark, toggle }
}

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

function Navbar() {
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 200], [0.0, 0.8])
  const [open, setOpen] = useState(false)
  const { isDark, toggle } = useDarkMode()

  // Close menu on hash change
  useEffect(() => {
    const onHash = () => setOpen(false)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const goTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <motion.nav
      className="fixed top-0 inset-x-0 z-50"
      style={{
        backgroundColor: useMemo(() => (isDark ? 'rgba(17, 24, 39, 1)' : 'rgba(255, 255, 255, 1)'), [isDark]),
      }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 backdrop-blur-xl"
        style={{ opacity: bgOpacity }}
      />
      <div className="relative mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <button onClick={() => goTo('home')} className="flex items-center gap-2 font-semibold text-lg tracking-tight text-gray-800 dark:text-gray-100">
          <Sparkles className="h-5 w-5 text-purple-500" />
          Andi S. N. Rizki
        </button>
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="text-sm text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-300 transition-colors">
              {n.label}
            </a>
          ))}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="ml-2 rounded-full p-2 bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-indigo-900/40 dark:text-indigo-200 dark:hover:bg-indigo-900/70 transition"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="rounded-full p-2 bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-indigo-900/40 dark:text-indigo-200 dark:hover:bg-indigo-900/70 transition"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button onClick={() => setOpen((s) => !s)} className="p-2 rounded-md text-gray-700 dark:text-gray-200">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden px-4 pb-4 space-y-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur"
        >
          {navItems.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="block py-2 text-gray-700 dark:text-gray-200">
              {n.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  )
}

function GradientBackdrop() {
  return (
    <div className="absolute inset-0 -z-0 overflow-hidden">
      <motion.div
        className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full bg-gradient-to-br from-purple-300/50 via-blue-300/40 to-indigo-200/40 blur-3xl"
        animate={{ x: [0, 40, -20, 0], y: [0, 20, -10, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-indigo-300/40 via-purple-200/40 to-pink-200/40 blur-3xl"
        animate={{ x: [0, -30, 10, 0], y: [0, -15, 25, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center pt-20">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <GradientBackdrop />
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white"
        >
          ANDI SYARIFAH NURUL RIZKI
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="mt-4 text-base sm:text-xl md:text-2xl text-gray-700/90 dark:text-gray-200 max-w-3xl mx-auto"
        >
          <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">Psychology Student</span> at Universitas Persada Indonesia Y.A.I, Jakarta Pusat.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-8 flex items-center justify-center gap-4"
        >
          <a href="#portfolio" className="rounded-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-lg shadow-purple-600/30 transition">View Work</a>
          <a href="#contact" className="rounded-full px-6 py-3 bg-white/80 hover:bg-white text-purple-700 font-semibold border border-purple-200 backdrop-blur shadow-sm transition dark:bg-gray-900/60 dark:hover:bg-gray-900 dark:text-indigo-200 dark:border-indigo-800">Contact</a>
        </motion.div>
      </div>
    </section>
  )
}

function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="relative py-20">
      <div className="absolute inset-0 pointer-events-none">
        <GradientBackdrop />
      </div>
      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
          {subtitle && (
            <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </motion.div>
        {children}
      </div>
    </section>
  )
}

function About() {
  return (
    <Section id="about" title="About" subtitle="Curiosity-driven and people-centered">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl p-6 bg-white/70 dark:bg-gray-900/50 border border-purple-100/60 dark:border-indigo-900/40 shadow-sm backdrop-blur"
        >
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
            I am a Psychology major with a deep curiosity about why people think, feel, and act the way they do. I love exploring human behavior, practicing emotional intelligence, and advocating for mental health awareness. My interests span research methods, counseling communication, and how data can support meaningful, empathetic decisions.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-4"
        >
          {["Human Behavior", "Emotional Intelligence", "Mental Health", "Research Mindset"].map((t, i) => (
            <motion.div
              key={t}
              whileHover={{ y: -4 }}
              className="rounded-xl p-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-indigo-950/60 dark:to-indigo-900/30 border border-purple-100 dark:border-indigo-900 text-gray-800 dark:text-indigo-100 shadow-sm"
            >
              <div className="font-semibold">{t}</div>
              <p className="text-sm mt-1 text-gray-600 dark:text-indigo-200/80">Focus area</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}

const portfolioItems = [
  {
    title: 'Stress and Coping in University Students',
    tag: 'Research Project',
    desc: 'Survey-based study analyzing stress patterns and coping strategies among students in Jakarta.',
  },
  {
    title: 'Emotional Intelligence and Team Collaboration',
    tag: 'Academic Paper',
    desc: 'Exploration of how EI influences teamwork, communication, and conflict resolution.',
  },
  {
    title: 'Mental Health Awareness Campaign',
    tag: 'Community Initiative',
    desc: 'Designed educational materials and social content to promote empathy and help-seeking.',
  },
  {
    title: 'Qualitative Interview Analysis',
    tag: 'Methodology',
    desc: 'Thematic coding of interview transcripts to interpret patterns in lived experiences.',
  },
]

function Portfolio() {
  return (
    <Section id="portfolio" title="Portfolio" subtitle="Selected research, papers, and initiatives">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioItems.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            whileHover={{ y: -6 }}
            className="group relative rounded-2xl overflow-hidden border border-purple-100 dark:border-indigo-900 bg-white/70 dark:bg-gray-900/50 backdrop-blur shadow-sm"
          >
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs font-medium text-purple-700 dark:text-indigo-300 uppercase tracking-wide">
                <FileText className="h-4 w-4" /> {item.tag}
              </div>
              <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-gray-100">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/0 to-indigo-500/0 group-hover:from-purple-500/10 group-hover:via-indigo-500/10 group-hover:to-blue-500/10"
            />
            <motion.div
              initial={{ y: '100%' }}
              whileHover={{ y: 0 }}
              transition={{ type: 'spring', stiffness: 120, damping: 16 }}
              className="absolute inset-x-0 bottom-0 p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-t border-purple-100/60 dark:border-indigo-900/40"
            >
              <p className="text-xs text-gray-700 dark:text-gray-300">Hover reveal: deeper context and outcomes available upon request.</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function Skill({ label, value, icon }) {
  return (
    <div className="rounded-xl p-4 bg-white/70 dark:bg-gray-900/50 border border-purple-100 dark:border-indigo-900 shadow-sm backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-200 to-blue-200 dark:from-indigo-800/60 dark:to-indigo-700/40 flex items-center justify-center text-purple-700 dark:text-indigo-200">
          {icon}
        </div>
        <div className="font-semibold text-gray-800 dark:text-gray-100">{label}</div>
      </div>
      <div className="mt-4 h-2 rounded-full bg-purple-100 dark:bg-indigo-950/60 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="h-full rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600"
        />
      </div>
    </div>
  )
}

function Skills() {
  return (
    <Section id="skills" title="Skills" subtitle="Research, communication, and empathy – in motion">
      <div className="grid md:grid-cols-2 gap-6">
        <Skill label="Psychology Research" value={85} icon={<Brain className="h-5 w-5" />} />
        <Skill label="Counseling Communication" value={80} icon={<MessageCircleHeart className="h-5 w-5" />} />
        <Skill label="Data Interpretation" value={75} icon={<BarChart3 className="h-5 w-5" />} />
        <Skill label="Empathy & EQ" value={90} icon={<Sparkles className="h-5 w-5" />} />
      </div>
    </Section>
  )
}

function Education() {
  return (
    <Section id="education" title="Education" subtitle="Foundation and growth at UPI Y.A.I">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 rounded-2xl p-6 bg-white/70 dark:bg-gray-900/50 border border-purple-100/70 dark:border-indigo-900/40 shadow-sm backdrop-blur"
        >
          <motion.div
            initial={{ scale: 0.8, rotate: -6, opacity: 0 }}
            whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 120, damping: 12 }}
            className="h-14 w-14 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 text-white flex items-center justify-center shadow-lg"
          >
            <GraduationCap className="h-8 w-8" />
          </motion.div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Universitas Persada Indonesia Y.A.I</h3>
            <p className="text-gray-600 dark:text-gray-300">Jakarta Pusat</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Bachelor of Psychology (ongoing)</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-indigo-950/60 dark:to-indigo-900/30 border border-purple-100 dark:border-indigo-900"
        >
          <p className="text-gray-700 dark:text-gray-200">
            Focused on understanding human development, cognition, and behavior through both qualitative and quantitative methods. Engaged in research projects, collaborative teamwork, and community awareness initiatives centered on mental health.
          </p>
        </motion.div>
      </div>
    </Section>
  )
}

function Contact() {
  return (
    <Section id="contact" title="Contact" subtitle="Let’s connect – friendly and professional">
      <div className="grid md:grid-cols-2 gap-8">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={(e) => {
            e.preventDefault()
            const form = e.currentTarget
            const name = form.name.value
            const subject = encodeURIComponent(`Hello from ${name}`)
            const body = encodeURIComponent(form.message.value)
            window.location.href = `mailto:andisnr@example.com?subject=${subject}&body=${body}`
          }}
          className="rounded-2xl p-6 bg-white/70 dark:bg-gray-900/50 border border-purple-100 dark:border-indigo-900 shadow-sm backdrop-blur"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-300">Name</label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                name="name"
                required
                placeholder="Your name"
                className="mt-1 w-full rounded-lg border border-purple-200 dark:border-indigo-800 bg-white/80 dark:bg-gray-950/50 px-3 py-2 outline-none focus:ring-2 ring-purple-400/60 dark:ring-indigo-500/60"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-300">Email</label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="mt-1 w-full rounded-lg border border-purple-200 dark:border-indigo-800 bg-white/80 dark:bg-gray-950/50 px-3 py-2 outline-none focus:ring-2 ring-purple-400/60 dark:ring-indigo-500/60"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="text-sm text-gray-600 dark:text-gray-300">Message</label>
            <motion.textarea
              whileFocus={{ scale: 1.01 }}
              name="message"
              rows="5"
              required
              placeholder="Say hello or share an idea..."
              className="mt-1 w-full rounded-lg border border-purple-200 dark:border-indigo-800 bg-white/80 dark:bg-gray-950/50 px-3 py-2 outline-none focus:ring-2 ring-purple-400/60 dark:ring-indigo-500/60"
            />
          </div>
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            type="submit"
            className="mt-6 rounded-full px-6 py-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white font-semibold shadow-lg shadow-purple-600/30"
          >
            Send Message
          </motion.button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-indigo-950/60 dark:to-indigo-900/30 border border-purple-100 dark:border-indigo-900"
        >
          <p className="text-gray-700 dark:text-gray-200">
            Prefer social? Reach out via:
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a href="mailto:andisnr@example.com" className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/80 dark:bg-gray-950/50 border border-purple-100 dark:border-indigo-900 text-purple-700 dark:text-indigo-200 hover:bg-white dark:hover:bg-gray-900 transition">
              <Mail className="h-4 w-4" /> Email
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/80 dark:bg-gray-950/50 border border-purple-100 dark:border-indigo-900 text-purple-700 dark:text-indigo-200 hover:bg-white dark:hover:bg-gray-900 transition">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/80 dark:bg-gray-950/50 border border-purple-100 dark:border-indigo-900 text-purple-700 dark:text-indigo-200 hover:bg-white dark:hover:bg-gray-900 transition">
              <Instagram className="h-4 w-4" /> Instagram
            </a>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}

function Footer() {
  return (
    <footer className="relative py-10">
      <div className="absolute inset-0 pointer-events-none"><GradientBackdrop /></div>
      <div className="relative max-w-6xl mx-auto px-6 text-center text-sm text-gray-600 dark:text-gray-300">
        © {new Date().getFullYear()} ANDI SYARIFAH NURUL RIZKI · Built with care and curiosity.
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white dark:from-gray-950 dark:via-gray-950 dark:to-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Portfolio />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
