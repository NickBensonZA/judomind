import { useState, useEffect, useCallback } from "react";

type BreathingPhase = "ready" | "inhale" | "hold" | "exhale";

export function useBreathing(initialTimeInSeconds = 300) {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<BreathingPhase>("ready");
  const [timeRemaining, setTimeRemaining] = useState(initialTimeInSeconds);
  const [phaseTimer, setPhaseTimer] = useState<NodeJS.Timeout | null>(null);

  // Format time as MM:SS
  const formattedTime = `${Math.floor(timeRemaining / 60)}:${(timeRemaining % 60).toString().padStart(2, '0')}`;

  // Start breathing cycle
  const startBreathingCycle = useCallback(() => {
    // Clear any existing timers
    if (phaseTimer) clearTimeout(phaseTimer);

    // Inhale phase - 4 seconds
    setPhase("inhale");
    
    const holdTimer = setTimeout(() => {
      // Hold phase - 4 seconds
      setPhase("hold");
      
      const exhaleTimer = setTimeout(() => {
        // Exhale phase - 6 seconds
        setPhase("exhale");
        
        const nextCycleTimer = setTimeout(() => {
          // If still active, start next cycle
          if (isActive) {
            startBreathingCycle();
          }
        }, 6000); // Exhale duration
        
        setPhaseTimer(nextCycleTimer);
      }, 4000); // Hold duration
      
      setPhaseTimer(exhaleTimer);
    }, 4000); // Inhale duration
    
    setPhaseTimer(holdTimer);
  }, [isActive, phaseTimer]);

  // Start or stop the breathing exercise
  const toggleExercise = useCallback(() => {
    if (!isActive) {
      // Start exercise
      setIsActive(true);
      setTimeRemaining(initialTimeInSeconds);
      startBreathingCycle();
    } else {
      // Stop exercise
      setIsActive(false);
      if (phaseTimer) clearTimeout(phaseTimer);
      setPhase("ready");
      setTimeRemaining(initialTimeInSeconds);
    }
  }, [isActive, initialTimeInSeconds, phaseTimer, startBreathingCycle]);

  // Handle timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            // Time is up, stop exercise
            toggleExercise();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, toggleExercise]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (phaseTimer) clearTimeout(phaseTimer);
    };
  }, [phaseTimer]);

  return { 
    isActive, 
    phase, 
    timeRemaining, 
    formattedTime, 
    toggleExercise 
  };
}
