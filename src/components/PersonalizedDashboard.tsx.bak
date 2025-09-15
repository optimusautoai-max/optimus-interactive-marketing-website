import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { motion, AnimatePresence } from 'motion/react';
import {
  Crown, TrendingUp, BarChart3, Target, Users, DollarSign,
  Zap, Brain, Rocket, Shield, Settings, ChevronRight,
  Calendar, Clock, Star, Award, Activity, Briefcase,
  LineChart, PieChart, AlertCircle, CheckCircle2
} from 'lucide-react';

interface DashboardProps {
  archetype: string;
  onBack: () => void;
}

// Real-time business intelligence data generator
function generateBusinessIntelligence(archetype: string) {
  const baseMetrics = {
    revenue: Math.floor(Math.random() * 50000) + 25000,
    growth: Math.floor(Math.random() * 40) + 15,
    efficiency: Math.floor(Math.random() * 30) + 70,
    automation: Math.floor(Math.random() * 25) + 60,
    opportunities: Math.floor(Math.random() * 8) + 3,
    risks: Math.floor(Math.random() * 3) + 1
  };

  // Archetype-specific adjustments
  const adjustments = {
    'Visionary Creator': { growth: +20, opportunities: +5, innovation: 95 },
    'Strategic Optimizer': { efficiency: +15, automation: +10, optimization: 92 },
    'Growth Accelerator': { revenue: +15000, growth: +25, expansion: 88 },
    'Innovation Pioneer': { opportunities: +8, innovation: 98, disruption: 85 },
    'Excellence Executor': { efficiency: +20, automation: +15, quality: 96 }
  };

  const adj = adjustments[archetype as keyof typeof adjustments] || {};
  
  return {
    ...baseMetrics,
    revenue: baseMetrics.revenue + (adj.revenue || 0),
    growth: Math.min(100, baseMetrics.growth + (adj.growth || 0)),
    efficiency: Math.min(100, baseMetrics.efficiency + (adj.efficiency || 0)),
    automation: Math.min(100, baseMetrics.automation + (adj.automation || 0)),
    opportunities: baseMetrics.opportunities + (adj.opportunities || 0),
    risks: baseMetrics.risks,
    innovation: adj.innovation || 75,
    optimization: adj.optimization || 75,
    expansion: adj.expansion || 75,
    disruption: adj.disruption || 75,
    quality: adj.quality || 75
  };
}

// Archetype-specific recommendations and insights
function getArchetypeInsights(archetype: string, metrics: any) {
  const insights = {
    'Visionary Creator': {
      primary: 'Innovation Pipeline Optimization',
      recommendations: [
        'Leverage AI for rapid prototype development',
        'Implement automated market research systems',
        'Scale creative workflows with intelligent automation'
      ],
      keyActions: [
        'Deploy Business Empire tier for innovation acceleration',
        'Activate automated patent research and filing',
        'Implement AI-driven trend analysis'
      ],
      nextMilestone: 'Launch 3 new innovative products in Q1'
    },
    'Strategic Optimizer': {
      primary: 'Performance Analytics Enhancement',
      recommendations: [
        'Implement advanced KPI tracking automation',
        'Deploy predictive analytics for optimization',
        'Automate process improvement identification'
      ],
      keyActions: [
        'Activate comprehensive analytics suite',
        'Deploy automated A/B testing systems',
        'Implement real-time optimization alerts'
      ],
      nextMilestone: 'Achieve 25% efficiency improvement'
    },
    'Growth Accelerator': {
      primary: 'Expansion Velocity Maximization',
      recommendations: [
        'Scale marketing automation for rapid growth',
        'Implement automated lead generation systems',
        'Deploy AI-driven market expansion tools'
      ],
      keyActions: [
        'Activate Hands-Off Empire for maximum scaling',
        'Deploy automated customer acquisition funnels',
        'Implement growth analytics and forecasting'
      ],
      nextMilestone: 'Double revenue within 6 months'
    },
    'Innovation Pioneer': {
      primary: 'Market Disruption Acceleration',
      recommendations: [
        'Deploy cutting-edge AI development tools',
        'Implement rapid innovation testing systems',
        'Scale breakthrough discovery processes'
      ],
      keyActions: [
        'Activate experimental AI toolchain',
        'Deploy automated innovation metrics',
        'Implement disruptive technology scanning'
      ],
      nextMilestone: 'Launch industry-disrupting solution'
    },
    'Excellence Executor': {
      primary: 'Quality Assurance Automation',
      recommendations: [
        'Implement automated quality control systems',
        'Deploy consistency monitoring and alerts',
        'Scale excellence standards across operations'
      ],
      keyActions: [
        'Activate quality automation suite',
        'Deploy performance standard monitoring',
        'Implement excellence reporting systems'
      ],
      nextMilestone: 'Achieve 99.5% quality standards'
    }
  };

  return insights[archetype as keyof typeof insights] || insights['Strategic Optimizer'];
}

