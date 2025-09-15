import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  TrendingUp,
  Users,
  Globe,
  Share2,
  Search,
  BarChart3,
  Zap,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { motion } from 'motion/react';

interface TrafficSummaryProps {
  onOpenTrafficHub?: () => void;
}

export function TrafficSummary({ onOpenTrafficHub }: TrafficSummaryProps) {
  const trafficSources = [
    { name: 'Google Analytics', status: 'active', color: 'text-green-400' },
    { name: 'Meta Pixel', status: 'active', color: 'text-blue-400' },
    { name: 'TikTok Pixel', status: 'active', color: 'text-pink-400' },
    { name: 'Pinterest Analytics', status: 'active', color: 'text-red-400' },
    { name: 'YouTube Analytics', status: 'active', color: 'text-red-500' },
    { name: 'LinkedIn Insights', status: 'active', color: 'text-blue-300' }
  ];

  const quickStats = [
    { label: 'SEO Score', value: '89/100', icon: Search, color: 'text-green-400' },
    { label: 'Page Speed', value: '94', icon: Zap, color: 'text-yellow-400' },
    { label: 'Social Reach', value: '445K', icon: Share2, color: 'text-purple-400' },
    { label: 'Conversion Rate', value: '12.8%', icon: TrendingUp, color: 'text-orange-400' }
  ];

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-40 max-w-sm"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <Card className="bg-slate-900/95 backdrop-blur-xl border-green-400/30">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-white">
            <BarChart3 className="h-5 w-5 text-green-400" />
            Traffic Status
            <Badge className="bg-green-500/20 text-green-400 ml-auto">
              ALL SYSTEMS GO
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Quick metrics */}
          <div className="grid grid-cols-2 gap-2">
            {quickStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-white/5 rounded-lg p-3 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 1.2 }}
              >
                <div className="flex items-center justify-center gap-1 mb-1">
                  <stat.icon className={`h-3 w-3 ${stat.color}`} />
                  <span className="text-xs text-gray-300">{stat.label}</span>
                </div>
                <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
              </motion.div>
            ))}
          </div>

          {/* Tracking status */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-white">Tracking Active</h4>
            <div className="grid grid-cols-2 gap-1 text-xs">
              {trafficSources.map((source, index) => (
                <motion.div
                  key={source.name}
                  className="flex items-center gap-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + 1.5 }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                  <span className="text-gray-300 truncate">{source.name}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Campaign readiness */}
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg p-3 border border-green-400/30">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span className="text-sm font-semibold text-green-400">Ready to Launch</span>
            </div>
            <div className="space-y-1 text-xs text-gray-300">
              <div>• All pixels installed & firing</div>
              <div>• SEO optimization complete</div>
              <div>• Social sharing templates ready</div>
              <div>• Analytics dashboards live</div>
            </div>
          </div>

          {/* Action button */}
          <Button
            onClick={onOpenTrafficHub}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Open Traffic Hub
            <ExternalLink className="h-3 w-3 ml-2" />
          </Button>

          {/* Live activity feed */}
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-gray-400">Live Activity</h4>
            <div className="space-y-1 text-xs text-gray-500">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center gap-1"
              >
                <div className="w-1 h-1 rounded-full bg-green-400"></div>
                <span>Visitor from Google (Tulsa, OK)</span>
              </motion.div>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="flex items-center gap-1"
              >
                <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                <span>Facebook pixel fired</span>
              </motion.div>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="flex items-center gap-1"
              >
                <div className="w-1 h-1 rounded-full bg-orange-400"></div>
                <span>Assessment started</span>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}