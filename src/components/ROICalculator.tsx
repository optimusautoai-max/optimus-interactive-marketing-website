import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Calculator, 
  Zap, 
  ArrowRight,
  CheckCircle,
  X,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from './SoundManager';

interface ROICalculatorProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectTier?: (tier: string) => void;
}

interface TeamMember {
  role: string;
  averageSalary: number;
  count: number;
  benefits: number; // percentage
}

export function ROICalculator({ isVisible, onClose, onSelectTier }: ROICalculatorProps) {
  const { playSound } = useSound();
  const [teamSize, setTeamSize] = useState(15);
  const [customRoles, setCustomRoles] = useState<TeamMember[]>([
    { role: 'Software Developers', averageSalary: 120000, count: 3, benefits: 30 },
    { role: 'Marketing Team', averageSalary: 85000, count: 2, benefits: 25 },
    { role: 'Sales Team', averageSalary: 95000, count: 3, benefits: 25 },
    { role: 'Customer Support', averageSalary: 55000, count: 2, benefits: 20 },
    { role: 'Operations Manager', averageSalary: 110000, count: 1, benefits: 30 },
    { role: 'Marketing Manager', averageSalary: 100000, count: 1, benefits: 30 },
    { role: 'Sales Manager', averageSalary: 120000, count: 1, benefits: 30 },
    { role: 'CTO/Tech Lead', averageSalary: 180000, count: 1, benefits: 35 },
    { role: 'CEO/Founder Time', averageSalary: 200000, count: 1, benefits: 40 }
  ]);

  const [selectedTier, setSelectedTier] = useState('business-empire');

  const tiers = {
    'starter': { price: 97, name: 'Empire Starter', color: 'blue' },
    'app-empire': { price: 297, name: 'App Empire', color: 'orange' },
    'business-empire': { price: 2597, name: 'Business Empire', color: 'purple' },
    'hands-off': { price: 6597, name: 'Hands-Off Empire', color: 'yellow' }
  };

  // Calculate traditional team costs
  const calculateTeamCosts = () => {
    const totalMonthlyCost = customRoles.reduce((total, member) => {
      const monthlySalary = (member.averageSalary * member.count) / 12;
      const benefitsCost = monthlySalary * (member.benefits / 100);
      return total + monthlySalary + benefitsCost;
    }, 0);

    const yearlyTeamCost = totalMonthlyCost * 12;
    const totalTeamMembers = customRoles.reduce((total, member) => total + member.count, 0);

    return {
      monthly: totalMonthlyCost,
      yearly: yearlyTeamCost,
      teamMembers: totalTeamMembers
    };
  };

  const teamCosts = calculateTeamCosts();
  const selectedTierPrice = tiers[selectedTier as keyof typeof tiers].price;
  const monthlySavings = teamCosts.monthly - selectedTierPrice;
  const yearlySavings = monthlySavings * 12;
  const savingsPercentage = ((monthlySavings / teamCosts.monthly) * 100);

  const updateRoleCount = (index: number, newCount: number) => {
    setCustomRoles(prev => prev.map((role, i) => 
      i === index ? { ...role, count: Math.max(0, newCount) } : role
    ));
    playSound('tick');
  };

  const updateRoleSalary = (index: number, newSalary: number) => {
    setCustomRoles(prev => prev.map((role, i) => 
      i === index ? { ...role, averageSalary: Math.max(0, newSalary) } : role
    ));
    playSound('tick');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-slate-900 rounded-2xl border border-white/10 max-w-6xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">ROI Calculator</h2>
              <p className="text-gray-300">See exactly how much you'll save by replacing teams with AI</p>
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

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Team Configuration */}
            <div className="space-y-6">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Your Current Team Structure
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {customRoles.map((role, index) => (
                    <div key={index} className="p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-white">{role.role}</h4>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateRoleCount(index, role.count - 1)}
                            className="h-8 w-8 p-0 border-white/20"
                          >
                            -
                          </Button>
                          <span className="text-white w-8 text-center">{role.count}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateRoleCount(index, role.count + 1)}
                            className="h-8 w-8 p-0 border-white/20"
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-gray-300 text-sm">Annual Salary</Label>
                          <Input
                            type="number"
                            value={role.averageSalary}
                            onChange={(e) => updateRoleSalary(index, parseInt(e.target.value) || 0)}
                            className="bg-white/10 border-white/20 text-white mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300 text-sm">Monthly Cost</Label>
                          <div className="text-green-400 font-semibold mt-2">
                            ${((role.averageSalary * role.count / 12) * (1 + role.benefits / 100)).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Savings Calculation */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-green-500/20 to-blue-500/20 border-green-400/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Your Savings Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white/10 rounded-lg">
                      <div className="text-gray-300 text-sm mb-1">Current Team Cost</div>
                      <div className="text-2xl font-bold text-red-400">
                        ${teamCosts.monthly.toLocaleString()}/mo
                      </div>
                    </div>
                    <div className="text-center p-4 bg-white/10 rounded-lg">
                      <div className="text-gray-300 text-sm mb-1">Team Members</div>
                      <div className="text-2xl font-bold text-orange-400">
                        {teamCosts.teamMembers}
                      </div>
                    </div>
                  </div>

                  {/* Tier Selection */}
                  <div>
                    <Label className="text-white mb-3 block">Choose Optimus Auto AI Tier:</Label>
                    <div className="space-y-2">
                      {Object.entries(tiers).map(([key, tier]) => (
                        <button
                          key={key}
                          onClick={() => {
                            setSelectedTier(key);
                            playSound('tick');
                          }}
                          className={`w-full p-3 rounded-lg border text-left transition-all ${
                            selectedTier === key
                              ? 'border-orange-400 bg-orange-500/20 text-white'
                              : 'border-white/20 bg-white/5 text-gray-300 hover:border-white/40'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-semibold">{tier.name}</span>
                            <span className="text-lg font-bold">${tier.price}/mo</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-white/20 pt-6">
                    <div className="space-y-4">
                      <motion.div 
                        className="text-center p-6 bg-gradient-to-br from-green-500/30 to-blue-500/30 rounded-xl border border-green-400/30"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        key={monthlySavings}
                      >
                        <div className="text-sm text-gray-200 mb-2">Monthly Savings</div>
                        <div className="text-4xl font-bold text-green-400 mb-2">
                          ${monthlySavings.toLocaleString()}
                        </div>
                        <div className="text-lg text-green-300">
                          {savingsPercentage.toFixed(1)}% cost reduction
                        </div>
                      </motion.div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-white/10 rounded-lg">
                          <div className="text-gray-300 text-sm mb-1">Annual Savings</div>
                          <div className="text-xl font-bold text-green-400">
                            ${yearlySavings.toLocaleString()}
                          </div>
                        </div>
                        <div className="text-center p-4 bg-white/10 rounded-lg">
                          <div className="text-gray-300 text-sm mb-1">5-Year Savings</div>
                          <div className="text-xl font-bold text-blue-400">
                            ${(yearlySavings * 5).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Value Comparison */}
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    What You Get vs. Traditional Teams
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Works 24/7 (no breaks/vacation)</span>
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">No hiring/training time</span>
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">No employee turnover risk</span>
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Scales instantly</span>
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Always up-to-date with latest tech</span>
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Zero management overhead</span>
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button
                  onClick={() => {
                    playSound('success');
                    onSelectTier?.(selectedTier);
                    onClose();
                  }}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600 text-white font-semibold py-3"
                >
                  Start Saving ${Math.round(monthlySavings).toLocaleString()}/month
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-400/30">
            <div className="text-center">
              <h4 className="font-bold text-white mb-2">💡 ROI Guarantee</h4>
              <p className="text-gray-300">
                If you don't save at least ${Math.round(monthlySavings * 0.5).toLocaleString()}/month within 90 days, 
                we'll refund 100% of your investment. That's how confident we are in your success.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
