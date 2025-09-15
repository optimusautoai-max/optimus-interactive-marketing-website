import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from './SoundManager';
import { 
  Zap, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Mail, 
  ShoppingCart, 
  BarChart3, 
  Settings, 
  CheckCircle,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Target,
  Workflow,
  Brain,
  Activity
} from 'lucide-react';

interface DemoStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  metrics: {
    label: string;
    value: string;
    change: string;
  }[];
}

const demoSteps: DemoStep[] = [
  {
    id: 'lead-capture',
    title: 'Lead Capture',
    description: 'Visitor lands on your website, AI captures their information automatically',
    icon: <Users className="h-6 w-6" />,
    color: 'from-blue-500 to-cyan-500',
    metrics: [
      { label: 'New Leads', value: '847', change: '+23%' },
      { label: 'Conversion Rate', value: '34.2%', change: '+12%' }
    ]
  },
  {
    id: 'email-sequence',
    title: 'Email Automation',
    description: 'AI sends personalized email sequences based on visitor behavior',
    icon: <Mail className="h-6 w-6" />,
    color: 'from-orange-500 to-red-500',
    metrics: [
      { label: 'Emails Sent', value: '12,340', change: '+45%' },
      { label: 'Open Rate', value: '67.8%', change: '+8%' }
    ]
  },
  {
    id: 'sales-process',
    title: 'Sales Automation',
    description: 'Qualified leads automatically enter your sales funnel',
    icon: <ShoppingCart className="h-6 w-6" />,
    color: 'from-green-500 to-emerald-500',
    metrics: [
      { label: 'Sales Made', value: '$47,829', change: '+67%' },
      { label: 'Close Rate', value: '28.4%', change: '+15%' }
    ]
  },
  {
    id: 'analytics',
    title: 'Real-time Analytics',
    description: 'AI analyzes performance and optimizes your entire funnel',
    icon: <BarChart3 className="h-6 w-6" />,
    color: 'from-purple-500 to-pink-500',
    metrics: [
      { label: 'ROI', value: '340%', change: '+89%' },
      { label: 'Profit Margin', value: '73.2%', change: '+21%' }
    ]
  }
];

const notifications = [
  { id: 1, text: "New lead captured: Sarah from Texas", type: "lead" },
  { id: 2, text: "Strategy call completed: 15-min consultation", type: "phone" },
  { id: 3, text: "Multi-channel sequence started for Marcus", type: "sms" },
  { id: 4, text: "Email sequence started for Marcus", type: "email" },
  { id: 5, text: "Communication analytics updated", type: "phone" },
  { id: 6, text: "Sale completed: $297 - Jennifer K.", type: "sale" },
  { id: 7, text: "Calendar booking triggered follow-up", type: "phone" },
  { id: 8, text: "AI optimized conversion rate by 4.2%", type: "optimization" },
  { id: 9, text: "New app deployed: Advanced CRM", type: "system" },
  { id: 10, text: "Monthly revenue goal achieved!", type: "milestone" }
];

interface InteractiveDemoProps {
  onStartWalkthrough?: () => void;
}

