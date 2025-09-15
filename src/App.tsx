import React, { useState, useEffect } from "react";
import { Toaster } from "./components/ui/sonner";
import { SoundProvider } from "./components/SoundManager";
import { SEOSchema } from "./components/SEOSchema";
import { LoadingOptimizer } from "./components/LoadingOptimizer";
import { PerformanceAnalytics } from "./components/PerformanceAnalytics";

// Core components - loaded immediately
import { HeroSection } from "./components/HeroSection";
import { UrgencyTimer } from "./components/UrgencyTimer";
import { EnhancedTestimonials } from "./components/EnhancedTestimonials";
import { TeamShowcase } from "./components/TeamShowcase";
import { AppCreatorShowcase } from "./components/AppCreatorShowcase";
import { EnhancedFooter } from "./components/EnhancedFooter";
import { TrustIndicators } from "./components/TrustIndicators";

// Interactive features - direct imports for deployment stability
import { BrandAssessment } from "./components/BrandAssessment";
import { PersonalizedDashboard } from "./components/PersonalizedDashboard";
import { DemoVideo } from "./components/DemoVideo";
import { InteractiveDemo } from "./components/InteractiveDemo";
import { ROICalculator } from "./components/ROICalculator";
import { CalendarBooking } from "./components/CalendarBooking";
import { SecurityTrustCenter } from "./components/SecurityTrustCenter";
import { IntegrationMarketplace } from "./components/IntegrationMarketplace";
import { WebsiteWalkthrough } from "./components/WebsiteWalkthrough";
import { InteractiveVideoPresentation } from "./components/InteractiveVideoPresentation";
import { TrafficAnalytics } from "./components/TrafficAnalytics";
import { LiveSupportSystem } from "./components/LiveSupportSystem";

// FAQ data with schema markup for SEO (Alex Mehr style)
const defaultFAQs = [
  {
    question: "What exactly is Optimus Auto AI and how is it different?",
    answer: "Optimus Auto AI is the world's first Business Operating SaaS (BOSaaS) platform. Unlike traditional SaaS tools that handle single functions, we replace your entire human team with 42+ AI-powered applications that work together as a complete business operating system. This means automated income streams, complete business systems, and the ability to build a multi-million dollar empire with minimal human intervention."
  },
  {
    question: "How quickly can I realistically see results with Optimus Auto AI?",
    answer: "Most entrepreneurs see their first automated income streams within 24-48 hours of setup. The brand assessment generates immediate strategy insights, and our AI apps begin working instantly. Full empire-level results typically manifest within 30-90 days, with many users reporting 6-figure automated revenue within the first quarter."
  },
  {
    question: "What are the 42+ applications included and how do they work together?",
    answer: "Our BOSaaS includes: AI App Builder, Advanced CRM, Email Marketing Automation, Sales Funnel Creator, E-commerce Platform, Analytics Dashboard, Team Collaboration Tools, Project Management, Customer Support AI, Social Media Automation, Content Creation AI, SEO Optimizer, Lead Generation, Payment Processing, Inventory Management, and 27+ more. They're all integrated to share data and work as one unified business brain."
  },
  {
    question: "Is there really a 30-day money-back guarantee?",
    answer: "Absolutely. We're so confident in Optimus Auto AI's ability to transform your business that we offer a full 30-day money-back guarantee on all plans. If you don't see measurable progress toward your empire goals, we'll refund every penny, no questions asked."
  },
  {
    question: "Why are you limiting this to only 30 beta users?",
    answer: "As the world's first BOSaaS platform, we're providing hands-on strategic support to ensure maximum success for our founding empire builders. This level of personalized attention is only possible with a limited group. Once these 30 slots are filled, the next opportunity won't be available until Q2 2025."
  },
  {
    question: "What makes Robert Parks qualified to build empire-level business systems?",
    answer: "Robert has over 15 years of experience building automated business systems and has personally generated over $50M in revenue through AI-powered automation. He's built and sold multiple tech companies and has helped over 1,000 entrepreneurs create automated income streams. Optimus Auto AI represents the culmination of over a year of development and testing."
  },
  {
    question: "How does the pricing work and what's included in each tier?",
    answer: "Empire Starter ($97) includes all 42+ apps with basic support. Business Empire ($2,500) adds custom development and priority support. Hands-Off Empire ($6,500) includes complete done-for-you setup and dedicated account management. All plans include our 30-day guarantee and lifetime access to updates."
  },
  {
    question: "Can I upgrade between plans later?",
    answer: "Yes, you can upgrade at any time and only pay the difference. Many users start with Empire Starter to test the system, then upgrade to Business Empire or Hands-Off Empire as their automated revenue grows. We recommend starting where you're comfortable and scaling up as results compound."
  },
  {
    question: "What kind of support and training is provided?",
    answer: "Every plan includes comprehensive training materials, video walkthroughs, and our exclusive Empire Builder Community. Business Empire and Hands-Off Empire users get priority support and 1-on-1 strategy sessions. Hands-Off Empire users receive a dedicated account manager and done-for-you setup."
  },
  {
    question: "Is this suitable for complete beginners or do I need technical experience?",
    answer: "Optimus Auto AI is designed for entrepreneurs at all levels. Our AI handles the technical complexity while you focus on strategy and growth. The brand assessment creates a personalized roadmap, and our step-by-step guidance ensures success regardless of your starting point. Many of our most successful users started as complete beginners."
  }
];

