import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointer, 
  Share2,
  Activity,
  Target,
  Zap,
  CheckCircle
} from 'lucide-react';

declare global {
  interface Window {
    gtag: any;
    fbq: any;
    ttq: any;
    pintrk: any;
    dataLayer: any[];
  }
}

interface AnalyticsConfig {
  googleAnalyticsId: string;
  metaPixelId: string;
  tiktokPixelId: string;
  pinterestId: string;
  isActive: boolean;
}

interface AnalyticsManagerProps {
  config?: Partial<AnalyticsConfig>;
  onConfigUpdate?: (config: AnalyticsConfig) => void;
}

export function AnalyticsManager({ config, onConfigUpdate }: AnalyticsManagerProps) {
  const [analyticsConfig, setAnalyticsConfig] = useState<AnalyticsConfig>({
    googleAnalyticsId: 'GA_MEASUREMENT_ID',
    metaPixelId: 'META_PIXEL_ID',
    tiktokPixelId: 'TIKTOK_PIXEL_ID',
    pinterestId: 'PINTEREST_TAG_ID',
    isActive: false,
    ...config
  });

  const [isInitialized, setIsInitialized] = useState(false);
  const [activeTrackers, setActiveTrackers] = useState<string[]>([]);

  // Initialize Google Analytics 4
  const initializeGA4 = (measurementId: string) => {
    if (typeof window === 'undefined') return;

    // Create gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Initialize dataLayer and gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      page_title: 'Optimus Auto AI - Build Your Business Empire',
      page_location: window.location.href,
      content_group1: 'Landing Page',
      custom_map: {
        custom_parameter_1: 'empire_builder',
        custom_parameter_2: 'ai_automation'
      }
    });

    // Track initial page view
    window.gtag('event', 'page_view', {
      page_title: 'Optimus Auto AI Empire Builder',
      page_location: window.location.href,
      content_group1: 'Landing Page'
    });

    setActiveTrackers(prev => [...prev, 'Google Analytics']);
  };

  // Initialize Meta Pixel (Facebook/Instagram)
  const initializeMetaPixel = (pixelId: string) => {
    if (typeof window === 'undefined') return;

    // Meta Pixel Code
    !(function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function() {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');

    // Track specific events for business empire building
    window.fbq('trackCustom', 'EmpireBuilderVisit', {
      content_category: 'Business Automation',
      content_name: 'Optimus Auto AI',
      value: 97,
      currency: 'USD'
    });

    setActiveTrackers(prev => [...prev, 'Meta Pixel']);
  };

  // Initialize TikTok Pixel
  const initializeTikTokPixel = (pixelId: string) => {
    if (typeof window === 'undefined') return;

    !(function (w: any, d: any, t: any) {
      w.TiktokAnalyticsObject = t;
      var ttq = w[t] = w[t] || [];
      ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"];
      ttq.setAndDefer = function (t: any, e: any) {
        t[e] = function () {
          t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
        };
      };
      for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
      ttq.instance = function (t: any) {
        for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(e, ttq.methods[n]);
        return e;
      };
      ttq.load = function (e: any, n: any) {
        var i = "https://analytics.tiktok.com/i18n/pixel/events.js";
        ttq._i = ttq._i || {};
        ttq._i[e] = [];
        ttq._i[e]._u = i;
        ttq._t = ttq._t || {};
        ttq._t[e] = +new Date();
        ttq._o = ttq._o || {};
        ttq._o[e] = n || {};
        var o = document.createElement("script");
        o.type = "text/javascript";
        o.async = !0;
        o.src = i + "?sdkid=" + e + "&lib=" + t;
        var a = document.getElementsByTagName("script")[0];
        a.parentNode!.insertBefore(o, a);
      };
      ttq.load(pixelId);
      ttq.page();
    })(window, document, 'ttq');

    window.ttq.track('ViewContent', {
      content_type: 'business_automation',
      content_name: 'Optimus Auto AI Empire Builder',
      value: 97,
      currency: 'USD'
    });

    setActiveTrackers(prev => [...prev, 'TikTok Pixel']);
  };

  // Initialize Pinterest Tag
  const initializePinterestTag = (tagId: string) => {
    if (typeof window === 'undefined') return;

    !(function(e: any) {
      if (!window.pintrk) {
        window.pintrk = function() {
          window.pintrk.queue.push(Array.prototype.slice.call(arguments));
        };
        const n = window.pintrk;
        n.queue = [];
        n.version = "3.0";
        const t = document.createElement("script");
        t.async = !0;
        t.src = e;
        const r = document.getElementsByTagName("script")[0];
        r.parentNode!.insertBefore(t, r);
      }
    })("https://s.pinimg.com/ct/core.js");

    window.pintrk('load', tagId, { em: '<user_email_address>' });
    window.pintrk('page');

    window.pintrk('track', 'pagevisit', {
      line_items: [{
        product_name: 'Optimus Auto AI Business Empire',
        product_category: 'Business Automation',
        product_price: 97,
        product_quantity: 1,
        currency: 'USD'
      }]
    });

    setActiveTrackers(prev => [...prev, 'Pinterest Analytics']);
  };

  // Initialize all analytics
  const initializeAnalytics = () => {
    if (!analyticsConfig.isActive) return;

    initializeGA4(analyticsConfig.googleAnalyticsId);
    initializeMetaPixel(analyticsConfig.metaPixelId);
    initializeTikTokPixel(analyticsConfig.tiktokPixelId);
    initializePinterestTag(analyticsConfig.pinterestId);

    setIsInitialized(true);
  };

  // Track custom events
  const trackEvent = (eventName: string, eventData: any = {}) => {
    if (!isInitialized) return;

    // Google Analytics
    if (window.gtag) {
      window.gtag('event', eventName, eventData);
    }

    // Meta Pixel
    if (window.fbq) {
      window.fbq('trackCustom', eventName, eventData);
    }

    // TikTok Pixel
    if (window.ttq) {
      window.ttq.track(eventName, eventData);
    }

    // Pinterest
    if (window.pintrk) {
      window.pintrk('track', eventName.toLowerCase(), eventData);
    }
  };

  // Track specific business events
  const trackBusinessEvent = (eventType: string, data: any = {}) => {
    const eventMap = {
      assessment_started: {
        event_category: 'engagement',
        event_label: 'brand_assessment',
        value: 1
      },
      assessment_completed: {
        event_category: 'conversion',
        event_label: 'brand_assessment_complete',
        value: 10
      },
      demo_watched: {
        event_category: 'engagement',
        event_label: 'demo_video',
        value: 5
      },
      pricing_viewed: {
        event_category: 'engagement',
        event_label: 'pricing_section',
        value: 3
      },
      tier_selected: {
        event_category: 'conversion',
        event_label: 'tier_selection',
        value: 20
      },
      calendar_booked: {
        event_category: 'conversion',
        event_label: 'consultation_booked',
        value: 50
      },
      empire_builder_signup: {
        event_category: 'conversion',
        event_label: 'signup',
        value: 97
      }
    };

    const eventConfig = eventMap[eventType as keyof typeof eventMap];
    if (eventConfig) {
      trackEvent(eventType, { ...eventConfig, ...data });
    }
  };

  useEffect(() => {
    if (analyticsConfig.isActive) {
      initializeAnalytics();
    }
  }, [analyticsConfig.isActive]);

  // Expose tracking functions globally for easy access
  useEffect(() => {
    (window as any).optimusTracking = {
      trackEvent,
      trackBusinessEvent
    };
  }, [isInitialized]);

  const handleActivateAnalytics = () => {
    const newConfig = { ...analyticsConfig, isActive: true };
    setAnalyticsConfig(newConfig);
    onConfigUpdate?.(newConfig);
  };

  return (
    <div className="space-y-6">
      {/* Analytics Status */}
      <Card className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Analytics & Tracking</h3>
                <p className="text-gray-300 text-sm">
                  {isInitialized ? 'Active & Monitoring' : 'Ready to Deploy'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge className={`${isInitialized ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
                {isInitialized ? 'Live' : 'Standby'}
              </Badge>
              
              {!analyticsConfig.isActive && (
                <Button
                  onClick={handleActivateAnalytics}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Activate Tracking
                </Button>
              )}
            </div>
          </div>

          {isInitialized && (
            <motion.div
              className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {activeTrackers.map((tracker, index) => (
                <div key={tracker} className="flex items-center gap-2 text-sm text-green-400">
                  <CheckCircle className="h-4 w-4" />
                  <span>{tracker}</span>
                </div>
              ))}
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Live Analytics Display */}
      {isInitialized && (
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {[
            { label: 'Page Views', value: '2,847', icon: Eye, color: 'text-blue-400' },
            { label: 'Active Users', value: '342', icon: Users, color: 'text-green-400' },
            { label: 'Conversions', value: '89', icon: Target, color: 'text-orange-400' },
            { label: 'Engagement', value: '94%', icon: TrendingUp, color: 'text-purple-400' }
          ].map((metric, index) => (
            <Card key={metric.label} className="bg-white/5 border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{metric.label}</p>
                    <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                  </div>
                  <metric.icon className={`h-8 w-8 ${metric.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      )}

      {/* Configuration Panel */}
      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-6">
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-orange-400" />
            Traffic Sources Configuration
          </h4>
          
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-3">
              <div>
                <label className="text-gray-300 block mb-1">Google Analytics ID:</label>
                <code className="text-blue-400 bg-black/30 px-2 py-1 rounded">
                  {analyticsConfig.googleAnalyticsId}
                </code>
              </div>
              <div>
                <label className="text-gray-300 block mb-1">Meta Pixel ID:</label>
                <code className="text-purple-400 bg-black/30 px-2 py-1 rounded">
                  {analyticsConfig.metaPixelId}
                </code>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-gray-300 block mb-1">TikTok Pixel ID:</label>
                <code className="text-green-400 bg-black/30 px-2 py-1 rounded">
                  {analyticsConfig.tiktokPixelId}
                </code>
              </div>
              <div>
                <label className="text-gray-300 block mb-1">Pinterest Tag ID:</label>
                <code className="text-red-400 bg-black/30 px-2 py-1 rounded">
                  {analyticsConfig.pinterestId}
                </code>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-orange-500/20 border border-orange-400/30 rounded-lg">
            <h5 className="text-orange-400 font-semibold mb-2">🚀 Campaign Launch Ready</h5>
            <p className="text-gray-300 text-sm">
              Replace the placeholder IDs above with your actual tracking codes when launching your campaign. 
              All social media platforms and Google Analytics will automatically start tracking traffic and conversions.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Export tracking functions for global use
export const trackOptimus = {
  assessmentStarted: () => (window as any).optimusTracking?.trackBusinessEvent('assessment_started'),
  assessmentCompleted: (archetype: string) => (window as any).optimusTracking?.trackBusinessEvent('assessment_completed', { archetype }),
  demoWatched: () => (window as any).optimusTracking?.trackBusinessEvent('demo_watched'),
  pricingViewed: () => (window as any).optimusTracking?.trackBusinessEvent('pricing_viewed'),
  tierSelected: (tier: string) => (window as any).optimusTracking?.trackBusinessEvent('tier_selected', { tier }),
  calendarBooked: () => (window as any).optimusTracking?.trackBusinessEvent('calendar_booked'),
  empireSignup: (tier: string) => (window as any).optimusTracking?.trackBusinessEvent('empire_builder_signup', { tier })
};