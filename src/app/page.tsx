import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import ServicesSlider from "@/components/ServicesSlider";
import SelectedWorks from "@/components/SelectedWorks";
import CreativeProcess from "@/components/CreativeProcess";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhoWeAre />
        <ServicesSlider />
        <SelectedWorks />
        <CreativeProcess />
      </main>
      <Footer />
    </>
  );
}
