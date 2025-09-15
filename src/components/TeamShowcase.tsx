import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useSound } from './SoundManager';
import { 
  Linkedin, 
  Twitter, 
  Mail, 
  Users, 
  Zap, 
  Brain,
  Code,
  Target,
  TrendingUp,
  Shield
} from 'lucide-react';

const teamMembers = [
  {
    name: "Robert Parks",
    role: "Founder & CEO",
    expertise: "AI Strategy & Business Architecture",
    bio: "Visionary entrepreneur who spent over a year creating the world's first BOSaaS (Business Operating System as a Service) platform. Architected the entire Optimus Auto AI infrastructure from concept to completion, revolutionizing how businesses operate.",
    image: "executive business leader",
    linkedin: "https://linkedin.com/in/robertparks", // Update with your actual LinkedIn
    twitter: "https://twitter.com/robertparks", // Update with your actual Twitter
    email: "robert@optimusautoai.com",
    icon: <Brain className="h-6 w-6" />,
    achievements: [
      "Created the world's first BOSaaS platform from scratch",
      "Took 1+ year to architect & build the complete system",
      "Designed 42+ integrated business automation apps",
      "Pioneered AI-powered business empire automation"
    ]
  },
  {
    name: "Lynn Markel",
    role: "Team Architect & Strategist",
    expertise: "System Architecture & Strategic Planning",
    bio: "Master strategist and system architect who helped design the foundational framework of Optimus Auto AI. Specializes in translating complex business requirements into scalable AI-powered solutions.",
    image: "professional strategist",
    linkedin: "https://linkedin.com/in/lynnmarkel", // Update with Lynn's actual LinkedIn
    email: "lynn@optimusautoai.com",
    icon: <Target className="h-6 w-6" />,
    achievements: [
      "Co-architected the BOSaaS framework foundation",
      "Designed scalable system architecture for 42+ apps",
      "Strategic planning for AI business automation",
      "Led team coordination for platform development"
    ]
  }
];

interface TeamShowcaseProps {
  onContactTeam?: () => void;
}

export function TeamShowcase({ onContactTeam }: TeamShowcaseProps) {
  const { playSound } = useSound();

  return (
    <section className="py-20 bg-slate-800 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-blue-500/5 to-purple-500/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge className="bg-orange-500/20 text-orange-400 px-6 py-3 mb-6">
            <Users className="h-5 w-5 mr-2" />
            The Minds Behind the AI Revolution
          </Badge>
          <h2 className="text-4xl font-bold text-white mb-6">
            Meet Your AI Empire Architects
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            While our AI replaces expensive teams, it's built by the world's top experts in 
            AI, business automation, and revenue generation. You get the best of both worlds: 
            <span className="text-orange-400 font-semibold"> genius-level expertise automated 24/7</span>.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:border-orange-400/50 transition-all duration-300 group h-full">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    {/* Profile Image */}
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-orange-500/20 to-blue-500/20 flex items-center justify-center">
                        <ImageWithFallback
                          src={`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=150&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwke21lbWJlci5pbWFnZX18ZW58MXx8fHwxNzU2NTE1NjkwfDA&ixlib=rb-4.1.0&q=80&w=150&utm_source=figma&utm_medium=referral`}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-orange-500 rounded-full p-2">
                        {member.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                        <p className="text-orange-400 font-semibold mb-2">{member.role}</p>
                        <Badge className="bg-blue-500/20 text-blue-400 text-xs">
                          {member.expertise}
                        </Badge>
                      </div>

                      <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                        {member.bio}
                      </p>

                      {/* Achievements */}
                      <div className="space-y-2 mb-4">
                        {member.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                            <div className="w-1 h-1 bg-orange-400 rounded-full" />
                            {achievement}
                          </div>
                        ))}
                      </div>

                      {/* Social Links */}
                      <div className="flex items-center gap-3">
                        {member.linkedin && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                            onClick={() => {
                              playSound('tick');
                              window.open(member.linkedin, '_blank');
                            }}
                            onMouseEnter={() => playSound('tick')}
                          >
                            <Linkedin className="h-4 w-4" />
                          </Button>
                        )}
                        {member.twitter && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                            onClick={() => {
                              playSound('tick');
                              window.open(member.twitter, '_blank');
                            }}
                            onMouseEnter={() => playSound('tick')}
                          >
                            <Twitter className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-2 text-orange-400 hover:text-orange-300 hover:bg-orange-500/10"
                          onClick={() => {
                            playSound('tick');
                            window.open(`mailto:${member.email}`, '_blank');
                          }}
                          onMouseEnter={() => playSound('tick')}
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-2xl p-8 backdrop-blur-xl border border-white/10 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Work with the Best?
            </h3>
            <p className="text-gray-300 mb-6">
              Our team's combined expertise is now automated and available 24/7 through Optimus Auto AI. 
              Get decades of experience working for you around the clock.
            </p>
            <Button
              className="bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600 text-white px-8 py-3"
              onClick={() => {
                playSound('achievement');
                if (onContactTeam) onContactTeam();
              }}
              onMouseEnter={() => playSound('tick')}
            >
              <Zap className="h-5 w-5 mr-2" />
              Get Expert AI Working For You
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
