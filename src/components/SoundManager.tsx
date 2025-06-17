import React, { createContext, useContext, useState } from 'react';

interface SoundContextType {
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  playSound: (soundType: 'achievement' | 'streak' | 'level-up' | 'button') => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const useSounds = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSounds must be used within a SoundProvider');
  }
  return context;
};

interface SoundProviderProps {
  children: React.ReactNode;
}

export const SoundProvider: React.FC<SoundProviderProps> = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('soundEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const playSound = (soundType: 'achievement' | 'streak' | 'level-up' | 'button') => {
    if (!soundEnabled) return;

    // Create audio context for web audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const playTone = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = type;
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    };

    switch (soundType) {
      case 'achievement':
        // Achievement fanfare
        playTone(523, 0.2); // C5
        setTimeout(() => playTone(659, 0.2), 100); // E5
        setTimeout(() => playTone(784, 0.3), 200); // G5
        break;
      
      case 'streak':
        // Streak sound
        playTone(440, 0.1); // A4
        setTimeout(() => playTone(554, 0.1), 50); // C#5
        setTimeout(() => playTone(659, 0.2), 100); // E5
        break;
      
      case 'level-up':
        // Level up sound
        playTone(261, 0.1); // C4
        setTimeout(() => playTone(329, 0.1), 50); // E4
        setTimeout(() => playTone(392, 0.1), 100); // G4
        setTimeout(() => playTone(523, 0.3), 150); // C5
        break;
      
      case 'button':
        // Button click
        playTone(800, 0.05);
        break;
    }
  };

  const updateSoundEnabled = (enabled: boolean) => {
    setSoundEnabled(enabled);
    localStorage.setItem('soundEnabled', JSON.stringify(enabled));
  };

  return (
    <SoundContext.Provider value={{
      soundEnabled,
      setSoundEnabled: updateSoundEnabled,
      playSound
    }}>
      {children}
    </SoundContext.Provider>
  );
};

// Sound toggle component
export const SoundToggle: React.FC = () => {
  const { soundEnabled, setSoundEnabled, playSound } = useSounds();

  const handleToggle = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    if (newState) {
      playSound('button');
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`p-2 rounded-lg transition-colors ${
        soundEnabled 
          ? 'bg-green-100 text-green-600 hover:bg-green-200' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
      title={soundEnabled ? 'Sound On' : 'Sound Off'}
    >
      {soundEnabled ? '🔊' : '🔇'}
    </button>
  );
};