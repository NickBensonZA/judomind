import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useBreathing } from "@/hooks/use-breathing";

export default function BreathingCircle() {
  const { 
    isActive, 
    phase, 
    timeRemaining, 
    formattedTime, 
    toggleExercise 
  } = useBreathing();

  return (
    <div className="text-center mb-8">
      <h3 className="text-xl font-noto font-medium mb-2">4-4-6 Breathing Technique</h3>
      <p className="text-gray-600 mb-4">This technique helps calm your nervous system and centers your mind. Practice before training or competition.</p>
      
      {/* Breathing visualization */}
      <div className="mb-8 flex flex-col items-center">
        <div className={`breathing-circle w-48 h-48 rounded-full bg-secondary flex items-center justify-center mb-4 ${phase}`}>
          <span className={`text-2xl font-noto font-medium ${
            phase === 'inhale' ? 'text-success' : 
            phase === 'hold' ? 'text-primary' : 
            phase === 'exhale' ? 'text-progress' : 'text-primary'
          }`}>
            {phase === 'ready' ? 'Ready' : phase.charAt(0).toUpperCase() + phase.slice(1)}
          </span>
        </div>
        <div className="text-3xl font-medium">{formattedTime}</div>
      </div>
      
      <Button 
        onClick={toggleExercise}
        className={`px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition duration-300 shadow-md ${
          isActive ? 'bg-primary' : 'bg-accent'
        }`}
      >
        {isActive ? 'Stop Exercise' : 'Start Exercise'}
      </Button>
    </div>
  );
}
