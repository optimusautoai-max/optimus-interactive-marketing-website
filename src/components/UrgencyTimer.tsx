import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Clock, AlertTriangle, Flame, Users, TrendingDown } from "lucide-react";

interface UrgencyTimerProps {
  slotsRemaining: number;
  countdown: {
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
    isPaused: boolean;
  };
}

export function UrgencyTimer({ slotsRemaining, countdown }: UrgencyTimerProps) {
  const [recentActions, setRecentActions] = useState([
    { action: "Empire Assessment completed", location: "San Francisco, CA", time: "2 min ago" },
    { action: "Business Empire tier selected", location: "Austin, TX", time: "4 min ago" },
    { action: "Demo video watched", location: "Miami, FL", time: "7 min ago" },
    { action: "Calendar booking scheduled", location: "Seattle, WA", time: "12 min ago" },
  ]);

  // Simulate live activity updates
  useEffect(() => {
    const interval = setInterval(() => {
      const locations = [
        "New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", 
        "Phoenix, AZ", "Philadelphia, PA", "San Antonio, TX", "San Diego, CA",
        "Dallas, TX", "San Jose, CA", "London, UK", "Toronto, CA", "Sydney, AU"
      ];
      
      const actions = [
        "Empire Assessment completed",
        "Demo video watched", 
        "Business Empire tier selected",
        "Calendar booking scheduled",
        "Dashboard accessed",
        "Success story reviewed"
      ];

      const newAction = {
        action: actions[Math.floor(Math.random() * actions.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        time: "Just now"
      };

      setRecentActions(prev => [newAction, ...prev.slice(0, 3)]);
    }, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const urgencyLevel = slotsRemaining <= 5 ? "critical" : slotsRemaining <= 10 ? "high" : "medium";
  
  const urgencyColors = {
    critical: {
      bg: "bg-red-500/20",
      border: "border-red-400/50",
      text: "text-red-400",
      icon: "text-red-400"
    },
    high: {
      bg: "bg-orange-500/20", 
      border: "border-orange-400/50",
      text: "text-orange-400",
      icon: "text-orange-400"
    },
    medium: {
      bg: "bg-yellow-500/20",
      border: "border-yellow-400/50", 
      text: "text-yellow-400",
      icon: "text-yellow-400"
    }
  };

  const colors = urgencyColors[urgencyLevel];

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 max-w-sm"
      initial={{ opacity: 0, x: 100, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
    >
      <Card className={`${colors.bg} backdrop-blur-xl ${colors.border} border-2 shadow-2xl`}>
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              {urgencyLevel === "critical" ? (
                <AlertTriangle className={`h-6 w-6 ${colors.icon}`} />
              ) : (
                <Flame className={`h-6 w-6 ${colors.icon}`} />
              )}
            </motion.div>
            <div>
              <div className={`font-bold ${colors.text}`}>
                {urgencyLevel === "critical" ? "FINAL SLOTS!" : 
                 urgencyLevel === "high" ? "LIMITED SPOTS" : "BETA ACCESS"}
              </div>
              <div className="text-white text-sm">
                Exclusive Beta Program
              </div>
            </div>
          </div>

          {/* Slots Counter */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white text-sm">Slots Remaining:</span>
              <motion.span 
                className={`font-bold text-lg ${colors.text}`}
                key={slotsRemaining}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {slotsRemaining}/30
              </motion.span>
            </div>
            
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
              <motion.div
                className={`h-full ${urgencyLevel === 'critical' ? 'bg-red-400' : 
                               urgencyLevel === 'high' ? 'bg-orange-400' : 'bg-yellow-400'}`}
                initial={{ width: 0 }}
                animate={{ width: `${(slotsRemaining / 30) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Timer Display */}
          {countdown.isPaused ? (
            <div className="mb-4 p-3 bg-blue-500/20 rounded-lg border border-blue-400/30">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-blue-400" />
                <span className="text-blue-400 font-semibold text-sm">Campaign Status</span>
              </div>
              <div className="text-white text-sm">
                Timer paused for final deployment preparations
              </div>
            </div>
          ) : (
            <div className="mb-4 p-3 bg-gray-800/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400 text-sm">Time Remaining:</span>
              </div>
              <div className="text-white font-mono text-lg">
                {countdown.hours}h {countdown.minutes}m {countdown.seconds}s
              </div>
            </div>
          )}

          {/* Recent Activity */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
              <Users className="h-3 w-3" />
              <span>Recent Activity</span>
            </div>
            
            {recentActions.slice(0, 2).map((activity, index) => (
              <motion.div
                key={`${activity.time}-${index}`}
                className="text-xs text-gray-300 bg-white/5 rounded p-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="font-medium">{activity.action}</div>
                <div className="text-gray-400 flex justify-between">
                  <span>{activity.location}</span>
                  <span>{activity.time}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Urgency Message */}
          <motion.div
            className="mt-4 p-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg border border-orange-400/30"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="text-white text-sm font-medium">
              {urgencyLevel === "critical" ? 
                "⚠️ Only 5 spots left! Secure your position now." :
                urgencyLevel === "high" ?
                "🔥 Less than 10 spots remaining. Don't miss out!" :
                "✨ Join the exclusive beta program while spots last."
              }
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
