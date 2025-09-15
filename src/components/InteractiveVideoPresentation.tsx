import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2,
  Maximize2,
  Download,
  Share2,
  BookOpen,
  TrendingUp,
  Users,
  DollarSign,
  Zap,
  Crown,
  Shield,
  Rocket,
  Target,
  CheckCircle,
  ArrowRight,
  Clock,
  Globe,
  Lightbulb,
  Star,
  Award,
  MessageSquare,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from './SoundManager';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface InteractiveVideoPresentationProps {
  onClose?: () => void;
  onStartAssessment?: () => void;
}

interface VideoScene {
  id: string;
  title: string;
  duration: number;
  content: React.ReactNode;
  voiceOver: string;
  backgroundImage?: string;
}

export function InteractiveVideoPresentation({ onClose, onStartAssessment }: InteractiveVideoPresentationProps) {
  const { playSound } = useSound();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showVoiceOver, setShowVoiceOver] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const voiceOverTimeoutRef = useRef<NodeJS.Timeout>();

  const videoScenes: VideoScene[] = [
    {
      id: 'intro',
      title: 'The Problem: Business Teams Cost $50K+/Month',
      duration: 8,
      voiceOver: "Traditional businesses spend $25-50K monthly on core teams - developers, marketers, sales staff, and managers. What if I told you there's a way to get superior results for 90% less cost?",
      backgroundImage: 'expensive business team meeting',
      content: (
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl font-bold text-white mb-6">
              The $50K Problem
            </h1>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Most businesses waste <span className="text-red-400 font-bold">$25,000-$50,000+ monthly</span> 
              on teams that work limited hours, take breaks, and deliver inconsistent results.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            {[
              { role: 'Developers', cost: '$15K/mo', icon: <Target className="h-8 w-8" /> },
              { role: 'Marketing', cost: '$8K/mo', icon: <TrendingUp className="h-8 w-8" /> },
              { role: 'Sales Team', cost: '$12K/mo', icon: <Users className="h-8 w-8" /> },
              { role: 'Management', cost: '$20K/mo', icon: <Crown className="h-8 w-8" /> }
            ].map((team, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + i * 0.2 }}
                className="bg-red-500/20 border border-red-400/50 rounded-xl p-6 text-center"
              >
                <div className="text-red-400 mb-3 flex justify-center">{team.icon}</div>
                <h3 className="font-bold text-white mb-2">{team.role}</h3>
                <div className="text-2xl font-bold text-red-400">{team.cost}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="text-center"
          >
            <div className="text-4xl font-bold text-red-400 mb-4">
              Total: $55,000+ Monthly
            </div>
            <p className="text-gray-300 text-xl">
              Plus benefits, vacation, sick days, and management overhead...
            </p>
          </motion.div>
        </div>
      )
    },
    {
      id: 'solution',
      title: 'The Solution: World\'s First BOSaaS Platform',
      duration: 10,
      voiceOver: "Introducing Optimus Auto AI - the world's first Business Operating System as a Service. We replace your entire team infrastructure with AI that works 24/7, never takes breaks, and delivers consistent results.",
      backgroundImage: 'futuristic AI technology workspace',
      content: (
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
              alt="AI Technology"
              className="w-32 h-32 mx-auto mb-8 rounded-full border-4 border-orange-400"
            />
            <h1 className="text-6xl font-bold text-white mb-6">
              Optimus Auto AI
            </h1>
            <p className="text-3xl text-orange-400 font-bold mb-4">
              World's First BOSaaS Platform
            </p>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Business Operating System as a Service - Replace expensive teams with AI that works 24/7
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {[
              {
                title: 'AI Development Team',
                description: 'Builds apps 24/7 without breaks',
                icon: <Zap className="h-12 w-12" />,
                color: 'blue'
              },
              {
                title: 'Automated Marketing',
                description: 'Campaigns that optimize themselves',
                icon: <Target className="h-12 w-12" />,
                color: 'green'
              },
              {
                title: 'Smart Operations',
                description: 'Complete business automation',
                icon: <Crown className="h-12 w-12" />,
                color: 'purple'
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.5 + i * 0.3 }}
                className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/50 rounded-xl p-8 text-center"
              >
                <div className="text-blue-400 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )
    },
    {
      id: 'cta',
      title: 'Start Your Empire Transformation',
      duration: 8,
      voiceOver: "This is your opportunity to join the BOSaaS revolution. Start with Empire Starter at $97/month, or jump to Business Empire at $2,597/month for complete team replacement. Only 30 beta slots remain at these special prices.",
      backgroundImage: 'business growth success',
      content: (
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl font-bold text-white mb-6">
              Your Empire Awaits
            </h1>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
              Join the BOSaaS revolution and transform your business today
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="bg-gradient-to-r from-orange-500/20 to-blue-500/20 border border-orange-400/50 rounded-xl p-8 max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-400 mb-2">12</div>
                <div className="text-gray-300">Beta Slots Remaining</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">$97/mo</div>
                <div className="text-sm text-gray-400 mb-1">Empire Starter</div>
                <div className="text-lg font-bold text-green-400">$2,597/mo</div>
                <div className="text-xs text-gray-400">Business Empire</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">48h</div>
                <div className="text-gray-300">Time Remaining</div>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                onClick={() => {
                  playSound('achievement');
                  onStartAssessment?.();
                }}
                className="w-full bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600 text-white font-bold py-4 text-xl"
              >
                Start Your Empire Assessment
                <ArrowRight className="h-6 w-6 ml-2" />
              </Button>
              
              <p className="text-gray-400 text-xs opacity-75 hover:opacity-100 transition-opacity cursor-pointer" 
                 onClick={(e) => e.currentTarget.style.display = 'none'}
                 title="Click to dismiss">
                Free strategic assessment • No credit card required • Instant results
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              { icon: <Shield className="h-8 w-8" />, title: '100% ROI Guarantee', desc: '90-day money-back guarantee' },
              { icon: <Crown className="h-8 w-8" />, title: 'White-Glove Setup', desc: 'Complete onboarding included' },
              { icon: <Rocket className="h-8 w-8" />, title: 'Instant Results', desc: 'See improvements in 24-48 hours' }
            ].map((benefit, i) => (
              <div key={i} className="text-center">
                <div className="text-orange-400 mb-3 flex justify-center">{benefit.icon}</div>
                <h3 className="font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      )
    }
  ];

  const currentSceneData = videoScenes[currentScene];
  const totalDuration = videoScenes.reduce((sum, scene) => sum + scene.duration, 0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + (100 / (currentSceneData.duration * 10));
          
          if (newProgress >= 100) {
            // Move to next scene
            if (currentScene < videoScenes.length - 1) {
              setCurrentScene(prev => prev + 1);
              return 0;
            } else {
              setIsPlaying(false);
              return 100;
            }
          }
          
          return newProgress;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentScene, currentSceneData.duration]);

  // Auto-hide voice over after 4 seconds
  useEffect(() => {
    if (showVoiceOver) {
      voiceOverTimeoutRef.current = setTimeout(() => {
        setShowVoiceOver(false);
      }, 4000);
    }

    return () => {
      if (voiceOverTimeoutRef.current) {
        clearTimeout(voiceOverTimeoutRef.current);
      }
    };
  }, [currentScene, showVoiceOver]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    playSound(isPlaying ? 'pause' : 'play');
  };

  const handlePrevScene = () => {
    if (currentScene > 0) {
      setCurrentScene(prev => prev - 1);
      setProgress(0);
      playSound('tick');
    }
  };

  const handleNextScene = () => {
    if (currentScene < videoScenes.length - 1) {
      setCurrentScene(prev => prev + 1);
      setProgress(0);
      playSound('tick');
    }
  };

  const handleSceneSelect = (sceneIndex: number) => {
    setCurrentScene(sceneIndex);
    setProgress(0);
    playSound('tick');
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    playSound('whoosh');
  };

  const handleShare = () => {
    playSound('success');
    if (navigator.share) {
      navigator.share({
        title: 'Optimus Auto AI - Interactive Demo',
        text: 'Check out this amazing BOSaaS platform that replaces expensive teams with AI!',
        url: window.location.href,
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleDownload = () => {
    playSound('success');
    // Simulate download of presentation materials
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'Optimus-Auto-AI-Presentation.pdf';
    link.click();
  };

  return (
    <div 
      ref={containerRef}
      className={`${isFullscreen ? 'fixed inset-0 z-50' : 'relative'} bg-slate-900 transition-all duration-300`}
    >
      {/* Header Controls */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-6">
        <div className="flex justify-between items-center text-white">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:text-orange-400"
            >
              <X className="h-5 w-5" />
            </Button>
            <h2 className="font-semibold">{currentSceneData.title}</h2>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="text-white hover:text-blue-400"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownload}
              className="text-white hover:text-green-400"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="text-white hover:text-purple-400"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative min-h-screen flex items-center justify-center p-8 pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-7xl mx-auto"
          >
            {currentSceneData.content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Voice Over Display */}
      <AnimatePresence>
        {showVoiceOver && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-32 left-1/2 transform -translate-x-1/2 max-w-3xl"
          >
            <Card className="bg-black/80 backdrop-blur-xl border-white/10">
              <CardContent className="p-4">
                <div className="flex items-start gap-3 text-white">
                  <MessageSquare className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                  <p className="text-sm leading-relaxed">{currentSceneData.voiceOver}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowVoiceOver(false)}
                    className="text-gray-400 hover:text-white p-0 h-5 w-5"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-4">
            <Progress value={progress} className="h-2 bg-white/20" />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Scene {currentScene + 1} of {videoScenes.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrevScene}
              disabled={currentScene === 0}
              className="text-white hover:text-orange-400 disabled:opacity-50"
            >
              <SkipBack className="h-5 w-5" />
            </Button>
            
            <Button
              onClick={handlePlayPause}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-full w-12 h-12"
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNextScene}
              disabled={currentScene === videoScenes.length - 1}
              className="text-white hover:text-orange-400 disabled:opacity-50"
            >
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>

          {/* Scene Navigation */}
          <div className="flex justify-center gap-2">
            {videoScenes.map((scene, index) => (
              <Button
                key={scene.id}
                variant="ghost"
                size="sm"
                onClick={() => handleSceneSelect(index)}
                className={`text-xs px-3 py-1 ${
                  index === currentScene 
                    ? 'bg-orange-500 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {index + 1}
              </Button>
            ))}
          </div>

          {/* Voice Over Toggle */}
          <div className="flex justify-center mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowVoiceOver(!showVoiceOver)}
              className="text-gray-400 hover:text-white text-xs"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              {showVoiceOver ? 'Hide' : 'Show'} Voice Over
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
