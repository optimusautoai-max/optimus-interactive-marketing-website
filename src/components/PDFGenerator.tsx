import React from 'react';
import { Button } from './ui/button';
import { Download, FileText, Shield, Crown } from 'lucide-react';

interface PDFGeneratorProps {
  archetype: string;
  assessmentData?: any;
  onDownload?: () => void;
}

// Real PDF generation using canvas and data URL
export function generatePDF(archetype: string, assessmentData: any = {}) {
  // Create a virtual canvas for PDF content
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Set canvas dimensions (standard letter size at 150 DPI)
  canvas.width = 1275;
  canvas.height = 1650;
  
  if (!ctx) return;
  
  // Set background
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#1e293b');
  gradient.addColorStop(0.5, '#334155');
  gradient.addColorStop(1, '#0f172a');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Add watermark pattern
  ctx.globalAlpha = 0.05;
  ctx.fillStyle = '#FF6B35';
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 30; j++) {
      ctx.fillRect(i * 60, j * 60, 40, 40);
    }
  }
  ctx.globalAlpha = 1;
  
  // Header section
  ctx.fillStyle = '#FF6B35';
  ctx.fillRect(0, 0, canvas.width, 120);
  
  // Company logo/brand area
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 48px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('OPTIMUS AUTO AI', canvas.width / 2, 75);
  
  // Subtitle
  ctx.font = '24px Arial, sans-serif';
  ctx.fillStyle = '#1e293b';
  ctx.fillText('Strategic Empire Assessment Report', canvas.width / 2, 105);
  
  // Main content area
  const contentY = 180;
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px Arial, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(`${archetype} Strategic Profile`, 80, contentY);
  
  // Date and confidential marking
  ctx.font = '18px Arial, sans-serif';
  ctx.fillStyle = '#94a3b8';
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  ctx.fillText(`Generated: ${currentDate}`, 80, contentY + 40);
  ctx.fillText('CONFIDENTIAL - Strategic Business Intelligence', 80, contentY + 65);
  
  // Archetype-specific content
  const archetypeContent = getArchetypeContent(archetype);
  
  // Strategic overview section
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px Arial, sans-serif';
  ctx.fillText('Strategic Overview', 80, contentY + 120);
  
  ctx.font = '16px Arial, sans-serif';
  ctx.fillStyle = '#e2e8f0';
  const overviewLines = wrapText(ctx, archetypeContent.overview, 1100);
  overviewLines.forEach((line, index) => {
    ctx.fillText(line, 80, contentY + 155 + (index * 22));
  });
  
  // Key strengths section
  const strengthsY = contentY + 155 + (overviewLines.length * 22) + 40;
  ctx.fillStyle = '#22c55e';
  ctx.font = 'bold 20px Arial, sans-serif';
  ctx.fillText('Key Strengths', 80, strengthsY);
  
  ctx.fillStyle = '#ffffff';
  ctx.font = '16px Arial, sans-serif';
  archetypeContent.strengths.forEach((strength, index) => {
    ctx.fillText(`• ${strength}`, 100, strengthsY + 35 + (index * 25));
  });
  
  // Recommended strategy section
  const strategyY = strengthsY + 35 + (archetypeContent.strengths.length * 25) + 40;
  ctx.fillStyle = '#3b82f6';
  ctx.font = 'bold 20px Arial, sans-serif';
  ctx.fillText('Recommended Strategy', 80, strategyY);
  
  ctx.fillStyle = '#e2e8f0';
  ctx.font = '16px Arial, sans-serif';
  const strategyLines = wrapText(ctx, archetypeContent.strategy, 1100);
  strategyLines.forEach((line, index) => {
    ctx.fillText(line, 80, strategyY + 35 + (index * 22));
  });
  
  // Empire tier recommendations
  const tierY = strategyY + 35 + (strategyLines.length * 22) + 40;
  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 20px Arial, sans-serif';
  ctx.fillText('Recommended Empire Tiers', 80, tierY);
  
  ctx.fillStyle = '#ffffff';
  ctx.font = '16px Arial, sans-serif';
  archetypeContent.tiers.forEach((tier, index) => {
    ctx.fillText(`• ${tier}`, 100, tierY + 35 + (index * 25));
  });
  
  // Footer
  const footerY = canvas.height - 100;
  ctx.fillStyle = '#FF6B35';
  ctx.fillRect(0, footerY, canvas.width, 100);
  
  ctx.fillStyle = '#ffffff';
  ctx.font = '16px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('This report contains proprietary business intelligence. Unauthorized distribution prohibited.', canvas.width / 2, footerY + 30);
  ctx.fillText('© 2024 Optimus Auto AI - Strategic Business Intelligence Division', canvas.width / 2, footerY + 55);
  
  // Convert canvas to PDF-like data URL
  const dataUrl = canvas.toDataURL('image/png', 1.0);
  
  // Create download link
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = `Optimus-Strategic-Report-${archetype}-${Date.now()}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  return dataUrl;
}

// Helper function to wrap text
function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';
  
  for (const word of words) {
    const testLine = currentLine + (currentLine ? ' ' : '') + word;
    const metrics = ctx.measureText(testLine);
    
    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  
  if (currentLine) {
    lines.push(currentLine);
  }
  
  return lines;
}

// Archetype-specific content
function getArchetypeContent(archetype: string) {
  const content = {
    'Visionary Creator': {
      overview: 'As a Visionary Creator, you possess exceptional strategic vision and creative problem-solving abilities. Your natural inclination toward innovation and forward-thinking makes you ideally suited to leverage AI-powered business automation for maximum competitive advantage.',
      strengths: [
        'Strategic vision and innovation leadership',
        'Creative problem-solving capabilities',
        'Early technology adoption mindset',
        'Long-term strategic planning excellence',
        'Ability to see market opportunities before competitors'
      ],
      strategy: 'Focus on the Business Empire or Hands-Off Empire tiers to maximize your strategic impact. Your visionary nature will thrive with advanced automation that handles operational details while you focus on innovation and growth strategy.',
      tiers: [
        'Business Empire ($2,500) - Ideal for scaling your vision with dedicated AI teams',
        'Hands-Off Empire ($6,500) - Perfect for complete strategic focus and maximum automation',
        'App Empire ($297) - Good starting point for testing innovative concepts'
      ]
    },
    'Strategic Optimizer': {
      overview: 'Strategic Optimizers excel at systematic improvement and efficiency maximization. Your analytical approach to business operations aligns perfectly with AI-driven optimization and data-driven decision making for sustained competitive advantage.',
      strengths: [
        'Data-driven decision making expertise',
        'Process optimization and efficiency focus',
        'Systematic approach to business growth',
        'Performance metrics and KPI management',
        'Risk assessment and mitigation planning'
      ],
      strategy: 'The Business Empire tier offers the perfect balance of automation and control for your optimization-focused approach. You\'ll have access to comprehensive analytics and performance optimization tools.',
      tiers: [
        'Business Empire ($2,500) - Optimal balance of control and automation',
        'App Empire ($297) - Great for systematic testing and optimization',
        'Hands-Off Empire ($6,500) - For maximum efficiency once systems are optimized'
      ]
    },
    'Growth Accelerator': {
      overview: 'Growth Accelerators are natural expansion leaders with exceptional market penetration capabilities. Your aggressive growth mindset combined with AI automation creates unprecedented scaling opportunities in competitive markets.',
      strengths: [
        'Rapid market expansion capabilities',
        'Aggressive growth strategy execution',
        'Market penetration expertise',
        'Revenue scaling and optimization',
        'Competitive positioning excellence'
      ],
      strategy: 'The Hands-Off Empire tier maximizes your growth potential by providing complete operational automation, allowing you to focus entirely on expansion strategy and market domination.',
      tiers: [
        'Hands-Off Empire ($6,500) - Maximum growth acceleration potential',
        'Business Empire ($2,500) - Strong foundation for rapid scaling',
        'App Empire ($297) - Good for testing new market segments'
      ]
    },
    'Innovation Pioneer': {
      overview: 'Innovation Pioneers lead market disruption through breakthrough thinking and technological advancement. Your pioneering spirit combined with cutting-edge AI creates transformational business opportunities.',
      strengths: [
        'Breakthrough innovation leadership',
        'Market disruption capabilities',
        'Technology adoption and integration',
        'Creative business model development',
        'Industry transformation vision'
      ],
      strategy: 'Start with App Empire to prototype innovations, then scale to Business Empire for full implementation. Your pioneering nature benefits from rapid iteration and testing capabilities.',
      tiers: [
        'App Empire ($297) - Perfect for rapid innovation prototyping',
        'Business Empire ($2,500) - Scale successful innovations',
        'Hands-Off Empire ($6,500) - Focus purely on next breakthrough'
      ]
    },
    'Excellence Executor': {
      overview: 'Excellence Executors deliver consistent high-quality results through systematic implementation and operational excellence. Your execution-focused approach maximizes the value of AI automation systems.',
      strengths: [
        'Consistent high-quality execution',
        'Operational excellence management',
        'Quality control and assurance',
        'Systematic implementation processes',
        'Performance standard maintenance'
      ],
      strategy: 'The Business Empire tier provides the perfect platform for your execution excellence, offering comprehensive operational tools while maintaining quality standards and performance metrics.',
      tiers: [
        'Business Empire ($2,500) - Ideal execution platform with full control',
        'Hands-Off Empire ($6,500) - For maximum operational efficiency',
        'App Empire ($297) - Good for quality-focused testing and validation'
      ]
    }
  };

  return content[archetype as keyof typeof content] || content['Strategic Optimizer'];
}

export function PDFGenerator({ archetype, assessmentData, onDownload }: PDFGeneratorProps) {
  const handleDownload = () => {
    generatePDF(archetype, assessmentData);
    onDownload?.();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-xl border border-orange-400/30">
        <FileText className="h-8 w-8 text-orange-400" />
        <div>
          <h3 className="text-lg font-semibold text-white">Strategic Assessment Report</h3>
          <p className="text-gray-300 text-sm">Comprehensive {archetype} analysis and recommendations</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="flex items-center gap-2 text-gray-300">
          <Shield className="h-4 w-4 text-green-400" />
          <span>Confidential Intelligence</span>
        </div>
        <div className="flex items-center gap-2 text-gray-300">
          <Crown className="h-4 w-4 text-yellow-400" />
          <span>Executive-Level Analysis</span>
        </div>
        <div className="flex items-center gap-2 text-gray-300">
          <FileText className="h-4 w-4 text-blue-400" />
          <span>Professional Format</span>
        </div>
      </div>
      
      <Button 
        onClick={handleDownload}
        className="w-full bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600 text-white"
      >
        <Download className="mr-2 h-5 w-5" />
        Download Strategic Report
      </Button>
    </div>
  );
}