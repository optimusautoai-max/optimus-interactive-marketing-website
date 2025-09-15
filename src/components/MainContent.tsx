import React, { useState, useEffect, Suspense, lazy } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { motion } from 'framer-motion';
import { Rocket, Crown, CheckCircle, Clock } from "lucide-react";
import { useSound } from "./SoundManager";
import { HeroSection } from "./HeroSection";
import { TrustIndicators } from "./TrustIndicators";
import { UrgencyTimer } from "./UrgencyTimer";
import { EnhancedTestimonials } from "./EnhancedTestimonials";
import { EnhancedFooter } from "./EnhancedFooter";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// Lazy load heavy components
const InteractiveDemo = lazy(() => import("./InteractiveDemo").then(m => ({ default: m.InteractiveDemo })));
const AppCreatorShowcase = lazy(() => import("./AppCreatorShowcase").then(m => ({ default: m.AppCreatorShowcase })));
const PremiumFeatures = lazy(() => import("./PremiumFeatures").then(m => ({ default: m.PremiumFeatures })));
const CustomerSuccessHub = lazy(() => import("./CustomerSuccessHub").then(m => ({ default: m.CustomerSuccessHub })));
const TeamShowcase = lazy(() => import("./TeamShowcase").then(m => ({ default: m.TeamShowcase })));
const ConversionOptimizer = lazy(() => import("./ConversionOptimizer").then(m => ({ default: m.ConversionOptimizer })));

// Loading fallback component
const LoadingFallback = () => (
  <div className="py-20 flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-400"></div>
  </div>
);

// Timer hook for countdown (simplified)
function useCountdown() {
  const [timeLeft] = useState(48 * 60 * 60 * 1000);
  return {
    hours: 48,
    minutes: 0,
    seconds: 0,
    isExpired: false,
    isPaused: true,
  };
}

interface UserArchetype {
  type: string;
  title: string;
  description: string;
  apps: string[];
  strategies: string[];
}

interface MainContentProps {
  userArchetype: UserArchetype | null;
  slotsRemaining: number;
  onShowAssessment: () => void;
  onShowDemoVideo: () => void;
  onShowDashboard: () => void;
  onShowWalkthrough: () => void;
  onShowTrafficHub: () => void;
  onShowROICalculator: () => void;
  onShowIntegrationMarketplace: () => void;
  onShowSecurityCenter: () => void;
  onShowInteractivePresentation: () => void;
}

