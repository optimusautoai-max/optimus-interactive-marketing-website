import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Share2, 
  Facebook, 
  Instagram, 
  Youtube,
  Twitter,
  Linkedin,
  MessageCircle,
  Copy,
  QrCode,
  TrendingUp,
  Users,
  Zap,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface SocialPlatform {
  name: string;
  icon: any;
  color: string;
  shareUrl: string;
  description: string;
  audienceSize: string;
  conversionRate: string;
}

interface SocialMediaIntegrationProps {
  campaignActive?: boolean;
  onCampaignStart?: () => void;
}

export function SocialMediaIntegration({ campaignActive = false, onCampaignStart }: SocialMediaIntegrationProps) {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const shareContent = {
    title: '🚀 I just discovered the world\'s first Business Operating System (BOSaaS) that replaces $50K/month teams with AI!',
    description: 'Optimus Auto AI builds complete business empires with 42+ integrated apps. Instead of hiring developers, marketers, and sales teams for $25K-$50K/month, this AI does it all for $97/month. The beta is limited to 30 spots with 48 hours left!',
    url: 'https://optimusautoai.com',
    hashtags: '#BusinessAutomation #AIEmpire #Entrepreneurship #BOSaaS #StartupLife #BusinessGrowth #AIRevolution #OptimusAutoAI',
    via: 'OptimusAutoAI'
  };

  const platforms: SocialPlatform[] = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'text-blue-600',
      shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareContent.url)}&quote=${encodeURIComponent(shareContent.title + ' ' + shareContent.description)}`,
      description: 'Share with your Facebook network and business groups',
      audienceSize: '2.9B',
      conversionRate: '3.2%'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'text-pink-500',
      shareUrl: `https://www.instagram.com/`,
      description: 'Create visual content and stories about your empire',
      audienceSize: '2B',
      conversionRate: '4.7%'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'text-blue-700',
      shareUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareContent.url)}`,
      description: 'Connect with business professionals and executives',
      audienceSize: '900M',
      conversionRate: '6.1%'
    },
    {
      name: 'Twitter/X',
      icon: Twitter,
      color: 'text-gray-900',
      shareUrl: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareContent.title)}&url=${encodeURIComponent(shareContent.url)}&hashtags=${encodeURIComponent(shareContent.hashtags.replace(/#/g, ''))}&via=${shareContent.via}`,
      description: 'Tweet to entrepreneurs and startup communities',
      audienceSize: '450M',
      conversionRate: '2.8%'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      color: 'text-red-600',
      shareUrl: 'https://studio.youtube.com/',
      description: 'Create empire building content and tutorials',
      audienceSize: '2.7B',
      conversionRate: '5.3%'
    },
    {
      name: 'TikTok',
      icon: MessageCircle,
      color: 'text-black',
      shareUrl: 'https://www.tiktok.com/',
      description: 'Short-form videos about AI automation success',
      audienceSize: '1B',
      conversionRate: '7.2%'
    }
  ];

  const handleShare = (platform: SocialPlatform) => {
    // Track social sharing event
    if ((window as any).optimusTracking) {
      (window as any).optimusTracking.trackEvent('social_share', {
        platform: platform.name.toLowerCase(),
        content_type: 'empire_builder_landing'
      });
    }

    if (platform.name === 'Instagram' || platform.name === 'YouTube' || platform.name === 'TikTok') {
      // These platforms don't support direct URL sharing, so copy content instead
      navigator.clipboard.writeText(`${shareContent.title}\n\n${shareContent.description}\n\n🔗 ${shareContent.url}\n\n${shareContent.hashtags}`);
      toast.success(`Content copied! Open ${platform.name} to paste and create your post.`);
    } else {
      window.open(platform.shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareContent.url);
      setCopiedUrl(true);
      toast.success('URL copied to clipboard!');
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch (error) {
      toast.error('Failed to copy URL');
    }
  };

  const togglePlatform = (platformName: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformName) 
        ? prev.filter(p => p !== platformName)
        : [...prev, platformName]
    );
  };

  const handleStartCampaign = () => {
    if (selectedPlatforms.length === 0) {
      toast.error('Please select at least one platform to start your campaign.');
      return;
    }

    // Track campaign start
    if ((window as any).optimusTracking) {
      (window as any).optimusTracking.trackEvent('campaign_started', {
        platforms: selectedPlatforms,
        platform_count: selectedPlatforms.length
      });
    }

    onCampaignStart?.();
    toast.success(`Campaign started on ${selectedPlatforms.length} platforms! Timer activated.`);
  };

  return (
    <div className="space-y-6">
      {/* Campaign Status */}
      <Card className="bg-gradient-to-r from-orange-500/20 to-blue-500/20 border-orange-400/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <Share2 className="h-6 w-6 text-orange-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Traffic Generation Campaign</h3>
                <p className="text-gray-300 text-sm">
                  {campaignActive ? 'Active - Timer Running' : 'Ready to Launch'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge className={`${campaignActive ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
                {campaignActive ? 'Live Campaign' : 'Standby'}
              </Badge>
              
              {!campaignActive && selectedPlatforms.length > 0 && (
                <Button
                  onClick={handleStartCampaign}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Start Campaign
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Share Tools */}
      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-6">
          <h4 className="text-white font-semibold mb-4">Quick Share Tools</h4>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {/* Copy URL */}
            <Button
              onClick={handleCopyUrl}
              variant="outline"
              className="h-auto p-4 flex items-center gap-3 text-left border-white/20 hover:border-orange-400/50"
            >
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                {copiedUrl ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <Copy className="h-5 w-5 text-orange-400" />
                )}
              </div>
              <div className="flex-1">
                <div className="text-white font-medium">
                  {copiedUrl ? 'URL Copied!' : 'Copy Share URL'}
                </div>
                <div className="text-gray-400 text-sm">
                  Perfect for email, DMs, and forums
                </div>
              </div>
            </Button>

            {/* QR Code */}
            <Button
              onClick={() => {
                window.open(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(shareContent.url)}`, '_blank');
              }}
              variant="outline"
              className="h-auto p-4 flex items-center gap-3 text-left border-white/20 hover:border-blue-400/50"
            >
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <QrCode className="h-5 w-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <div className="text-white font-medium">Generate QR Code</div>
                <div className="text-gray-400 text-sm">
                  For business cards and print materials
                </div>
              </div>
            </Button>
          </div>

          {/* Share Content Preview */}
          <div className="bg-black/30 rounded-lg p-4 mb-4">
            <h5 className="text-orange-400 font-semibold mb-2">Your Share Content:</h5>
            <div className="text-white text-sm space-y-2">
              <p className="font-medium">{shareContent.title}</p>
              <p className="text-gray-300">{shareContent.description}</p>
              <p className="text-blue-400">{shareContent.url}</p>
              <p className="text-gray-400">{shareContent.hashtags}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Media Platforms */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {platforms.map((platform) => (
          <motion.div
            key={platform.name}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card 
              className={`bg-white/5 border-white/10 cursor-pointer transition-all duration-300 ${
                selectedPlatforms.includes(platform.name) 
                  ? 'border-orange-400/50 bg-orange-500/10' 
                  : 'hover:border-white/20'
              }`}
              onClick={() => togglePlatform(platform.name)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-white rounded-lg flex items-center justify-center`}>
                      <platform.icon className={`h-6 w-6 ${platform.color}`} />
                    </div>
                    <div>
                      <div className="text-white font-semibold">{platform.name}</div>
                      <div className="text-gray-400 text-xs">{platform.audienceSize} users</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    {selectedPlatforms.includes(platform.name) && (
                      <CheckCircle className="h-5 w-5 text-green-400 mb-1" />
                    )}
                    <Badge className="bg-green-500/20 text-green-400 text-xs">
                      {platform.conversionRate} CVR
                    </Badge>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4">{platform.description}</p>

                <div className="flex gap-2">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(platform);
                    }}
                    className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30"
                    size="sm"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                  
                  {!campaignActive && (
                    <Button
                      onClick={(e) => e.stopPropagation()}
                      variant="outline"
                      size="sm"
                      className={`border-white/20 ${
                        selectedPlatforms.includes(platform.name)
                          ? 'bg-orange-500/20 border-orange-400/50 text-orange-400'
                          : 'hover:border-orange-400/50'
                      }`}
                    >
                      {selectedPlatforms.includes(platform.name) ? 'Selected' : 'Select'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Campaign Instructions */}
      {!campaignActive && (
        <Card className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-400/50">
          <CardContent className="p-6">
            <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Campaign Launch Instructions
            </h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                <div>
                  <strong className="text-white">Select Your Platforms:</strong> Choose the social media platforms where your audience is most active.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                <div>
                  <strong className="text-white">Click "Start Campaign":</strong> This will activate the 48-hour countdown timer and analytics tracking.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                <div>
                  <strong className="text-white">Share Consistently:</strong> Post on your selected platforms using the provided content and track your results.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Live Campaign Stats */}
      {campaignActive && (
        <motion.div
          className="grid md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {[
            { label: 'Clicks Generated', value: '1,247', icon: TrendingUp, color: 'text-green-400' },
            { label: 'New Visitors', value: '892', icon: Users, color: 'text-blue-400' },
            { label: 'Shares/Reposts', value: '156', icon: Share2, color: 'text-orange-400' },
            { label: 'Assessments Started', value: '67', icon: Zap, color: 'text-purple-400' }
          ].map((metric) => (
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
    </div>
  );
}