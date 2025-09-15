import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Settings,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Copy,
  Code,
  Zap,
  TrendingUp,
  Eye,
  Monitor,
  BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnalyticsSetupGuideProps {
  isVisible?: boolean;
  onClose?: () => void;
}

export function AnalyticsSetupGuide({ isVisible = false, onClose }: AnalyticsSetupGuideProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(label);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const analyticsProviders = [
    {
      id: 'google',
      name: 'Google Analytics 4',
      icon: BarChart3,
      color: 'text-blue-400',
      bgColor: 'from-blue-500/20 to-blue-600/20',
      status: 'demo',
      setupUrl: 'https://analytics.google.com/',
      description: 'Complete user behavior tracking and conversion analysis',
      steps: [
        'Create Google Analytics 4 property',
        'Copy your Measurement ID (G-XXXXXXXXXX)',
        'Replace GA_MEASUREMENT_ID in TrafficAnalytics.tsx',
        'Set isDemoMode to false'
      ],
      codeExample: `// In TrafficAnalytics.tsx
const analyticsConfig = {
  googleAnalyticsId: 'G-XXXXXXXXXX', // Your GA4 ID here
  // ... other configs
};`
    },
    {
      id: 'meta',
      name: 'Meta Pixel',
      icon: TrendingUp,
      color: 'text-blue-500',
      bgColor: 'from-blue-400/20 to-indigo-500/20',
      status: 'demo',
      setupUrl: 'https://business.facebook.com/events_manager',
      description: 'Facebook & Instagram advertising optimization',
      steps: [
        'Go to Facebook Events Manager',
        'Create new pixel or use existing',
        'Copy your 16-digit Pixel ID',
        'Replace metaPixelId in the config'
      ],
      codeExample: `// In TrafficAnalytics.tsx
const analyticsConfig = {
  metaPixelId: '1234567890123456', // Your Meta Pixel ID
  // ... other configs
};`
    },
    {
      id: 'tiktok',
      name: 'TikTok Pixel',
      icon: Zap,
      color: 'text-pink-400',
      bgColor: 'from-pink-500/20 to-red-500/20',
      status: 'demo',
      setupUrl: 'https://ads.tiktok.com/i18n/pixel',
      description: 'TikTok campaign tracking and optimization',
      steps: [
        'Access TikTok Ads Manager',
        'Navigate to Events section',
        'Create new pixel or select existing',
        'Copy the Pixel ID'
      ],
      codeExample: `// In TrafficAnalytics.tsx
const analyticsConfig = {
  tiktokPixelId: 'C4A1B2C3D4E5F6G7H8I9J0', // Your TikTok Pixel ID
  // ... other configs
};`
    },
    {
      id: 'pinterest',
      name: 'Pinterest Analytics',
      icon: Eye,
      color: 'text-red-400',
      bgColor: 'from-red-500/20 to-pink-500/20',
      status: 'demo',
      setupUrl: 'https://ads.pinterest.com/conversion_tags/',
      description: 'Pinterest conversion tracking',
      steps: [
        'Go to Pinterest Business Hub',
        'Navigate to Ads > Conversions',
        'Create Pinterest tag',
        'Copy the Tag ID'
      ],
      codeExample: `// In TrafficAnalytics.tsx
const analyticsConfig = {
  pinterestTagId: '1234567890123', // Your Pinterest Tag ID
  // ... other configs
};`
    }
  ];

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-slate-800 rounded-2xl border border-orange-400/30 max-w-4xl w-full max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Analytics Setup Guide</h2>
              <p className="text-gray-300">Connect real analytics pixels to start tracking actual traffic</p>
            </div>
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </Button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Current Status */}
          <Card className="bg-orange-500/10 border-orange-400/30 mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-orange-400" />
                <div>
                  <h3 className="font-semibold text-orange-400">Demo Mode Active</h3>
                  <p className="text-sm text-gray-300">
                    All analytics are currently in demo mode. Follow the steps below to connect real tracking pixels.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analytics Providers Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {analyticsProviders.map((provider, index) => (
              <motion.div
                key={provider.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`bg-gradient-to-br ${provider.bgColor} border-white/10 h-full`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <provider.icon className={`h-6 w-6 ${provider.color}`} />
                        <div>
                          <CardTitle className="text-white text-lg">{provider.name}</CardTitle>
                          <p className="text-sm text-gray-300">{provider.description}</p>
                        </div>
                      </div>
                      <Badge className="bg-orange-500/20 text-orange-400">
                        {provider.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Setup Steps */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-white text-sm">Setup Steps:</h4>
                      <ol className="space-y-1 text-xs text-gray-300">
                        {provider.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start gap-2">
                            <span className="text-orange-400 font-bold min-w-[16px]">
                              {stepIndex + 1}.
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full border-white/20 text-white hover:bg-white/10"
                        onClick={() => window.open(provider.setupUrl, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3 mr-2" />
                        Open {provider.name}
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-full text-gray-300 hover:text-white hover:bg-white/5"
                        onClick={() => setExpandedSection(
                          expandedSection === provider.id ? null : provider.id
                        )}
                      >
                        <Code className="h-3 w-3 mr-2" />
                        {expandedSection === provider.id ? 'Hide' : 'Show'} Code
                      </Button>
                    </div>

                    {/* Code Example */}
                    <AnimatePresence>
                      {expandedSection === provider.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-slate-900/50 rounded-lg p-3 border border-white/10"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-gray-400">Code Example</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                              onClick={() => copyToClipboard(provider.codeExample, provider.id)}
                            >
                              {copiedText === provider.id ? (
                                <CheckCircle className="h-3 w-3" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                          <pre className="text-xs text-gray-300 overflow-x-auto">
                            <code>{provider.codeExample}</code>
                          </pre>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Final Steps */}
          <Card className="bg-green-500/10 border-green-400/30 mt-6">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-400 mb-2">Final Step</h3>
                  <p className="text-sm text-gray-300 mb-3">
                    After setting up your pixel IDs, don't forget to disable demo mode:
                  </p>
                  <div className="bg-slate-900/50 rounded-lg p-3 border border-green-400/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-gray-400">
                        In TrafficAnalytics.tsx, line ~74
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                        onClick={() => copyToClipboard('const isDemoMode = false; // ✅ Ready for production!', 'demo-mode')}
                      >
                        {copiedText === 'demo-mode' ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                    <pre className="text-xs text-gray-300">
                      <code>const isDemoMode = false; // ✅ Ready for production!</code>
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  );
}
