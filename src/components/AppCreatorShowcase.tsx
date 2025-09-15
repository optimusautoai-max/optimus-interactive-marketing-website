import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Sparkles,
  Code,
  Smartphone,
  Globe,
  ArrowRight,
  Zap,
  Target,
  Crown,
  Image,
  Video,
  Edit3,
  Camera,
  Palette,
  Wand2,
  FileText,
  BarChart3,
  Users,
  MessageSquare,
  Calendar,
  ShoppingCart,
  Headphones,
  Brain,
  Lightbulb,
  Rocket,
  Shield,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useSound } from './SoundManager';
import exampleImage from 'figma:asset/4c34e2e985b71a22ee4136fc8f0ce191f3146f68.png';

interface AppShowcaseProps {
  onStartCreating?: () => void;
}

const showcaseApps = [
  {
    name: "Image Creator",
    icon: Image,
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-400/30",
    iconColor: "text-purple-400",
    category: "AI Creative",
    description: "Generate stunning AI images"
  },
  {
    name: "Hyper Realistic AI Images", 
    icon: Camera,
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-400/30",
    iconColor: "text-blue-400",
    category: "AI Photography",
    description: "Ultra-realistic image generation"
  },
  {
    name: "Logo Maker",
    icon: Palette,
    color: "from-orange-500/20 to-red-500/20",
    borderColor: "border-orange-400/30",
    iconColor: "text-orange-400",
    category: "Design Tools",
    description: "Professional logo creation"
  },
  {
    name: "AI Image Editor",
    icon: Edit3,
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-400/30",
    iconColor: "text-green-400",
    category: "Photo Editing",
    description: "Advanced AI-powered editing"
  },
  {
    name: "AI Videos",
    icon: Video,
    color: "from-red-500/20 to-pink-500/20",
    borderColor: "border-red-400/30",
    iconColor: "text-red-400",
    category: "Video Creation",
    description: "Create engaging video content"
  },
  {
    name: "Motion Maker",
    icon: Zap,
    color: "from-yellow-500/20 to-orange-500/20",
    borderColor: "border-yellow-400/30",
    iconColor: "text-yellow-400",
    category: "Animation",
    description: "Animated graphics & motion"
  },
  {
    name: "Movie Editor",
    icon: FileText,
    color: "from-indigo-500/20 to-purple-500/20",
    borderColor: "border-indigo-400/30",
    iconColor: "text-indigo-400",
    category: "Video Production",
    description: "Professional video editing"
  },
  {
    name: "AI Movies",
    icon: Star,
    color: "from-pink-500/20 to-rose-500/20",
    borderColor: "border-pink-400/30",
    iconColor: "text-pink-400",
    category: "AI Cinema",
    description: "AI-generated movie content"
  },
  {
    name: "AI Voice Over",
    icon: Headphones,
    color: "from-cyan-500/20 to-blue-500/20",
    borderColor: "border-cyan-400/30",
    iconColor: "text-cyan-400",
    category: "Audio AI",
    description: "Natural voice generation"
  },
  {
    name: "AEO Funnels",
    icon: Target,
    color: "from-emerald-500/20 to-green-500/20",
    borderColor: "border-emerald-400/30",
    iconColor: "text-emerald-400",
    category: "Marketing",
    description: "Optimized sales funnels"
  },
  {
    name: "Ultra-Fast Funnels Flex",
    icon: Rocket,
    color: "from-violet-500/20 to-purple-500/20",
    borderColor: "border-violet-400/30",
    iconColor: "text-violet-400",
    category: "Sales Tools",
    description: "Lightning-fast funnel builder"
  },
  {
    name: "Smart Websites",
    icon: Globe,
    color: "from-teal-500/20 to-cyan-500/20",
    borderColor: "border-teal-400/30",
    iconColor: "text-teal-400",
    category: "Web Development",
    description: "AI-powered website creation"
  },
  {
    name: "Simple Websites",
    icon: Code,
    color: "from-gray-500/20 to-slate-500/20",
    borderColor: "border-gray-400/30",
    iconColor: "text-gray-400",
    category: "Web Builder",
    description: "Easy website building"
  },
  {
    name: "Knowledge Base",
    icon: Brain,
    color: "from-blue-600/20 to-indigo-500/20",
    borderColor: "border-blue-500/30",
    iconColor: "text-blue-500",
    category: "AI Learning",
    description: "Intelligent knowledge systems"
  },
  {
    name: "Domain Management",
    icon: Shield,
    color: "from-purple-600/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
    iconColor: "text-purple-500",
    category: "Infrastructure",
    description: "Complete domain solutions"
  },
  {
    name: "AI Domain Wizard",
    icon: Wand2,
    color: "from-amber-500/20 to-yellow-500/20",
    borderColor: "border-amber-400/30",
    iconColor: "text-amber-400",
    category: "Domain AI",
    description: "Smart domain suggestions"
  },
  {
    name: "BlogFX Blogs",
    icon: Edit3,
    color: "from-rose-500/20 to-red-500/20",
    borderColor: "border-rose-400/30",
    iconColor: "text-rose-400",
    category: "Content Creation",
    description: "Automated blog generation"
  },
  {
    name: "Scroll-Stopping Ads",
    icon: Lightbulb,
    color: "from-orange-600/20 to-amber-500/20",
    borderColor: "border-orange-500/30",
    iconColor: "text-orange-500",
    category: "Advertising",
    description: "High-converting ad content"
  },
  {
    name: "Magic Hooks",
    icon: Sparkles,
    color: "from-green-600/20 to-emerald-500/20",
    borderColor: "border-green-500/30",
    iconColor: "text-green-500",
    category: "Copywriting",
    description: "Irresistible content hooks"
  },
  {
    name: "SEO Optimized Intros",
    icon: BarChart3,
    color: "from-indigo-600/20 to-blue-500/20",
    borderColor: "border-indigo-500/30",
    iconColor: "text-indigo-500",
    category: "SEO Tools",
    description: "Search-optimized content"
  }
];

