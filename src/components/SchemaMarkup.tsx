// Schema Markup (JSON-LD) for Tosart Studio

const schemaData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Tosart Studio",
  "alternateName": "Tosart Creative Studio",
  "url": "https://tosart.com",
  "logo": "https://tosart.com/img/tosart-logo.png",
  "image": "https://tosart.com/img/tosart-logo.png",
  "description":
    "Tosart Studio is a creative design studio specializing in custom streetwear & apparel design, brand identity, and visual content production.",
  "telephone": "+6285904430581",
  "email": "tosart.std@gmail.com",
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": "Worldwide"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "09:00",
    "closes": "18:00"
  },
  "sameAs": [
    "https://instagram.com/tosart.std"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Tosart Studio Creative Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Apparel Design",
          "description":
            "Custom t-shirt, hoodie, jersey, and streetwear design with production-ready graphics and tech specs."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Social Media Design",
          "description":
            "Engaging, cohesive social media content systems and visual templates designed for brand growth."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Video Marketing",
          "description":
            "Dynamic motion graphics, promotional video editing, and visual storytelling for digital marketing."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Branding & Identity",
          "description":
            "Comprehensive brand identity design including logos, visual guidelines, and assets for modern brands."
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
