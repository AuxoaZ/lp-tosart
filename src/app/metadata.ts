import type { Metadata } from 'next'

// ============================================================
// HOMEPAGE METADATA (app/page.tsx or app/(website)/page.tsx)
// ============================================================
export const homepageMetadata: Metadata = {
  metadataBase: new URL('https://tosart.com'),
  title: 'Tosart Studio | Custom Apparel Design, Streetwear & Brand Visuals',
  description:
    'Tosart Studio is a premier creative design studio specializing in custom streetwear & apparel design (t-shirts, hoodies, jerseys), brand identity, and dynamic visual content. Over 400+ brands served worldwide.',
  keywords: [
    'custom apparel design studio',
    'streetwear graphic designer',
    'custom t-shirt design',
    'hoodie jersey design service',
    'creative branding agency',
    'social media visual design',
    'motion graphics video marketing',
    'tosart studio',
    'clothing brand designer',
    'apparel graphic design',
  ],
  openGraph: {
    title: 'Tosart Studio | Custom Apparel Design, Streetwear & Brand Visuals',
    description:
      'Creative design studio specializing in custom apparel, streetwear graphics, brand identity, and dynamic visuals. 400+ brands served worldwide.',
    url: 'https://tosart.com',
    siteName: 'Tosart Studio',
    images: [
      {
        url: 'https://tosart.com/img/tosart-logo.png',
        width: 800,
        height: 800,
        alt: 'Tosart Studio Logo',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Tosart Studio | Custom Apparel Design, Streetwear & Brand Visuals',
    description:
      'Creative design studio specializing in custom apparel, streetwear graphics, brand identity, and dynamic visuals.',
    images: ['https://tosart.com/img/tosart-logo.png'],
  },
  alternates: {
    canonical: 'https://tosart.com',
  },
}

// ============================================================
// APPAREL DESIGN PAGE METADATA (app/apparel-design/page.tsx)
// ============================================================
export const apparelDesignMetadata: Metadata = {
  title: 'Custom Apparel & Streetwear Design Services | Tosart Studio',
  description:
    'Professional custom apparel design: t-shirts, hoodies, jerseys, and varsity jackets. Production-ready tech packs and high-impact streetwear graphics tailored to your brand.',
  keywords: [
    'custom streetwear design',
    't-shirt graphic design',
    'custom hoodie designer',
    'jersey design service',
    'apparel design studio',
    'clothing brand tech pack',
    'streetwear graphics',
    'tosart apparel',
  ],
  openGraph: {
    title: 'Custom Apparel & Streetwear Design Services | Tosart Studio',
    description:
      'Professional apparel design: hoodies, jerseys, t-shirts, and custom street fashion graphics. Production-ready output.',
    url: 'https://tosart.com/apparel-design',
    siteName: 'Tosart Studio',
    images: [
      {
        url: 'https://tosart.com/img/tosart-logo.png',
        width: 800,
        height: 800,
        alt: 'Tosart Studio Logo',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Custom Apparel & Streetwear Design Services | Tosart Studio',
    description:
      'Professional apparel design: hoodies, jerseys, t-shirts, and custom street fashion graphics.',
    images: ['https://tosart.com/img/tosart-logo.png'],
  },
  alternates: {
    canonical: 'https://tosart.com/apparel-design',
  },
}

// ============================================================
// SOCIAL MEDIA DESIGN PAGE METADATA (app/social-media-design/page.tsx)
// ============================================================
export const socialMediaDesignMetadata: Metadata = {
  title: 'Creative Social Media Design & Visual Content | Tosart Studio',
  description:
    "Amplify your brand's digital presence with cohesive social media design systems. Engaging feed layouts, Instagram templates, reel thumbnails, and branded visual assets.",
  keywords: [
    'social media design services',
    'instagram feed design',
    'brand visual content',
    'social media graphics agency',
    'streetwear social content',
    'creative digital branding',
    'tosart social media',
  ],
  openGraph: {
    title: 'Creative Social Media Design & Visual Content | Tosart Studio',
    description:
      'Engaging, cohesive social media design systems and digital content that elevate brand presence and audience engagement.',
    url: 'https://tosart.com/social-media-design',
    siteName: 'Tosart Studio',
    images: [
      {
        url: 'https://tosart.com/img/tosart-logo.png',
        width: 800,
        height: 800,
        alt: 'Tosart Studio Logo',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Creative Social Media Design & Visual Content | Tosart Studio',
    description:
      'Engaging social media design systems and digital content for modern brands.',
    images: ['https://tosart.com/img/tosart-logo.png'],
  },
  alternates: {
    canonical: 'https://tosart.com/social-media-design',
  },
}

// ============================================================
// VIDEO MARKETING PAGE METADATA (app/video-marketing/page.tsx)
// ============================================================
export const videoMarketingMetadata: Metadata = {
  title: 'Video Marketing & Motion Graphics Production | Tosart Studio',
  description:
    'High-energy video marketing, motion graphics, and visual editing for modern fashion and lifestyle brands. Dynamic promotional content ready for social campaigns.',
  keywords: [
    'video marketing production',
    'brand motion graphics',
    'commercial promo video editing',
    'apparel promotional video',
    'creative video production',
    'tosart video marketing',
  ],
  openGraph: {
    title: 'Video Marketing & Motion Graphics Production | Tosart Studio',
    description:
      'Dynamic video marketing and motion graphics production designed to make your brand stand out.',
    url: 'https://tosart.com/video-marketing',
    siteName: 'Tosart Studio',
    images: [
      {
        url: 'https://tosart.com/img/tosart-logo.png',
        width: 800,
        height: 800,
        alt: 'Tosart Studio Logo',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Video Marketing & Motion Graphics Production | Tosart Studio',
    description:
      'High-energy video marketing and motion graphics for modern fashion & lifestyle brands.',
    images: ['https://tosart.com/img/tosart-logo.png'],
  },
  alternates: {
    canonical: 'https://tosart.com/video-marketing',
  },
}
