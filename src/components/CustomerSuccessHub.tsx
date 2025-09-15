import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Trophy, 
  PlayCircle, 
  Star, 
  ArrowUp, 
  Clock,
  Building,
  Target,
  Zap,
  CheckCircle,
  BarChart3,
  Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useSound } from './SoundManager';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CustomerSuccessHubProps {
  onStartAssessment?: () => void;
}

interface CaseStudy {
  id: string;
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    before: string;
    after: string;
    improvement: string;
  }[];
  timeline: string;
  tier: string;
  testimonial: string;
  roi: string;
  imageQuery: string;
}

interface VideoTestimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  tier: string;
  thumbnail: string;
  duration: string;
  preview: string;
}

export function CustomerSuccessHub({ onStartAssessment }: CustomerSuccessHubProps) {
  const { playSound } = useSound();
  const [activeTab, setActiveTab] = useState('case-studies');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<string | null>(null);

  const caseStudies: CaseStudy[] = [
    {
      id: '1',
      company: 'TechFlow Solutions',
      industry: 'SaaS Development',
      challenge: 'Spending $45K/month on development and marketing teams with inconsistent results',
      solution: 'Implemented Business Empire tier with custom BOSaaS configuration',
      results: [
        { metric: 'Monthly Costs', before: '$45,000', after: '$2,597', improvement: '94% reduction' },
        { metric: 'App Development Time', before: '6-8 weeks', after: '2-3 days', improvement: '95% faster' },
        { metric: 'Customer Acquisition', before: '50/month', after: '300/month', improvement: '500% increase' },
        { metric: 'Revenue', before: '$85K/month', after: '$350K/month', improvement: '312% growth' }
      ],
      timeline: '90 days',
      tier: 'Business Empire',
      testimonial: 'Optimus Auto AI didn\'t just replace our teams - it multiplied our capabilities. We\'re now generating 4x the revenue with 20x less overhead.',
      roi: '1,250%',
      imageQuery: 'modern tech startup office success'
    },
    {
      id: '2',
      company: 'Global Retail Corp',
      industry: 'E-commerce',
      challenge: 'Managing 50+ team members across development, marketing, and operations',
      solution: 'Hands-Off Empire with dedicated account management and custom integrations',
      results: [
        { metric: 'Team Size', before: '50 employees', after: '8 core staff', improvement: '84% reduction' },
        { metric: 'Operational Costs', before: '$280K/month', after: '$6,597/month', improvement: '97% savings' },
        { metric: 'Customer Support Response', before: '24 hours', after: '< 1 hour', improvement: '24x faster' },
        { metric: 'Sales Automation', before: '25% automated', after: '95% automated', improvement: '280% boost' }
      ],
      timeline: '120 days',
      tier: 'Hands-Off Empire',
      testimonial: 'We eliminated 42 positions while doubling our output. The ROI is absolutely staggering.',
      roi: '2,100%',
      imageQuery: 'large corporate office automation success'
    },
    {
      id: '3',
      company: 'StartupX',
      industry: 'FinTech',
      challenge: 'Bootstrap startup needed enterprise-level capabilities without enterprise costs',
      solution: 'Started with App Empire, scaled to Business Empire within 6 months',
      results: [
        { metric: 'Development Speed', before: '3 months/feature', after: '1 week/feature', improvement: '12x faster' },
        { metric: 'User Acquisition Cost', before: '$250', after: '$12', improvement: '95% reduction' },
        { metric: 'Monthly Revenue', before: '$8K', after: '$180K', improvement: '2,150% growth' },
        { metric: 'Team Efficiency', before: '6 developers', after: 'AI-powered', improvement: 'Infinite scale' }
      ],
      timeline: '180 days',
      tier: 'Business Empire',
      testimonial: 'As a bootstrap startup, we couldn\'t afford a full team. Optimus Auto AI gave us capabilities that would have cost $500K+ in salaries.',
      roi: '4,500%',
      imageQuery: 'fintech startup success celebration'
    }
  ];

  const videoTestimonials: VideoTestimonial[] = [
    {
      id: '1',
      name: 'Marcus Chen',
      company: 'TechFlow Solutions',
      role: 'CEO',
      tier: 'Business Empire',
      thumbnail: 'professional ceo video call',
      duration: '3:45',
      preview: 'Explains how they replaced a $45K/month team with AI and 4x their revenue'
    },
    {
      id: '2',
      name: 'Sarah Mitchell',
      company: 'Global Retail Corp',
      role: 'Chief Operating Officer',
      tier: 'Hands-Off Empire',
      thumbnail: 'corporate executive presentation',
      duration: '5:20',
      preview: 'Details the complete transformation from 50 employees to AI-powered operations'
    },
    {
      id: '3',
      name: 'David Rodriguez',
      company: 'StartupX',
      role: 'Founder',
      tier: 'App Empire → Business Empire',
      thumbnail: 'young entrepreneur office',
      duration: '4:10',
      preview: 'Bootstrap journey from $8K to $180K monthly revenue in 6 months'
    },
    {
      id: '4',
      name: 'Jennifer Park',
      company: 'Digital Agency Pro',
      role: 'Agency Owner',
      tier: 'Business Empire',
      thumbnail: 'creative agency owner',
      duration: '2:55',
      preview: 'How she scales client work 10x faster while maintaining quality'
    }
  ];

  const successMetrics = [
    { label: 'Average Cost Reduction', value: '94%', icon: <DollarSign className="h-5 w-5" /> },
    { label: 'Average ROI', value: '2,250%', icon: <TrendingUp className="h-5 w-5" /> },
    { label: 'Implementation Time', value: '< 90 days', icon: <Clock className="h-5 w-5" /> },
    { label: 'Customer Satisfaction', value: '98%', icon: <Star className="h-5 w-5" /> }
  ];

  const industryBreakdown = [
    { industry: 'SaaS/Tech', percentage: 35, color: 'bg-blue-500' },
    { industry: 'E-commerce', percentage: 28, color: 'bg-orange-500' },
    { industry: 'Digital Agencies', percentage: 20, color: 'bg-purple-500' },
    { industry: 'Professional Services', percentage: 17, color: 'bg-green-500' }
  ];

  return (
    <section className="py-20 bg-slate-800">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge className="bg-green-500/20 text-green-400 px-6 py-3 mb-6">
            <Trophy className="h-5 w-5 mr-2" />
            Real Customer Success Stories
          </Badge>
          <h2 className="text-4xl font-bold text-white mb-6">
            Empire Building Results
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See how businesses transformed their operations and multiplied their results 
            using the world's first BOSaaS platform
          </p>
        </motion.div>

        {/* Success Metrics Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {successMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-gradient-to-br from-green-500/20 to-blue-500/20 border-green-400/30 text-center">
                <CardContent className="p-6">
                  <div className="text-green-400 mb-3 flex justify-center">
                    {metric.icon}
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
                  <div className="text-gray-300">{metric.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/5 max-w-2xl mx-auto">
            <TabsTrigger value="case-studies" className="text-white data-[state=active]:bg-orange-500">
              Case Studies
            </TabsTrigger>
            <TabsTrigger value="video-stories" className="text-white data-[state=active]:bg-blue-500">
              Video Stories
            </TabsTrigger>
            <TabsTrigger value="metrics" className="text-white data-[state=active]:bg-purple-500">
              Success Metrics
            </TabsTrigger>
            <TabsTrigger value="industries" className="text-white data-[state=active]:bg-green-500">
              Industries
            </TabsTrigger>
          </TabsList>

          <TabsContent value="case-studies" className="mt-12">
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="bg-white/5 border-white/10 h-full hover:bg-white/10 transition-all duration-300 cursor-pointer">
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <ImageWithFallback
                          src={`https://images.unsplash.com/photo-1560472354-b33ff0c44a43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400`}
                          alt={study.imageQuery}
                          className="w-full h-32 object-cover rounded-lg mb-4"
                        />
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-bold text-white text-lg">{study.company}</h3>
                            <p className="text-gray-300 text-sm">{study.industry}</p>
                          </div>
                          <Badge className="bg-orange-500/20 text-orange-400">
                            {study.tier}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-200 mb-2">Challenge</h4>
                          <p className="text-gray-400 text-sm">{study.challenge}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          {study.results.slice(0, 2).map((result, i) => (
                            <div key={i} className="bg-white/5 p-3 rounded-lg">
                              <div className="text-xs text-gray-400 mb-1">{result.metric}</div>
                              <div className="text-sm text-red-400 line-through">{result.before}</div>
                              <div className="text-sm font-bold text-green-400">{result.after}</div>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-400">{study.roi}</div>
                            <div className="text-xs text-gray-400">ROI</div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedCaseStudy(study.id);
                              playSound('tick');
                            }}
                            className="border-orange-400/50 text-orange-400 hover:bg-orange-500/20"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="video-stories" className="mt-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videoTestimonials.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="bg-white/5 border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300 cursor-pointer group">
                    <div className="relative">
                      <ImageWithFallback
                        src={`https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400`}
                        alt={video.thumbnail}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          onClick={() => playSound('achievement')}
                          className="bg-orange-500 hover:bg-orange-600 rounded-full p-4"
                        >
                          <PlayCircle className="h-8 w-8" />
                        </Button>
                      </div>
                      <Badge className="absolute top-3 right-3 bg-black/70 text-white">
                        {video.duration}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-white">{video.name}</h3>
                          <p className="text-gray-300 text-sm">{video.role}</p>
                          <p className="text-gray-400 text-xs">{video.company}</p>
                        </div>
                        <Badge className="bg-blue-500/20 text-blue-400 text-xs">
                          {video.tier}
                        </Badge>
                      </div>
                      <p className="text-gray-300 text-sm">{video.preview}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="metrics" className="mt-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-white mb-8">Transformation Timeline</h3>
                <div className="space-y-6">
                  {[
                    { period: 'Week 1-2', milestone: 'Platform Setup & Team Migration', completion: 100 },
                    { period: 'Week 3-4', milestone: 'Automation Implementation', completion: 100 },
                    { period: 'Month 2', milestone: 'First ROI Results Visible', completion: 100 },
                    { period: 'Month 3', milestone: 'Full Cost Savings Realized', completion: 100 },
                    { period: 'Month 6+', milestone: 'Scale & Optimization Phase', completion: 85 }
                  ].map((item, index) => (
                    <div key={index} className="bg-white/5 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-white">{item.period}</span>
                        <span className="text-green-400">{item.completion}%</span>
                      </div>
                      <p className="text-gray-300 text-sm mb-3">{item.milestone}</p>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-orange-500 to-green-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.completion}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-8">Average Results by Tier</h3>
                <div className="space-y-6">
                  {[
                    { tier: 'Empire Starter', savings: '75%', roi: '450%', implementation: '2 weeks' },
                    { tier: 'App Empire', savings: '85%', roi: '850%', implementation: '3 weeks' },
                    { tier: 'Business Empire', savings: '94%', roi: '1,800%', implementation: '6 weeks' },
                    { tier: 'Hands-Off Empire', savings: '97%', roi: '3,200%', implementation: '8 weeks' }
                  ].map((tier, index) => (
                    <Card key={index} className="bg-white/5 border-white/10">
                      <CardContent className="p-4">
                        <h4 className="font-bold text-white mb-3">{tier.tier}</h4>
                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div>
                            <div className="text-lg font-bold text-green-400">{tier.savings}</div>
                            <div className="text-xs text-gray-400">Cost Savings</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-blue-400">{tier.roi}</div>
                            <div className="text-xs text-gray-400">Average ROI</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-orange-400">{tier.implementation}</div>
                            <div className="text-xs text-gray-400">Setup Time</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="industries" className="mt-12">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-white mb-8">Industry Breakdown</h3>
                <div className="space-y-4">
                  {industryBreakdown.map((industry, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-white">
                        <span>{industry.industry}</span>
                        <span>{industry.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <motion.div
                          className={`${industry.color} h-3 rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${industry.percentage}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-8">Industry-Specific Results</h3>
                <div className="space-y-4">
                  {[
                    { 
                      industry: 'SaaS/Tech', 
                      highlight: 'Development Speed', 
                      improvement: '12x faster',
                      common: 'Replace dev teams with AI-powered app creation'
                    },
                    { 
                      industry: 'E-commerce', 
                      highlight: 'Customer Support', 
                      improvement: '24x faster response',
                      common: 'Automate inventory, marketing, and customer service'
                    },
                    { 
                      industry: 'Digital Agencies', 
                      highlight: 'Client Delivery', 
                      improvement: '10x more projects',
                      common: 'Scale client work without hiring more staff'
                    },
                    { 
                      industry: 'Professional Services', 
                      highlight: 'Process Automation', 
                      improvement: '95% automated',
                      common: 'Transform manual workflows into AI-powered systems'
                    }
                  ].map((item, index) => (
                    <Card key={index} className="bg-white/5 border-white/10">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-white">{item.industry}</h4>
                          <Badge className="bg-green-500/20 text-green-400">{item.improvement}</Badge>
                        </div>
                        <p className="text-green-400 font-semibold text-sm mb-1">{item.highlight}</p>
                        <p className="text-gray-300 text-sm">{item.common}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="bg-gradient-to-r from-orange-500/20 to-blue-500/20 border-orange-400/30 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <Trophy className="h-12 w-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Join These Success Stories?
              </h3>
              <p className="text-gray-300 mb-6">
                Start your empire transformation with a personalized strategy assessment
              </p>
              <Button
                onClick={() => {
                  playSound('achievement');
                  onStartAssessment?.();
                }}
                className="bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600 text-white font-semibold px-8 py-3"
              >
                Begin Your Transformation
                <ArrowUp className="h-5 w-5 ml-2 rotate-45" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
