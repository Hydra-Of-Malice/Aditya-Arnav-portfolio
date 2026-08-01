import { useEffect } from 'react';
import About from './components/About';
import Contact from './components/Contact';
import Dock from './components/Dock';
import Education from './components/Education';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Research from './components/Research';
import Skills from './components/Skills';

function App() {
  // The browser resolves a deep link like /#projects before React has mounted
  // the sections, so it lands at the top. Re-apply it once they exist.
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    requestAnimationFrame(() => {
      // 'instant' overrides the smooth scroll-behavior set on <html>.
      document.querySelector(hash)?.scrollIntoView({ behavior: 'instant' });
    });
  }, []);

  return (
    <>
      {/* Two soft lights behind the top of the page, fixed so they never scroll
          into a hard edge. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(60rem 30rem at 20% -10%, var(--glow-a), transparent 70%),' +
            'radial-gradient(45rem 25rem at 90% 0%, var(--glow-b), transparent 70%)',
        }}
      />

      <Navbar />

      <main id="main" className="measure px-6 pb-20 pt-16 md:px-8 md:pt-24">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Research />
        <Skills />
        <Education />
        <Contact />
      </main>

      <Footer />

      {/* Clears the floating dock so the footer is never underneath it. */}
      <div aria-hidden className="h-20" />

      <Dock />
    </>
  );
}

export default App;
