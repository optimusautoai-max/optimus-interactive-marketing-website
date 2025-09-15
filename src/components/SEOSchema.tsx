import React from 'react';

interface FAQ {
  question: string;
  answer: string;
}

interface SEOSchemaProps {
  faqs?: FAQ[];
}

export function SEOSchema({ faqs = [] }: SEOSchemaProps) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Optimus Auto AI",
    "description": "Build Your Empire with 42+ AI-Powered Apps. Automated Income Streams. Complete Business Systems.",
    "url": "https://optimusautoai.com",
    "logo": "https://optimusautoai.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-918-293-3352",
      "email": "Team@optimusautoai.com",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://twitter.com/optimusautoai",
      "https://linkedin.com/company/optimusautoai"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Optimus Auto AI",
    "description": "AI-powered business automation platform with 42+ apps for building automated income streams",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "97",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "validFrom": new Date().toISOString(),
      "priceValidUntil": new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString()
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "247",
      "bestRating": "5"
    }
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Optimus Auto AI Empire Builder",
    "description": "Complete business automation suite with 42+ AI-powered applications",
    "brand": {
      "@type": "Brand",
      "name": "Optimus Auto AI"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Empire Starter",
        "price": "97",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "description": "42+ Business Apps with automated income streams"
      },
      {
        "@type": "Offer",
        "name": "Business Empire",
        "price": "2500",
        "priceCurrency": "USD",
        "availability": "https://schema.org/LimitedAvailability",
        "description": "Custom development and white-label solutions"
      },
      {
        "@type": "Offer",
        "name": "Hands-Off Empire",
        "price": "6500",
        "priceCurrency": "USD",
        "availability": "https://schema.org/LimitedAvailability",
        "description": "Complete done-for-you business management"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
    </>
  );
}