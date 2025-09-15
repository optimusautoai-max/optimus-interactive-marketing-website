import React from "react";
import { motion } from "motion/react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { 
  Trophy, 
  Crown, 
  ArrowRight, 
  Zap, 
  CheckCircle,
  Sparkles,
  TrendingUp,
  Shield
} from "lucide-react";
// Logo will be replaced with text for deployment stability
import { useSound } from "./SoundManager";

interface UserArchetype {
  type: string;
  title: string;
  description: string;
  apps: string[];
  strategies: string[];
}

interface HeroSectionProps {
  userArchetype: UserArchetype | null;
  slotsRemaining: number;
  countdown: {
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
    isPaused: boolean;
  };
  onStartAssessment: () => void;
  onWatchDemo: () => void;
  onShowDashboard: () => void;
  onStartWalkthrough?: () => void;
}

const floatingElements = [
  { icon: TrendingUp, color: "text-green-400", delay: 0 },
  { icon: Shield, color: "text-blue-400", delay: 0.5 },
  { icon: Crown, color: "text-yellow-400", delay: 1 },
  { icon: Sparkles, color: "text-purple-400", delay: 1.5 },
];

export function HeroSection({
  userArchetype,
  slotsRemaining,
  countdown,
  onStartAssessment,
  onWatchDemo,
  onShowDashboard,
  onStartWalkthrough,
}: HeroSectionProps) {
  const { playSound } = useSound();

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-blue-500/10 transition-all duration-1000"></div>
        
        {/* Floating Elements */}
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className={`absolute ${element.color}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -30, 0]
            }}
            transition={{
              duration: 4,
              delay: element.delay,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              left: `${20 + index * 20}%`,
              top: `${30 + index * 15}%`,
            }}
          >
            <element.icon className="h-8 w-8" />
          </motion.div>
        ))}
        
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center text-center text-white">
        {/* Logo with Enhanced Animation */}
        <motion.div
          className="mb-8 relative"
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
        >
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-orange-400/20 to-blue-400/20 rounded-2xl blur-xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <div className="h-32 flex items-center justify-center bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent text-4xl font-bold relative z-10">
            OPTIMUS AUTO AI
          </div>
        </motion.div>

        {/* Main Headline with Staggered Animation */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.h1
            className="text-4xl md:text-7xl font-bold mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-blue-400 bg-clip-text text-transparent">
              The World's First BOSaaS
            </span>
          </motion.h1>
          
          <motion.div
            className="text-2xl md:text-4xl text-white mb-2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            Business Operating System as a Service
          </motion.div>
          
          {/* Credibility Badges */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <Badge className="bg-green-500/20 text-green-400 px-4 py-2 border border-green-400/30">
              <CheckCircle className="h-4 w-4 mr-2" />
              12 Months Development
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-400 px-4 py-2 border border-blue-400/30">
              <Trophy className="h-4 w-4 mr-2" />
              Patent Pending Technology
            </Badge>
            <Badge className="bg-purple-500/20 text-purple-400 px-4 py-2 border border-purple-400/30">
              <Sparkles className="h-4 w-4 mr-2" />
              Enterprise Grade Security
            </Badge>
          </motion.div>
        </motion.div>

        {/* Value Proposition */}
        <motion.p
          className="text-xl md:text-2xl mb-8 max-w-4xl text-gray-300 leading-relaxed"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          Why pay <span className="text-red-400 font-semibold line-through">$50K+/month</span> for a full business team when{" "}
          <span className="text-orange-400 font-semibold bg-orange-400/10 px-2 py-1 rounded">
            our AI does it all for $97/month?
          </span>
          <br />
          Complete business infrastructure. Dedicated teams included. Marketing automation. Sales systems.
          <br />
          <span className="text-blue-400 font-semibold bg-blue-400/10 px-2 py-1 rounded">
            Your entire empire built today
          </span>{" "}
          - not just tools, but your complete business operating system.
        </motion.p>

        {/* Development Story Card */}
        <motion.div
          className="bg-black/30 backdrop-blur-xl rounded-2xl p-8 mb-8 border border-orange-400/30 max-w-4xl relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-blue-500/20"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="h-8 w-8 text-orange-400" />
              <div>
                <div className="text-orange-400 font-semibold text-lg">
                  12 MONTHS OF DEVELOPMENT
                </div>
                <div className="text-gray-300 text-sm">
                  From Vision to Reality
                </div>
              </div>
            </div>

            <div className="space-y-4 text-gray-200">
              <p className="text-lg leading-relaxed">
                <span className="text-orange-400 font-semibold">
                  "It took me over a year to create this product."
                </span>
                Every line of code, every algorithm, every business intelligence feature you see was
                meticulously crafted to replace the expensive teams that cost businesses $50K+ per month.
              </p>

              <p className="text-base leading-relaxed">
                While others were building simple tools, we were engineering the world's first
                <span className="text-blue-400 font-semibold"> Business Operating System as a Service (BOSaaS)</span>
                . This isn't just automation - it's complete business infrastructure that thinks, learns, and
                executes like your best team members.
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <Badge className="bg-green-500/20 text-green-400 px-4 py-2">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Campaign Ready
                </Badge>
                <div className="text-sm text-gray-400">
                  Timer paused for final campaign deployment • {slotsRemaining} exclusive beta positions reserved
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* User Status Card */}
        {userArchetype && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-400/50 max-w-2xl mx-auto relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-blue-400/10"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <CardContent className="p-6 text-center relative z-10">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Crown className="h-8 w-8 text-green-400" />
                  <span className="text-2xl font-bold text-white">
                    Welcome Back, {userArchetype.type}!
                  </span>
                </div>
                <p className="text-gray-300 mb-4">
                  Your personalized empire strategy is ready. Access your custom dashboard with
                  pre-configured {userArchetype.type} settings.
                </p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <Badge className="bg-green-500/30 text-green-300 px-4 py-2">
                    🎯 Strategic Profile: Active
                  </Badge>
                  <Button
                    size="sm"
                    onClick={() => {
                      playSound('tick');
                      onShowDashboard();
                    }}
                    onMouseEnter={() => playSound('tick')}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    Access Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.7 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className={
                userArchetype
                  ? "bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg shadow-2xl shadow-green-500/25"
                  : "bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg shadow-2xl shadow-orange-500/25"
              }
              onClick={() => {
                playSound('tick');
                onStartAssessment();
              }}
              onMouseEnter={() => playSound('tick')}
            >
              {userArchetype ? "Retake Empire Assessment" : "Start Your Empire Assessment"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 text-lg border-0 shadow-2xl shadow-blue-500/25"
              onClick={() => {
                playSound('tick');
                onWatchDemo();
              }}
              onMouseEnter={() => playSound('tick')}
            >
              Watch Demo Video
              <Zap className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>

          {onStartWalkthrough && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-orange-400/50 text-orange-400 hover:bg-orange-400/10 hover:border-orange-400 px-8 py-4 text-lg shadow-2xl shadow-orange-500/10"
                onClick={() => {
                  playSound('tick');
                  onStartWalkthrough();
                }}
                onMouseEnter={() => playSound('tick')}
              >
                🏰 Site Tour
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Social Proof Ticker */}
        <motion.div
          className="mt-12 max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Live Demo Requests: 247 today</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>Active Empire Builders: 1,340+</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                <span>Revenue Generated: $2.8M+ this month</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}