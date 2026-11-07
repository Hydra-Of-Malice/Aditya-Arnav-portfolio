import { Analytics } from '@vercel/analytics/react';
import About from './components/About';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import Patents from './components/Patents';
import Posts from './components/Posts';
import ResumeDialog from './components/ResumeDialog';
import Results from './components/Results';
import Work from './components/Work';

export default function App() {
  return (
    <>
      <a className="skip" href="#work">
        Skip to the work
      </a>
      <Header />
      <main>
        <Hero />
        <About />
        <Work />
        <Patents />
        <Results />
        <Posts />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <ResumeDialog />
      <Analytics />
    </>
  );
}