// Business archetype data for personalization
interface UserArchetype {
  type: string;
  title: string;
  description: string;
  apps: string[];
  strategies: string[];
}

const archetypes: Record<string, UserArchetype> = {
  "Visionary Creator": {
    type: "Visionary Creator",
    title: "Innovation-Driven Empire Architect",
    description: "You're driven by innovation and creative breakthroughs. Your empire thrives on unique solutions.",
    apps: ["AI App Builder", "Creative Suite", "Innovation Lab", "Patent Tracker"],
    strategies: ["Blue Ocean Strategy", "Disruptive Innovation", "Creative Monetization"]
  },
  "Strategic Optimizer": {
    type: "Strategic Optimizer", 
    title: "Data-Driven Empire Strategist",
    description: "You build empires through strategic analysis and systematic optimization.",
    apps: ["Analytics Dashboard", "A/B Testing Suite", "Performance Optimizer", "Strategic Planner"],
    strategies: ["Data-Driven Growth", "Systematic Scaling", "Performance Optimization"]
  },
  "Excellence Executor": {
    type: "Excellence Executor",
    title: "Performance-Driven Empire Commander", 
    description: "You achieve empire-level success through relentless execution and performance.",
    apps: ["Goal Tracker", "Performance Monitor", "Team Management", "Results Dashboard"],
    strategies: ["Execution Excellence", "Performance Metrics", "Results-Driven Growth"]
  },
  "Innovation Pioneer": {
    type: "Innovation Pioneer",
    title: "Future-Focused Empire Explorer",
    description: "You discover new opportunities and create markets where others see only uncertainty.",
    apps: ["Market Research AI", "Trend Analyzer", "Opportunity Scanner", "Innovation Hub"],
    strategies: ["Market Creation", "Trend Anticipation", "First-Mover Advantage"]
  },
  "Growth Accelerator": {
    type: "Growth Accelerator", 
    title: "Scale-Focused Empire Expander",
    description: "You build empires designed for rapid, systematic, and sustainable growth.",
    apps: ["Growth Tracker", "Scale Optimizer", "Expansion Planner", "Revenue Accelerator"],
    strategies: ["Rapid Scaling", "Growth Hacking", "Market Expansion"]
  }
};

