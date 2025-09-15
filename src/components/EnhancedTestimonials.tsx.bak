import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  Star, 
  Trophy, 
  ChevronLeft, 
  ChevronRight,
  Play,
  Quote,
  TrendingUp,
  DollarSign,
  Clock,
  Users
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const detailedTestimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Former Team Manager, Now Empire Owner",
    company: "CloudFirst Automation",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    content: "I was spending $35K/month on staff salaries - developers, marketers, customer service. The BOSaaS platform replaced my entire team for $2,597/month and works 24/7. My profit margins went from 12% to 78%. This isn't just software, it's a complete business transformation.",
    longContent: "Before Optimus Auto AI, I was drowning in overhead costs. Between my development team ($15K/month), marketing staff ($8K/month), customer service ($7K/month), and operations manager ($5K/month), I was hemorrhaging money. The worst part? They worked limited hours, took vacations, called in sick, and I still had to manage them constantly. Now my AI empire runs 24/7, never takes a break, and delivers better results than my previous team ever did. I went from 60-hour work weeks to 10 hours of strategic oversight. My revenue has tripled while my costs dropped by 90%.",
    rating: 5,
    results: [
      { label: "Monthly Savings", value: "$32K", icon: DollarSign },
      { label: "Profit Margin Increase", value: "66%", icon: TrendingUp },
      { label: "Time Saved Weekly", value: "50 hrs", icon: Clock },
      { label: "Team Size Reduction", value: "12 → 0", icon: Users }
    ],
    beforeAfter: {
      before: "12 employees, $35K/month overhead, 12% profit margin",
      after: "0 employees, $2.5K/month, 78% profit margin"
    },
    videoTestimonial: true,
    featured: true
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "CEO, TechFlow Solutions",
    company: "TechFlow Solutions",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    content: "Replaced my $40K/month development team with the Business Empire tier. The AI builds better apps faster than my previous team ever did. No more management headaches, just results.",
    longContent: "As a tech CEO, I was skeptical about AI replacing my development team. I had 8 senior developers costing me $40K/month, plus all the project management overhead. The apps they built took months and were often buggy. The BOSaaS platform builds applications in days, not months, with zero bugs and perfect integrations. My clients are amazed at the speed and quality. I've gone from a stress-filled CEO managing difficult personalities to a strategic leader focused on growth.",
    rating: 5,
    results: [
      { label: "Development Speed", value: "400%", icon: TrendingUp },
      { label: "Cost Reduction", value: "$37K/mo", icon: DollarSign },
      { label: "Bug Reports", value: "95% less", icon: TrendingUp },
      { label: "Project Delivery", value: "10x faster", icon: Clock }
    ],
    beforeAfter: {
      before: "8 developers, $40K/month, 3-month project cycles",
      after: "AI team, $2.5K/month, 1-week project cycles"
    },
    videoTestimonial: true,
    featured: false
  },
  {
    id: 3,
    name: "Jennifer Kim",
    role: "Serial Entrepreneur",
    company: "NextGen Ventures",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    content: "The Hands-Off Empire tier is like having a world-class C-suite team for the price of one junior employee. My businesses run themselves while I sleep. True financial freedom.",
    longContent: "I've built and sold 3 companies before, but I always hit the same wall - the business required constant attention and expensive teams. With the Hands-Off Empire tier, I finally have what every entrepreneur dreams of: a business that truly runs itself. The AI handles everything from customer acquisition to service delivery. I check my dashboard for 30 minutes each morning and everything is optimized and growing. Last month I vacationed in Bali for 3 weeks and came back to higher revenue than when I left.",
    rating: 5,
    results: [
      { label: "Revenue Growth", value: "340%", icon: TrendingUp },
      { label: "Time Investment", value: "2 hrs/week", icon: Clock },
      { label: "Businesses Running", value: "4 parallel", icon: Users },
      { label: "Passive Income", value: "$180K/mo", icon: DollarSign }
    ],
    beforeAfter: {
      before: "1 business, 80 hrs/week, $80K/month revenue",
      after: "4 businesses, 2 hrs/week, $180K/month revenue"
    },
    videoTestimonial: false,
    featured: true
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Former Corporate Executive",
    company: "Freedom Enterprises",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    content: "Left my $200K corporate job to build my empire. In 6 months, I'm making more than my annual salary every quarter. The AI handles everything I used to manage entire departments for.",
    longContent: "I spent 15 years climbing the corporate ladder, managing teams of 50+ people and million-dollar budgets. The stress was killing me, and I was making my company rich while burning out. The BOSaaS platform gave me everything I managed in corporate but without the politics, meetings, and overhead. My AI empire generates more profit in 3 months than my annual corporate salary, and I work from anywhere. I went from managing people to managing results.",
    rating: 5,
    results: [
      { label: "Income Increase", value: "350%", icon: TrendingUp },
      { label: "Stress Level", value: "90% less", icon: Users },
      { label: "Work-Life Balance", value: "Perfect", icon: Clock },
      { label: "Revenue/Quarter", value: "$220K+", icon: DollarSign }
    ],
    beforeAfter: {
      before: "Corporate exec, $200K/year, 70 hrs/week",
      after: "Empire owner, $880K/year, 15 hrs/week"
    },
    videoTestimonial: true,
    featured: false
  }
];