export function InteractiveDemo({ onStartWalkthrough }: InteractiveDemoProps) {
  const { playSound } = useSound();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeNotifications, setActiveNotifications] = useState<typeof notifications>([]);
  const [totalRevenue, setTotalRevenue] = useState(24750);
  const [activeUsers, setActiveUsers] = useState(1247);
  const [activeButtons, setActiveButtons] = useState<string[]>([]);

  // Effect to light up buttons based on current step
  useEffect(() => {
    const stepButtonMap: { [key: number]: string[] } = {
      0: ['lead-capture'], // Lead Capture step
      1: ['lead-capture', 'email-automation'], // Email Automation step  
      2: ['lead-capture', 'email-automation', 'sales-automation'], // Sales Automation step
      3: ['lead-capture', 'email-automation', 'sales-automation', 'real-time-analytics'] // Analytics step
    };
    
    setActiveButtons(stepButtonMap[currentStep] || []);
  }, [currentStep]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            const nextStep = (currentStep + 1) % demoSteps.length;
            setCurrentStep(nextStep);
            
            // Play step completion sound
            playSound('chime');
            
            // Add notification
            const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
            setActiveNotifications(prev => [
              { ...randomNotification, id: Date.now() },
              ...prev.slice(0, 2)
            ]);
            
            // Update metrics
            setTotalRevenue(prev => prev + Math.floor(Math.random() * 500) + 100);
            setActiveUsers(prev => prev + Math.floor(Math.random() * 10) + 1);
            
            return 0;
          }
          return prev + 2;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentStep, playSound]);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    playSound(isPlaying ? 'buttonClick' : 'success');
  };

  const handleReset = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentStep(0);
    setActiveNotifications([]);
    setTotalRevenue(24750);
    setActiveUsers(1247);
    setActiveButtons([]);
    playSound('whoosh');
  };

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    setProgress(0);
  };

  return (
    <div className="space-y-8">
      {/* Demo Controls */}
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <Button
          onClick={handlePlay}
          onMouseEnter={() => playSound('buttonHover')}
          className={`${isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
        >
          {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
          {isPlaying ? 'Pause Demo' : 'Start Demo'}
        </Button>
        <Button 
          onClick={handleReset} 
          onMouseEnter={() => playSound('buttonHover')}
          className="bg-gradient-to-r from-orange-500/20 to-blue-500/20 border border-orange-400/50 text-orange-400 hover:bg-gradient-to-r hover:from-orange-500/30 hover:to-blue-500/30 hover:border-orange-400/70 transition-all duration-300"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
        {onStartWalkthrough && (
          <Button 
            onClick={() => {
              playSound('achievement');
              onStartWalkthrough();
            }}
            onMouseEnter={() => playSound('buttonHover')}
            className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/50 text-blue-400 hover:bg-gradient-to-r hover:from-blue-500/30 hover:to-purple-500/30 hover:border-blue-400/70 transition-all duration-300"
          >
            <Workflow className="mr-2 h-4 w-4" />
            Website Walkthrough
          </Button>
        )}
      </div>

      {/* Automation Status Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { id: 'lead-capture', label: 'Lead Capture', icon: Target, color: 'from-blue-500 to-cyan-500' },
          { id: 'email-automation', label: 'Email Automation', icon: Mail, color: 'from-orange-500 to-red-500' },
          { id: 'sales-automation', label: 'Sales Automation', icon: ShoppingCart, color: 'from-green-500 to-emerald-500' },
          { id: 'real-time-analytics', label: 'Real-time Analytics', icon: BarChart3, color: 'from-purple-500 to-pink-500' }
        ].map((automation) => (
          <motion.div
            key={automation.id}
            animate={{ 
              scale: activeButtons.includes(automation.id) ? [1, 1.05, 1] : 1,
              boxShadow: activeButtons.includes(automation.id) 
                ? '0 0 30px rgba(255, 107, 53, 0.4)' 
                : '0 0 0px rgba(255, 107, 53, 0)'
            }}
            transition={{ duration: 0.3, repeat: activeButtons.includes(automation.id) ? Infinity : 0, repeatType: 'loop' }}
          >
            <Card className={`
              ${activeButtons.includes(automation.id) 
                ? `bg-gradient-to-r ${automation.color}/30 border-2 border-orange-400/70 shadow-lg shadow-orange-400/20` 
                : `bg-gradient-to-r ${automation.color}/10 border-gray-400/30`
              } 
              transition-all duration-500 cursor-pointer hover:scale-105
            `}>
              <CardContent className="p-4 text-center">
                <div className={`flex justify-center mb-2 ${activeButtons.includes(automation.id) ? 'text-orange-400' : 'text-gray-400'} transition-colors duration-300`}>
                  <automation.icon className="h-6 w-6" />
                </div>
                <div className={`text-sm font-medium ${activeButtons.includes(automation.id) ? 'text-white' : 'text-gray-300'} transition-colors duration-300`}>
                  {automation.label}
                </div>
                {activeButtons.includes(automation.id) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2"
                  >
                    <Badge className="bg-green-500/20 text-green-400 text-xs">
                      ✨ ACTIVE
                    </Badge>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Live Metrics Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <motion.div
          key={totalRevenue}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/50">
            <CardContent className="p-4 text-center">
              <DollarSign className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">${totalRevenue.toLocaleString()}</div>
              <div className="text-sm text-green-400">Revenue Today</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          key={activeUsers}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-400/50">
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{activeUsers.toLocaleString()}</div>
              <div className="text-sm text-blue-400">Active Users</div>
            </CardContent>
          </Card>
        </motion.div>

        <Card className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-400/50">
          <CardContent className="p-4 text-center">
            <Zap className="h-6 w-6 text-orange-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">42</div>
            <div className="text-sm text-orange-400">Apps Running</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/50">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">340%</div>
            <div className="text-sm text-purple-400">ROI Growth</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Process Visualization */}
        <div className="lg:col-span-2">
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Empire Building Process
              </h3>
              
              {/* Step Progress */}
              <div className="flex justify-between mb-8">
                {demoSteps.map((step, index) => (
                  <div
                    key={step.id}
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => handleStepClick(index)}
                  >
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300
                      ${index === currentStep 
                        ? `bg-gradient-to-r ${step.color} scale-110` 
                        : index < currentStep 
                          ? 'bg-green-500' 
                          : 'bg-gray-600'
                      }
                    `}>
                      {index < currentStep ? (
                        <CheckCircle className="h-6 w-6 text-white" />
                      ) : (
                        <div className="text-white">{step.icon}</div>
                      )}
                    </div>
                    <div className="text-xs text-center text-gray-300 max-w-16">
                      {step.title}
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <Progress value={progress + (currentStep * 25)} className="h-2" />
              </div>

              {/* Current Step Details */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${demoSteps[currentStep].color} mb-4`}>
                    {demoSteps[currentStep].icon}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    {demoSteps[currentStep].title}
                  </h4>
                  <p className="text-gray-300 mb-6">
                    {demoSteps[currentStep].description}
                  </p>
                  
                  {/* Step Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    {demoSteps[currentStep].metrics.map((metric, index) => (
                      <div key={index} className="bg-white/10 rounded-lg p-3">
                        <div className="text-sm text-gray-400">{metric.label}</div>
                        <div className="text-lg font-bold text-white">{metric.value}</div>
                        <div className="text-sm text-green-400">{metric.change}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>

        {/* Live Activity Feed */}
        <div>
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 h-full">
            <CardContent className="p-6">
              <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                Live Activity
              </h4>
              
              <div className="space-y-3">
                <AnimatePresence>
                  {activeNotifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: 20, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -20, scale: 0.9 }}
                      className="flex items-center gap-3 p-3 bg-white/10 rounded-lg"
                    >
                      <div className={`w-2 h-2 rounded-full ${
                        notification.type === 'lead' ? 'bg-blue-400' :
                        notification.type === 'phone' ? 'bg-pink-400' :
                        notification.type === 'sms' ? 'bg-indigo-400' :
                        notification.type === 'email' ? 'bg-orange-400' :
                        notification.type === 'sale' ? 'bg-green-400' :
                        notification.type === 'optimization' ? 'bg-purple-400' :
                        notification.type === 'system' ? 'bg-cyan-400' :
                        'bg-yellow-400'
                      }`}></div>
                      <span className="text-sm text-white flex-1">
                        {notification.text}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {activeNotifications.length === 0 && (
                  <div className="text-center text-gray-400 py-8">
                    <Settings className="h-8 w-8 mx-auto mb-2 animate-spin" />
                    <div>System ready. Start demo to see live activity.</div>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="text-center">
                  <Badge className="bg-green-500/20 text-green-400 mb-3">
                    All Systems Operational
                  </Badge>
                  <div className="text-sm text-gray-400">
                    42 apps working 24/7 to build your empire
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <Card className="bg-gradient-to-r from-orange-500/20 to-blue-500/20 border-orange-400/50">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Build Your Automated Empire?
            </h3>
            <p className="text-gray-300 mb-6">
              This is just a small preview. The real platform has 42+ apps working together 
              to create multiple income streams automatically.
            </p>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
              Start Your Empire Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
