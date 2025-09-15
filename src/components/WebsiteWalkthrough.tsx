import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from './SoundManager';
import { 
  X,
  ArrowLeft,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  Star,
  Crown,
  Rocket,
  Target,
  Users,
  BarChart3,
  Zap,
  Shield,
  Trophy,
  Lightbulb,
  Heart,
  Gift,
  Calendar,
  Phone,
  Mail,
  Settings,
  Sparkles,
  ChevronDown,
  MousePointer2,
  Eye,
  Navigation,
  Volume2,
  VolumeX
} from 'lucide-react';

interface WalkthroughStep {
  id: string;
  title: string;
  description: string;
  element: string; // CSS selector or element ID
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  content: {
    heading: string;
    text: string;
    tips?: string[];
    highlight?: string;
  };
  duration: number;
  action?: string;
}

const walkthroughSteps: WalkthroughStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Optimus Auto AI',
    description: 'Your journey to building a Business Empire starts here',
    element: '#hero-section',
    position: 'center',
    content: {
      heading: '👋 Hi there! I\'m Valerie, your personal guide',
      text: '*Speaking softly* Welcome to something truly special! I\'m so excited to be your guide today. This amazing platform can actually replace those expensive teams that cost $50K+ every month with AI that never sleeps. I\'ll walk you through everything step by step, nice and easy.',
      highlight: 'Save $50K+/month in team costs',
      tips: [
        'Over 42+ integrated business apps',
        'AI-powered automation for everything',
        'No coding skills required'
      ]
    },
    duration: 30000
  },
  {
    id: 'brand-assessment',
    title: 'Strategic Brand Assessment',
    description: 'Discover your business archetype for personalized recommendations',
    element: '#hero-section .bg-orange-500',
    position: 'bottom',
    content: {
      heading: '💭 Let\'s discover your unique business style',
      text: '*Leaning in with a warm smile* Oh, I absolutely love this part! This sweet little 5-question assessment is like having a heart-to-heart chat about your business dreams. It helps me understand exactly what type of leader you are, so I can show you the perfect path to build your empire. It\'s always so revealing!',
      highlight: 'Get instant personalized strategy',
      tips: [
        'Takes only 2 minutes to complete',
        'Generates downloadable brand guide',
        'Unlocks personalized dashboard'
      ]
    },
    duration: 25000
  },
  {
    id: 'demo-section',
    title: 'Live Empire Building Demo',
    description: 'Watch your empire build itself in real-time',
    element: '#demo-section',
    position: 'top',
    content: {
      heading: '✨ This is where the magic happens!',
      text: '*Eyes lighting up with excitement* Oh my goodness, this is my favorite part to show people! Watch this beautiful demonstration - it\'s like watching your business dreams come to life right before your eyes. See how everything flows together so perfectly? Leads come in, emails go out, sales happen... all while you\'re doing whatever makes you happy!',
      highlight: 'Real-time automation showcase',
      tips: [
        'Lead capture → Email sequences → Sales automation',
        'All metrics update in real-time',
        'Same system you get access to'
      ]
    },
    duration: 28000
  },
  {
    id: 'app-showcase',
    title: 'App Creation Showcase',
    description: 'Build profitable apps like these for websites and app stores',
    element: '.bg-gradient-to-br.from-slate-800',
    position: 'top',
    content: {
      heading: '🎨 Create beautiful apps that actually make money',
      text: 'Here\'s something really special! You can create stunning professional apps - not just for your own website, but also publish them to app stores or sell them to clients. I\'ve seen people make incredible income streams this way. Each app project can bring in $2,500 or more!',
      highlight: '$10K+ monthly potential',
      tips: [
        'Deploy to your website instantly',
        'Publish to iOS/Android app stores',
        'Sell custom apps to clients for $2,500+'
      ]
    },
    duration: 25000
  },
  {
    id: 'business-infrastructure',
    title: 'Complete Business Infrastructure',
    description: 'Everything you need to run a business, integrated and automated',
    element: '#apps-overview-section',
    position: 'top',
    content: {
      heading: '🏢 Your entire business, beautifully organized',
      text: 'This is truly remarkable! Instead of juggling dozens of different tools and hiring expensive teams, everything you need is right here. Your CRM talks to your marketing, which talks to your sales system, which talks to your analytics. It\'s like having a perfectly orchestrated business symphony.',
      highlight: 'Replaces $25K+/month in team costs',
      tips: [
        '42+ business apps included',
        'All systems communicate with each other',
        'New apps added monthly'
      ]
    },
    duration: 28000
  },
  {
    id: 'pricing',
    title: 'Revolutionary Pricing',
    description: 'Pay 90% less than hiring teams while getting superior results',
    element: '#pricing-section',
    position: 'top',
    content: {
      heading: '💝 Pricing that actually makes sense',
      text: 'I get so excited talking about this! Most businesses spend $50K+ monthly on teams that work 40 hours a week. Our highest tier? Just $6,597/month for AI that never sleeps, never calls in sick, and never asks for a raise. The math is pretty amazing when you think about it.',
      highlight: 'Save over $40K monthly',
      tips: [
        'Beta pricing: $97/month for 42+ apps',
        'No hidden fees or surprises',
        'Cancel anytime (but you won\'t want to)'
      ]
    },
    duration: 30000
  },
  {
    id: 'testimonials',
    title: 'Success Stories',
    description: 'Real results from real empire builders',
    element: '#testimonials-section',
    position: 'top',
    content: {
      heading: '💫 Stories that warm my heart',
      text: 'This section always makes me smile! These are real people, just like you, who took the leap and transformed their businesses. Their success stories inspire me every day, and I love seeing how different people use the platform in creative ways to build their empires.',
      highlight: 'Average 340% ROI increase',
      tips: [
        'Real testimonials from active users',
        'Documented revenue increases',
        'Diverse industry success stories'
      ]
    },
    duration: 25000
  },
  {
    id: 'contact',
    title: 'Get Started Today',
    description: 'Book your executive consultation and begin your empire',
    element: '#contact-section',
    position: 'top',
    content: {
      heading: '🤝 Ready to begin your empire journey?',
      text: 'Well, we\'ve reached the end of our tour together! I hope you\'re as excited as I am about the possibilities. Whether you want to book a consultation, take that brand assessment we talked about, or just reach out with questions, we\'re here to help you succeed.',
      highlight: 'Only 12 beta slots remaining',
      tips: [
        'Direct contact: Team@optimusautoai.com',
        'Phone: 918-293-3352',
        'Executive consultation available'
      ]
    },
    duration: 30000
  }
];

