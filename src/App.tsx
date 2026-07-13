import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Research from './components/Research';
import Skills from './components/Skills';
import Education from './components/Education';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-background min-h-screen text-textMain font-sans selection:bg-primary/30 selection:text-primary">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Research />
        <Skills />
        <Education />
      </main>
      <Footer />
    </div>
  );
}

export default App;
