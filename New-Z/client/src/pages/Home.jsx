import Header from "../components/Header.jsx";
import Hero from "../components/Hero.jsx";
import Services from "../components/Services.jsx";
import Platform from "../components/Platform.jsx";
import OfflineAI from "../components/OfflineAI.jsx";
import DeviceShowcase from "../components/DeviceShowcase.jsx";
import Process from "../components/Process.jsx";
import WhyUs from "../components/WhyUs.jsx";
import CaseStudies from "../components/CaseStudies.jsx";
import TeamPricing from "../components/TeamPricing.jsx";
import FAQ from "../components/FAQ.jsx";
import Contact from "../components/Contact.jsx";
import Footer from "../components/Footer.jsx";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useReveal from "../useReveal.js";
import useTilt from "../useTilt.js";

export default function Home() {
  const containerRef = useReveal();
  useTilt(containerRef);
  const { hash } = useLocation();

  // Arriving from another page with a #section (e.g. /#contact from the services guide): scroll to it.
  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" }), 60);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <div ref={containerRef}>
      <Header />
      <Hero />
      <Services />
      <DeviceShowcase />
      <Platform />
      <OfflineAI />
      <Process />
      <WhyUs />
      <CaseStudies />
      <TeamPricing />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}