interface WebsiteWalkthroughProps {
  isVisible: boolean;
  onClose: () => void;
}

export function WebsiteWalkthrough({ isVisible, onClose }: WebsiteWalkthroughProps) {
  const { playSound } = useSound();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);

  // Auto-advance through steps - much slower pace
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && hasStarted) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            if (currentStep < walkthroughSteps.length - 1) {
              setCurrentStep(prev => prev + 1);
              // Soft monotone sound - no harsh chimes
              if (audioEnabled) {
                playSound('tick');
              }
              
              // Gentle scroll to element
              const element = document.querySelector(walkthroughSteps[currentStep + 1]?.element);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            } else {
              setIsPlaying(false);
              // Gentle completion sound
              if (audioEnabled) {
                playSound('tick');
              }
            }
            return 0;
          }
          // Much slower progress - 800ms intervals instead of 200ms
          return prev + (100 / (walkthroughSteps[currentStep]?.duration / 800));
        });
      }, 200); // Slower update frequency
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentStep, hasStarted, playSound, audioEnabled]);

  // Handle start walkthrough - gentle start sound
  const handleStart = () => {
    setHasStarted(true);
    setIsPlaying(true);
    setCurrentStep(0);
    setProgress(0);
    
    // Soft start sound
    if (audioEnabled) {
      playSound('tick');
    }
    
    // Auto-scroll to top of page first, then to first element
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    setTimeout(() => {
      const element = document.querySelector(walkthroughSteps[0]?.element);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 500);
  };

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    // Gentle click sound only
    if (audioEnabled) {
      playSound('tick');
    }
  };

  const handleNext = () => {
    if (currentStep < walkthroughSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setProgress(0);
      // Gentle transition sound
      if (audioEnabled) {
        playSound('tick');
      }
      
      // Scroll to element
      const element = document.querySelector(walkthroughSteps[currentStep + 1]?.element);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setProgress(0);
      // Gentle transition sound
      if (audioEnabled) {
        playSound('tick');
      }
      
      // Scroll to element
      const element = document.querySelector(walkthroughSteps[currentStep - 1]?.element);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setProgress(0);
    setIsPlaying(false);
    setHasStarted(false);
    // Gentle reset sound
    if (audioEnabled) {
      playSound('tick');
    }
  };

  const handleClose = () => {
    // Gentle close sound
    if (audioEnabled) {
      playSound('tick');
    }
    onClose();
  };

  if (!isVisible) return null;

  const currentStepData = walkthroughSteps[currentStep];

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <AnimatePresence>
        {/* Walkthrough Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed top-4 left-4 right-4 md:left-auto md:right-8 md:w-96 z-60 pointer-events-auto"
        >
          <Card className="bg-gradient-to-br from-slate-800/98 to-slate-900/98 backdrop-blur-xl border-orange-400/40 shadow-2xl">
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <motion.div 
                    className="w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      boxShadow: ['0 0 0 0 rgba(255, 107, 53, 0.4)', '0 0 0 8px rgba(255, 107, 53, 0)', '0 0 0 0 rgba(255, 107, 53, 0)']
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: 'loop'
                    }}
                  >
                    <span className="text-white text-sm font-bold">V</span>
                  </motion.div>
                  <Badge className="bg-orange-500/20 text-orange-400">
                    Valerie's Tour
                  </Badge>
                </div>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setAudioEnabled(!audioEnabled)}
                    onMouseEnter={() => {
                      if (audioEnabled) playSound('tick');
                    }}
                    className="text-gray-400 hover:text-white"
                  >
                    {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleClose}
                    onMouseEnter={() => {
                      if (audioEnabled) playSound('tick');
                    }}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {!hasStarted ? (
                /* Welcome Screen */
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">V</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Hi! I'm Valerie, your personal guide 👋
                  </h3>
                  <p className="text-gray-300 mb-6">
                    I'm so excited to show you around! I'll walk you through this amazing platform at a comfortable pace, 
                    highlighting all the incredible features that can transform your business. Ready for a gentle, informative tour?
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Heart className="h-4 w-4 text-pink-400" />
                      <span>Gentle, conversational guidance</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Eye className="h-4 w-4 text-blue-400" />
                      <span>Visual highlights as we go</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Settings className="h-4 w-4 text-orange-400" />
                      <span>You control the pace completely</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Target className="h-4 w-4 text-green-400" />
                      <span>8 key areas to explore together</span>
                    </div>
                  </div>
                  <Button
                    onClick={handleStart}
                    onMouseEnter={() => {
                      if (audioEnabled) playSound('tick');
                    }}
                    className="w-full bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white shadow-lg"
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Let's explore together!
                  </Button>
                </div>
              ) : (
                /* Active Walkthrough */
                <>
                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Step {currentStep + 1} of {walkthroughSteps.length}</span>
                      <span>{Math.round((currentStep / (walkthroughSteps.length - 1)) * 100)}%</span>
                    </div>
                    <Progress value={progress + (currentStep * (100 / walkthroughSteps.length))} className="h-2" />
                  </div>

                  {/* Current Step Content */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`step-content-${currentStep}-${currentStepData?.id || 'unknown'}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-white mb-2">
                          {currentStepData?.content.heading}
                        </h3>
                        <p className="text-gray-300 text-sm mb-3">
                          {currentStepData?.content.text}
                        </p>
                        
                        {currentStepData?.content.highlight && (
                          <div className="bg-gradient-to-r from-orange-500/20 to-blue-500/20 border border-orange-400/30 rounded-lg p-3 mb-3">
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-orange-400" />
                              <span className="text-orange-400 font-semibold text-sm">
                                {currentStepData.content.highlight}
                              </span>
                            </div>
                          </div>
                        )}

                        {currentStepData?.content.tips && (
                          <div className="space-y-2">
                            {currentStepData.content.tips.map((tip, index) => (
                              <div key={`tip-${currentStepData.id}-${index}-${currentStep}`} className="flex items-start gap-2 text-xs text-gray-400">
                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                                <span>{tip}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Controls */}
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={currentStep === 0}
                        onMouseEnter={() => {
                          if (audioEnabled) playSound('tick');
                        }}
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={handlePlay}
                        onMouseEnter={() => {
                          if (audioEnabled) playSound('tick');
                        }}
                        className={`${isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
                      >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleNext}
                        disabled={currentStep === walkthroughSteps.length - 1}
                        onMouseEnter={() => {
                          if (audioEnabled) playSound('tick');
                        }}
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleReset}
                        onMouseEnter={() => {
                          if (audioEnabled) playSound('tick');
                        }}
                        className="border-orange-400/50 text-orange-400 hover:bg-orange-500/10"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Completion Message */}
                  {currentStep === walkthroughSteps.length - 1 && !isPlaying && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-4 bg-gradient-to-r from-pink-500/20 to-orange-500/20 border border-pink-400/30 rounded-lg text-center"
                    >
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <motion.div 
                          className="w-6 h-6 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center"
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 2 }}
                        >
                          <span className="text-white text-xs font-bold">V</span>
                        </motion.div>
                        <Heart className="h-5 w-5 text-pink-400" />
                      </div>
                      <div className="text-pink-400 font-semibold text-sm mb-1">
                        🌟 What a wonderful journey!
                      </div>
                      <div className="text-gray-300 text-xs">
                        I hope you enjoyed our tour together. Feel free to explore on your own or start that brand assessment whenever you're ready!
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Gentle Highlight Indicator */}
        {hasStarted && currentStepData && (
          <motion.div
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 pointer-events-none z-40"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="bg-gradient-to-r from-orange-400/80 to-pink-400/80 backdrop-blur-lg rounded-full px-4 py-2 flex items-center gap-2 text-white text-sm shadow-lg">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span>Looking at: {currentStepData.title}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