export function MainContent({
  userArchetype,
  slotsRemaining,
  onShowAssessment,
  onShowDemoVideo,
  onShowDashboard,
  onShowWalkthrough,
  onShowTrafficHub,
  onShowROICalculator,
  onShowIntegrationMarketplace,
  onShowSecurityCenter,
  onShowInteractivePresentation,
}: MainContentProps) {
  const { playSound } = useSound();
  const countdown = useCountdown();

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Urgency Timer */}
      <UrgencyTimer slotsRemaining={slotsRemaining} countdown={countdown} />

      {/* Traffic Summary Widget */}
      <div className="fixed bottom-4 left-4 z-40">
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-3 cursor-pointer hover:scale-105 transition-all duration-300"
          onClick={() => {
            playSound('whoosh');
            onShowTrafficHub();
          }}
        >
          <CardContent className="p-0">
            <div className="flex items-center gap-2 text-white text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Traffic Hub</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hero Section */}
      <div id="hero-section">
        <HeroSection
          userArchetype={userArchetype}
          slotsRemaining={slotsRemaining}
          countdown={countdown}
          onStartAssessment={onShowAssessment}
          onWatchDemo={onShowDemoVideo}
          onShowDashboard={onShowDashboard}
          onStartWalkthrough={onShowWalkthrough}
        />
      </div>

      {/* Trust Indicators */}
      <TrustIndicators />

      {/* Interactive Demo Section */}
      <section id="demo-section" className="py-20 bg-slate-800">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Live Empire Building Demo
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Watch in real-time as Optimus Auto AI builds your empire automatically
            </p>
          </motion.div>

          <Suspense fallback={<LoadingFallback />}>
            <InteractiveDemo onStartWalkthrough={onShowWalkthrough} />
          </Suspense>
        </div>
      </section>

      {/* App Creator Showcase */}
      <Suspense fallback={<LoadingFallback />}>
        <AppCreatorShowcase onStartCreating={onShowAssessment} />
      </Suspense>

      {/* Apps Overview Section */}
      <section id="apps-overview-section" className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Complete Business Infrastructure
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              This isn't just software - it's your entire business operating system.
              <span className="text-orange-400 font-semibold"> 42+ integrated business applications</span>{" "}
              that would cost you <span className="text-red-400 font-semibold">$50K+/month in team salaries</span> - now for $97/month.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { name: "CRM System", color: "from-blue-500/40 to-cyan-500/40" },
              { name: "Email Marketing", color: "from-green-500/40 to-emerald-500/40" },
              { name: "Sales Funnels", color: "from-purple-500/40 to-pink-500/40" },
              { name: "App Builder", color: "from-orange-500/40 to-red-500/40" },
              { name: "E-commerce", color: "from-yellow-500/40 to-orange-500/40" },
              { name: "Analytics", color: "from-indigo-500/40 to-blue-500/40" },
              { name: "Communication", color: "from-teal-500/40 to-cyan-500/40" },
              { name: "Automation", color: "from-rose-500/40 to-pink-500/40" },
            ].map((app, index) => (
              <motion.div
                key={app.name}
                className={`bg-gradient-to-br ${app.color} p-4 rounded-lg text-center text-white hover:scale-105 transition-all duration-300 cursor-pointer border border-white/10`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                onClick={() => playSound('tick')}
              >
                <div className="font-semibold text-sm">{app.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <Suspense fallback={<LoadingFallback />}>
        <PremiumFeatures />
      </Suspense>

      {/* Pricing Section */}
      <section id="pricing-section" className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Choose Your Empire Level
            </h2>
            {userArchetype && (
              <Badge className="bg-orange-500/20 text-orange-400 px-6 py-3 text-lg mb-4">
                <Crown className="h-5 w-5 mr-2" />
                Personalized for {userArchetype} Archetype
              </Badge>
            )}
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Simplified pricing tiers */}
            {[
              {
                name: "Empire Starter",
                price: "$97",
                color: "from-blue-500/20 to-purple-500/20",
                border: "border-blue-400/50",
                features: ["42+ Business Apps", "Automated Income Streams", "Basic Support"],
              },
              {
                name: "App Empire",
                price: "$297",
                color: "from-orange-500/20 to-red-500/20",
                border: "border-orange-400/50",
                features: ["Everything in Starter", "App Creation Tools", "Priority Support"],
                popular: true,
              },
              {
                name: "Business Empire",
                price: "$2,500",
                color: "from-purple-500/20 to-pink-500/20",
                border: "border-purple-400/50",
                features: ["Everything in App Empire", "Dedicated Team", "Custom Configuration"],
              },
            ].map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`bg-gradient-to-br ${tier.color} ${tier.border} h-full relative`}>
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-orange-500 text-white">POPULAR</Badge>
                    </div>
                  )}
                  <CardContent className="p-8 text-white">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                      <div className="text-4xl font-bold text-orange-400 mb-4">
                        {tier.price}<span className="text-lg">/month</span>
                      </div>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full bg-orange-500 hover:bg-orange-600"
                      onClick={() => playSound('tick')}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <div id="testimonials-section">
        <EnhancedTestimonials />
      </div>

      {/* Customer Success Hub */}
      <Suspense fallback={<LoadingFallback />}>
        <CustomerSuccessHub onStartAssessment={onShowAssessment} />
      </Suspense>

      {/* Team Showcase */}
      <Suspense fallback={<LoadingFallback />}>
        <TeamShowcase onContactTeam={onShowAssessment} />
      </Suspense>

      {/* Conversion Optimizer */}
      <Suspense fallback={<LoadingFallback />}>
        <ConversionOptimizer
          userArchetype={userArchetype}
          slotsRemaining={slotsRemaining}
          onStartAssessment={onShowAssessment}
          onSelectTier={() => playSound('success')}
        />
      </Suspense>

      {/* Contact Section */}
      <section id="contact-section" className="py-20 bg-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1578329067159-26b7b6976d02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBleGVjdXRpdmUlMjBidXNpbmVzcyUyMG1lZXRpbmclMjBwcmVtaXVtfGVufDF8fHx8MTc1NjUxNTY5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Executive Meeting Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-orange-500/20 text-orange-400 px-6 py-3 mb-6">
              <Rocket className="h-5 w-5 mr-2" />
              Executive Consultation Available
            </Badge>
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join the <span className="text-orange-400 font-semibold">world's first BOSaaS revolution</span>. 
              Replace expensive overhead with AI that works 24/7.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardContent className="p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Quick Actions</h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10"
                    onClick={onShowAssessment}
                  >
                    Start Brand Assessment
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-orange-400/50 text-orange-400 hover:bg-orange-500/10"
                    onClick={onShowDemoVideo}
                  >
                    Watch Demo Video
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-green-400/50 text-green-400 hover:bg-green-500/10"
                    onClick={onShowTrafficHub}
                  >
                    🚀 Traffic Generation Hub
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-purple-400/50 text-purple-400 hover:bg-purple-500/10"
                    onClick={onShowROICalculator}
                  >
                    💰 ROI Calculator
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-cyan-400/50 text-cyan-400 hover:bg-cyan-500/10"
                    onClick={onShowInteractivePresentation}
                  >
                    🎬 Interactive Presentation
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardContent className="p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Contact Info</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-300">Email: Team@optimusautoai.com</p>
                  </div>
                  <div>
                    <p className="text-gray-300">Phone: 918-293-3352</p>
                  </div>
                  <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-4">
                    <h4 className="font-semibold text-green-400 mb-2">Beta Status</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Slots Remaining:</span>
                        <span className="font-bold text-green-400">{slotsRemaining}/30</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Time Left:</span>
                        <span className="font-bold text-orange-400">
                          {countdown.hours}h {countdown.minutes}m
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <EnhancedFooter />
    </div>
  );
}