export function EnhancedTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFullStory, setShowFullStory] = useState(false);

  const currentTestimonial = detailedTestimonials[currentIndex];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % detailedTestimonials.length);
    setShowFullStory(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + detailedTestimonials.length) % detailedTestimonials.length);
    setShowFullStory(false);
  };

  return (
    <section className="py-20 bg-slate-800 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-5">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1739300293390-da9b6b474ed9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWNjZXNzJTIwY2VsZWJyYXRpb24lMjBidXNpbmVzcyUyMGFjaGlldmVtZW50fGVufDF8fHx8MTc1NjUxNTY5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Success Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge className="bg-green-500/20 text-green-400 px-6 py-3 mb-6">
            <Trophy className="h-5 w-5 mr-2" />
            Verified Success Stories
          </Badge>
          <h2 className="text-4xl font-bold text-white mb-6">
            Complete Business Transformation Stories
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Real entrepreneurs who <span className="text-orange-400 font-semibold">replaced expensive teams</span> with 
            AI and <span className="text-green-400 font-semibold">multiplied their profits</span>
          </p>
        </motion.div>

        {/* Main Testimonial Display */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Left Side - Profile & Story */}
                    <div className="p-8">
                      {/* Profile Header */}
                      <div className="flex items-start gap-4 mb-6">
                        <div className="relative">
                          <ImageWithFallback
                            src={currentTestimonial.avatar}
                            alt={currentTestimonial.name}
                            className="w-16 h-16 rounded-full border-2 border-orange-400/50"
                          />
                          {currentTestimonial.featured && (
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                              <Trophy className="h-3 w-3 text-yellow-900" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white">{currentTestimonial.name}</h3>
                          <p className="text-orange-400 font-medium">{currentTestimonial.role}</p>
                          <p className="text-gray-400 text-sm">{currentTestimonial.company}</p>
                          <div className="flex mt-2">
                            {[...Array(currentTestimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                        {currentTestimonial.videoTestimonial && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-blue-400/50 text-blue-400 hover:bg-blue-400/10"
                          >
                            <Play className="h-4 w-4 mr-2" />
                            Video
                          </Button>
                        )}
                      </div>

                      {/* Quote */}
                      <div className="relative mb-6">
                        <Quote className="h-8 w-8 text-orange-400/50 absolute -top-2 -left-2" />
                        <p className="text-gray-200 text-lg leading-relaxed pl-6">
                          {showFullStory ? currentTestimonial.longContent : currentTestimonial.content}
                        </p>
                      </div>

                      {/* Before/After */}
                      <div className="grid grid-cols-1 gap-4 mb-6">
                        <div className="p-4 bg-red-500/10 border border-red-400/30 rounded-lg">
                          <div className="text-red-400 font-semibold text-sm mb-1">BEFORE:</div>
                          <div className="text-gray-300 text-sm">{currentTestimonial.beforeAfter.before}</div>
                        </div>
                        <div className="p-4 bg-green-500/10 border border-green-400/30 rounded-lg">
                          <div className="text-green-400 font-semibold text-sm mb-1">AFTER:</div>
                          <div className="text-gray-300 text-sm">{currentTestimonial.beforeAfter.after}</div>
                        </div>
                      </div>

                      {/* Read More Button */}
                      <Button
                        variant="ghost"
                        className="text-blue-400 hover:text-blue-300 p-0"
                        onClick={() => setShowFullStory(!showFullStory)}
                      >
                        {showFullStory ? "Show Less" : "Read Full Story"}
                      </Button>
                    </div>

                    {/* Right Side - Results */}
                    <div className="bg-gradient-to-br from-orange-500/10 to-blue-500/10 p-8 border-l border-white/10">
                      <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-green-400" />
                        Transformation Results
                      </h4>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {currentTestimonial.results.map((result, index) => (
                          <motion.div
                            key={index}
                            className="text-center p-4 bg-white/5 rounded-xl border border-white/10"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          >
                            <result.icon className="h-6 w-6 text-orange-400 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-white mb-1">{result.value}</div>
                            <div className="text-gray-400 text-xs">{result.label}</div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Impact Summary */}
                      <div className="p-4 bg-green-500/20 border border-green-400/30 rounded-lg">
                        <h5 className="text-green-400 font-semibold mb-2">Bottom Line Impact:</h5>
                        <p className="text-white text-sm">
                          {currentTestimonial.name.split(' ')[0]} transformed their business from a 
                          high-overhead, time-intensive operation into a profitable, automated empire 
                          that works 24/7 without human intervention.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevTestimonial}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous Story
            </Button>

            {/* Indicators */}
            <div className="flex gap-2">
              {detailedTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setShowFullStory(false);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? "bg-orange-400 w-8" 
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              onClick={nextTestimonial}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Next Story
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          {/* Stats Bar */}
          <motion.div
            className="mt-12 p-6 bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-2xl border border-orange-400/30"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-green-400">$47M+</div>
                <div className="text-gray-300 text-sm">Total Savings Generated</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400">1,340+</div>
                <div className="text-gray-300 text-sm">Successful Transformations</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-400">12,000+</div>
                <div className="text-gray-300 text-sm">Jobs Replaced by AI</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400">98.7%</div>
                <div className="text-gray-300 text-sm">Client Satisfaction Rate</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}