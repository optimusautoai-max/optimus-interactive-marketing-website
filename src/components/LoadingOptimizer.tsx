import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { 
  Zap, 
  CheckCircle, 
  Crown,
  Sparkles,
  TrendingUp,
  Shield,
  Rocket
} from "lucide-react";
import optimusLogo from "figma:asset/4101bd8920ce09aecc73a8ec1b5a69c8c3327fa2.png";

const loadingSteps = [
  { label: "Initializing AI Empire Systems", icon: Zap, duration: 800 },
  { label: "Loading 42+ Business Applications", icon: Rocket, duration: 1200 },
  { label: "Configuring Premium Features", icon: Crown, duration: 900 },
  { label: "Preparing Your Dashboard", icon: TrendingUp, duration: 700 },
  { label: "Securing Enterprise Infrastructure", icon: Shield, duration: 600 },
  { label: "Finalizing Setup", icon: Sparkles, duration: 500 }
];

const inspirationalMessages = [
  "Every empire starts with a single decision...",
  "While you wait, 1,340+ entrepreneurs are building their empires",
  "The average person works 40 years to build wealth. Smart entrepreneurs do it in 40 months.",
  "Your competition is still hiring expensive teams. You're about to replace them with AI.",
  "In the time it takes to load this page, our AI makes 847 optimizations to user experiences."
];

interface LoadingOptimizerProps {
  isVisible: boolean;
  onComplete: () => void;
}

export function LoadingOptimizer({ isVisible, onComplete }: LoadingOptimizerProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    // Reduced loading time for better UX - complete in ~2 seconds
    let stepTimer: NodeJS.Timeout;
    let progressTimer: NodeJS.Timeout;
    let messageTimer: NodeJS.Timeout;

    const executeStep = (stepIndex: number) => {
      if (stepIndex >= loadingSteps.length) {
        setProgress(100);
        setTimeout(onComplete, 300);
        return;
      }

      const step = loadingSteps[stepIndex];
      setCurrentStep(stepIndex);
      setStepProgress(0);

      // Faster step duration for quicker loading
      const stepDuration = Math.min(step.duration, 350); // Max 350ms per step
      const progressInterval = 30;
      const progressIncrement = 100 / (stepDuration / progressInterval);

      progressTimer = setInterval(() => {
        setStepProgress(prev => {
          const newProgress = prev + progressIncrement;
          if (newProgress >= 100) {
            clearInterval(progressTimer);
            // Update overall progress
            setProgress((stepIndex + 1) / loadingSteps.length * 100);
            // Move to next step faster
            stepTimer = setTimeout(() => executeStep(stepIndex + 1), 100);
            return 100;
          }
          return newProgress;
        });
      }, progressInterval);
    };

    // Start the loading sequence
    executeStep(0);

    // Rotate inspirational messages faster
    messageTimer = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % inspirationalMessages.length);
    }, 1500);

    return () => {
      clearTimeout(stepTimer);
      clearInterval(progressTimer);
      clearInterval(messageTimer);
    };
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  const currentStepData = loadingSteps[currentStep];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-blue-500/10"></div>
          
          {/* Animated Orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
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
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </div>

        <div className="relative z-10 max-w-2xl w-full mx-auto px-6">
          {/* Logo */}
          <motion.div
            className="text-center mb-12"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="mb-6 relative inline-block"
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-400/30 to-blue-400/30 rounded-2xl blur-xl"></div>
              <img
                src={optimusLogo}
                alt="Optimus Auto AI"
                className="h-24 w-auto relative z-10"
              />
            </motion.div>
            
            <h1 className="text-3xl font-bold text-white mb-2">
              Preparing Your Empire
            </h1>
            <p className="text-gray-300">
              Building your complete business operating system...
            </p>
          </motion.div>

          {/* Main Loading Card */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 mb-8">
            <CardContent className="p-8">
              {/* Current Step */}
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-400 to-blue-400 flex items-center justify-center"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  {currentStepData && (
                    <currentStepData.icon className="h-6 w-6 text-white" />
                  )}
                </motion.div>
                
                <div className="flex-1">
                  <div className="text-white font-semibold mb-2">
                    {currentStepData?.label}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>Step {currentStep + 1} of {loadingSteps.length}</span>
                    <Badge className="bg-green-500/20 text-green-400 px-2 py-1 text-xs">
                      {Math.round(stepProgress)}% Complete
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Step Progress */}
              <div className="mb-6">
                <Progress 
                  value={stepProgress} 
                  className="h-2 bg-gray-700 [&>div]:bg-gradient-to-r [&>div]:from-orange-400 [&>div]:to-blue-400"
                />
              </div>

              {/* Overall Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Overall Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress 
                  value={progress} 
                  className="h-3 bg-gray-700 [&>div]:bg-gradient-to-r [&>div]:from-green-400 [&>div]:to-blue-400"
                />
              </div>

              {/* Steps List */}
              <div className="space-y-3">
                {loadingSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                      index < currentStep 
                        ? 'bg-green-500/20 border border-green-400/30' 
                        : index === currentStep
                        ? 'bg-orange-500/20 border border-orange-400/30'
                        : 'bg-gray-500/10 border border-gray-400/20'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      index < currentStep 
                        ? 'bg-green-400' 
                        : index === currentStep
                        ? 'bg-orange-400'
                        : 'bg-gray-400'
                    }`}>
                      {index < currentStep ? (
                        <CheckCircle className="h-4 w-4 text-white" />
                      ) : (
                        <step.icon className="h-4 w-4 text-white" />
                      )}
                    </div>
                    
                    <span className={`text-sm ${
                      index <= currentStep ? 'text-white' : 'text-gray-400'
                    }`}>
                      {step.label}
                    </span>
                    
                    {index === currentStep && (
                      <motion.div
                        className="ml-auto"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <div className="w-4 h-4 border-2 border-orange-400 border-t-transparent rounded-full"></div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Inspirational Message */}
          <motion.div
            className="text-center"
            key={currentMessage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-gradient-to-r from-orange-500/20 to-blue-500/20 border-orange-400/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Sparkles className="h-5 w-5 text-yellow-400" />
                  <span className="text-yellow-400 font-semibold text-sm">
                    Empire Insight
                  </span>
                </div>
                <p className="text-white text-lg font-medium">
                  {inspirationalMessages[currentMessage]}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            className="grid grid-cols-3 gap-4 mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            {[
              { label: "Apps Loading", value: "42+", color: "text-blue-400" },
              { label: "Active Users", value: "1,340+", color: "text-green-400" },
              { label: "Revenue Generated", value: "$2.8M+", color: "text-orange-400" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
