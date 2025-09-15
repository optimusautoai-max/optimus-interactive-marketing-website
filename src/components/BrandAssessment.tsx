import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { motion, AnimatePresence } from 'framer-motion';
import {
  Crown,
  Target,
  Lightbulb,
  Compass,
  Book,
  ArrowRight,
  Download,
  Brain,
  TrendingUp,
  Users,
  DollarSign,
  Zap,
  Shield,
  Star,
  BarChart3,
  PieChart,
  LineChart,
  Award,
  Briefcase,
  Globe,
  ChevronDown,
  CheckCircle,
  Clock,
  FileText,
  Printer,
  Sparkles,
  Eye,
  MessageSquare,
  Heart,
  Rocket,
  Trophy,
  ArrowLeft,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { PDFGenerator } from "./PDFGenerator";
import { useSound } from "./SoundManager";

interface BrandQuestion {
  question: string;
  subtitle: string;
  answers: Array<{
    text: string;
    archetype: string;
    icon: React.ReactNode;
    description: string;
    businessValue: string;
  }>;
}

const brandQuestions: BrandQuestion[] = [
  {
    question: "What drives your entrepreneurial vision?",
    subtitle:
      "Understanding your core motivation shapes your empire's foundation",
    answers: [
      {
        text: "Revolutionary innovation and creative breakthroughs",
        archetype: "Creator",
        icon: <Lightbulb className="h-6 w-6" />,
        description:
          "You see opportunities where others see obstacles",
        businessValue: "Innovation-driven market disruption",
      },
      {
        text: "Empowering others and creating meaningful impact",
        archetype: "Caregiver",
        icon: <Heart className="h-6 w-6" />,
        description:
          "Your success is measured by the success of others",
        businessValue: "Community-centered sustainable growth",
      },
      {
        text: "Achieving excellence and overcoming challenges",
        archetype: "Hero",
        icon: <Trophy className="h-6 w-6" />,
        description:
          "You transform challenges into competitive advantages",
        businessValue: "Performance-driven market leadership",
      },
      {
        text: "Discovering new opportunities and markets",
        archetype: "Explorer",
        icon: <Compass className="h-6 w-6" />,
        description: "You find value in uncharted territories",
        businessValue: "First-mover advantage positioning",
      },
      {
        text: "Sharing knowledge and building expertise",
        archetype: "Sage",
        icon: <Book className="h-6 w-6" />,
        description:
          "Your wisdom becomes your competitive moat",
        businessValue: "Authority-based premium positioning",
      },
    ],
  },
  {
    question: "How do you approach business challenges?",
    subtitle:
      "Your problem-solving style determines your strategic methodology",
    answers: [
      {
        text: "With strategic authority and systematic control",
        archetype: "Ruler",
        icon: <Crown className="h-6 w-6" />,
        description: "You build systems that others follow",
        businessValue:
          "Systematic scalability & market dominance",
      },
      {
        text: "Through innovative thinking and creative solutions",
        archetype: "Creator",
        icon: <Lightbulb className="h-6 w-6" />,
        description:
          "You turn constraints into creative catalysts",
        businessValue:
          "Disruptive innovation & unique value propositions",
      },
      {
        text: "By leading teams and inspiring action",
        archetype: "Hero",
        icon: <Target className="h-6 w-6" />,
        description: "You rally people around ambitious goals",
        businessValue:
          "High-performance culture & execution excellence",
      },
      {
        text: "With adaptability and optimistic energy",
        archetype: "Jester",
        icon: <Sparkles className="h-6 w-6" />,
        description:
          "You make complex problems feel manageable",
        businessValue:
          "Agile adaptation & positive brand perception",
      },
      {
        text: "Through research and analytical insight",
        archetype: "Sage",
        icon: <Brain className="h-6 w-6" />,
        description: "You make data-driven strategic decisions",
        businessValue:
          "Evidence-based competitive intelligence",
      },
    ],
  },
  {
    question: "What motivates your ideal customers?",
    subtitle:
      "Customer psychology insights drive your value proposition architecture",
    answers: [
      {
        text: "Transformation and breakthrough results",
        archetype: "Magician",
        icon: <Zap className="h-6 w-6" />,
        description: "They want dramatic, measurable change",
        businessValue: "High-value transformation services",
      },
      {
        text: "Security, trust, and reliable support",
        archetype: "Caregiver",
        icon: <Shield className="h-6 w-6" />,
        description: "They prioritize safety and dependability",
        businessValue: "Trust-based recurring revenue models",
      },
      {
        text: "Adventure, freedom, and new experiences",
        archetype: "Explorer",
        icon: <Globe className="h-6 w-6" />,
        description: "They seek liberation from limitations",
        businessValue: "Experience-driven premium offerings",
      },
      {
        text: "Connection, passion, and relationships",
        archetype: "Lover",
        icon: <Users className="h-6 w-6" />,
        description:
          "They value emotional engagement and community",
        businessValue: "Community-driven viral growth",
      },
      {
        text: "Status, prestige, and market leadership",
        archetype: "Ruler",
        icon: <Award className="h-6 w-6" />,
        description:
          "They want to be recognized as industry leaders",
        businessValue: "Luxury positioning & executive markets",
      },
    ],
  },
  {
    question: "Your ultimate business success looks like:",
    subtitle:
      "Your vision of success defines your empire's destination",
    answers: [
      {
        text: "Dominating your market as the clear leader",
        archetype: "Ruler",
        icon: <Crown className="h-6 w-6" />,
        description: "You aim for undisputed market supremacy",
        businessValue: "Market monopolization strategy",
      },
      {
        text: "Creating magical transformations for clients",
        archetype: "Magician",
        icon: <Sparkles className="h-6 w-6" />,
        description: "You deliver results that seem impossible",
        businessValue: "Miracle-level outcome positioning",
      },
      {
        text: "Building something entirely new and original",
        archetype: "Creator",
        icon: <Rocket className="h-6 w-6" />,
        description:
          "You want to pioneer completely new categories",
        businessValue: "Blue ocean market creation",
      },
      {
        text: "Making a positive difference in the world",
        archetype: "Caregiver",
        icon: <Heart className="h-6 w-6" />,
        description: "Your impact extends beyond profit",
        businessValue: "Purpose-driven sustainable advantage",
      },
      {
        text: "Achieving complete independence and freedom",
        archetype: "Explorer",
        icon: <Globe className="h-6 w-6" />,
        description: "You want total autonomy and flexibility",
        businessValue: "Location-independent scalable systems",
      },
    ],
  },
  {
    question: "Your brand communication style should be:",
    subtitle:
      "Your voice shapes how the market perceives and responds to your empire",
    answers: [
      {
        text: "Authoritative, confident, and commanding",
        archetype: "Ruler",
        icon: <Crown className="h-6 w-6" />,
        description: "You speak with unquestioned authority",
        businessValue:
          "Premium pricing through perceived expertise",
      },
      {
        text: "Inspiring, courageous, and motivational",
        archetype: "Hero",
        icon: <Target className="h-6 w-6" />,
        description: "You motivate others to achieve greatness",
        businessValue: "High-engagement community building",
      },
      {
        text: "Caring, supportive, and trustworthy",
        archetype: "Caregiver",
        icon: <Heart className="h-6 w-6" />,
        description: "You create safe spaces for growth",
        businessValue: "High-retention loyalty programs",
      },
      {
        text: "Mysterious, transformative, and powerful",
        archetype: "Magician",
        icon: <Eye className="h-6 w-6" />,
        description: "You promise extraordinary possibilities",
        businessValue: "Exclusive high-value service tiers",
      },
      {
        text: "Authentic, adventurous, and genuine",
        archetype: "Explorer",
        icon: <Compass className="h-6 w-6" />,
        description: "You connect through honest vulnerability",
        businessValue: "Authentic brand differentiation",
      },
    ],
  },
];

const archetypeDescriptions = {
  Creator: {
    title: "The Visionary Creator",
    subtitle: "Innovation-Driven Empire Architect",
    description:
      "You're driven by innovation and the desire to create something meaningful. Your empire will be built on unique solutions and creative breakthroughs that reshape entire industries.",
    strengths: [
      "Disruptive Innovation",
      "Creative Problem-Solving",
      "Visionary Leadership",
      "Original Market Positioning",
      "Intellectual Property Creation",
    ],
    strategy:
      "Focus on developing cutting-edge apps and services that solve problems in entirely new ways. Your empire thrives on being first to market with breakthrough solutions.",
    revenueModel:
      "Innovation licensing, premium product positioning, subscription-based creative tools",
    marketPosition: "Industry Pioneer & Technology Disruptor",
    keyMetrics: [
      "Innovation Pipeline Value",
      "Patent Portfolio ROI",
      "Time-to-Market Advantage",
      "Creative Asset Monetization",
    ],
    riskProfile:
      "High-reward early adopter with strong competitive moats",
    color: "from-purple-400 to-pink-400",
    icon: <Lightbulb className="h-8 w-8" />,
  },
  Caregiver: {
    title: "The Nurturing Leader",
    subtitle: "Community-Centered Empire Builder",
    description:
      "You're motivated by helping others succeed and creating meaningful impact. Your empire will thrive by creating value and supporting your community's growth and success.",
    strengths: [
      "Community Building",
      "Trust Development",
      "Service Excellence",
      "Sustainable Growth",
      "Stakeholder Alignment",
    ],
    strategy:
      "Build platforms that empower others and create win-win relationships. Your success multiplies through the success of your community.",
    revenueModel:
      "Subscription communities, service partnerships, outcome-based pricing",
    marketPosition: "Trusted Advisor & Community Catalyst",
    keyMetrics: [
      "Community Engagement Rate",
      "Member Success Outcomes",
      "Retention & Lifetime Value",
      "Referral Network Growth",
    ],
    riskProfile:
      "Stable growth with high customer loyalty and word-of-mouth expansion",
    color: "from-green-400 to-blue-400",
    icon: <Heart className="h-8 w-8" />,
  },
  Hero: {
    title: "The Champion",
    subtitle: "Performance-Driven Empire Commander",
    description:
      "You're driven by achievement and overcoming challenges. Your empire will be built through determination, inspiring others, and consistently delivering exceptional results.",
    strengths: [
      "Performance Excellence",
      "Team Leadership",
      "Challenge Navigation",
      "Results Delivery",
      "Competitive Advantage",
    ],
    strategy:
      "Position yourself as the go-to solution for ambitious entrepreneurs who demand the highest levels of performance and results.",
    revenueModel:
      "Performance-based contracts, premium coaching, executive consulting",
    marketPosition:
      "Elite Performance Partner & Results Guarantor",
    keyMetrics: [
      "Client Success Rate",
      "Performance Improvements",
      "Goal Achievement Ratio",
      "Leadership Effectiveness Score",
    ],
    riskProfile:
      "Results-driven with proven track record of delivering outcomes",
    color: "from-red-400 to-orange-400",
    icon: <Trophy className="h-8 w-8" />,
  },
  Explorer: {
    title: "The Pioneer",
    subtitle: "Freedom-Focused Empire Voyager",
    description:
      "You value freedom and discovery. Your empire will expand into new markets and innovative territories, creating opportunities where others see only uncertainty.",
    strengths: [
      "Market Discovery",
      "Adaptive Strategy",
      "Freedom & Flexibility",
      "Risk Navigation",
      "Opportunity Recognition",
    ],
    strategy:
      "Explore emerging markets and create unique business opportunities in uncharted territories with maximum operational freedom.",
    revenueModel:
      "Multiple revenue streams, geographic expansion, emerging market entry",
    marketPosition:
      "First-Mover Advantage Specialist & Market Pioneer",
    keyMetrics: [
      "New Market Penetration",
      "Adaptation Speed",
      "Geographic Revenue Spread",
      "Innovation Adoption Rate",
    ],
    riskProfile:
      "Diversified risk through multiple markets and adaptive strategies",
    color: "from-teal-400 to-cyan-400",
    icon: <Compass className="h-8 w-8" />,
  },
  Sage: {
    title: "The Wisdom Keeper",
    subtitle: "Knowledge-Based Empire Strategist",
    description:
      "You're driven by knowledge and understanding. Your empire will be built on expertise, strategic insights, and becoming the definitive authority in your domain.",
    strengths: [
      "Strategic Intelligence",
      "Expert Authority",
      "Knowledge Monetization",
      "Data-Driven Decisions",
      "Thought Leadership",
    ],
    strategy:
      "Become the trusted advisor and thought leader in your industry through superior knowledge and strategic insights.",
    revenueModel:
      "Knowledge products, consulting retainers, certification programs",
    marketPosition:
      "Industry Authority & Strategic Intelligence Provider",
    keyMetrics: [
      "Thought Leadership Reach",
      "Knowledge Asset Value",
      "Expert Network Growth",
      "Strategic Decision Impact",
    ],
    riskProfile:
      "Low-risk intellectual asset building with compound growth potential",
    color: "from-indigo-400 to-purple-400",
    icon: <Brain className="h-8 w-8" />,
  },
  Ruler: {
    title: "The Empire Builder",
    subtitle: "Authority-Driven Market Dominator",
    description:
      "You're motivated by control and leadership. Your empire will be structured for maximum efficiency, systematic scalability, and complete market dominance.",
    strengths: [
      "Strategic Control",
      "System Building",
      "Market Dominance",
      "Operational Excellence",
      "Leadership Authority",
    ],
    strategy:
      "Build systematic, scalable business processes that dominate your market through superior organization and strategic control.",
    revenueModel:
      "Market leadership premiums, licensing systems, franchise models",
    marketPosition: "Market Leader & Industry Standard Setter",
    keyMetrics: [
      "Market Share Growth",
      "System Efficiency",
      "Competitive Positioning",
      "Authority Recognition",
    ],
    riskProfile:
      "Controlled growth with systematic risk management and market protection",
    color: "from-yellow-400 to-orange-400",
    icon: <Crown className="h-8 w-8" />,
  },
  Magician: {
    title: "The Transformer",
    subtitle: "Results-Focused Empire Alchemist",
    description:
      "You're driven by transformation and breakthrough results. Your empire will create seemingly magical experiences and impossible-seeming outcomes for clients.",
    strengths: [
      "Dramatic Transformation",
      "Breakthrough Results",
      "Value Creation",
      "Client Success",
      "Outcome Delivery",
    ],
    strategy:
      "Focus on creating dramatic, measurable transformations that seem impossible to achieve through conventional means.",
    revenueModel:
      "Transformation guarantees, high-value outcomes, exclusive access programs",
    marketPosition:
      "Miracle Worker & Transformation Specialist",
    keyMetrics: [
      "Transformation Success Rate",
      "Client Outcome Value",
      "Before/After Metrics",
      "Impossible Results Delivered",
    ],
    riskProfile:
      "High-value outcomes with performance-based risk sharing",
    color: "from-violet-400 to-purple-400",
    icon: <Zap className="h-8 w-8" />,
  },
  Jester: {
    title: "The Innovator",
    subtitle: "Energy-Driven Empire Catalyst",
    description:
      "You bring joy and fresh perspectives to business. Your empire will be built on positive energy, creative solutions, and making success enjoyable for everyone involved.",
    strengths: [
      "Positive Energy",
      "Creative Innovation",
      "Engagement Building",
      "Cultural Transformation",
      "Adaptive Solutions",
    ],
    strategy:
      "Create engaging, enjoyable experiences that stand out from competitors while maintaining high performance and results.",
    revenueModel:
      "Engagement-based models, creative services, culture transformation",
    marketPosition: "Culture Catalyst & Engagement Specialist",
    keyMetrics: [
      "Engagement Rates",
      "Cultural Impact",
      "Innovation Velocity",
      "Joy & Satisfaction Scores",
    ],
    riskProfile:
      "Differentiated positioning with high engagement and loyalty",
    color: "from-pink-400 to-red-400",
    icon: <Sparkles className="h-8 w-8" />,
  },
  Lover: {
    title: "The Connector",
    subtitle: "Relationship-Driven Empire Architect",
    description:
      "You're motivated by relationships and passion. Your empire will thrive through deep connections, emotional engagement, and creating meaningful bonds with your community.",
    strengths: [
      "Relationship Building",
      "Emotional Intelligence",
      "Community Connection",
      "Loyalty Creation",
      "Passionate Engagement",
    ],
    strategy:
      "Build strong communities and create deeply personal brand experiences that generate powerful emotional connections and loyalty.",
    revenueModel:
      "Relationship-based sales, community subscriptions, referral programs",
    marketPosition: "Relationship Expert & Community Builder",
    keyMetrics: [
      "Relationship Depth",
      "Community Growth",
      "Emotional Engagement",
      "Loyalty & Advocacy",
    ],
    riskProfile:
      "Stable growth through strong relationships and community advocacy",
    color: "from-rose-400 to-pink-400",
    icon: <Users className="h-8 w-8" />,
  },
};

interface BrandAssessmentProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: any) => void;
}

