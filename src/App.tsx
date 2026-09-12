import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { ScrollTrigger } from './lib/gsap';
import { addDeviceClassToBody } from './lib/device';
import { useFontsReady, useIsDesktop } from './lib/hooks';
import { waitForLoaderComplete } from './lib/loader';
import { scrollToHash, startSmoothScroll } from './lib/smoothScroll';
import Cases from './components/Cases';
import Contact from './components/Contact';
import CtaBand from './components/CtaBand';
import Cursor from './components/Cursor';
import Features from './components/Features';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import Identity from './components/Identity';
import Loader from './components/Loader';
import Numbers from './components/Numbers';
import ResumePopup from './components/ResumePopup';
import Stickers from './components/Stickers';
import Vision from './components/Vision';
import WhatIDo from './components/WhatIDo';

export default function App() {
  // Every section branches on this at setup time — the pinned mobile Features
  // list, the hover-only scenes, the cursor-following tooltips. Keying <main>
  // on it remounts them when the query flips, so a resize or a tablet rotation
  // across the boundary rebuilds them for the layout they are now in instead
  // of leaving desktop behaviour running on a touch device.
  const desktop = useIsDesktop();
  // Held back only behind the loader, so SplitText measures the real faces.
  const fontsReady = useFontsReady();

  useEffect(() => {
    addDeviceClassToBody();
    let stop = () => {};
    let cancelled = false;

    waitForLoaderComplete().then(() => {
      if (cancelled) return;
      stop = startSmoothScroll();
      ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      stop();
    };
  }, [desktop]);

  useEffect(() => {
    // Honour a deep link like /#projects once the page can actually scroll.
    if (!window.location.hash) return;
    let cancelled = false;
    waitForLoaderComplete().then(() => {
      if (cancelled) return;
      setTimeout(() => scrollToHash(window.location.hash), 300);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Loader />
      <Header />
      <main id="content" key={desktop ? 'desktop' : 'touch'}>
        {fontsReady && (
          <>
            <Hero />
            <Stickers />
            <WhatIDo />
            <Features />
            <Cases />
            <Vision />
            <CtaBand />
            <Numbers />
            <Identity />
            <Contact />
          </>
        )}
      </main>
      <Footer />
      <Cursor />
      <ResumePopup />
      <Analytics />
    </>
  );
}
