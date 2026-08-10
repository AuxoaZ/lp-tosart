import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import ServicesSlider from "@/components/ServicesSlider";
import SelectedWorks from "@/components/SelectedWorks";
import ProductGallery from "@/components/ProductGallery";
import CreativeProcess from "@/components/CreativeProcess";
import InstagramFeed from "@/components/InstagramFeed";
import { getGalleryData } from "@/app/actions/cms";

export default async function Home() {
  const data = await getGalleryData();
  const apparelImages = data.homeApparelImages || [];
  const accessoriesImages = data.homeAccessoriesImages || [];
  const copywriting = data.typewriting || {
    hero: {
      badge: "Apparel Design, Branding & Visual Studio",
      title: "Beyond\nVisuals",
      subtitle: "Designing visuals that connect culture, identity, and storytelling.",
      words: ["culture", "identity", "storytelling"],
      stats: [
        { value: "5+", label: "Years Experience" },
        { value: "400+", label: "Brands Handled" }
      ]
    },
    whoWeAre: {
      title: "Who We Are",
      paragraphs: [
        "Tosart is a creative studio specializing in apparel design, branding, and visual content production. We help brands transform ideas into visuals that feel distinctive, relevant, and production-ready.",
        "With years of experience working across various industries and creative directions, we focus on creating designs that are not only visually strong, but also aligned with brand identity and audience culture.",
        "From apparel graphics to digital visuals, every project is approached with attention to detail, concept development, and strong visual storytelling."
      ]
    },
    services: {
      title: "Our Services",
      subtitle: "Comprehensive creative solutions to elevate your brand and apparel line",
      items: [
        {
          title: "Apparel Design",
          description: "T-shirt, hoodie, jersey, and custom apparel design with strong visual direction and production-ready output."
        },
        {
          title: "Social Media Design",
          description: "Creative content and visual systems tailored for digital branding and audience engagement."
        },
        {
          title: "Video Marketing",
          description: "Visual editing, motion graphics, and video production to tell your brand story dynamically."
        },
        {
          title: "Custom & Accessories",
          description: "Creative support for hats, bags, patches, tags, zipper pulls, packaging, and other supporting merchandise."
        },
        {
          title: "Logo & Branding",
          description: "Brand identity design that builds a recognizable and consistent visual presence."
        }
      ]
    }
  };
  const media = data.media || {
    whatsapp: "6285904430581",
    instagram: "tosa.std",
    email: "tosart.std@gmail.com"
  };

  return (
    <>
      <Hero data={copywriting.hero} />
      <WhoWeAre data={copywriting.whoWeAre} />
      <ServicesSlider data={copywriting.services} />
      <SelectedWorks />
      <ProductGallery title="Apparel Collection" images={apparelImages} />
      <ProductGallery title="Custom & Accessories" images={accessoriesImages} />
      <CreativeProcess />
      <InstagramFeed media={media} />
    </>
  );
}
