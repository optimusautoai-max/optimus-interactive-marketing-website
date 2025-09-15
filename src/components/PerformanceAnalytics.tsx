import React, { useEffect, useRef, useState } from "react";

interface AnalyticsEvent {
  type: string;
  timestamp: number;
  data?: any;
  element?: string;
  section?: string;
}

interface UserSession {
  sessionId: string;
  startTime: number;
  events: AnalyticsEvent[];
  userAgent: string;
  viewport: { width: number; height: number };
  referrer: string;
}

export function PerformanceAnalytics() {
  const sessionRef = useRef<UserSession | null>(null);
  const [isTracking, setIsTracking] = useState(true);

  // Initialize session
  useEffect(() => {
    if (!sessionRef.current) {
      sessionRef.current = {
        sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        startTime: Date.now(),
        events: [],
        userAgent: navigator.userAgent,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        referrer: document.referrer
      };

      // Track initial page load
      trackEvent('page_load', {
        url: window.location.href,
        loadTime: performance.now()
      });
    }
  }, []);

  // Track events
  const trackEvent = (type: string, data?: any, element?: string, section?: string) => {
    if (!isTracking || !sessionRef.current) return;

    const event: AnalyticsEvent = {
      type,
      timestamp: Date.now(),
      data,
      element,
      section
    };

    sessionRef.current.events.push(event);

    // Send to analytics service (mock implementation)
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', event);
    }
  };

  // Track scroll depth
  useEffect(() => {
    let maxScrollDepth = 0;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent;
        
        // Track milestone scroll depths
        const milestones = [10, 25, 50, 75, 90, 100];
        const milestone = milestones.find(m => m <= scrollPercent && m > (maxScrollDepth - 10));
        
        if (milestone) {
          trackEvent('scroll_milestone', { 
            depth: milestone,
            section: getCurrentSection()
          });
        }
      }

      // Debounced scroll tracking
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        trackEvent('scroll_stop', { depth: scrollPercent });
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Get current section based on scroll position
  const getCurrentSection = () => {
    const sections = [
      'hero',
      'trust-indicators', 
      'demo',
      'apps-overview',
      'premium-features',
      'pricing',
      'testimonials',
      'faq',
      'contact'
    ];

    for (const sectionId of sections) {
      const element = document.getElementById(`${sectionId}-section`);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          return sectionId;
        }
      }
    }
    return 'unknown';
  };

  // Track time on page
  useEffect(() => {
    const startTime = Date.now();
    let lastActiveTime = startTime;
    let totalActiveTime = 0;
    let isActive = true;

    // Track user activity
    const resetActiveTime = () => {
      const now = Date.now();
      if (isActive) {
        totalActiveTime += now - lastActiveTime;
      }
      lastActiveTime = now;
      isActive = true;
    };

    // Track when user becomes inactive
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isActive = false;
        trackEvent('page_blur', { 
          activeTime: totalActiveTime,
          totalTime: Date.now() - startTime
        });
      } else {
        resetActiveTime();
        trackEvent('page_focus');
      }
    };

    // Activity events
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, resetActiveTime, { passive: true });
    });

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Track session end
    const handleBeforeUnload = () => {
      trackEvent('session_end', {
        duration: Date.now() - startTime,
        activeTime: totalActiveTime,
        eventsCount: sessionRef.current?.events.length || 0
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, resetActiveTime);
      });
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Track click events
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const tagName = target.tagName.toLowerCase();
      const className = target.className;
      const textContent = target.textContent?.slice(0, 50) || '';
      
      // Track button clicks specifically
      if (tagName === 'button' || target.closest('button')) {
        const button = target.closest('button') || target;
        trackEvent('button_click', {
          text: button.textContent?.slice(0, 50),
          className: button.className,
          section: getCurrentSection()
        }, 'button');
      }

      // Track link clicks
      if (tagName === 'a' || target.closest('a')) {
        const link = target.closest('a') || target;
        trackEvent('link_click', {
          href: (link as HTMLAnchorElement).href,
          text: link.textContent?.slice(0, 50),
          section: getCurrentSection()
        }, 'link');
      }

      // Track card/section clicks
      if (target.closest('[data-analytics]')) {
        const element = target.closest('[data-analytics]');
        trackEvent('element_click', {
          elementType: element?.getAttribute('data-analytics'),
          section: getCurrentSection()
        });
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Track form interactions
  useEffect(() => {
    const handleFormInteraction = (e: Event) => {
      const target = e.target as HTMLFormElement;
      const tagName = target.tagName.toLowerCase();

      if (['input', 'textarea', 'select'].includes(tagName)) {
        trackEvent('form_interaction', {
          fieldType: tagName,
          fieldName: target.name || target.id,
          eventType: e.type,
          section: getCurrentSection()
        }, 'form');
      }
    };

    const events = ['focus', 'blur', 'change'];
    events.forEach(event => {
      document.addEventListener(event, handleFormInteraction, true);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleFormInteraction, true);
      });
    };
  }, []);

  // Performance monitoring
  useEffect(() => {
    // Track Core Web Vitals
    const trackWebVitals = () => {
      // Largest Contentful Paint (LCP)
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        trackEvent('performance_lcp', { value: lastEntry.startTime });
      });
      
      try {
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // Browser doesn't support LCP
      }

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          trackEvent('performance_fid', { 
            value: (entry as PerformanceEventTiming).processingStart - entry.startTime 
          });
        }
      });

      try {
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        // Browser doesn't support FID
      }

      // Track memory usage if available
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        trackEvent('performance_memory', {
          usedJSHeapSize: memory.usedJSHeapSize,
          totalJSHeapSize: memory.totalJSHeapSize,
          jsHeapSizeLimit: memory.jsHeapSizeLimit
        });
      }
    };

    // Delay to ensure page is loaded
    setTimeout(trackWebVitals, 1000);
  }, []);

  // Expose tracking function globally for other components
  useEffect(() => {
    (window as any).trackAnalytics = trackEvent;
    return () => {
      delete (window as any).trackAnalytics;
    };
  }, []);

  // This component doesn't render anything visible
  return null;
}

// Hook for other components to use analytics
export const useAnalytics = () => {
  const trackEvent = (type: string, data?: any, element?: string, section?: string) => {
    if ((window as any).trackAnalytics) {
      (window as any).trackAnalytics(type, data, element, section);
    }
  };

  return { trackEvent };
};