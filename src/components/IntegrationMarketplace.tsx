import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { 
  Zap, 
  Code, 
  Database, 
  Globe, 
  ShoppingCart, 
  Mail, 
  CreditCard, 
  BarChart3,
  MessageSquare,
  Calendar,
  Shield,
  Settings,
  Search,
  Filter,
  CheckCircle,
  ArrowRight,
  Link,
  Cloud,
  Smartphone,
  Users,
  Workflow
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useSound } from './SoundManager';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface IntegrationMarketplaceProps {
  isVisible: boolean;
  onClose: () => void;
  userTier?: 'starter' | 'app-empire' | 'business-empire' | 'hands-off';
}

interface Integration {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  tier: string[];
  features: string[];
  setupTime: string;
  pricing: 'Included' | 'Premium' | 'Enterprise';
  popularity: number;
  isConnected?: boolean;
  logoQuery: string;
}

export function IntegrationMarketplace({ isVisible, onClose, userTier = 'starter' }: IntegrationMarketplaceProps) {
  const { playSound } = useSound();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [connectedIntegrations, setConnectedIntegrations] = useState<string[]>(['zapier', 'stripe', 'google-analytics']);

  const categories = [
    { id: 'all', name: 'All Integrations', icon: <Globe className="h-4 w-4" /> },
    { id: 'payment', name: 'Payments', icon: <CreditCard className="h-4 w-4" /> },
    { id: 'marketing', name: 'Marketing', icon: <Mail className="h-4 w-4" /> },
    { id: 'analytics', name: 'Analytics', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'communication', name: 'Communication', icon: <MessageSquare className="h-4 w-4" /> },
    { id: 'productivity', name: 'Productivity', icon: <Calendar className="h-4 w-4" /> },
    { id: 'development', name: 'Development', icon: <Code className="h-4 w-4" /> },
    { id: 'ecommerce', name: 'E-commerce', icon: <ShoppingCart className="h-4 w-4" /> }
  ];

  const integrations: Integration[] = [
    {
      id: 'zapier',
      name: 'Zapier',
      category: 'productivity',
      description: 'Connect 5,000+ apps with automated workflows',
      icon: <Zap className="h-6 w-6" />,
      tier: ['starter', 'app-empire', 'business-empire', 'hands-off'],
      features: ['Automated workflows', 'Multi-app connections', 'Conditional logic'],
      setupTime: '5 minutes',
      pricing: 'Included',
      popularity: 95,
      isConnected: true,
      logoQuery: 'zapier automation logo'
    },
    {
      id: 'stripe',
      name: 'Stripe',
      category: 'payment',
      description: 'Complete payment processing for global businesses',
      icon: <CreditCard className="h-6 w-6" />,
      tier: ['starter', 'app-empire', 'business-empire', 'hands-off'],
      features: ['Global payments', 'Subscription billing', 'Fraud protection'],
      setupTime: '10 minutes',
      pricing: 'Included',
      popularity: 92,
      isConnected: true,
      logoQuery: 'stripe payment processing'
    },
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      category: 'analytics',
      description: 'Advanced web analytics and reporting',
      icon: <BarChart3 className="h-6 w-6" />,
      tier: ['starter', 'app-empire', 'business-empire', 'hands-off'],
      features: ['Real-time analytics', 'Custom reporting', 'Audience insights'],
      setupTime: '3 minutes',
      pricing: 'Included',
      popularity: 98,
      isConnected: true,
      logoQuery: 'google analytics dashboard'
    },
    {
      id: 'salesforce',
      name: 'Salesforce',
      category: 'marketing',
      description: 'Enterprise CRM and sales automation',
      icon: <Users className="h-6 w-6" />,
      tier: ['business-empire', 'hands-off'],
      features: ['Lead management', 'Sales pipeline', 'Custom fields'],
      setupTime: '30 minutes',
      pricing: 'Premium',
      popularity: 88,
      logoQuery: 'salesforce crm platform'
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      category: 'marketing',
      description: 'Inbound marketing and sales platform',
      icon: <Mail className="h-6 w-6" />,
      tier: ['app-empire', 'business-empire', 'hands-off'],
      features: ['Email marketing', 'Lead scoring', 'Marketing automation'],
      setupTime: '15 minutes',
      pricing: 'Included',
      popularity: 85,
      logoQuery: 'hubspot marketing platform'
    },
    {
      id: 'slack',
      name: 'Slack',
      category: 'communication',
      description: 'Team communication and collaboration',
      icon: <MessageSquare className="h-6 w-6" />,
      tier: ['starter', 'app-empire', 'business-empire', 'hands-off'],
      features: ['Real-time messaging', 'File sharing', 'App integrations'],
      setupTime: '5 minutes',
      pricing: 'Included',
      popularity: 90,
      logoQuery: 'slack team communication'
    },
    {
      id: 'shopify',
      name: 'Shopify',
      category: 'ecommerce',
      description: 'Complete e-commerce platform',
      icon: <ShoppingCart className="h-6 w-6" />,
      tier: ['app-empire', 'business-empire', 'hands-off'],
      features: ['Online store', 'Inventory management', 'Order processing'],
      setupTime: '20 minutes',
      pricing: 'Included',
      popularity: 87,
      logoQuery: 'shopify ecommerce platform'
    },
    {
      id: 'aws',
      name: 'Amazon Web Services',
      category: 'development',
      description: 'Cloud computing and infrastructure',
      icon: <Cloud className="h-6 w-6" />,
      tier: ['business-empire', 'hands-off'],
      features: ['Cloud hosting', 'Database services', 'AI/ML tools'],
      setupTime: '45 minutes',
      pricing: 'Enterprise',
      popularity: 93,
      logoQuery: 'aws cloud infrastructure'
    },
    {
      id: 'twilio',
      name: 'Twilio',
      category: 'communication',
      description: 'Programmable communications platform',
      icon: <Smartphone className="h-6 w-6" />,
      tier: ['app-empire', 'business-empire', 'hands-off'],
      features: ['SMS messaging', 'Voice calls', 'Video conferencing'],
      setupTime: '25 minutes',
      pricing: 'Premium',
      popularity: 82,
      logoQuery: 'twilio communications platform'
    },
    {
      id: 'github',
      name: 'GitHub',
      category: 'development',
      description: 'Version control and collaboration',
      icon: <Code className="h-6 w-6" />,
      tier: ['app-empire', 'business-empire', 'hands-off'],
      features: ['Code repositories', 'Version control', 'Collaboration tools'],
      setupTime: '10 minutes',
      pricing: 'Included',
      popularity: 91,
      logoQuery: 'github code repository'
    },
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      category: 'marketing',
      description: 'Email marketing automation',
      icon: <Mail className="h-6 w-6" />,
      tier: ['starter', 'app-empire', 'business-empire', 'hands-off'],
      features: ['Email campaigns', 'Audience segmentation', 'Analytics'],
      setupTime: '8 minutes',
      pricing: 'Included',
      popularity: 84,
      logoQuery: 'mailchimp email marketing'
    },
    {
      id: 'notion',
      name: 'Notion',
      category: 'productivity',
      description: 'All-in-one workspace',
      icon: <Settings className="h-6 w-6" />,
      tier: ['starter', 'app-empire', 'business-empire', 'hands-off'],
      features: ['Knowledge base', 'Project management', 'Database'],
      setupTime: '12 minutes',
      pricing: 'Included',
      popularity: 79,
      logoQuery: 'notion workspace platform'
    }
  ];

  const filteredIntegrations = integrations.filter(integration => {
    const matchesCategory = activeCategory === 'all' || integration.category === activeCategory;
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = integration.tier.includes(userTier);
    
    return matchesCategory && matchesSearch && matchesTier;
  });

  const connectIntegration = (integrationId: string) => {
    setConnectedIntegrations(prev => 
      prev.includes(integrationId) 
        ? prev.filter(id => id !== integrationId)
        : [...prev, integrationId]
    );
    playSound('success');
  };

  const getTierBadgeColor = (pricing: string) => {
    switch (pricing) {
      case 'Included': return 'bg-green-500/20 text-green-400';
      case 'Premium': return 'bg-orange-500/20 text-orange-400';
      case 'Enterprise': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-slate-900 rounded-2xl border border-white/10 max-w-7xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Integration Marketplace</h2>
              <p className="text-gray-300">Connect your empire to the world's most powerful platforms</p>
            </div>
            <Button
              variant="ghost"
              onClick={() => {
                playSound('tick');
                onClose();
              }}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search integrations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white"
              />
            </div>
            <div className="flex gap-2">
              <Badge className="bg-green-500/20 text-green-400">
                {connectedIntegrations.length} Connected
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-400">
                {filteredIntegrations.length} Available
              </Badge>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => {
                  setActiveCategory(category.id);
                  playSound('tick');
                }}
                className={`whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {category.icon}
                <span className="ml-2">{category.name}</span>
              </Button>
            ))}
          </div>

          {/* Integration Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIntegrations.map((integration, index) => (
              <motion.div
                key={integration.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="bg-white/5 border-white/10 h-full hover:bg-white/10 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-2 bg-white/10 rounded-lg">
                        {integration.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-white">{integration.name}</h3>
                          {connectedIntegrations.includes(integration.id) && (
                            <CheckCircle className="h-4 w-4 text-green-400" />
                          )}
                        </div>
                        <p className="text-gray-300 text-sm mb-2">{integration.description}</p>
                        <div className="flex gap-2">
                          <Badge className={getTierBadgeColor(integration.pricing)}>
                            {integration.pricing}
                          </Badge>
                          <Badge className="bg-gray-500/20 text-gray-400">
                            {integration.setupTime}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-300 mb-2">Features</h4>
                        <div className="space-y-1">
                          {integration.features.slice(0, 3).map((feature, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                              <div className="h-1 w-1 bg-orange-400 rounded-full"></div>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`h-2 w-2 rounded-full mr-1 ${
                                  i < Math.floor(integration.popularity / 20)
                                    ? 'bg-yellow-400'
                                    : 'bg-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-400">{integration.popularity}%</span>
                        </div>
                        
                        <Button
                          size="sm"
                          onClick={() => connectIntegration(integration.id)}
                          onMouseEnter={() => playSound('tick')}
                          className={
                            connectedIntegrations.includes(integration.id)
                              ? 'bg-green-500 hover:bg-green-600 text-white'
                              : 'bg-orange-500 hover:bg-orange-600 text-white'
                          }
                        >
                          {connectedIntegrations.includes(integration.id) ? (
                            <>
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Connected
                            </>
                          ) : (
                            <>
                              <Link className="h-4 w-4 mr-1" />
                              Connect
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Custom Integration CTA */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-r from-orange-500/20 to-blue-500/20 border-orange-400/30">
              <CardContent className="p-8 text-center">
                <Workflow className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  Need a Custom Integration?
                </h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  Our {userTier === 'hands-off' ? 'dedicated development team' : 'integration specialists'} can build 
                  custom connections to any platform or API. Most custom integrations completed within 2-4 weeks.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">500+</div>
                    <div className="text-sm text-gray-400">APIs Supported</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">2-4 weeks</div>
                    <div className="text-sm text-gray-400">Development Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">24/7</div>
                    <div className="text-sm text-gray-400">Monitoring</div>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    playSound('achievement');
                    onClose();
                  }}
                  className="bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600 text-white"
                >
                  Request Custom Integration
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tier Upgrade Notice */}
          {(userTier === 'starter' || userTier === 'app-empire') && (
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="bg-yellow-500/10 border-yellow-400/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Shield className="h-8 w-8 text-yellow-400" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">
                        Unlock Enterprise Integrations
                      </h4>
                      <p className="text-gray-300 text-sm">
                        Upgrade to Business Empire or Hands-Off Empire to access premium integrations like 
                        Salesforce, AWS, and custom enterprise solutions.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        playSound('tick');
                        onClose();
                      }}
                      className="border-yellow-400/50 text-yellow-400 hover:bg-yellow-500/20"
                    >
                      View Tiers
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
