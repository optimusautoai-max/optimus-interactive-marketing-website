import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import {
  X,
  Gift,
  Clock,
  Zap,
  Star,
  CheckCircle,
  ArrowRight,
  AlertTriangle,
  Crown,
  Shield
} from "lucide-react";
import { useSound } from "./SoundManager";

interface ConversionOptimizerProps {
  userArchetype: string | null;
  slotsRemaining: number;
  onStartAssessment: () => void;
  onSelectTier: (tier: string) => void;
}

const exitIntentOffers = [
  {
    title: "WAIT! Don't Leave Empty-Handed",
    subtitle: "Exclusive 48-Hour Offer",
    discount: "67% OFF",
    originalPrice: "$297",
    discountedPrice: "$97",
    offer: "Empire Starter + Premium Support",
    benefits: [
      "All 42+ Business Apps",
      "6 months premium support",
      "Exclusive training materials",
      "30-day money-back guarantee"
    ],
    urgency: "This offer expires in 24 hours and won't be repeated",
    badge: "Limited Time"
  },
  {
    title: "Before You Go...",
    subtitle: "Free Empire Assessment + Strategy Session",
    discount: "FREE",
    originalPrice: "$497",
    discountedPrice: "$0",
    offer: "Personal Brand Assessment + 30-min Strategy Call",
    benefits: [
      "Complete brand analysis",
      "Personalized empire roadmap",
      "Direct CEO consultation",
      "Custom growth strategy"
    ],
    urgency: "Only 5 free consultations available this week",
    badge: "Exclusive"
  }
];

const scrollBasedOffers = [
  {
    trigger: 25,
    type: "social-proof",
    message: "🔥 247 people viewed this page in the last 24 hours"
  },
  {
    trigger: 50,
    type: "urgency",
    message: "⚡ 12 spots remaining in our exclusive beta program"
  },
  {
    trigger: 75,
    type: "offer",
    message: "🎯 Ready to start? Get your personalized empire assessment"
  }
];

