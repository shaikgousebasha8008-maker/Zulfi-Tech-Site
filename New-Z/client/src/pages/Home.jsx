import Header from "../components/Header.jsx";
import Hero from "../components/Hero.jsx";
import Services from "../components/Services.jsx";
import Platform from "../components/Platform.jsx";
import Process from "../components/Process.jsx";
import WhyUs from "../components/WhyUs.jsx";
import CaseStudies from "../components/CaseStudies.jsx";
import TeamPricing from "../components/TeamPricing.jsx";
import FAQ from "../components/FAQ.jsx";
import Contact from "../components/Contact.jsx";
import Footer from "../components/Footer.jsx";
import useReveal from "../useReveal.js";

export default function Home() {
  const containerRef = useReveal();

  return (
    <div ref={containerRef}>
      <Header />
      <Hero />
      <Services />
      <Platform />
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
