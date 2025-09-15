import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Share2, 
  Youtube, 
  Instagram, 
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  Heart,
  TrendingUp,
  Users,
  Play,
  Copy,
  Check,
  ExternalLink,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from './TrafficAnalytics';

interface SocialStats {
  platform: string;
  followers: number;
  engagement: number;
  reach: number;
  clicks: number;
  icon: React.ElementType;
  color: string;
  gradient: string;
}

interface ContentTemplate {
  id: string;
  platform: string;
  title: string;
  content: string;
  hashtags: string[];
  mediaType: 'image' | 'video' | 'carousel';
  ctaText: string;
}

const socialStats: SocialStats[] = [
  {
    platform: 'YouTube',
    followers: 47200,
    engagement: 8.4,
    reach: 234000,
    clicks: 3240,
    icon: Youtube,
    color: 'text-red-400',
    gradient: 'from-red-500/20 to-red-600/20'
  },
  {
    platform: 'Instagram',
    followers: 32800,
    engagement: 12.7,
    reach: 156000,
    clicks: 2890,
    icon: Instagram,
    color: 'text-pink-400',
    gradient: 'from-pink-500/20 to-purple-500/20'
  },
  {
    platform: 'Facebook',
    followers: 28400,
    engagement: 6.2,
    reach: 128000,
    clicks: 2340,
    icon: Facebook,
    color: 'text-blue-400',
    gradient: 'from-blue-500/20 to-blue-600/20'
  },
  {
    platform: 'TikTok',
    followers: 89300,
    engagement: 15.3,
    reach: 445000,
    clicks: 5670,
    icon: MessageCircle,
    color: 'text-white',
    gradient: 'from-black/20 to-gray-800/20'
  },
  {
    platform: 'LinkedIn',
    followers: 15600,
    engagement: 9.1,
    reach: 89000,
    clicks: 1890,
    icon: Linkedin,
    color: 'text-blue-300',
    gradient: 'from-blue-400/20 to-blue-500/20'
  }
];

const contentTemplates: ContentTemplate[] = [
  {
    id: 'empire_builder',
    platform: 'all',
    title: '🚀 Build Your Business Empire with AI',
    content: `Stop paying $50K+/month for teams that sleep, take vacations, and make mistakes. 

Our AI-powered BOSaaS platform replaces your entire business infrastructure for just $97/month.

✅ 42+ Business Apps
✅ Automated Income Streams  
✅ 24/7 Operations
✅ Zero Human Error
✅ Instant Scaling

The future of business is here. Join the revolution.`,
    hashtags: ['#BusinessAutomation', '#AIEntrepreneur', '#PassiveIncome', '#BusinessGrowth', '#TechStartup', '#DigitalTransformation'],
    mediaType: 'video',
    ctaText: 'Get Your Empire Started'
  },
  {
    id: 'cost_savings',
    platform: 'linkedin',
    title: '💰 Replace $25K/Month Teams with $97/Month AI',
    content: `CFOs are discovering the secret to 90% cost reduction:

Traditional Business:
• Developer Team: $15K/month
• Marketing Team: $8K/month  
• Sales Team: $12K/month
• Management: $20K/month
TOTAL: $55K/month

Optimus Auto AI:
• Complete AI Infrastructure: $97/month
• SAVINGS: $54,903/month

That's $658K saved annually. What would you do with an extra $658K?`,
    hashtags: ['#CostReduction', '#CFO', '#BusinessIntelligence', '#ROI', '#Efficiency'],
    mediaType: 'carousel',
    ctaText: 'Calculate Your Savings'
  },
  {
    id: 'entrepreneur_story',
    platform: 'instagram',
    title: '⚡ From Struggling Entrepreneur to Empire Owner',
    content: `Sarah was working 80-hour weeks, burning $30K/month on teams, and barely breaking even.

3 months with Optimus Auto AI:
✨ Reduced to 10-hour work weeks
✨ Cut costs by 92%
✨ Revenue increased 340%
✨ Complete business automation

Her empire now runs itself while she travels the world.

Your transformation starts with one decision.`,
    hashtags: ['#EntrepreneurLife', '#BusinessSuccess', '#AutomationWins', '#FreedomLifestyle', '#WomenInBusiness'],
    mediaType: 'image',
    ctaText: 'Start Your Transformation'
  }
];

interface SocialMediaHubProps {
  isVisible?: boolean;
  campaignActive?: boolean;
}

