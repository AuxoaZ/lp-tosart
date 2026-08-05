import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import ServicesSlider from "@/components/ServicesSlider";
import SelectedWorks from "@/components/SelectedWorks";
import ProductGallery from "@/components/ProductGallery";
import CreativeProcess from "@/components/CreativeProcess";

const apparelImages = [
  "/img/apparel/509.png",
  "/img/apparel/509-1.png",
  "/img/apparel/510.png",
  "/img/apparel/510-1.png",
  "/img/apparel/511.png",
  "/img/apparel/511-1.png",
  "/img/apparel/520.png",
  "/img/apparel/520-1.png",
  "/img/apparel/539.png",
  "/img/apparel/539-1.png",
  "/img/apparel/JERSEY.png",
  "/img/apparel/JERSEY-1.png",
];

const accessoriesImages = [
  "/img/accessories/CAP.png",
  "/img/accessories/CAP-1.png",
  "/img/accessories/CAP-3.png",
  "/img/accessories/469.png",
  "/img/accessories/484.png",
  "/img/accessories/486.png",
  "/img/accessories/497.png",
  "/img/accessories/506.png",
  "/img/accessories/507.png",
  "/img/accessories/511.png",
  "/img/accessories/512.png",
  "/img/accessories/Artboard.png",
];

export default function Home() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <ServicesSlider />
      <SelectedWorks />
      <ProductGallery title="Apparel Collection" images={apparelImages} />
      <ProductGallery title="Custom & Accessories" images={accessoriesImages} />
      <CreativeProcess />
    </>
  );
}