export function AppCreatorShowcase({ onStartCreating }: AppShowcaseProps) {
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);
  const { playSound } = useSound();

  return (
    <section className="py-20 bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge className="bg-orange-500/20 text-orange-400 px-6 py-3 text-lg mb-6">
            <Sparkles className="h-5 w-5 mr-2" />
            App Creation Showcase
          </Badge>
          <h2 className="text-5xl font-bold text-white mb-6">
            Create Any App You Can Imagine
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
            This is just a taste of what you can build with Optimus Auto AI. Every app you see here was created using our drag-and-drop builder - 
            <span className="text-orange-400 font-semibold"> the same system you'll have access to</span>. 
            Deploy them to your website, publish to app stores, or sell to clients for massive recurring revenue.
          </p>

          {/* Reference Image */}
          <motion.div
            className="relative max-w-5xl mx-auto mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-400/20 to-blue-400/20 rounded-2xl blur-xl"></div>
            <img
              src={exampleImage}
              alt="App Creation Examples"
              className="relative w-full rounded-xl border border-white/20 shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent rounded-xl"></div>
            <div className="absolute bottom-4 left-6 right-6">
              <Badge className="bg-green-500/20 text-green-400 border border-green-400/30">
                ✅ All Built with Optimus Auto AI
              </Badge>
            </div>
          </motion.div>
        </motion.div>

        {/* App Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-7xl mx-auto mb-16">
          {showcaseApps.map((app, index) => (
            <motion.div
              key={app.name}
              className={`bg-gradient-to-br ${app.color} backdrop-blur-xl border ${app.borderColor} rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden group`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              onMouseEnter={() => {
                setHoveredApp(app.name);
                playSound('tick');
              }}
              onMouseLeave={() => setHoveredApp(null)}
              whileHover={{ 
                y: -8, 
                scale: 1.05,
                boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)"
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => playSound('tick')}
            >
              {/* Glow effect on hover */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${app.color} rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className={`${app.iconColor} mb-4 flex justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                  <app.icon className="h-8 w-8" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">
                  {app.name}
                </h3>
                <Badge className={`${app.color} ${app.iconColor} text-xs mb-2`}>
                  {app.category}
                </Badge>
                
                {hoveredApp === app.name && (
                  <motion.p
                    className="text-gray-300 text-xs"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {app.description}
                  </motion.p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Value Proposition Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-400/30 h-full">
              <CardContent className="p-8 text-center">
                <Globe className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-4">Deploy to Your Website</h3>
                <p className="text-gray-300 mb-6">
                  Add these apps directly to your website. Create interactive experiences that keep visitors engaged and drive conversions.
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    Seamless website integration
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    Mobile-responsive design
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    Custom branding options
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-400/30 h-full">
              <CardContent className="p-8 text-center">
                <Smartphone className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-4">Publish to App Stores</h3>
                <p className="text-gray-300 mb-6">
                  Turn your creations into revenue streams. Publish to iOS and Android app stores for passive income generation.
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    Automatic app store submission
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    Revenue sharing program
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    Performance analytics included
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-400/30 h-full">
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-4">Sell to Clients</h3>
                <p className="text-gray-300 mb-6">
                  Build custom apps for clients and charge premium prices. Create recurring revenue streams with ongoing app maintenance.
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    White-label solutions
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Client collaboration tools
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Automated billing & invoicing
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Revenue Potential */}
        <motion.div
          className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/30 rounded-2xl p-8 max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center">
            <Crown className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">💰 Revenue Potential</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">$2,500+</div>
                <div className="text-sm text-gray-300">Per custom app project</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">$500+</div>
                <div className="text-sm text-gray-300">Monthly recurring per client</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-400 mb-2">$10K+</div>
                <div className="text-sm text-gray-300">Monthly potential with 5-10 apps</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl font-bold text-white mb-6">
            Ready to Start Building?
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            These apps are just the beginning. With Optimus Auto AI, you have unlimited creative potential 
            and the tools to turn your ideas into profitable digital products.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600 text-white font-semibold px-8 py-4 shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
                onClick={() => {
                  playSound('tick');
                  onStartCreating?.();
                }}
                onMouseEnter={() => playSound('tick')}
              >
                <Rocket className="h-5 w-5 mr-2" />
                Claim Your Empire Now
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 transition-all duration-300"
                onClick={() => playSound('tick')}
                onMouseEnter={() => playSound('tick')}
              >
                <Code className="h-5 w-5 mr-2" />
                See the Builder Demo
              </Button>
            </motion.div>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-400" />
              <span>No coding required</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-400" />
              <span>Built-in monetization</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-orange-400" />
              <span>Enterprise-grade hosting</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
