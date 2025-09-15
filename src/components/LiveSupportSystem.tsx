import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { 
  MessageCircle, 
  Phone, 
  Calendar, 
  Clock, 
  User, 
  Send, 
  Minimize2, 
  Maximize2,
  X,
  CheckCircle,
  AlertCircle,
  Headphones,
  Zap,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSound } from './SoundManager';

interface LiveSupportSystemProps {
  userTier?: 'starter' | 'app-empire' | 'business-empire' | 'hands-off';
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isTyping?: boolean;
}

interface SupportAgent {
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'busy' | 'away';
  specialties: string[];
}

export function LiveSupportSystem({ userTier = 'starter' }: LiveSupportSystemProps) {
  const { playSound } = useSound();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'callback' | 'schedule'>('chat');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! I\'m here to help you maximize your BOSaaS empire. What can I assist you with today?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [callbackForm, setCallbackForm] = useState({
    name: '',
    phone: '',
    preferredTime: '',
    topic: ''
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const supportAgents: SupportAgent[] = [
    {
      name: 'Sarah Chen',
      role: 'Senior BOSaaS Specialist',
      avatar: 'female tech support specialist',
      status: 'online',
      specialties: ['Platform Setup', 'Technical Integration', 'App Creation']
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Growth Strategist',
      avatar: 'business growth consultant',
      status: 'online',
      specialties: ['Revenue Optimization', 'Scaling Strategy', 'ROI Maximization']
    },
    {
      name: 'Dr. Emily Watson',
      role: 'Enterprise Consultant',
      avatar: 'enterprise business consultant',
      status: 'busy',
      specialties: ['Enterprise Setup', 'Custom Solutions', 'Team Migration']
    }
  ];

  const supportTiers = {
    starter: {
      name: 'Standard Support',
      response: '< 24 hours',
      channels: ['Email', 'Help Center'],
      color: 'blue'
    },
    'app-empire': {
      name: 'Priority Support',
      response: '< 4 hours',
      channels: ['Email', 'Live Chat', 'Help Center'],
      color: 'orange'
    },
    'business-empire': {
      name: 'Premium Support',
      response: '< 1 hour',
      channels: ['Email', 'Live Chat', 'Phone', 'Dedicated Manager'],
      color: 'purple'
    },
    'hands-off': {
      name: 'White-Glove Support',
      response: 'Immediate',
      channels: ['All Channels', 'Dedicated Team', 'Emergency Hotline'],
      color: 'yellow'
    }
  };

  const currentTier = supportTiers[userTier];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);
    playSound('tick');

    // Simulate agent response
    setTimeout(() => {
      const responses = [
        "I understand your question about the platform. Let me connect you with the right specialist to help you get the most out of your empire.",
        "That's a great question! Our BOSaaS platform is designed to handle exactly that scenario. I'll walk you through the solution.",
        "Perfect timing - we just released a new feature that addresses this. Let me show you how to implement it in your empire.",
        "I can see you're working on scaling your operations. Based on your tier, I have some specific recommendations that will help."
      ];

      const response: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, response]);
      setIsTyping(false);
      playSound('achievement');
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const scheduleCallback = () => {
    playSound('success');
    setCallbackForm({ name: '', phone: '', preferredTime: '', topic: '' });
    setActiveTab('chat');
    
    const confirmMessage: Message = {
      id: Date.now().toString(),
      text: `Perfect! I've scheduled your callback for ${callbackForm.preferredTime}. One of our ${currentTier.name} specialists will call you to discuss ${callbackForm.topic}. You'll receive a confirmation email shortly.`,
      isUser: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, confirmMessage]);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => {
              setIsOpen(true);
              playSound('whoosh');
            }}
            className="relative bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600 text-white rounded-full p-4 shadow-2xl"
          >
            <MessageCircle className="h-6 w-6" />
            {userTier !== 'starter' && (
              <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white">
                <div className="h-full w-full bg-green-400 rounded-full animate-pulse"></div>
              </div>
            )}
          </Button>
        </motion.div>
        
        <div className="absolute bottom-16 right-0 bg-slate-900 text-white p-3 rounded-lg shadow-xl max-w-xs">
          <p className="text-sm font-semibold mb-1">Need Help Building Your Empire?</p>
          <p className="text-xs text-gray-300">
            {currentTier.name} • {currentTier.response} response time
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-slate-900 border border-white/20 rounded-xl shadow-2xl ${
          isMinimized ? 'w-80' : 'w-96'
        } transition-all duration-300`}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/10 bg-gradient-to-r from-orange-500/20 to-blue-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-10 w-10 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Headphones className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-slate-900"></div>
              </div>
              <div>
                <h3 className="font-semibold text-white">{currentTier.name}</h3>
                <p className="text-xs text-gray-300">{currentTier.response} response</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsMinimized(!isMinimized);
                  playSound('tick');
                }}
                className="text-gray-400 hover:text-white p-1"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsOpen(false);
                  playSound('tick');
                }}
                className="text-gray-400 hover:text-white p-1"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {!isMinimized && (
            <div className="flex gap-1 mt-3">
              <Button
                variant={activeTab === 'chat' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => {
                  setActiveTab('chat');
                  playSound('tick');
                }}
                className="flex-1 text-xs"
              >
                <MessageCircle className="h-3 w-3 mr-1" />
                Chat
              </Button>
              {(userTier === 'business-empire' || userTier === 'hands-off') && (
                <Button
                  variant={activeTab === 'callback' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => {
                    setActiveTab('callback');
                    playSound('tick');
                  }}
                  className="flex-1 text-xs"
                >
                  <Phone className="h-3 w-3 mr-1" />
                  Callback
                </Button>
              )}
              <Button
                variant={activeTab === 'schedule' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => {
                  setActiveTab('schedule');
                  playSound('tick');
                }}
                className="flex-1 text-xs"
              >
                <Calendar className="h-3 w-3 mr-1" />
                Schedule
              </Button>
            </div>
          )}
        </div>

        {!isMinimized && (
          <div className="h-96">
            <AnimatePresence mode="wait">
              {activeTab === 'chat' && (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="h-full flex flex-col"
                >
                  {/* Messages */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-3">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.isUser
                              ? 'bg-orange-500 text-white'
                              : 'bg-white/10 text-gray-200'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-white/10 text-gray-200 p-3 rounded-lg">
                          <div className="flex gap-1">
                            <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t border-white/10">
                    <div className="flex gap-2">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="flex-1 bg-white/10 border-white/20 text-white placeholder-gray-400"
                      />
                      <Button
                        onClick={sendMessage}
                        disabled={!newMessage.trim()}
                        className="bg-orange-500 hover:bg-orange-600"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'callback' && (
                <motion.div
                  key="callback"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="h-full p-4 space-y-4"
                >
                  <div className="text-center">
                    <Phone className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                    <h4 className="font-semibold text-white mb-1">Request Callback</h4>
                    <p className="text-sm text-gray-300">A specialist will call you within {currentTier.response}</p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <Label className="text-gray-300 text-sm">Full Name</Label>
                      <Input
                        value={callbackForm.name}
                        onChange={(e) => setCallbackForm(prev => ({ ...prev, name: e.target.value }))}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300 text-sm">Phone Number</Label>
                      <Input
                        value={callbackForm.phone}
                        onChange={(e) => setCallbackForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300 text-sm">Preferred Time</Label>
                      <Input
                        type="datetime-local"
                        value={callbackForm.preferredTime}
                        onChange={(e) => setCallbackForm(prev => ({ ...prev, preferredTime: e.target.value }))}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300 text-sm">Topic</Label>
                      <Textarea
                        value={callbackForm.topic}
                        onChange={(e) => setCallbackForm(prev => ({ ...prev, topic: e.target.value }))}
                        placeholder="What would you like to discuss?"
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={scheduleCallback}
                    disabled={!callbackForm.name || !callbackForm.phone}
                    className="w-full bg-orange-500 hover:bg-orange-600"
                  >
                    Schedule Callback
                  </Button>
                </motion.div>
              )}

              {activeTab === 'schedule' && (
                <motion.div
                  key="schedule"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="h-full p-4"
                >
                  <div className="text-center mb-4">
                    <Calendar className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                    <h4 className="font-semibold text-white mb-1">Schedule Consultation</h4>
                    <p className="text-sm text-gray-300">Book a strategic session with our experts</p>
                  </div>

                  <div className="space-y-3">
                    {supportAgents.filter(agent => agent.status === 'online').map((agent, index) => (
                      <Card key={index} className="bg-white/5 border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                        <CardContent className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="h-10 w-10 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full flex items-center justify-center">
                                <User className="h-5 w-5 text-white" />
                              </div>
                              <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-slate-900 ${
                                agent.status === 'online' ? 'bg-green-400' : 
                                agent.status === 'busy' ? 'bg-yellow-400' : 'bg-gray-400'
                              }`}></div>
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-white text-sm">{agent.name}</div>
                              <div className="text-xs text-gray-300">{agent.role}</div>
                              <div className="flex gap-1 mt-1">
                                {agent.specialties.slice(0, 2).map((specialty, i) => (
                                  <Badge key={i} className="text-xs bg-blue-500/20 text-blue-400">
                                    {specialty}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                              Book
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </div>
  );
}