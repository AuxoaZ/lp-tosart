import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import ServicesSlider from "@/components/ServicesSlider";
import SelectedWorks from "@/components/SelectedWorks";
import ProductGallery from "@/components/ProductGallery";
import CreativeProcess from "@/components/CreativeProcess";
import { getGalleryData } from "@/app/actions/cms";

export default async function Home() {
  const data = await getGalleryData();
  const apparelImages = data.homeApparelImages || [];
  const accessoriesImages = data.homeAccessoriesImages || [];

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
