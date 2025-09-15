import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Globe, 
  Eye, 
  MousePointer,
  Clock,
  Target,
  Share2,
  Zap,
  DollarSign
} from 'lucide-react';
import { motion } from 'framer-motion';

// Google Analytics 4 Integration
declare global {
  interface Window {
    gtag: any;
    dataLayer: any;
    fbq: any;
    ttq: any;
    pintrk: any;
  }
}

interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  conversionRate: number;
  avgTimeOnSite: string;
  topTrafficSources: Array<{ source: string; visitors: number; percentage: number }>;
  realTimeUsers: number;
  totalRevenue: number;
}

interface TrafficAnalyticsProps {
  isVisible?: boolean;
  onStartCampaign?: () => void;
  onShowSetupGuide?: () => void;
}

export function TrafficAnalytics({ isVisible = true, onStartCampaign, onShowSetupGuide }: TrafficAnalyticsProps) {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    pageViews: 15847,
    uniqueVisitors: 8923,
    conversionRate: 12.8,
    avgTimeOnSite: "4:32",
    topTrafficSources: [
      { source: "Google Ads", visitors: 3456, percentage: 38.7 },
      { source: "Facebook", visitors: 2341, percentage: 26.2 },
      { source: "Instagram", visitors: 1567, percentage: 17.6 },
      { source: "TikTok", visitors: 892, percentage: 10.0 },
      { source: "YouTube", visitors: 667, percentage: 7.5 }
    ],
    realTimeUsers: 47,
    totalRevenue: 284750
  });

  const [campaignActive, setCampaignActive] = useState(false);
  const [isTrackingSetup, setIsTrackingSetup] = useState(false);
  const [isDemoMode] = useState(true); // This matches the demo mode setting in initializeAnalytics

  // Initialize all tracking pixels and analytics
  useEffect(() => {
    initializeAnalytics();
  }, []);

  const initializeAnalytics = () => {
    // Demo mode - replace these with real pixel IDs when ready to go live
    const isDemoMode = true; // Set to false when deploying with real pixel IDs
    
    // Mock analytics functions for demo mode to prevent errors
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function() { 
      console.log('Demo GA Event:', Array.from(arguments));
      window.dataLayer.push(arguments); 
    };

    // Mock Meta Pixel to prevent null ID errors
    window.fbq = window.fbq || function() {
      console.log('Demo Meta Pixel Event:', Array.from(arguments));
    };

    // Mock TikTok Pixel to prevent invalid ID errors
    window.ttq = window.ttq || {
      track: function() {
        console.log('Demo TikTok Pixel Event:', Array.from(arguments));
      },
      page: function() {
        console.log('Demo TikTok Page View');
      }
    };

    // Mock Pinterest Analytics
    window.pintrk = window.pintrk || function() {
      console.log('Demo Pinterest Event:', Array.from(arguments));
    };
    if (!window.pintrk.queue) {
      window.pintrk.queue = [];
    }

    // Only load real analytics scripts if not in demo mode and IDs are provided
    if (!isDemoMode) {
      const analyticsConfig = {
        googleAnalyticsId: 'G-XXXXXXXXXX', // Replace with your GA4 ID
        metaPixelId: '1234567890123456', // Replace with your Meta Pixel ID
        tiktokPixelId: 'C4A1B2C3D4E5F6G7H8I9J0', // Replace with your TikTok Pixel ID
        pinterestTagId: '1234567890123' // Replace with your Pinterest Tag ID
      };

      // Google Analytics 4
      if (analyticsConfig.googleAnalyticsId && !document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.googleAnalyticsId}`;
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
          window.dataLayer = window.dataLayer || [];
          window.gtag = function() { window.dataLayer.push(arguments); };
          window.gtag('js', new Date());
          window.gtag('config', analyticsConfig.googleAnalyticsId, {
            page_title: 'Optimus Auto AI - Business Empire Builder',
            page_location: window.location.href,
            custom_map: {
              'dimension1': 'user_archetype',
              'dimension2': 'pricing_tier_viewed',
              'dimension3': 'demo_completed'
            }
          });
        };
      }

      // Meta Pixel (Facebook & Instagram)
      if (analyticsConfig.metaPixelId && !window.fbq) {
        !function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
          if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)
        }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
        
        window.fbq('init', analyticsConfig.metaPixelId);
        window.fbq('track', 'PageView');
      }

      // TikTok Pixel
      if (analyticsConfig.tiktokPixelId && !window.ttq) {
        !function (w: any, d: any, t: any) {
          w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];ttq.setAndDefer=function(t: any,e: any){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t: any){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e: any,n: any){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{};ttq._i[e]=ttq._i[e]||[];ttq._i[e]._u=i;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript";o.async=!0;o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
          ttq.load(analyticsConfig.tiktokPixelId);
          ttq.page();
        }(window, document, 'ttq');
      }

      // Pinterest Analytics
      if (analyticsConfig.pinterestTagId && !window.pintrk) {
        !function(e: any){if(!window.pintrk){window.pintrk = function () {
          window.pintrk.queue.push(Array.prototype.slice.call(arguments))
        };var n=window.pintrk;n.queue=[],n.version="3.0";var t=document.createElement("script");t.async=!0,t.src=e;var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
        
        window.pintrk('load', analyticsConfig.pinterestTagId);
        window.pintrk('page');
      }
    }

    setIsTrackingSetup(true);
  };

  const startCampaign = () => {
    setCampaignActive(true);
    
    // Track campaign start event across all platforms
    if (window.gtag) {
      window.gtag('event', 'campaign_started', {
        event_category: 'Marketing',
        event_label: 'Beta Campaign Launch',
        value: 1
      });
    }

    if (window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: 'Beta Campaign Launch',
        value: 97,
        currency: 'USD'
      });
    }

    if (window.ttq) {
      window.ttq.track('ClickButton', {
        content_name: 'Beta Campaign Launch'
      });
    }

    if (window.pintrk) {
      window.pintrk('track', 'lead', {
        lead_type: 'Beta Campaign'
      });
    }

    onStartCampaign?.();
  };

  const trackSocialShare = (platform: string) => {
    if (window.gtag) {
      window.gtag('event', 'share', {
        method: platform,
        content_type: 'website',
        item_id: 'optimus-auto-ai'
      });
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40 max-w-md"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-slate-900/95 backdrop-blur-xl border-orange-400/30">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-white">
            <BarChart3 className="h-5 w-5 text-orange-400" />
            Traffic Dashboard
            <Badge className={`ml-auto ${campaignActive ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
              {campaignActive ? 'LIVE' : 'READY'}
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Real-time metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Users className="h-4 w-4 text-blue-400" />
                <span className="text-xs text-gray-300">Live Users</span>
              </div>
              <div className="text-xl font-bold text-white">{analyticsData.realTimeUsers}</div>
            </div>
            
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-green-400" />
                <span className="text-xs text-gray-300">Conversion</span>
              </div>
              <div className="text-xl font-bold text-white">{analyticsData.conversionRate}%</div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Eye className="h-4 w-4 text-orange-400" />
                <span className="text-xs text-gray-300">Page Views</span>
              </div>
              <div className="text-xl font-bold text-white">{analyticsData.pageViews.toLocaleString()}</div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="h-4 w-4 text-purple-400" />
                <span className="text-xs text-gray-300">Revenue</span>
              </div>
              <div className="text-xl font-bold text-white">${(analyticsData.totalRevenue / 1000).toFixed(0)}K</div>
            </div>
          </div>

          {/* Top traffic sources */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-white">Top Traffic Sources</h4>
            {analyticsData.topTrafficSources.slice(0, 3).map((source, index) => (
              <div key={source.source} className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  index === 0 ? 'bg-green-400' : 
                  index === 1 ? 'bg-blue-400' : 'bg-orange-400'
                }`}></div>
                <span className="text-sm text-gray-300 flex-1">{source.source}</span>
                <span className="text-sm font-semibold text-white">{source.percentage}%</span>
              </div>
            ))}
          </div>

          {/* Social media integration status */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-white">Tracking Status</h4>
              {isDemoMode && (
                <Badge className="bg-orange-500/20 text-orange-400 text-xs">
                  DEMO MODE
                </Badge>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { name: 'Google Analytics', status: isTrackingSetup },
                { name: 'Meta Pixel', status: isTrackingSetup },
                { name: 'TikTok Pixel', status: isTrackingSetup },
                { name: 'Pinterest Analytics', status: isTrackingSetup }
              ].map((tracker) => (
                <div key={tracker.name} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    isDemoMode ? 'bg-orange-400' : 
                    tracker.status ? 'bg-green-400' : 'bg-red-400'
                  }`}></div>
                  <span className="text-gray-300">{tracker.name}</span>
                </div>
              ))}
            </div>
            {isDemoMode && (
              <button
                onClick={onShowSetupGuide}
                className="text-xs text-orange-400 hover:text-orange-300 underline"
              >
                → Setup Real Analytics
              </button>
            )}
          </div>

          {/* Campaign controls */}
          <div className="space-y-3 pt-3 border-t border-white/10">
            {!campaignActive ? (
              <Button 
                onClick={startCampaign}
                className="w-full bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600 text-white font-semibold"
              >
                <Zap className="h-4 w-4 mr-2" />
                Launch Campaign & Start Timer
              </Button>
            ) : (
              <div className="space-y-2">
                <Badge className="w-full bg-green-500/20 text-green-400 py-2 justify-center">
                  ✅ Campaign Active - Timer Running
                </Badge>
                
                {/* Social sharing buttons */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { name: 'Facebook', color: 'bg-blue-600', onClick: () => trackSocialShare('facebook') },
                    { name: 'Instagram', color: 'bg-pink-500', onClick: () => trackSocialShare('instagram') },
                    { name: 'TikTok', color: 'bg-black', onClick: () => trackSocialShare('tiktok') }
                  ].map((social) => (
                    <Button
                      key={social.name}
                      size="sm"
                      onClick={social.onClick}
                      className={`${social.color} hover:opacity-80 text-white text-xs`}
                    >
                      <Share2 className="h-3 w-3 mr-1" />
                      {social.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Export analytics tracking functions for use throughout the app
export const trackEvent = (eventName: string, parameters?: any) => {
  if (window.gtag) {
    window.gtag('event', eventName, parameters);
  }
  
  if (window.fbq) {
    window.fbq('track', eventName, parameters);
  }
  
  if (window.ttq) {
    window.ttq.track(eventName, parameters);
  }
  
  if (window.pintrk) {
    window.pintrk('track', eventName, parameters);
  }
};

export const trackConversion = (value: number, currency: string = 'USD') => {
  if (window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: Date.now().toString(),
      value: value,
      currency: currency,
      items: [{
        item_id: 'optimus_subscription',
        item_name: 'Optimus Auto AI Subscription',
        category: 'SaaS',
        quantity: 1,
        price: value
      }]
    });
  }
  
  if (window.fbq) {
    window.fbq('track', 'Purchase', {
      value: value,
      currency: currency
    });
  }
  
  if (window.ttq) {
    window.ttq.track('CompletePayment', {
      value: value,
      currency: currency
    });
  }
  
  if (window.pintrk) {
    window.pintrk('track', 'checkout', {
      value: value,
      currency: currency
    });
  }
};
