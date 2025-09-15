import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Rocket,
  Play,
  Pause,
  RotateCcw,
  Timer,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Zap,
  AlertCircle,
  CheckCircle,
  Clock,
  Calendar,
  BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { trackEvent } from './TrafficAnalytics';

interface CampaignStats {
  leads: number;
  conversions: number;
  revenue: number;
  costPerLead: number;
  roi: number;
  timeRemaining: number;
}

interface CampaignManagerProps {
  onTimerStart?: () => void;
  onTimerPause?: () => void;
  onTimerReset?: () => void;
  isVisible?: boolean;
}

export function CampaignManager({ onTimerStart, onTimerPause, onTimerReset, isVisible = true }: CampaignManagerProps) {
  const [campaignActive, setCampaignActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(48 * 60 * 60 * 1000); // 48 hours in milliseconds
  const [campaignStartTime, setCampaignStartTime] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [slotsRemaining, setSlotsRemaining] = useState(12);
  
  const [campaignStats, setCampaignStats] = useState<CampaignStats>({
    leads: 0,
    conversions: 0,
    revenue: 0,
    costPerLead: 0,
    roi: 0,
    timeRemaining: 48 * 60 * 60 * 1000
  });

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (campaignActive && !isPaused && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = Math.max(0, prev - 1000);
          setCampaignStats(current => ({ ...current, timeRemaining: newTime }));
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [campaignActive, isPaused, timeRemaining]);

  // Simulate real-time campaign updates
  useEffect(() => {
    if (!campaignActive) return;

    const updateInterval = setInterval(() => {
      setCampaignStats(prev => {
        const elapsedHours = campaignStartTime ? (Date.now() - campaignStartTime) / (1000 * 60 * 60) : 0;
        const baseLeads = Math.floor(elapsedHours * 3.2); // ~3.2 leads per hour
        const baseConversions = Math.floor(baseLeads * 0.127); // 12.7% conversion rate
        const baseRevenue = baseConversions * 97; // $97 per conversion
        
        return {
          ...prev,
          leads: baseLeads + Math.floor(Math.random() * 2),
          conversions: baseConversions,
          revenue: baseRevenue,
          costPerLead: baseLeads > 0 ? Math.round((baseRevenue * 0.3) / baseLeads) : 0,
          roi: baseRevenue > 0 ? Math.round(((baseRevenue - (baseRevenue * 0.3)) / (baseRevenue * 0.3)) * 100) : 0
        };
      });

      // Randomly decrease slots
      if (Math.random() < 0.15) { // 15% chance every update
        setSlotsRemaining(prev => Math.max(0, prev - 1));
      }
    }, 8000); // Update every 8 seconds

    return () => clearInterval(updateInterval);
  }, [campaignActive, campaignStartTime]);

  const startCampaign = () => {
    setCampaignActive(true);
    setCampaignStartTime(Date.now());
    setIsPaused(false);
    
    // Track campaign start
    trackEvent('campaign_started', {
      campaign_type: 'beta_launch',
      timer_duration: 48,
      slots_remaining: slotsRemaining
    });

    onTimerStart?.();
  };

  const pauseCampaign = () => {
    setIsPaused(!isPaused);
    
    trackEvent('campaign_paused', {
      campaign_status: !isPaused ? 'paused' : 'resumed',
      time_remaining: timeRemaining
    });

    if (!isPaused) {
      onTimerPause?.();
    }
  };

  const resetCampaign = () => {
    setCampaignActive(false);
    setTimeRemaining(48 * 60 * 60 * 1000);
    setCampaignStartTime(null);
    setIsPaused(false);
    setSlotsRemaining(12);
    setCampaignStats({
      leads: 0,
      conversions: 0,
      revenue: 0,
      costPerLead: 0,
      roi: 0,
      timeRemaining: 48 * 60 * 60 * 1000
    });

    trackEvent('campaign_reset', {
      campaign_type: 'beta_launch'
    });

    onTimerReset?.();
  };

  const formatTime = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getUrgencyLevel = () => {
    const hoursLeft = timeRemaining / (1000 * 60 * 60);
    if (hoursLeft <= 6) return 'critical';
    if (hoursLeft <= 12) return 'high';
    if (hoursLeft <= 24) return 'medium';
    return 'normal';
  };

  const getUrgencyColor = () => {
    const level = getUrgencyLevel();
    switch (level) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      default: return 'text-green-400';
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Campaign Control Panel */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-orange-400/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Rocket className="h-5 w-5 text-orange-400" />
            Campaign Control Center
            <Badge className={`ml-auto ${campaignActive ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
              {campaignActive ? (isPaused ? 'PAUSED' : 'LIVE') : 'READY'}
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Timer Display */}
          <div className="text-center">
            <motion.div
              className={`text-6xl font-bold ${getUrgencyColor()} mb-2`}
              animate={{ 
                scale: getUrgencyLevel() === 'critical' ? [1, 1.05, 1] : 1,
              }}
              transition={{ 
                duration: 1, 
                repeat: getUrgencyLevel() === 'critical' ? Infinity : 0 
              }}
            >
              {formatTime(timeRemaining)}
            </motion.div>
            <div className="flex items-center justify-center gap-2 text-gray-300">
              <Clock className="h-4 w-4" />
              <span>Time Remaining in Beta Campaign</span>
            </div>
            
            {/* Urgency indicators */}
            <div className="mt-4 flex justify-center">
              <Badge className={`${
                getUrgencyLevel() === 'critical' ? 'bg-red-500/20 text-red-400 animate-pulse' :
                getUrgencyLevel() === 'high' ? 'bg-orange-500/20 text-orange-400' :
                getUrgencyLevel() === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-green-500/20 text-green-400'
              } px-4 py-2`}>
                {getUrgencyLevel() === 'critical' && '🚨 FINAL HOURS'} 
                {getUrgencyLevel() === 'high' && '⚠️ HIGH URGENCY'} 
                {getUrgencyLevel() === 'medium' && '⏰ LIMITED TIME'} 
                {getUrgencyLevel() === 'normal' && '✅ CAMPAIGN ACTIVE'}
              </Badge>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex justify-center gap-3">
            {!campaignActive ? (
              <Button
                onClick={startCampaign}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-3"
              >
                <Play className="h-5 w-5 mr-2" />
                Launch Campaign
              </Button>
            ) : (
              <>
                <Button
                  onClick={pauseCampaign}
                  variant="outline"
                  className="border-orange-400/50 text-orange-400 hover:bg-orange-500/20"
                >
                  {isPaused ? (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Resume
                    </>
                  ) : (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Pause
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={resetCampaign}
                  variant="outline"
                  className="border-gray-400/50 text-gray-400 hover:bg-gray-500/20"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </>
            )}
          </div>

          {/* Slots Remaining */}
          <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-lg p-4 border border-red-400/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-red-400" />
                <span className="text-white font-semibold">Beta Slots Remaining</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-red-400">{slotsRemaining}/30</div>
                <div className="text-xs text-gray-300">Spots Available</div>
              </div>
            </div>
            
            {/* Progress bar for slots */}
            <div className="mt-3">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-red-400 to-orange-400 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((30 - slotsRemaining) / 30) * 100}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>18 Taken</span>
                <span>{slotsRemaining} Left</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Campaign Statistics */}
      <AnimatePresence>
        {campaignActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-400/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <BarChart3 className="h-5 w-5 text-green-400" />
                  Live Campaign Performance
                  <Badge className="bg-green-500/20 text-green-400 ml-auto animate-pulse">
                    LIVE DATA
                  </Badge>
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <motion.div
                    className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-4 text-center"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="text-2xl font-bold text-blue-400 mb-1">
                      {campaignStats.leads}
                    </div>
                    <div className="text-sm text-gray-300">Leads Generated</div>
                  </motion.div>

                  <motion.div
                    className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-4 text-center"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                  >
                    <div className="text-2xl font-bold text-green-400 mb-1">
                      {campaignStats.conversions}
                    </div>
                    <div className="text-sm text-gray-300">Conversions</div>
                  </motion.div>

                  <motion.div
                    className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl p-4 text-center"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                  >
                    <div className="text-2xl font-bold text-orange-400 mb-1">
                      ${campaignStats.revenue.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-300">Revenue</div>
                  </motion.div>

                  <motion.div
                    className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-4 text-center"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                  >
                    <div className="text-2xl font-bold text-purple-400 mb-1">
                      ${campaignStats.costPerLead}
                    </div>
                    <div className="text-sm text-gray-300">Cost/Lead</div>
                  </motion.div>

                  <motion.div
                    className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-xl p-4 text-center"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
                  >
                    <div className="text-2xl font-bold text-yellow-400 mb-1">
                      {campaignStats.roi}%
                    </div>
                    <div className="text-sm text-gray-300">ROI</div>
                  </motion.div>
                </div>

                {/* Campaign insights */}
                <div className="mt-6 grid md:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span className="text-sm font-semibold text-green-400">Performance Trends</span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-300">
                      <div>• Lead generation: +23% vs last hour</div>
                      <div>• Conversion rate: 12.7% (above target)</div>
                      <div>• Cost efficiency: Improving</div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-orange-400" />
                      <span className="text-sm font-semibold text-orange-400">Campaign Goals</span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-300">
                      <div>• Target: 150 leads (current: {campaignStats.leads})</div>
                      <div>• Target: $15K revenue (current: ${campaignStats.revenue.toLocaleString()})</div>
                      <div>• Target: 25% ROI (current: {campaignStats.roi}%)</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Campaign Instructions */}
      {!campaignActive && (
        <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-400/30">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
              <div>
                <h3 className="font-semibold text-white mb-2">Ready to Launch Your Beta Campaign</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>All tracking pixels are installed and ready</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Social media integrations are active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>SEO optimization is complete</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>48-hour countdown timer is configured</span>
                  </div>
                </div>
                <p className="mt-3 text-blue-400 font-medium">
                  Click "Launch Campaign" to start the 48-hour countdown and begin driving traffic to your site!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}