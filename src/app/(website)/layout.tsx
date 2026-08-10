import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { getGalleryData } from "@/app/actions/cms";

export default async function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getGalleryData();
  const media = data.media || {
    whatsapp: "6285904430581",
    instagram: "tosa.std",
    email: "tosart.std@gmail.com"
  };

  return (
    <>
      <Navbar media={media} />
      <main className="grow">
        {children}
      </main>
      <Footer media={media} />
      <FloatingWhatsApp media={media} />
    </>
  );
}
