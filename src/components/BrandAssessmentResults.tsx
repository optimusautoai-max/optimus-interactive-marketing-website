import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { 
  Crown, Target, Lightbulb, ArrowRight, Download, 
  Brain, TrendingUp, Users, DollarSign, Zap, Shield, Star,
  BarChart3, Award, Briefcase, Globe, CheckCircle, 
  Sparkles, Eye, MessageSquare, Heart, Rocket, Trophy, Settings
} from 'lucide-react';
import { PDFGenerator } from './PDFGenerator';

interface BrandAssessmentResultsProps {
  archetype: string;
  guide: any;
  onComplete: (archetype: string) => void;
  onBack: () => void;
  generatePremiumBrandGuide: () => void;
}

export function BrandAssessmentResults({ 
  archetype, 
  guide, 
  onComplete, 
  onBack, 
  generatePremiumBrandGuide 
}: BrandAssessmentResultsProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-auto">
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Executive Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className={`inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r ${guide.color} mb-6`}
            >
              {guide.icon}
            </motion.div>
            
            <Badge className="bg-green-500/20 text-green-400 px-6 py-3 mb-6 text-lg">
              <Crown className="h-5 w-5 mr-2" />
              Executive Strategic Profile Complete
            </Badge>
            
            <h1 className="text-5xl font-bold text-white mb-4">{guide.title}</h1>
            <p className="text-2xl text-gray-300 mb-6">{guide.subtitle}</p>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">{guide.description}</p>
          </div>

          {/* Strategic Intelligence Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Core Strengths */}
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="h-8 w-8 text-green-400" />
                  <h3 className="text-2xl font-bold text-white">Core Strengths</h3>
                </div>
                <div className="space-y-3">
                  {guide.strengths.map((strength: string, index: number) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-200">{strength}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Strategic Position */}
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="h-8 w-8 text-blue-400" />
                  <h3 className="text-2xl font-bold text-white">Market Position</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-orange-400 mb-2">Primary Position</h4>
                    <p className="text-gray-200">{guide.marketPosition}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-400 mb-2">Revenue Model</h4>
                    <p className="text-gray-200">{guide.revenueModel}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-400 mb-2">Risk Profile</h4>
                    <p className="text-gray-200">{guide.riskProfile}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Metrics */}
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <BarChart3 className="h-8 w-8 text-purple-400" />
                  <h3 className="text-2xl font-bold text-white">Success Metrics</h3>
                </div>
                <div className="space-y-3">
                  {guide.keyMetrics.map((metric: string, index: number) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-purple-400 flex-shrink-0" />
                      <span className="text-gray-200">{metric}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Strategic Implementation Plan */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 mb-12">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Rocket className="h-8 w-8 text-orange-400" />
                <h3 className="text-3xl font-bold text-white">Strategic Implementation Plan</h3>
              </div>
              <p className="text-xl text-gray-200 leading-relaxed mb-8">{guide.strategy}</p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-green-400 mb-4 text-lg">Immediate Actions</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg border border-green-400/20">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-gray-200">Complete Optimus Auto AI onboarding</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg border border-green-400/20">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-gray-200">Configure empire settings for {archetype}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg border border-green-400/20">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-gray-200">Deploy initial automation systems</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-blue-400 mb-4 text-lg">30-Day Milestones</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-400/20">
                      <Star className="h-5 w-5 text-blue-400" />
                      <span className="text-gray-200">Launch automated revenue streams</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-400/20">
                      <Star className="h-5 w-5 text-blue-400" />
                      <span className="text-gray-200">Implement customer acquisition systems</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-400/20">
                      <Star className="h-5 w-5 text-blue-400" />
                      <span className="text-gray-200">Optimize for {archetype} strengths</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Download & Action Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <Card className="bg-gradient-to-r from-orange-500/20 to-blue-500/20 border-orange-400/30">
              <CardContent className="p-8">
                <div className="text-center">
                  <Trophy className="h-16 w-16 text-orange-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-4">Professional Strategic Report</h3>
                  <p className="text-gray-200 mb-6">
                    Download your comprehensive {archetype} strategic analysis with actionable insights and implementation roadmap.
                  </p>
                  
                  {/* PDF Generator Component */}
                  <div className="mb-6">
                    <PDFGenerator 
                      archetype={archetype}
                      assessmentData={{ guide }}
                    />
                  </div>
                  
                  <Button 
                    size="lg"
                    onClick={generatePremiumBrandGuide}
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download Legacy Brand Guide
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-400/30">
              <CardContent className="p-8">
                <div className="text-center">
                  <Rocket className="h-16 w-16 text-green-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-4">Ready to Build Your Empire?</h3>
                  <p className="text-gray-200 mb-6">
                    Your strategic profile is complete. Start building your {archetype} empire with Optimus Auto AI's specialized tools and automation.
                  </p>
                  
                  <div className="space-y-4">
                    <Button 
                      size="lg"
                      onClick={() => onComplete(archetype)}
                      className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
                    >
                      <ArrowRight className="mr-2 h-5 w-5" />
                      Experience Your Empire
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={onBack}
                      className="w-full border-white/20 text-gray-200 hover:bg-white/10 hover:text-white"
                    >
                      Return to Main Site
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Optimus Integration Preview */}
          <Card className="bg-gradient-to-r from-orange-500/10 to-blue-500/10 border border-orange-400/20">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-4">Your {archetype} Empire Awaits</h3>
                <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                  Based on your strategic assessment, Optimus Auto AI will automatically configure your empire 
                  with the optimal tools, automation sequences, and revenue systems for {archetype} success.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-white/5 rounded-xl">
                  <Settings className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                  <h4 className="font-semibold text-white mb-2">Automated Configuration</h4>
                  <p className="text-gray-300 text-sm">Pre-configured for {archetype} optimal performance</p>
                </div>
                <div className="text-center p-6 bg-white/5 rounded-xl">
                  <Zap className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <h4 className="font-semibold text-white mb-2">Instant Deployment</h4>
                  <p className="text-gray-300 text-sm">Your empire launches immediately after setup</p>
                </div>
                <div className="text-center p-6 bg-white/5 rounded-xl">
                  <Crown className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <h4 className="font-semibold text-white mb-2">Strategic Advantage</h4>
                  <p className="text-gray-300 text-sm">Leverages your {archetype} strengths automatically</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}