export function ConversionOptimizer({
  userArchetype,
  slotsRemaining,
  onStartAssessment,
  onSelectTier
}: ConversionOptimizerProps) {
  const { playSound } = useSound();
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [currentOffer, setCurrentOffer] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollOffer, setShowScrollOffer] = useState(false);
  const [currentScrollOffer, setCurrentScrollOffer] = useState(0);
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [showTimeBasedOffer, setShowTimeBasedOffer] = useState(false);

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !showExitIntent) {
        setShowExitIntent(true);
        playSound('notification');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [showExitIntent, playSound]);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      // Check for scroll-based offers
      scrollBasedOffers.forEach((offer, index) => {
        if (progress >= offer.trigger && currentScrollOffer <= index) {
          setCurrentScrollOffer(index + 1);
          setShowScrollOffer(true);
          setTimeout(() => setShowScrollOffer(false), 5000);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentScrollOffer]);

  // Time on page tracking
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeOnPage(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Time-based offers
  useEffect(() => {
    if (timeOnPage === 120 && !userArchetype) { // After 2 minutes without assessment
      setShowTimeBasedOffer(true);
    }
  }, [timeOnPage, userArchetype]);

  const currentExitOffer = exitIntentOffers[currentOffer];

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-40">
        <Progress 
          value={scrollProgress} 
          className="h-1 rounded-none bg-gray-800 [&>div]:bg-gradient-to-r [&>div]:from-orange-400 [&>div]:to-blue-400"
        />
      </div>

      {/* Scroll-based Floating Notifications */}
      <AnimatePresence>
        {showScrollOffer && (
          <motion.div
            className="fixed top-20 right-6 z-40 max-w-sm"
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Card className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl border-blue-400/50 shadow-2xl">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <p className="text-white text-sm">
                    {scrollBasedOffers[currentScrollOffer - 1]?.message}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exit Intent Modal */}
      <AnimatePresence>
        {showExitIntent && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-2xl w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Card className="bg-gradient-to-br from-slate-900 to-blue-900 border-orange-400/50 border-2 overflow-hidden">
                {/* Header */}
                <div className="relative p-6 bg-gradient-to-r from-orange-500/20 to-red-500/20 border-b border-orange-400/30">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowExitIntent(false)}
                    className="absolute top-4 right-4 text-white hover:bg-white/10"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <Gift className="h-8 w-8 text-orange-400" />
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {currentExitOffer.title}
                      </h3>
                      <p className="text-orange-400">{currentExitOffer.subtitle}</p>
                    </div>
                  </div>

                  <Badge className="bg-red-500/20 text-red-400 border border-red-400/50">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    {currentExitOffer.badge}
                  </Badge>
                </div>

                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Left: Offer Details */}
                    <div>
                      <div className="text-center mb-6">
                        <div className="text-6xl font-bold text-orange-400 mb-2">
                          {currentExitOffer.discount}
                        </div>
                        <div className="space-y-1">
                          <div className="text-gray-400 line-through text-lg">
                            {currentExitOffer.originalPrice}
                          </div>
                          <div className="text-3xl font-bold text-green-400">
                            {currentExitOffer.discountedPrice}
                          </div>
                        </div>
                        <div className="text-white font-semibold mt-2">
                          {currentExitOffer.offer}
                        </div>
                      </div>

                      <ul className="space-y-3">
                        {currentExitOffer.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center gap-3 text-gray-200">
                            <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right: Action */}
                    <div className="flex flex-col justify-center">
                      <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-4 mb-6">
                        <div className="flex items-center gap-2 text-red-400 mb-2">
                          <Clock className="h-4 w-4" />
                          <span className="font-semibold">Urgency Alert</span>
                        </div>
                        <p className="text-white text-sm">
                          {currentExitOffer.urgency}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <Button
                          size="lg"
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                          onClick={() => {
                            playSound('success');
                            setShowExitIntent(false);
                            onStartAssessment();
                          }}
                        >
                          {currentExitOffer.discountedPrice === "$0" ? "Get Free Assessment" : "Claim This Offer"}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 border-white/20 text-white hover:bg-white/10"
                            onClick={() => setCurrentOffer(0)}
                          >
                            Paid Offer
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 border-white/20 text-white hover:bg-white/10"
                            onClick={() => setCurrentOffer(1)}
                          >
                            Free Offer
                          </Button>
                        </div>

                        <button
                          onClick={() => setShowExitIntent(false)}
                          className="w-full text-gray-400 text-sm hover:text-white transition-colors"
                        >
                          No thanks, I'll continue browsing
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Time-based Offer */}
      <AnimatePresence>
        {showTimeBasedOffer && (
          <motion.div
            className="fixed bottom-6 left-6 z-40 max-w-md"
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl border-purple-400/50 shadow-2xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Star className="h-6 w-6 text-yellow-400" />
                  <div>
                    <div className="font-bold text-white">Still exploring?</div>
                    <div className="text-purple-400 text-sm">Get your personalized roadmap</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowTimeBasedOffer(false)}
                    className="text-white hover:bg-white/10 ml-auto"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <p className="text-gray-200 text-sm mb-4">
                  You've been browsing for {Math.floor(timeOnPage / 60)} minutes. 
                  Get instant clarity with our FREE empire assessment.
                </p>

                <Button
                  size="sm"
                  className="w-full bg-purple-500 hover:bg-purple-600"
                  onClick={() => {
                    playSound('buttonClick');
                    setShowTimeBasedOffer(false);
                    onStartAssessment();
                  }}
                >
                  Start Free Assessment
                  <Zap className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating CTA Button */}
      <motion.div
        className="fixed bottom-6 right-20 z-40"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: scrollProgress > 10 ? 1 : 0, scale: scrollProgress > 10 ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          size="lg"
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-2xl shadow-orange-500/25 rounded-full px-8"
          onClick={() => {
            playSound('buttonClick');
            onStartAssessment();
          }}
          onMouseEnter={() => playSound('buttonHover')}
        >
          <Crown className="h-5 w-5 mr-2" />
          Start Empire
        </Button>
      </motion.div>

      {/* Trust Badge Floating */}
      <motion.div
        className="fixed bottom-20 left-6 z-40"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: scrollProgress > 30 ? 1 : 0, x: scrollProgress > 30 ? 0 : -100 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-white/10 backdrop-blur-xl border-white/20">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 text-white text-sm">
              <Shield className="h-4 w-4 text-green-400" />
              <span>Trusted by 1,340+ entrepreneurs</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}