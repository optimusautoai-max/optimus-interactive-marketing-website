import React from "react";
import { motion } from 'framer-motion';
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import {
  Shield,
  Award,
  Users,
  TrendingUp,
  Globe,
  Lock,
  Zap,
  CheckCircle,
  Star,
  Clock
} from "lucide-react";

const trustStats = [
  {
    icon: Users,
    value: "1,340+",
    label: "Active Empire Builders",
    color: "text-blue-400",
    bgColor: "bg-blue-500/20"
  },
  {
    icon: TrendingUp,
    value: "$2.8M+",
    label: "Revenue Generated This Month",
    color: "text-green-400",
    bgColor: "bg-green-500/20"
  },
  {
    icon: Globe,
    value: "42+",
    label: "Business Apps Available",
    color: "text-purple-400",
    bgColor: "bg-purple-500/20"
  },
  {
    icon: Clock,
    value: "24/7",
    label: "AI Operations Running",
    color: "text-orange-400",
    bgColor: "bg-orange-500/20"
  }
];

const certifications = [
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level encryption & compliance",
    badge: "SOC 2 Type II"
  },
  {
    icon: Award,
    title: "Industry Recognition",
    description: "AI Innovation Award 2024",
    badge: "Winner"
  },
  {
    icon: Lock,
    title: "Data Protection",
    description: "GDPR & CCPA compliant",
    badge: "Certified"
  },
  {
    icon: Zap,
    title: "Performance Guarantee",
    description: "99.9% uptime SLA",
    badge: "Guaranteed"
  }
];

const clientLogos = [
  { name: "TechFlow Solutions", revenue: "$2.4M ARR" },
  { name: "Digital Empire Co", revenue: "$1.8M ARR" },
  { name: "AutoScale Ventures", revenue: "$3.2M ARR" },
  { name: "CloudFirst Systems", revenue: "$1.6M ARR" },
  { name: "NextGen Operations", revenue: "$2.9M ARR" },
  { name: "SmartBiz Automation", revenue: "$4.1M ARR" }
];

export function TrustIndicators() {
  return (
    <section className="py-16 bg-slate-800/50">
      <div className="container mx-auto px-4">
        {/* Trust Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {trustStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 text-center">
                <CardContent className="p-6">
                  <div className={`${stat.bgColor} ${stat.color} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <motion.div
                    className={`text-3xl font-bold ${stat.color} mb-2`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications & Security */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <Badge className="bg-blue-500/20 text-blue-400 px-6 py-3 mb-4">
              <Shield className="h-4 w-4 mr-2" />
              Enterprise Grade Trust
            </Badge>
            <h3 className="text-2xl font-bold text-white">
              Trusted by Fortune 500 Standards
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border-white/20 h-full hover:bg-white/10 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="text-blue-400 mb-4 flex justify-center">
                      <cert.icon className="h-8 w-8" />
                    </div>
                    <h4 className="font-semibold text-white mb-2">{cert.title}</h4>
                    <p className="text-gray-300 text-sm mb-3">{cert.description}</p>
                    <Badge className="bg-green-500/20 text-green-400">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {cert.badge}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Client Success Stories */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge className="bg-green-500/20 text-green-400 px-6 py-3 mb-6">
            <Star className="h-4 w-4 mr-2" />
            Client Success Stories
          </Badge>
          <h3 className="text-2xl font-bold text-white mb-8">
            Powering Multi-Million Dollar Empires
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clientLogos.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:border-orange-400/30 transition-all duration-300">
                  <CardContent className="p-4 text-center">
                    <div className="font-semibold text-white mb-2">{client.name}</div>
                    <div className="text-green-400 font-bold">{client.revenue}</div>
                    <div className="text-xs text-gray-400 mt-1">Annual Recurring Revenue</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Call-to-Action */}
          <motion.div
            className="mt-8 p-6 bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-2xl border border-orange-400/30"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-white text-lg mb-4">
              <span className="text-orange-400 font-semibold">Join the exclusive group</span> of entrepreneurs 
              who've replaced their expensive teams with AI and <span className="text-green-400 font-semibold">multiplied their profits</span>
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-blue-400 border-2 border-white/20 flex items-center justify-center text-xs text-white font-bold"
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <span>+1,335 empire builders already saving $50K+/month</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
