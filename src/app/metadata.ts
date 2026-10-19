import type { Metadata } from 'next'

// ============================================================
// HOMEPAGE METADATA (app/page.tsx atau app/(website)/page.tsx)
// ============================================================
export const homepageMetadata: Metadata = {
  metadataBase: new URL('https://tosart.com'),
  title: 'Tosart Studio | Jasa Desain Kaos, Branding & Konten Visual',
  description:
    'Tosart Studio adalah creative studio profesional spesialis desain apparel (kaos, hoodie, jersey), branding, social media design, dan video marketing. Lebih dari 400 brand telah kami tangani. Hubungi kami sekarang!',
  keywords: [
    'jasa desain kaos',
    'desain baju custom',
    'jasa branding',
    'desain jersey custom',
    'studio desain apparel',
    'social media design',
    'video marketing',
    'tosart',
    'tosart studio',
  ],
  openGraph: {
    title: 'Tosart Studio | Jasa Desain Kaos, Branding & Konten Visual',
    description:
      'Creative studio profesional spesialis desain apparel, branding, dan konten visual. 400+ brand telah kami tangani.',
    url: 'https://tosart.com',
    siteName: 'Tosart Studio',
    type: 'website',
    locale: 'id_ID',
  },
  twitter: {
    card: 'summary',
    title: 'Tosart Studio | Jasa Desain Kaos, Branding & Konten Visual',
    description:
      'Creative studio profesional spesialis desain apparel, branding, dan konten visual. 400+ brand telah kami tangani.',
  },
  alternates: {
    canonical: 'https://tosart.com',
  },
}

// ============================================================
// APPAREL DESIGN PAGE METADATA (app/apparel-design/page.tsx)
// ============================================================
export const apparelDesignMetadata: Metadata = {
  title: 'Jasa Desain Kaos, Hoodie & Jersey Custom | Tosart Studio',
  description:
    'Layanan desain apparel profesional: kaos, hoodie, jersey, dan custom apparel lainnya. Output siap produksi, visual kuat, dan sesuai identitas brand Anda. Pesan sekarang di Tosart Studio!',
  keywords: [
    'jasa desain kaos custom',
    'desain hoodie profesional',
    'desain jersey custom',
    'apparel design studio',
    'desain baju brand',
    'tosart apparel',
  ],
  openGraph: {
    title: 'Jasa Desain Kaos, Hoodie & Jersey Custom | Tosart Studio',
    description:
      'Desain apparel profesional: kaos, hoodie, jersey custom. Output siap produksi, visual kuat.',
    url: 'https://tosart.com/apparel-design',
    siteName: 'Tosart Studio',
    type: 'website',
    locale: 'id_ID',
  },
  alternates: {
    canonical: 'https://tosart.com/apparel-design',
  },
}

// ============================================================
// SOCIAL MEDIA DESIGN PAGE METADATA (app/social-media-design/page.tsx)
// ============================================================
export const socialMediaDesignMetadata: Metadata = {
  title: 'Jasa Desain Social Media Profesional | Tosart Studio',
  description:
    'Tingkatkan engagement brand Anda dengan desain konten social media yang menarik dan konsisten. Feed Instagram, stories, reels thumbnail, dan lebih banyak lagi. Tosart Studio siap membantu!',
  keywords: [
    'jasa desain social media',
    'desain konten instagram',
    'social media design',
    'desain feed instagram',
    'konten visual brand',
    'tosart social media',
  ],
  openGraph: {
    title: 'Jasa Desain Social Media Profesional | Tosart Studio',
    description:
      'Desain konten social media yang menarik dan konsisten untuk meningkatkan engagement brand Anda.',
    url: 'https://tosart.com/social-media-design',
    siteName: 'Tosart Studio',
    type: 'website',
    locale: 'id_ID',
  },
  alternates: {
    canonical: 'https://tosart.com/social-media-design',
  },
}

// ============================================================
// VIDEO MARKETING PAGE METADATA (app/video-marketing/page.tsx)
// ============================================================
export const videoMarketingMetadata: Metadata = {
  title: 'Jasa Video Marketing & Konten Visual | Tosart Studio',
  description:
    'Layanan produksi video marketing profesional untuk brand Anda. Dari konsep, animasi, hingga video promosi yang siap publish. Tosart Studio membantu brand Anda tampil lebih menonjol!',
  keywords: [
    'jasa video marketing',
    'produksi video promosi',
    'konten video brand',
    'video marketing indonesia',
    'animasi brand',
    'tosart video',
  ],
  openGraph: {
    title: 'Jasa Video Marketing & Konten Visual | Tosart Studio',
    description:
      'Produksi video marketing profesional: dari konsep hingga video promosi siap publish.',
    url: 'https://tosart.com/video-marketing',
    siteName: 'Tosart Studio',
    type: 'website',
    locale: 'id_ID',
  },
  alternates: {
    canonical: 'https://tosart.com/video-marketing',
  },
}
