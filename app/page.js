import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import VenturesCarousel from "../components/VenturesCarousel";
import MilestonesSection from "../components/MilestonesSection";
import QuoteSection from "../components/QuoteSection";
import BlogsSection from "../components/BlogsSection";
import PressStrip from "../components/PressStrip";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <main className="page-content">
        <About />
        <VenturesCarousel />
        <MilestonesSection />
        <QuoteSection />
        <BlogsSection />
        <PressStrip />
        <ContactSection />
      </main>
    </main>
  );
}