// Main App State Management
function App() {
  // Core application state
  const [userArchetype, setUserArchetype] = useState<UserArchetype | null>(null);
  const [currentView, setCurrentView] = useState<string>('main');
  const [slotsRemaining, setSlotsRemaining] = useState(17);
  const [timeRemaining, setTimeRemaining] = useState(48 * 60 * 60 * 1000); // 48 hours in milliseconds

  // Modal states for different features
  const [showAssessment, setShowAssessment] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showDemoVideo, setShowDemoVideo] = useState(false);
  const [showROICalculator, setShowROICalculator] = useState(false);
  const [showCalendarBooking, setShowCalendarBooking] = useState(false);
  const [showSecurityCenter, setShowSecurityCenter] = useState(false);
  const [showIntegrationMarketplace, setShowIntegrationMarketplace] = useState(false);
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  const [showInteractivePresentation, setShowInteractivePresentation] = useState(false);
  const [showTrafficHub, setShowTrafficHub] = useState(false);
  const [showLiveSupport, setShowLiveSupport] = useState(false);

  // Initialize countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate slot reduction (for urgency)
  useEffect(() => {
    const slotTimer = setInterval(() => {
      setSlotsRemaining(prev => Math.max(1, prev - Math.floor(Math.random() * 2)));
    }, 300000); // Every 5 minutes

    return () => clearInterval(slotTimer);
  }, []);

  // Handle brand assessment completion
  const handleAssessmentComplete = (assessmentData: any) => {
    const archetypeType = assessmentData.archetype || "Strategic Optimizer";
    const selectedArchetype = archetypes[archetypeType] || archetypes["Strategic Optimizer"];
    
    setUserArchetype(selectedArchetype);
    setShowAssessment(false);
    setShowDashboard(true);
    
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'assessment_complete', {
        archetype: archetypeType,
        engagement_level: 'high'
      });
    }
  };

  const countdown = {
    hours: Math.floor(timeRemaining / (1000 * 60 * 60)),
    minutes: Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((timeRemaining % (1000 * 60)) / 1000),
    isExpired: timeRemaining <= 0,
    isPaused: true // Paused for deployment
  };

  return (
    <SoundProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        {/* Performance Analytics */}
        <PerformanceAnalytics />
        
        {/* Loading Optimizer */}
        <LoadingOptimizer />
        
        {/* SEO Schema with FAQ markup */}
        <SEOSchema faqs={defaultFAQs} />

        {/* Main Application Content */}
        {currentView === 'main' && (
          <>
            {/* Hero Section */}
            <HeroSection 
              userArchetype={userArchetype}
              slotsRemaining={slotsRemaining}
              countdown={countdown}
              onStartAssessment={() => setShowAssessment(true)}
              onWatchDemo={() => setShowDemoVideo(true)}
              onShowDashboard={() => setShowDashboard(true)}
              onStartWalkthrough={() => setShowWalkthrough(true)}
            />

            {/* Trust Indicators */}
            <TrustIndicators />

            {/* Urgency Timer */}
            <UrgencyTimer 
              slotsRemaining={slotsRemaining}
              countdown={countdown}
            />

            {/* Interactive Demo Section */}
            <section id="demo-section" className="py-20 bg-slate-800">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-white mb-6">
                    Live Empire Building Demo
                  </h2>
                  <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    Watch in real-time as Optimus Auto AI builds your empire automatically
                  </p>
                </div>
                <InteractiveDemo onStartWalkthrough={() => setShowWalkthrough(true)} />
              </div>
            </section>

            {/* App Creator Showcase */}
            <AppCreatorShowcase />

            {/* Team Showcase */}
            <TeamShowcase />

            {/* Enhanced Testimonials */}
            <EnhancedTestimonials />

            {/* Enhanced Footer */}
            <EnhancedFooter 
              onShowAssessment={() => setShowAssessment(true)}
              onShowSupport={() => setShowLiveSupport(true)}
              onShowSecurity={() => setShowSecurityCenter(true)}
            />
          </>
        )}

        {/* Interactive Features - Lazy Loaded */}
        
        {/* Brand Assessment Modal */}
        {showAssessment && (
          <BrandAssessment
            isOpen={showAssessment}
            onClose={() => setShowAssessment(false)}
            onComplete={handleAssessmentComplete}
          />
        )}

        {/* Personalized Dashboard */}
        {showDashboard && (
          <PersonalizedDashboard
            isOpen={showDashboard}
            onClose={() => setShowDashboard(false)}
            userArchetype={userArchetype}
            slotsRemaining={slotsRemaining}
          />
        )}

        {/* Demo Video Modal */}
        {showDemoVideo && (
          <DemoVideo
            isOpen={showDemoVideo}
            onClose={() => setShowDemoVideo(false)}
            userArchetype={userArchetype}
          />
        )}

        {/* ROI Calculator */}
        {showROICalculator && (
          <ROICalculator
            isOpen={showROICalculator}
            onClose={() => setShowROICalculator(false)}
            onBookCall={() => {
              setShowROICalculator(false);
              setShowCalendarBooking(true);
            }}
          />
        )}

        {/* Calendar Booking */}
        {showCalendarBooking && (
          <CalendarBooking
            isOpen={showCalendarBooking}
            onClose={() => setShowCalendarBooking(false)}
            userArchetype={userArchetype}
          />
        )}

        {/* Security Trust Center */}
        {showSecurityCenter && (
          <SecurityTrustCenter
            isOpen={showSecurityCenter}
            onClose={() => setShowSecurityCenter(false)}
          />
        )}

        {/* Integration Marketplace */}
        {showIntegrationMarketplace && (
          <IntegrationMarketplace
            isOpen={showIntegrationMarketplace}
            onClose={() => setShowIntegrationMarketplace(false)}
            userArchetype={userArchetype}
          />
        )}

        {/* Website Walkthrough */}
        {showWalkthrough && (
          <WebsiteWalkthrough
            isOpen={showWalkthrough}
            onClose={() => setShowWalkthrough(false)}
          />
        )}

        {/* Interactive Video Presentation */}
        {showInteractivePresentation && (
          <InteractiveVideoPresentation
            isOpen={showInteractivePresentation}
            onClose={() => setShowInteractivePresentation(false)}
            userArchetype={userArchetype}
          />
        )}

        {/* Traffic Analytics Hub */}
        {showTrafficHub && (
          <TrafficAnalytics
            isOpen={showTrafficHub}
            onClose={() => setShowTrafficHub(false)}
          />
        )}

        {/* Live Support System */}
        {showLiveSupport && (
          <LiveSupportSystem
            isOpen={showLiveSupport}
            onClose={() => setShowLiveSupport(false)}
            userArchetype={userArchetype}
          />
        )}

        {/* Toast Notifications */}
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'white',
            },
          }}
        />
      </div>
    </SoundProvider>
  );
}

export default App;