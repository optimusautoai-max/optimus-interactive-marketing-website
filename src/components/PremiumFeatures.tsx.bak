import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Crown, Star, Zap, Trophy, Diamond, Shield, 
  Sparkles, Eye, Brain, Rocket, Target, Globe,
  TrendingUp, BarChart3, Users, DollarSign,
  CheckCircle, ArrowRight, Clock, Award
} from 'lucide-react';

const premiumFeatures = [
  {
    icon: <Crown className="h-8 w-8" />,
    title: "AI Empire Architect",
    description: "Advanced AI algorithms design your complete business empire architecture automatically",
    color: "from-yellow-400 to-orange-400",
    value: "$50K+ Value",
    details: "Our proprietary AI analyzes 50+ market variables, competitive landscapes, and growth opportunities to architect your complete business empire. Includes automated business model optimization, revenue stream identification, market positioning strategy, and scalable infrastructure design that adapts as your empire grows."
  },
  {
    icon: <Brain className="h-8 w-8" />,
    title: "Strategic Intelligence Engine",
    description: "Real-time market analysis and competitive intelligence powered by machine learning",
    color: "from-purple-400 to-pink-400",
    value: "$25K+ Value",
    details: "Advanced machine learning algorithms continuously monitor market trends, competitor activities, and consumer behavior patterns. Provides predictive analytics, opportunity identification, risk assessment, and strategic recommendations that update in real-time to keep your empire ahead of market shifts."
  },
  {
    icon: <Diamond className="h-8 w-8" />,
    title: "Premium White-Glove Setup",
    description: "Personal onboarding with our executive team and custom empire configuration",
    color: "from-blue-400 to-cyan-400",
    value: "$15K+ Value",
    details: "Dedicated onboarding specialist works with you for 2-4 weeks to configure your empire exactly to your specifications. Includes brand integration, custom workflow setup, team training, technical integration, and personalized strategy sessions to ensure optimal launch and ongoing success."
  },
  {
    icon: <Rocket className="h-8 w-8" />,
    title: "Velocity Optimization System",
    description: "Automated performance optimization that increases ROI by 300%+ on average",
    color: "from-green-400 to-teal-400",
    value: "$100K+ Value",
    details: "Continuously optimizes every aspect of your business operations using AI-driven performance analytics. Automatically adjusts marketing campaigns, sales funnels, pricing strategies, and resource allocation to maximize ROI. Includes A/B testing automation, conversion optimization, and performance forecasting."
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Enterprise Security Suite",
    description: "Military-grade security protocols protecting your business data and operations",
    color: "from-red-400 to-pink-400",
    value: "$30K+ Value",
    details: "Bank-level encryption, multi-factor authentication, advanced threat detection, and 24/7 security monitoring. Includes compliance frameworks (SOC 2, GDPR, HIPAA), automated backup systems, disaster recovery protocols, and dedicated security team support to protect your empire's most valuable assets."
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: "Global Expansion Toolkit",
    description: "Multi-currency, multi-language, multi-market expansion capabilities built-in",
    color: "from-indigo-400 to-purple-400",
    value: "$75K+ Value",
    details: "Complete international expansion infrastructure including automated currency conversion, multi-language content management, regional compliance handling, local payment processing, and cultural adaptation algorithms. Enables rapid expansion into 190+ countries with minimal manual intervention."
  }
];

const liveStats = [
  { label: "Active Empires", value: 847, icon: <Crown className="h-5 w-5" />, color: "text-yellow-400" },
  { label: "Revenue Generated", value: "$24.7M", icon: <DollarSign className="h-5 w-5" />, color: "text-green-400" },
  { label: "Apps Deployed", value: "35,642", icon: <Rocket className="h-5 w-5" />, color: "text-blue-400" },
  { label: "Success Rate", value: "98.7%", icon: <Trophy className="h-5 w-5" />, color: "text-orange-400" }
];

const testimonialRotation = [
  {
    quote: "This platform generated $2.4M in the first 6 months. The AI literally thinks faster than my entire team.",
    author: "Alexandra Chen",
    role: "Serial Entrepreneur",
    result: "$2.4M Generated"
  },
  {
    quote: "I went from 80-hour weeks to 4-hour workdays. The AI handles everything while I focus on strategy.",
    author: "Marcus Williams", 
    role: "Tech CEO",
    result: "80% Time Reduction"
  },
  {
    quote: "ROI hit 450% in month 3. This isn't just automation - it's business multiplication.",
    author: "Sarah Rodriguez",
    role: "Investment Firm Owner", 
    result: "450% ROI"
  }
];