export function BrandAssessment({
  isOpen,
  onClose,
  onComplete,
}: BrandAssessmentProps) {
  const { playSound } = useSound();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<
    Array<{
      text: string;
      archetype: string;
      businessValue: string;
    }>
  >([]);
  const [showResult, setShowResult] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<
    string | null
  >(null);
  const [aiInsights, setAiInsights] = useState<string[]>([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleAnswer = (answer: {
    text: string;
    archetype: string;
    businessValue: string;
  }) => {
    setSelectedAnswer(answer.text);
    playSound('buttonClick');

    // Simulate selection animation
    setTimeout(() => {
      const newAnswers = [...answers, answer];
      setAnswers(newAnswers);
      playSound('whoosh');

      if (currentQuestion < brandQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setIsAnalyzing(true);
        playSound('chime');
        performAIAnalysis();
      }
    }, 500);
  };

  const performAIAnalysis = () => {
    const insights = [
      "Analyzing leadership patterns and decision-making style...",
      "Processing market positioning preferences...",
      "Evaluating customer psychology alignment...",
      "Calculating competitive advantage potential...",
      "Generating personalized empire strategy...",
      "Optimizing revenue model recommendations...",
      "Finalizing executive-level insights...",
    ];

    let currentInsight = 0;
    const interval = setInterval(() => {
      if (currentInsight < insights.length) {
        setAiInsights((prev) => [
          ...prev,
          insights[currentInsight],
        ]);
        setAnalysisProgress(
          ((currentInsight + 1) / insights.length) * 100,
        );
        playSound('tick');
        currentInsight++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setShowResult(true);
          setIsAnalyzing(false);
          playSound('achievement');
        }, 1000);
      }
    }, 800);
  };

  const getBrandArchetype = () => {
    const archetypeCounts: Record<string, number> = {};
    answers.forEach((answer) => {
      archetypeCounts[answer.archetype] =
        (archetypeCounts[answer.archetype] || 0) + 1;
    });
    const topArchetype = Object.keys(archetypeCounts).reduce(
      (a, b) =>
        archetypeCounts[a] > archetypeCounts[b] ? a : b,
    );

    // Return the original archetype name for archetypeDescriptions lookup
    return topArchetype || "Creator";
  };

  const getDashboardArchetype = () => {
    const baseArchetype = getBrandArchetype();
    
    // Map to dashboard archetype names
    const archetypeMap: Record<string, string> = {
      Creator: "Visionary Creator",
      Caregiver: "Strategic Optimizer",
      Hero: "Excellence Executor",
      Explorer: "Innovation Pioneer",
      Sage: "Strategic Optimizer",
      Ruler: "Growth Accelerator",
      Magician: "Visionary Creator",
      Jester: "Innovation Pioneer",
      Lover: "Strategic Optimizer",
    };

    return archetypeMap[baseArchetype] || "Strategic Optimizer";
  };

  const generatePremiumBrandGuide = () => {
    const archetype = getBrandArchetype();
    const guide =
      archetypeDescriptions[
        archetype as keyof typeof archetypeDescriptions
      ];

    // Create watermarked canvas
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size for high-quality PDF
    canvas.width = 2480; // A4 at 300 DPI
    canvas.height = 3508;

    // Create premium background
    const gradient = ctx.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height,
    );
    gradient.addColorStop(0, "#1e293b");
    gradient.addColorStop(0.5, "#334155");
    gradient.addColorStop(1, "#0f172a");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add watermark pattern
    ctx.globalAlpha = 0.03;
    ctx.fillStyle = "#ff6b35";
    ctx.font = "120px Arial";
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 15; j++) {
        ctx.fillText("OPTIMUS", i * 300 - 100, j * 250 + 100);
      }
    }
    ctx.globalAlpha = 1;

    // Add header
    ctx.fillStyle = "#ff6b35";
    ctx.font = "bold 80px Arial";
    ctx.fillText("OPTIMUS AUTO AI", 200, 300);

    ctx.fillStyle = "#4a90e2";
    ctx.font = "50px Arial";
    ctx.fillText("EXECUTIVE EMPIRE STRATEGY", 200, 380);

    // Add title
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 72px Arial";
    ctx.fillText(guide.title, 200, 600);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "40px Arial";
    ctx.fillText(guide.subtitle, 200, 680);

    // Add description
    ctx.fillStyle = "#e2e8f0";
    ctx.font = "32px Arial";
    const words = guide.description.split(" ");
    let line = "";
    let y = 900;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > 2000 && n > 0) {
        ctx.fillText(line, 200, y);
        line = words[n] + " ";
        y += 50;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 200, y);

    // Add strengths section
    ctx.fillStyle = "#ff6b35";
    ctx.font = "bold 40px Arial";
    ctx.fillText("CORE STRATEGIC STRENGTHS", 200, y + 150);

    ctx.fillStyle = "#ffffff";
    ctx.font = "28px Arial";
    guide.strengths.forEach((strength, index) => {
      ctx.fillText(`• ${strength}`, 220, y + 220 + index * 50);
    });

    // Add strategy section
    const strategyY =
      y + 220 + guide.strengths.length * 50 + 100;
    ctx.fillStyle = "#4a90e2";
    ctx.font = "bold 40px Arial";
    ctx.fillText("STRATEGIC IMPLEMENTATION", 200, strategyY);

    ctx.fillStyle = "#e2e8f0";
    ctx.font = "28px Arial";
    const strategyWords = guide.strategy.split(" ");
    let strategyLine = "";
    let strategyYPos = strategyY + 70;

    for (let n = 0; n < strategyWords.length; n++) {
      const testLine = strategyLine + strategyWords[n] + " ";
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > 2000 && n > 0) {
        ctx.fillText(strategyLine, 200, strategyYPos);
        strategyLine = strategyWords[n] + " ";
        strategyYPos += 50;
      } else {
        strategyLine = testLine;
      }
    }
    ctx.fillText(strategyLine, 200, strategyYPos);

    // Add footer
    ctx.fillStyle = "#64748b";
    ctx.font = "24px Arial";
    ctx.fillText(
      "Generated by Optimus Auto AI • Team@optimusautoai.com • 918-293-3352",
      200,
      3400,
    );
    ctx.fillText(new Date().toLocaleDateString(), 200, 3450);

    // Convert to downloadable image
    const link = document.createElement("a");
    link.download = `Optimus-Empire-Strategy-${getDashboardArchetype().replace(/\s+/g, '-')}-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-4xl w-full"
        >
          <Card className="glass-dark text-white">
            <CardContent className="p-4 sm:p-6 md:p-8 lg:p-12 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="h-24 w-24 bg-gradient-to-r from-orange-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-8"
              >
                <Brain className="h-12 w-12 text-white" />
              </motion.div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
                AI Strategic Analysis in Progress
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 px-4">
                Our advanced algorithms are processing your
                responses to generate your personalized empire
                strategy...
              </p>

              <div className="mb-8">
                <Progress
                  value={analysisProgress}
                  className="w-full h-3 mb-4"
                />
                <div className="text-lg font-semibold text-orange-400">
                  {Math.round(analysisProgress)}% Complete
                </div>
              </div>

              <div className="space-y-4 max-w-2xl mx-auto">
                <AnimatePresence>
                  {aiInsights.map((insight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-3 p-4 bg-white/10 rounded-lg border border-white/20"
                    >
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-100">
                        {insight}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="mt-8"
              >
                <Zap className="h-8 w-8 text-orange-400 mx-auto" />
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (showResult) {
    const archetype = getBrandArchetype();
    const guide =
      archetypeDescriptions[
        archetype as keyof typeof archetypeDescriptions
      ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-auto">
        <canvas ref={canvasRef} style={{ display: "none" }} />

        <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8">
          {/* Back Button */}
          <div className="mb-4 sm:mb-6">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-gray-400 hover:text-white p-2 sm:p-3"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
              <span className="text-sm sm:text-base">Back to Homepage</span>
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            {/* Executive Header */}
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className={`h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 bg-gradient-to-r ${guide.color} rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-2xl`}
              >
                <div className="text-white scale-75 sm:scale-90 md:scale-100">{guide.icon}</div>
              </motion.div>

              <Badge className="bg-green-500/20 text-green-400 px-6 py-2 mb-4">
                <CheckCircle className="h-4 w-4 mr-2" />
                Executive Strategy Complete
              </Badge>

              <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
                {guide.title}
              </h1>

              <p className="text-2xl text-orange-400 mb-6 font-semibold">
                {guide.subtitle}
              </p>

              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                {guide.description}
              </p>
            </div>

            {/* Strategic Overview Cards */}
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="h-full glass-dark border-orange-400/30">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <TrendingUp className="h-8 w-8 text-orange-400" />
                      <h3 className="text-2xl font-bold text-white">
                        Core Strengths
                      </h3>
                    </div>
                    <div className="space-y-4">
                      {guide.strengths.map(
                        (strength, index) => (
                          <motion.div
                            key={strength}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: 0.5 + index * 0.1,
                            }}
                            className="flex items-center gap-3 p-3 bg-orange-500/20 rounded-lg border border-orange-400/30"
                          >
                            <Star className="h-5 w-5 text-orange-600 flex-shrink-0" />
                            <span className="text-gray-900 font-medium">
                              {strength}
                            </span>
                          </motion.div>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="h-full glass-dark border-blue-400/30">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <Target className="h-8 w-8 text-blue-400" />
                      <h3 className="text-2xl font-bold text-white">
                        Strategic Position
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-500/20 rounded-lg border border-blue-400/30">
                        <h4 className="font-semibold text-blue-600 mb-2">
                          Market Position
                        </h4>
                        <p className="text-gray-900 text-sm">
                          {guide.marketPosition}
                        </p>
                      </div>
                      <div className="p-4 bg-blue-500/20 rounded-lg border border-blue-400/30">
                        <h4 className="font-semibold text-blue-600 mb-2">
                          Revenue Model
                        </h4>
                        <p className="text-gray-900 text-sm">
                          {guide.revenueModel}
                        </p>
                      </div>
                      <div className="p-4 bg-blue-500/20 rounded-lg border border-blue-400/30">
                        <h4 className="font-semibold text-blue-600 mb-2">
                          Risk Profile
                        </h4>
                        <p className="text-gray-900 text-sm">
                          {guide.riskProfile}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="h-full glass-dark border-green-400/30">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <BarChart3 className="h-8 w-8 text-green-400" />
                      <h3 className="text-2xl font-bold text-white">
                        Key Metrics
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {guide.keyMetrics.map((metric, index) => (
                        <motion.div
                          key={metric}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.7 + index * 0.1,
                          }}
                          className="flex items-center gap-3 p-3 bg-green-500/20 rounded-lg border border-green-400/30"
                        >
                          <div className="h-2 w-2 bg-green-600 rounded-full flex-shrink-0"></div>
                          <span className="text-gray-900 text-sm">
                            {metric}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Strategic Implementation */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-12"
            >
              <Card className="glass-dark border-purple-400/30">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Rocket className="h-8 w-8 text-purple-400" />
                    <h3 className="text-3xl font-bold text-white">
                      Strategic Implementation Plan
                    </h3>
                  </div>
                  <div className="bg-purple-500/20 rounded-xl p-6 border border-purple-400/30">
                    <p className="text-gray-900 text-lg leading-relaxed">
                      {guide.strategy}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Business Intelligence Insights */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mb-12"
            >
              <Card className="glass-dark border-yellow-400/30">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Brain className="h-8 w-8 text-yellow-400" />
                    <h3 className="text-3xl font-bold text-white">
                      AI Strategic Insights
                    </h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-xl font-semibold text-yellow-400">
                        Competitive Advantages
                      </h4>
                      {answers.map((answer, index) => (
                        <div
                          key={index}
                          className="p-4 bg-yellow-500/20 rounded-lg border border-yellow-400/30"
                        >
                          <p className="text-gray-900 font-medium mb-2">
                            {answer.text}
                          </p>
                          <p className="text-gray-700 text-sm">
                            {answer.businessValue}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-yellow-400 mb-4">
                        Recommended Focus Areas
                      </h4>
                      <div className="relative h-64 bg-yellow-500/15 rounded-lg border border-yellow-400/30 flex items-center justify-center">
                        <ImageWithFallback
                          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGludGVsbGlnZW5jZSUyMGFpJTIwYW5hbHlzaXMlMjBjaGFydHN8ZW58MXx8fHwxNzU2NTE1NDgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                          alt="Strategic Analysis"
                          className="w-full h-full object-cover rounded-lg opacity-30"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center text-white">
                            <BarChart3 className="h-12 w-12 text-yellow-600 mx-auto mb-2" />
                            <p className="font-semibold">
                              Advanced Analytics
                            </p>
                            <p className="text-sm text-gray-300">
                              Available in Full Platform
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Premium Actions */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center"
            >
              <Card className="glass-dark border-white/20">
                <CardContent className="p-8">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6">
                    Your Executive Strategy Package
                  </h3>

                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="text-center">
                      <FileText className="h-12 w-12 text-orange-400 mx-auto mb-3" />
                      <h4 className="font-semibold text-white mb-2">
                        Premium Strategy Guide
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Watermarked executive document with
                        detailed implementation roadmap
                      </p>
                    </div>
                    <div className="text-center">
                      <Briefcase className="h-12 w-12 text-blue-400 mx-auto mb-3" />
                      <h4 className="font-semibold text-white mb-2">
                        Empire Configuration
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Pre-configured platform settings
                        optimized for your archetype
                      </p>
                    </div>
                    <div className="text-center">
                      <Crown className="h-12 w-12 text-purple-400 mx-auto mb-3" />
                      <h4 className="font-semibold text-white mb-2">
                        VIP Onboarding
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Personal strategy session with our
                        executive team
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:gap-4">
                    <Button
                      onClick={generatePremiumBrandGuide}
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg w-full"
                    >
                      <Download className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                      Download Premium Strategy Guide
                    </Button>

                    <Button
                      onClick={() => onComplete(getDashboardArchetype())}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg w-full"
                    >
                      Access Your Empire Platform
                      <ArrowRight className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                    </Button>
                  </div>

                  <div className="mt-6 p-4 bg-green-500/20 rounded-lg border border-green-400/30">
                    <p className="text-green-400 font-semibold">
                      🎯 Your personalized empire configuration
                      is ready! Platform access includes your
                      custom {getDashboardArchetype()} dashboard with
                      pre-loaded strategies.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 px-4 py-8 overflow-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl w-full mx-auto"
      >
        <Card className="glass-dark text-white overflow-hidden">
          <CardContent className="p-4 sm:p-6 md:p-8 lg:p-12">
            {/* Back Button */}
            <div className="mb-4 sm:mb-6">
              <Button
                variant="ghost"
                onClick={onBack}
                className="text-gray-400 hover:text-white p-2 sm:p-3"
              >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                <span className="text-sm sm:text-base">Back to Homepage</span>
              </Button>
            </div>

            {/* Progress Header */}
            <div className="mb-8 sm:mb-12">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
                <Badge
                  variant="secondary"
                  className="bg-orange-500/20 text-orange-400 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-lg text-center"
                >
                  Executive Strategic Assessment
                </Badge>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <span className="text-gray-400 font-medium text-sm sm:text-base text-center sm:text-left">
                    Question {currentQuestion + 1} of{" "}
                    {brandQuestions.length}
                  </span>
                  <Progress
                    value={
                      ((currentQuestion + 1) /
                        brandQuestions.length) *
                      100
                    }
                    className="w-full sm:w-48 h-2 sm:h-3"
                  />
                </div>
              </div>

              <motion.h1
                key={currentQuestion}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 leading-tight"
              >
                {brandQuestions[currentQuestion].question}
              </motion.h1>

              <motion.p
                key={`subtitle-${currentQuestion}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed"
              >
                {brandQuestions[currentQuestion].subtitle}
              </motion.p>
            </div>

            {/* Answer Options */}
            <div className="grid gap-4 sm:gap-6">
              {brandQuestions[currentQuestion].answers.map(
                (answer, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    onClick={() => handleAnswer(answer)}
                    disabled={selectedAnswer !== null}
                    className={`group relative p-4 sm:p-6 md:p-8 text-left rounded-xl sm:rounded-2xl border transition-all duration-500 ${
                      selectedAnswer === answer.text
                        ? "bg-gradient-to-r from-orange-500/20 to-blue-500/20 border-orange-400 scale-[1.02] sm:scale-105"
                        : "glass hover:bg-white/10 border-white/10 hover:border-orange-400/50"
                    }`}
                  >
                    <div className="flex items-start gap-3 sm:gap-4 md:gap-6">
                      <motion.div
                        className={`h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-xl sm:rounded-2xl flex items-center justify-center text-white flex-shrink-0 transition-all duration-300 ${
                          selectedAnswer === answer.text
                            ? "bg-gradient-to-r from-orange-400 to-blue-400 scale-110"
                            : "bg-gradient-to-r from-orange-400/80 to-blue-400/80 group-hover:scale-110"
                        }`}
                        whileHover={{ rotate: 5 }}
                      >
                        <div className="scale-75 sm:scale-90 md:scale-100">
                          {answer.icon}
                        </div>
                      </motion.div>

                      <div className="flex-1 min-w-0">
                        <h3
                          className={`text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 transition-colors leading-tight ${
                            selectedAnswer === answer.text
                              ? "text-orange-400"
                              : "text-white group-hover:text-orange-400"
                          }`}
                        >
                          {answer.text}
                        </h3>

                        <p className="text-gray-400 mb-2 sm:mb-3 text-sm sm:text-base md:text-lg leading-relaxed">
                          {answer.description}
                        </p>

                        <div className="flex items-center gap-2">
                          <Badge className="bg-blue-500/20 text-blue-400 text-xs sm:text-sm px-2 py-1">
                            {answer.businessValue}
                          </Badge>
                        </div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity:
                            selectedAnswer === answer.text
                              ? 1
                              : 0,
                        }}
                        className="absolute top-6 right-6"
                      >
                        <CheckCircle className="h-8 w-8 text-green-400" />
                      </motion.div>

                      <ArrowRight
                        className={`h-6 w-6 transition-all ${
                          selectedAnswer === answer.text
                            ? "text-orange-400 translate-x-2"
                            : "text-gray-400 group-hover:text-orange-400 group-hover:translate-x-2"
                        }`}
                      />
                    </div>
                  </motion.button>
                ),
              )}
            </div>

            {/* Footer Navigation */}
            <div className="mt-12 flex justify-between items-center">
              <Button
                variant="ghost"
                onClick={onBack}
                className="text-gray-400 hover:text-white flex items-center gap-2"
              >
                ← Back to Homepage
              </Button>

              <div className="text-center">
                <p className="text-gray-500 text-sm">
                  Powered by Advanced AI Strategic Intelligence
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
