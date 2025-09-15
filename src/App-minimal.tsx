import React from "react";
import { Toaster } from "./components/ui/sonner";
import { MainContent } from "./components/MainContent";
import { SEOSchema } from "./components/SEOSchema";

// Default FAQ data for SEO
const defaultFAQs = [
  {
    question: "What is Optimus Auto AI?",
    answer: "Optimus Auto AI is the world's first Business Operating SaaS (BOSaaS) platform that replaces expensive human teams with AI infrastructure. It includes 42+ business applications that automate income streams and business operations."
  },
  {
    question: "How much does it cost?",
    answer: "We offer 5 tiers starting from $97/month for Empire Starter up to $6,500/month for Hands-Off Empire. Currently offering beta pricing with only 30 slots available."
  },
  {
    question: "What apps are included?",
    answer: "Over 42 business applications including CRM, email marketing, sales funnels, app builder, e-commerce, analytics, communication tools, and automation systems."
  },
  {
    question: "Is there a money-back guarantee?",
    answer: "Yes, we offer a 30-day money-back guarantee on all plans. If you're not satisfied with the results, we'll provide a full refund."
  },
  {
    question: "How quickly can I see results?",
    answer: "Most users see initial automation working within 24-48 hours. Full empire building typically shows significant results within 30-90 days depending on your chosen tier and commitment level."
  }
];

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* SEO Schema */}
      <SEOSchema faqs={defaultFAQs} />

      {/* Main Content */}
      <MainContent
        userArchetype={null}
        slotsRemaining={17}
        onShowAssessment={() => {}}
        onShowDemoVideo={() => {}}
        onShowDashboard={() => {}}
        onShowWalkthrough={() => {}}
        onShowTrafficHub={() => {}}
        onShowROICalculator={() => {}}
        onShowIntegrationMarketplace={() => {}}
        onShowSecurityCenter={() => {}}
        onShowInteractivePresentation={() => {}}
      />

      {/* Toast Notifications */}
      <Toaster position="bottom-right" />
    </div>
  );
}