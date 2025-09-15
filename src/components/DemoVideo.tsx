import React, { useState } from 'react';
import { Button } from './ui/button';
import { InteractiveVideoPresentation } from './InteractiveVideoPresentation';

interface DemoVideoProps {
  onStartAssessment?: () => void;
}

export function DemoVideo({ onStartAssessment }: DemoVideoProps) {
  const [showProfessionalDemo, setShowProfessionalDemo] = useState(false);

  if (showProfessionalDemo) {
    return (
      <InteractiveVideoPresentation 
        onClose={() => setShowProfessionalDemo(false)}
        onStartAssessment={onStartAssessment}
      />
    );
  }

  return (
    <div className="space-y-8 text-center">
      <div className="bg-gradient-to-r from-orange-500/20 to-blue-500/20 border border-orange-400/30 rounded-xl p-12">
        <h2 className="text-4xl font-bold text-white mb-6">
          🎬 Professional Video Presentation
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Watch a complete, cinematic presentation of the Optimus Auto AI platform. 
          See real customer success stories, detailed feature demonstrations, and ROI breakdowns 
          in our interactive video experience.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 rounded-lg p-6">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="font-bold text-white mb-2">Real Case Studies</h3>
            <p className="text-gray-300 text-sm">See actual customer transformations and ROI results</p>
          </div>
          <div className="bg-white/5 rounded-lg p-6">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="font-bold text-white mb-2">Interactive Experience</h3>
            <p className="text-gray-300 text-sm">Navigate through scenes, pause, and explore features</p>
          </div>
          <div className="bg-white/5 rounded-lg p-6">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="font-bold text-white mb-2">6-Scene Journey</h3>
            <p className="text-gray-300 text-sm">Complete transformation story from problem to solution</p>
          </div>
        </div>

        <Button
          onClick={() => setShowProfessionalDemo(true)}
          className="bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600 text-white font-bold px-8 py-4 text-xl"
        >
          ▶️ Watch Professional Presentation
        </Button>
        
        <p className="text-gray-400 text-sm mt-4">
          Full-screen experience • Interactive controls • Real customer data
        </p>
      </div>
    </div>
  );
}