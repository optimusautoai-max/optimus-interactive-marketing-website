import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Search,
  TrendingUp,
  Eye,
  Target,
  Globe,
  CheckCircle,
  AlertTriangle,
  Zap,
  BarChart3,
  Link,
  Image,
  FileText
} from 'lucide-react';
import { motion } from 'motion/react';

interface SEOMetrics {
  pageSpeed: number;
  seoScore: number;
  keywordRank: number;
  backlinks: number;
  organicTraffic: number;
  searchImpression: number;
}

interface SEOIssue {
  type: 'error' | 'warning' | 'success';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
}

interface KeywordData {
  keyword: string;
  position: number;
  searchVolume: number;
  difficulty: number;
  trend: 'up' | 'down' | 'stable';
}

const targetKeywords: KeywordData[] = [
  { keyword: 'business automation software', position: 3, searchVolume: 8900, difficulty: 67, trend: 'up' },
  { keyword: 'AI business tools', position: 7, searchVolume: 12400, difficulty: 72, trend: 'up' },
  { keyword: 'automated business systems', position: 12, searchVolume: 5600, difficulty: 58, trend: 'stable' },
  { keyword: 'business operating system', position: 5, searchVolume: 3200, difficulty: 45, trend: 'up' },
  { keyword: 'AI entrepreneurship platform', position: 15, searchVolume: 2100, difficulty: 41, trend: 'down' },
  { keyword: 'business empire builder', position: 2, searchVolume: 890, difficulty: 23, trend: 'up' },
];