export function SocialMediaHub({ isVisible = true, campaignActive = false }: SocialMediaHubProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [copiedContent, setCopiedContent] = useState<string | null>(null);
  const [shareCount, setShareCount] = useState(0);

  const copyToClipboard = async (content: string, templateId: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedContent(templateId);
      setTimeout(() => setCopiedContent(null), 2000);
      
      trackEvent('content_copied', {
        content_type: 'social_media_template',
        template_id: templateId
      });
    } catch (err) {
      console.error('Failed to copy content:', err);
    }
  };

  const shareToSocial = (platform: string, template: ContentTemplate) => {
    const encodedContent = encodeURIComponent(template.content);
    const encodedHashtags = encodeURIComponent(template.hashtags.join(' '));
    const siteUrl = encodeURIComponent(window.location.href);
    
    let shareUrl = '';
    
    switch (platform.toLowerCase()) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${siteUrl}&quote=${encodedContent}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedContent}&hashtags=${template.hashtags.join(',')}&url=${siteUrl}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${siteUrl}&summary=${encodedContent}`;
        break;
      case 'instagram':
        // Instagram doesn't support direct sharing, copy content instead
        copyToClipboard(`${template.content}\n\n${template.hashtags.join(' ')}\n\nLink in bio: ${window.location.href}`, template.id);
        return;
      case 'tiktok':
        // TikTok doesn't support direct sharing, copy content instead
        copyToClipboard(`${template.content}\n\n${template.hashtags.join(' ')}`, template.id);
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
      setShareCount(prev => prev + 1);
      
      trackEvent('social_share', {
        platform: platform,
        template_id: template.id,
        content_type: template.mediaType
      });
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Social Media Performance Dashboard */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-orange-400/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <TrendingUp className="h-5 w-5 text-orange-400" />
            Social Media Performance
            {campaignActive && (
              <Badge className="bg-green-500/20 text-green-400 ml-auto">
                <Zap className="h-3 w-3 mr-1" />
                LIVE CAMPAIGN
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {socialStats.map((stat, index) => (
              <motion.div
                key={stat.platform}
                className={`bg-gradient-to-br ${stat.gradient} border border-white/10 rounded-xl p-4`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    <span className="font-semibold text-white">{stat.platform}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                    onClick={() => shareToSocial(stat.platform, contentTemplates[0])}
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Followers</span>
                    <span className="text-sm font-semibold text-white">
                      {formatNumber(stat.followers)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Engagement</span>
                    <span className="text-sm font-semibold text-green-400">
                      {stat.engagement}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Reach</span>
                    <span className="text-sm font-semibold text-blue-400">
                      {formatNumber(stat.reach)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Clicks</span>
                    <span className="text-sm font-semibold text-orange-400">
                      {formatNumber(stat.clicks)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content Templates */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-blue-400/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Share2 className="h-5 w-5 text-blue-400" />
            Ready-to-Share Content
            <Badge className="bg-blue-500/20 text-blue-400 ml-auto">
              {shareCount} Shares Today
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {contentTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-2">{template.title}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-purple-500/20 text-purple-400 text-xs">
                      {template.mediaType}
                    </Badge>
                    <Badge className="bg-gray-500/20 text-gray-400 text-xs">
                      {template.platform === 'all' ? 'All Platforms' : template.platform}
                    </Badge>
                  </div>
                </div>
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedTemplate(
                    selectedTemplate === template.id ? null : template.id
                  )}
                  className="text-orange-400 hover:text-orange-300"
                >
                  {selectedTemplate === template.id ? 'Collapse' : 'Expand'}
                </Button>
              </div>
              
              <AnimatePresence>
                {selectedTemplate === template.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="bg-slate-700/50 rounded-lg p-4">
                      <div className="text-gray-300 whitespace-pre-line text-sm">
                        {template.content}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {template.hashtags.map((hashtag, i) => (
                        <Badge 
                          key={i} 
                          className="bg-blue-500/20 text-blue-400 text-xs"
                        >
                          {hashtag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        onClick={() => copyToClipboard(
                          `${template.content}\n\n${template.hashtags.join(' ')}\n\n🔗 ${window.location.href}`,
                          template.id
                        )}
                        className="bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 border-orange-400/30"
                      >
                        {copiedContent === template.id ? (
                          <>
                            <Check className="h-3 w-3 mr-1" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 mr-1" />
                            Copy Content
                          </>
                        )}
                      </Button>
                      
                      {['Facebook', 'Twitter', 'LinkedIn'].map((platform) => (
                        <Button
                          key={platform}
                          size="sm"
                          onClick={() => shareToSocial(platform, template)}
                          className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border-blue-400/30"
                        >
                          Share to {platform}
                        </Button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Share Actions */}
      <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-400/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Quick Share Actions</h3>
            <Badge className="bg-green-500/20 text-green-400">
              Boost Traffic Now
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: 'Story Share', icon: Instagram, action: () => copyToClipboard('Check out this AI business revolution! 🚀', 'story') },
              { name: 'Tweet Thread', icon: Twitter, action: () => shareToSocial('twitter', contentTemplates[0]) },
              { name: 'LinkedIn Post', icon: Linkedin, action: () => shareToSocial('linkedin', contentTemplates[1]) },
              { name: 'Video Script', icon: Youtube, action: () => copyToClipboard(contentTemplates[0].content, 'video') }
            ].map((action, index) => (
              <Button
                key={action.name}
                onClick={action.action}
                className="bg-white/5 hover:bg-white/10 text-white border border-white/20 h-auto p-4 flex-col gap-2"
              >
                <action.icon className="h-5 w-5" />
                <span className="text-xs">{action.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