export function PremiumFeatures() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [stats, setStats] = useState(liveStats);
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);

  useEffect(() => {
    // Rotate testimonials
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonialRotation.length);
    }, 5000);

    // Update live stats
    const statsInterval = setInterval(() => {
      setStats(prev => prev.map(stat => {
        if (stat.label === "Active Empires") {
          return { ...stat, value: stat.value + Math.floor(Math.random() * 3) };
        }
        if (stat.label === "Apps Deployed") {
          const currentValue = parseInt(stat.value.replace(',', ''));
          return { ...stat, value: (currentValue + Math.floor(Math.random() * 10) + 5).toLocaleString() };
        }
        return stat;
      }));
    }, 3000);

    return () => {
      clearInterval(testimonialInterval);
      clearInterval(statsInterval);
    };
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 px-6 py-3 mb-6 border border-yellow-400/30">
            <Diamond className="h-5 w-5 mr-2" />
            Premium Enterprise Features
          </Badge>
          
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              10-Figure
            </span>
            <br />
            <span className="text-white">Strategist Technology</span>
          </h2>
          
          <p className="text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            The same advanced AI infrastructure used by Fortune 500 companies, 
            now available to ambitious entrepreneurs ready to build empires.
          </p>
        </motion.div>

        {/* Live Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:border-white/20 transition-all duration-300">
                <CardContent className="p-6">
                  <div className={`${stat.color} mb-3 flex justify-center`}>
                    {stat.icon}
                  </div>
                  <motion.div 
                    key={stat.value}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-2xl font-bold text-white mb-1"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Premium Features Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {premiumFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className={`h-full bg-white/5 backdrop-blur-xl border-white/10 hover:border-white/20 transition-all duration-500 group-hover:shadow-2xl ${
                expandedFeature === index ? 'ring-2 ring-orange-400/50' : ''
              }`}>
                <CardContent className="p-8">
                  <div className="relative mb-6">
                    <div className={`h-16 w-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    <Badge className="absolute -top-2 -right-2 bg-green-500/20 text-green-400 text-xs">
                      {feature.value}
                    </Badge>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-200 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <AnimatePresence>
                    {expandedFeature === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-white/10 pt-4 mb-6">
                          <p className="text-gray-200 text-sm leading-relaxed">
                            {feature.details}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <Button
                    variant="ghost"
                    onClick={() => setExpandedFeature(expandedFeature === index ? null : index)}
                    className="flex items-center text-orange-400 font-medium hover:text-blue-400 transition-colors p-0 h-auto"
                  >
                    <span>{expandedFeature === index ? 'Show Less' : 'Learn More'}</span>
                    <ArrowRight className={`h-4 w-4 ml-2 transition-transform ${
                      expandedFeature === index ? 'rotate-90' : 'group-hover:translate-x-2'
                    }`} />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Rotating Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-gradient-to-r from-orange-500/10 via-purple-500/10 to-blue-500/10 border-orange-400/30 backdrop-blur-xl">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <blockquote className="text-2xl md:text-3xl text-white mb-8 leading-relaxed">
                    "{testimonialRotation[currentTestimonial].quote}"
                  </blockquote>
                  
                  <div className="flex items-center justify-center gap-4">
                    <div>
                      <div className="font-bold text-orange-400 text-lg">
                        {testimonialRotation[currentTestimonial].author}
                      </div>
                      <div className="text-gray-300">
                        {testimonialRotation[currentTestimonial].role}
                      </div>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400">
                      {testimonialRotation[currentTestimonial].result}
                    </Badge>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Testimonial Indicators */}
              <div className="flex justify-center gap-2 mt-8">
                {testimonialRotation.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentTestimonial 
                        ? 'bg-orange-400' 
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-2xl p-8 md:p-12 border border-orange-400/30 backdrop-blur-xl max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready for 10-Figure Empire Technology?
            </h3>
            
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto font-medium">
              Join the exclusive group of entrepreneurs using advanced AI to build 
              business empires that generate millions while they sleep.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg">
                <Crown className="mr-2 h-6 w-6" />
                Claim Your Empire
              </Button>
              
              <Button variant="outline" className="border-orange-400/50 text-orange-200 hover:bg-orange-500/20 hover:text-orange-100 px-8 py-4 text-lg font-semibold">
                <Clock className="mr-2 h-6 w-6" />
                Schedule Strategy Call
              </Button>
            </div>
            
            <div className="mt-6 flex items-center justify-center gap-4 text-green-400">
              <CheckCircle className="h-5 w-5" />
              <span className="font-semibold">48-Hour Implementation Guarantee</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}