export function SEOOptimizer() {
  const [seoMetrics, setSeoMetrics] = useState<SEOMetrics>({
    pageSpeed: 94,
    seoScore: 89,
    keywordRank: 6.2,
    backlinks: 2847,
    organicTraffic: 18945,
    searchImpression: 234560
  });

  const [seoIssues, setSeoIssues] = useState<SEOIssue[]>([
    {
      type: 'success',
      title: 'Schema Markup Implemented',
      description: 'FAQ and Organization schema properly configured',
      impact: 'high'
    },
    {
      type: 'success',
      title: 'Mobile-First Responsive Design',
      description: 'Perfect mobile optimization score',
      impact: 'high'
    },
    {
      type: 'warning',
      title: 'Meta Description Length',
      description: 'Some pages have meta descriptions over 160 characters',
      impact: 'medium'
    },
    {
      type: 'success',
      title: 'Core Web Vitals',
      description: 'All metrics within Google recommended ranges',
      impact: 'high'
    },
    {
      type: 'warning',
      title: 'Internal Linking',
      description: 'Could benefit from more strategic internal links',
      impact: 'low'
    }
  ]);

  useEffect(() => {
    // Inject comprehensive SEO meta tags
    const seoTags = [
      // Primary meta tags
      { property: 'og:title', content: 'Optimus Auto AI - Build Business Empires with AI | $97/Month Replaces $50K Teams' },
      { property: 'og:description', content: 'Revolutionary BOSaaS platform with 42+ business apps. Replace expensive teams with AI that works 24/7. Join 1,340+ entrepreneurs building automated empires.' },
      { property: 'og:image', content: `${window.location.origin}/optimus-og-image.jpg` },
      { property: 'og:url', content: window.location.href },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Optimus Auto AI' },
      
      // Twitter Card tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Optimus Auto AI - AI Business Empire Builder' },
      { name: 'twitter:description', content: 'Replace $50K/month teams with $97/month AI. 42+ apps, 24/7 automation, enterprise results.' },
      { name: 'twitter:image', content: `${window.location.origin}/optimus-twitter-card.jpg` },
      { name: 'twitter:site', content: '@OptimusAutoAI' },
      
      // Additional SEO meta tags
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { name: 'googlebot', content: 'index, follow' },
      { name: 'author', content: 'Optimus Auto AI Team' },
      { name: 'publisher', content: 'Optimus Auto AI' },
      { name: 'canonical', content: window.location.href },
      
      // Business-specific meta tags
      { name: 'business:contact_data:street_address', content: 'Enterprise Business Center' },
      { name: 'business:contact_data:locality', content: 'Tulsa' },
      { name: 'business:contact_data:region', content: 'Oklahoma' },
      { name: 'business:contact_data:postal_code', content: '74133' },
      { name: 'business:contact_data:country_name', content: 'United States' },
    ];

    // Remove existing tags and add new ones
    seoTags.forEach(tag => {
      // Remove existing tag if it exists
      const existingTag = document.querySelector(`meta[${tag.property ? 'property' : 'name'}="${tag.property || tag.name}"]`);
      if (existingTag) {
        existingTag.remove();
      }

      // Create new tag
      const metaTag = document.createElement('meta');
      if (tag.property) {
        metaTag.setAttribute('property', tag.property);
      } else {
        metaTag.setAttribute('name', tag.name!);
      }
      metaTag.setAttribute('content', tag.content);
      document.head.appendChild(metaTag);
    });

    // Update title if not already set
    if (!document.title.includes('Optimus Auto AI')) {
      document.title = 'Optimus Auto AI - Build Business Empires with AI | Replace Teams with $97/Month BOSaaS';
    }

    // Add JSON-LD structured data for enhanced SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${window.location.origin}/#organization`,
          "name": "Optimus Auto AI",
          "url": window.location.origin,
          "logo": {
            "@type": "ImageObject",
            "url": `${window.location.origin}/optimus-logo.png`
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-918-293-3352",
            "contactType": "customer service",
            "email": "Team@optimusautoai.com"
          },
          "sameAs": [
            "https://facebook.com/optimusautoai",
            "https://instagram.com/optimusautoai",
            "https://linkedin.com/company/optimusautoai",
            "https://youtube.com/@optimusautoai",
            "https://tiktok.com/@optimusautoai"
          ]
        },
        {
          "@type": "WebSite",
          "@id": `${window.location.origin}/#website`,
          "url": window.location.origin,
          "name": "Optimus Auto AI",
          "description": "Revolutionary Business Operating System as a Service (BOSaaS) platform that replaces expensive human teams with AI-powered automation.",
          "publisher": {
            "@id": `${window.location.origin}/#organization`
          },
          "potentialAction": [
            {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${window.location.origin}/search?q={search_term_string}`
              },
              "query-input": "required name=search_term_string"
            }
          ]
        },
        {
          "@type": "SoftwareApplication",
          "name": "Optimus Auto AI BOSaaS Platform",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web Browser",
          "description": "Complete business operating system with 42+ integrated applications for automated business management.",
          "offers": {
            "@type": "Offer",
            "price": "97",
            "priceCurrency": "USD",
            "priceValidUntil": "2025-12-31",
            "availability": "https://schema.org/InStock"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "1247",
            "bestRating": "5",
            "worstRating": "1"
          }
        },
        {
          "@type": "Service",
          "name": "Business Empire Building",
          "description": "Complete business automation and empire building services using AI technology.",
          "provider": {
            "@id": `${window.location.origin}/#organization`
          },
          "serviceType": "Business Automation",
          "areaServed": "Worldwide"
        }
      ]
    };

    // Remove existing structured data and add new
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

  }, []);

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'error': return AlertTriangle;
      case 'warning': return AlertTriangle;
      case 'success': return CheckCircle;
      default: return AlertTriangle;
    }
  };

  const getIssueColor = (type: string) => {
    switch (type) {
      case 'error': return 'text-red-400';
      case 'warning': return 'text-yellow-400';
      case 'success': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-500/20 text-red-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  return (
    <div className="space-y-6">
      {/* SEO Performance Overview */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-green-400/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Search className="h-5 w-5 text-green-400" />
            SEO Performance Dashboard
            <Badge className="bg-green-500/20 text-green-400 ml-auto">
              Optimized for Growth
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <motion.div
              className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-green-400" />
                <span className="text-sm text-gray-300">Page Speed</span>
              </div>
              <div className="text-2xl font-bold text-white">{seoMetrics.pageSpeed}</div>
              <div className="text-xs text-green-400">Google Score</div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-blue-400" />
                <span className="text-sm text-gray-300">SEO Score</span>
              </div>
              <div className="text-2xl font-bold text-white">{seoMetrics.seoScore}</div>
              <div className="text-xs text-blue-400">Overall Rating</div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl p-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-5 w-5 text-orange-400" />
                <span className="text-sm text-gray-300">Avg Keyword Rank</span>
              </div>
              <div className="text-2xl font-bold text-white">{seoMetrics.keywordRank}</div>
              <div className="text-xs text-orange-400">Position</div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Link className="h-5 w-5 text-purple-400" />
                <span className="text-sm text-gray-300">Backlinks</span>
              </div>
              <div className="text-2xl font-bold text-white">{seoMetrics.backlinks.toLocaleString()}</div>
              <div className="text-xs text-purple-400">Quality Links</div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-xl p-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-yellow-400" />
                <span className="text-sm text-gray-300">Organic Traffic</span>
              </div>
              <div className="text-2xl font-bold text-white">{(seoMetrics.organicTraffic / 1000).toFixed(1)}K</div>
              <div className="text-xs text-yellow-400">Monthly Users</div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-xl p-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Eye className="h-5 w-5 text-indigo-400" />
                <span className="text-sm text-gray-300">Search Impressions</span>
              </div>
              <div className="text-2xl font-bold text-white">{(seoMetrics.searchImpression / 1000).toFixed(0)}K</div>
              <div className="text-xs text-indigo-400">Monthly Views</div>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Keyword Rankings */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-blue-400/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Target className="h-5 w-5 text-blue-400" />
            Keyword Performance
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-3">
            {targetKeywords.map((keyword, index) => (
              <motion.div
                key={keyword.keyword}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-semibold text-white">{keyword.keyword}</span>
                      <span className="text-lg">{getTrendIcon(keyword.trend)}</span>
                      <Badge className={`${keyword.position <= 3 ? 'bg-green-500/20 text-green-400' : 
                        keyword.position <= 10 ? 'bg-yellow-500/20 text-yellow-400' : 
                        'bg-red-500/20 text-red-400'} text-xs`}>
                        Position #{keyword.position}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-400">
                      <span>Volume: {keyword.searchVolume.toLocaleString()}/mo</span>
                      <span>Difficulty: {keyword.difficulty}%</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SEO Issues & Recommendations */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-yellow-400/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            SEO Health Check
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-3">
            {seoIssues.map((issue, index) => {
              const Icon = getIssueIcon(issue.type);
              return (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-3">
                    <Icon className={`h-5 w-5 mt-0.5 ${getIssueColor(issue.type)}`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-white">{issue.title}</span>
                        <Badge className={`${getImpactColor(issue.impact)} text-xs`}>
                          {issue.impact} impact
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-300">{issue.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick SEO Actions */}
      <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-400/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Quick SEO Boosts</h3>
            <Badge className="bg-green-500/20 text-green-400">
              Instant Impact
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: 'Schema Markup', icon: FileText, status: 'active' },
              { name: 'Meta Tags', icon: Globe, status: 'active' },
              { name: 'Image Alt Text', icon: Image, status: 'optimized' },
              { name: 'Site Speed', icon: Zap, status: 'excellent' }
            ].map((item, index) => (
              <div
                key={item.name}
                className="bg-white/5 hover:bg-white/10 transition-colors rounded-lg p-4 text-center"
              >
                <item.icon className="h-6 w-6 text-green-400 mx-auto mb-2" />
                <div className="text-sm text-white mb-1">{item.name}</div>
                <Badge className="bg-green-500/20 text-green-400 text-xs">
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}