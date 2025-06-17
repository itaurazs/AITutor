import React, { useEffect, useState } from 'react';
import { Trophy, Star, Download, Share2, X } from 'lucide-react';

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievement: {
    name: string;
    description: string;
    icon: React.ComponentType<any>;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    type: 'badge' | 'streak' | 'milestone';
  };
  onShare?: () => void;
  onDownloadCertificate?: () => void;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  isOpen,
  onClose,
  achievement,
  onShare,
  onDownloadCertificate
}) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      // Play celebration sound (if enabled)
      // playSound('achievement');
      
      // Auto-close after 5 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const Icon = achievement.icon;

  const getRarityConfig = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return {
          bg: 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600',
          border: 'border-yellow-400',
          glow: 'shadow-yellow-400/50',
          text: 'text-yellow-900',
          particles: '✨'
        };
      case 'epic':
        return {
          bg: 'bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600',
          border: 'border-purple-400',
          glow: 'shadow-purple-400/50',
          text: 'text-purple-900',
          particles: '💜'
        };
      case 'rare':
        return {
          bg: 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600',
          border: 'border-blue-400',
          glow: 'shadow-blue-400/50',
          text: 'text-blue-900',
          particles: '💙'
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-green-400 via-green-500 to-green-600',
          border: 'border-green-400',
          glow: 'shadow-green-400/50',
          text: 'text-green-900',
          particles: '💚'
        };
    }
  };

  const config = getRarityConfig(achievement.rarity);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                fontSize: `${12 + Math.random() * 8}px`
              }}
            >
              {['🎉', '🎊', '⭐', '✨', '🏆', '🔥', '💫', config.particles][Math.floor(Math.random() * 8)]}
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <div className={`bg-white rounded-2xl shadow-2xl max-w-md w-full border-4 ${config.border} ${config.glow} shadow-2xl animate-pulse`}>
        {/* Header */}
        <div className={`${config.bg} text-white p-6 rounded-t-2xl relative overflow-hidden`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="text-center">
            <div className="text-6xl mb-4 animate-bounce">🎉</div>
            <h2 className="text-2xl font-bold mb-2">Achievement Unlocked!</h2>
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold bg-white ${config.text} capitalize`}>
              {achievement.rarity}
            </div>
          </div>

          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random()}s`
                }}
              >
                ⭐
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          {/* Achievement Icon */}
          <div className={`w-24 h-24 mx-auto mb-4 rounded-full ${config.bg} flex items-center justify-center border-4 ${config.border} ${config.glow} shadow-lg`}>
            <Icon className="h-12 w-12 text-white" />
          </div>

          {/* Achievement Details */}
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{achievement.name}</h3>
          <p className="text-gray-600 mb-6">{achievement.description}</p>

          {/* Action Buttons */}
          <div className="space-y-3">
            {onShare && (
              <button
                onClick={onShare}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center space-x-2"
              >
                <Share2 className="h-4 w-4" />
                <span>Share Achievement</span>
              </button>
            )}

            {onDownloadCertificate && achievement.type === 'milestone' && (
              <button
                onClick={onDownloadCertificate}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Download Certificate</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
            >
              Continue Learning
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};