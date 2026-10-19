// Schema Markup (JSON-LD) untuk Tosart Studio
// Tambahkan komponen ini ke file: app/layout.tsx
// Letakkan di dalam tag <body> atau <head>

// CARA PENGGUNAAN DI layout.tsx:
// import SchemaMarkup from '@/components/SchemaMarkup'
// Lalu tambahkan <SchemaMarkup /> di dalam <body>

const schemaData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Tosart Studio",
  "alternateName": "Tosart Creative Studio",
  "url": "https://tosart.com",
  "logo": "https://tosart.com/img/tosart-logo.png",
  "image": "https://tosart.com/img/og-image.jpg",
  "description": "Tosart Studio adalah creative studio profesional yang spesialis dalam desain apparel, branding, social media design, dan video marketing.",
  "telephone": "+6285904430581",
  "email": "tosart.std@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "ID"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "09:00",
    "closes": "18:00"
  },
  "sameAs": [
    "https://instagram.com/tosa.std"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Layanan Tosart Studio",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Apparel Design",
          "description": "Desain kaos, hoodie, jersey, dan custom apparel dengan visual kuat dan output siap produksi"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Social Media Design",
          "description": "Desain konten social media yang menarik dan konsisten untuk meningkatkan engagement brand"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Video Marketing",
          "description": "Produksi video marketing dan konten visual untuk brand"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Branding",
          "description": "Layanan branding lengkap termasuk logo, identitas visual, dan panduan brand"
        }
      }
    ]
  }
}

export default function SchemaMarkup() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  )
}