export function PersonalizedDashboard({ archetype, onBack }: DashboardProps) {
  const [metrics, setMetrics] = useState(() => generateBusinessIntelligence(archetype));
  const [insights, setInsights] = useState(() => getArchetypeInsights(archetype, metrics));
  const [activeTab, setActiveTab] = useState('overview');
  const [liveUpdates, setLiveUpdates] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    if (!liveUpdates) return;
    
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        revenue: prev.revenue + Math.floor(Math.random() * 100) - 50,
        efficiency: Math.min(100, Math.max(0, prev.efficiency + Math.floor(Math.random() * 2) - 1)),
        automation: Math.min(100, Math.max(0, prev.automation + Math.floor(Math.random() * 2) - 1))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [liveUpdates]);

  const getArchetypeIcon = () => {
    const icons = {
      'Visionary Creator': Crown,
      'Strategic Optimizer': Target,
      'Growth Accelerator': Rocket,
      'Innovation Pioneer': Zap,
      'Excellence Executor': Shield
    };
    
    const IconComponent = icons[archetype as keyof typeof icons] || Target;
    return <IconComponent className="h-8 w-8" />;
  };

  const getArchetypeColor = () => {
    const colors = {
      'Visionary Creator': 'from-yellow-400 to-orange-400',
      'Strategic Optimizer': 'from-blue-400 to-cyan-400',
      'Growth Accelerator': 'from-green-400 to-teal-400',
      'Innovation Pioneer': 'from-purple-400 to-pink-400',
      'Excellence Executor': 'from-red-400 to-orange-400'
    };
    
    return colors[archetype as keyof typeof colors] || 'from-blue-400 to-cyan-400';
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="text-gray-400 hover:text-white">
              ← Back to Main
            </Button>
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${getArchetypeColor()}`}>
                {getArchetypeIcon()}
              </div>
              <div>
                <h1 className="text-3xl font-bold">{archetype} Dashboard</h1>
                <p className="text-gray-400">Strategic Business Intelligence Center</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge className="bg-green-500/20 text-green-400">
              <Activity className="h-4 w-4 mr-1" />
              Live Updates Active
            </Badge>
            <Button
              variant="outline"
              onClick={() => setLiveUpdates(!liveUpdates)}
              className="border-white/20 text-white hover:bg-white/10"
            >
              {liveUpdates ? 'Pause' : 'Resume'} Updates
            </Button>
          </div>
        </motion.div>

        {/* Key Metrics Row */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Monthly Revenue</p>
                  <motion.p 
                    className="text-2xl font-bold text-green-400"
                    key={metrics.revenue}
                    initial={{ scale: 1.1, color: '#10b981' }}
                    animate={{ scale: 1, color: '#10b981' }}
                  >
                    ${metrics.revenue.toLocaleString()}
                  </motion.p>
                </div>
                <DollarSign className="h-8 w-8 text-green-400" />
              </div>
              <div className="mt-2 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                <span className="text-green-400">+{metrics.growth}% growth</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Efficiency Score</p>
                  <motion.p 
                    className="text-2xl font-bold text-blue-400"
                    key={metrics.efficiency}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                  >
                    {metrics.efficiency}%
                  </motion.p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-400" />
              </div>
              <Progress value={metrics.efficiency} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Automation Level</p>
                  <motion.p 
                    className="text-2xl font-bold text-orange-400"
                    key={metrics.automation}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                  >
                    {metrics.automation}%
                  </motion.p>
                </div>
                <Settings className="h-8 w-8 text-orange-400" />
              </div>
              <Progress value={metrics.automation} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Opportunities</p>
                  <p className="text-2xl font-bold text-purple-400">{metrics.opportunities}</p>
                </div>
                <Target className="h-8 w-8 text-purple-400" />
              </div>
              <div className="mt-2 flex items-center text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-400 mr-1" />
                <span className="text-green-400">{metrics.risks} risks mitigated</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Dashboard Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/10">
              <TabsTrigger value="overview" className="text-white data-[state=active]:bg-orange-500">
                Overview
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-orange-500">
                Analytics
              </TabsTrigger>
              <TabsTrigger value="automation" className="text-white data-[state=active]:bg-orange-500">
                Automation
              </TabsTrigger>
              <TabsTrigger value="insights" className="text-white data-[state=active]:bg-orange-500">
                Insights
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Primary Focus Area */}
                <Card className="lg:col-span-2 bg-white/5 backdrop-blur-xl border-white/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Brain className="h-6 w-6 text-orange-400" />
                      {insights.primary}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {insights.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                          <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-200">{rec}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-4 border-t border-white/10">
                      <h4 className="font-semibold text-white mb-3">Next Milestone</h4>
                      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg">
                        <Award className="h-5 w-5 text-purple-400" />
                        <span className="text-gray-100">{insights.nextMilestone}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Key Actions */}
                <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Zap className="h-6 w-6 text-blue-400" />
                      Recommended Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {insights.keyActions.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full justify-between border-white/20 text-gray-200 hover:bg-white/10 hover:text-white h-auto p-3"
                        onClick={() => alert(`Implementing: ${action}`)}
                      >
                        <span className="text-left text-sm">{action}</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    ))}
                    
                    <div className="pt-4 border-t border-white/10">
                      <Button
                        className="w-full bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600 text-white"
                        onClick={() => window.open('mailto:Team@optimusautoai.com?subject=Ready to Experience My Empire&body=Hi, I\'ve completed my brand assessment and reviewed my strategic dashboard. I\'m ready to experience my empire and discuss next steps.', '_blank')}
                      >
                        <Rocket className="mr-2 h-4 w-4" />
                        Experience Your Empire
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <LineChart className="h-6 w-6 text-green-400" />
                      Performance Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-200">Revenue Growth</span>
                        <span className="text-green-400 font-semibold">+{metrics.growth}%</span>
                      </div>
                      <Progress value={metrics.growth} className="h-2" />
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-200">Market Expansion</span>
                        <span className="text-blue-400 font-semibold">+{metrics.expansion || 75}%</span>
                      </div>
                      <Progress value={metrics.expansion || 75} className="h-2" />
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-200">Innovation Index</span>
                        <span className="text-purple-400 font-semibold">{metrics.innovation || 80}%</span>
                      </div>
                      <Progress value={metrics.innovation || 80} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <PieChart className="h-6 w-6 text-orange-400" />
                      Efficiency Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-200">Automation</span>
                        <span className="text-orange-400 font-semibold">{metrics.automation}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-200">Quality Control</span>
                        <span className="text-green-400 font-semibold">{metrics.quality || 90}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-200">Process Optimization</span>
                        <span className="text-blue-400 font-semibold">{metrics.optimization || 85}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="automation">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                  <CardHeader>
                    <CardTitle className="text-green-400">Active Systems</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-gray-200">CRM Automation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-gray-200">Email Marketing</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-gray-200">Lead Generation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-gray-200">Analytics Reporting</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                  <CardHeader>
                    <CardTitle className="text-orange-400">Pending Deployment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-orange-400" />
                        <span className="text-sm text-gray-200">Advanced AI Tools</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-orange-400" />
                        <span className="text-sm text-gray-200">Predictive Analytics</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-orange-400" />
                        <span className="text-sm text-gray-200">Custom Integrations</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                  <CardHeader>
                    <CardTitle className="text-blue-400">Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-blue-400" />
                        <span className="text-sm text-gray-200">Upgrade to Business Empire</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-blue-400" />
                        <span className="text-sm text-gray-200">Enable Advanced Analytics</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-blue-400" />
                        <span className="text-sm text-gray-200">Schedule Strategy Call</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="insights">
              <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-6 w-6 text-purple-400" />
                    AI-Powered Strategic Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-orange-400">Market Opportunities</h4>
                      <div className="space-y-2">
                        <div className="p-3 bg-green-500/20 rounded-lg border border-green-400/30">
                          <div className="flex items-center gap-2 mb-1">
                            <TrendingUp className="h-4 w-4 text-green-400" />
                            <span className="text-sm font-medium text-green-400">High Priority</span>
                          </div>
                          <p className="text-sm text-gray-300">AI automation market showing 300% growth potential</p>
                        </div>
                        <div className="p-3 bg-blue-500/20 rounded-lg border border-blue-400/30">
                          <div className="flex items-center gap-2 mb-1">
                            <Users className="h-4 w-4 text-blue-400" />
                            <span className="text-sm font-medium text-blue-400">Customer Segment</span>
                          </div>
                          <p className="text-sm text-gray-300">SMB market underserved for enterprise-level automation</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-red-400">Risk Assessment</h4>
                      <div className="space-y-2">
                        <div className="p-3 bg-yellow-500/20 rounded-lg border border-yellow-400/30">
                          <div className="flex items-center gap-2 mb-1">
                            <AlertCircle className="h-4 w-4 text-yellow-400" />
                            <span className="text-sm font-medium text-yellow-400">Medium Risk</span>
                          </div>
                          <p className="text-sm text-gray-300">Market saturation risk in 18-24 months</p>
                        </div>
                        <div className="p-3 bg-green-500/20 rounded-lg border border-green-400/30">
                          <div className="flex items-center gap-2 mb-1">
                            <Shield className="h-4 w-4 text-green-400" />
                            <span className="text-sm font-medium text-green-400">Low Risk</span>
                          </div>
                          <p className="text-sm text-gray-300">Strong competitive moat with current technology</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}