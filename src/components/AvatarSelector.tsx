import React, { useState } from 'react';
import { Shuffle, Check } from 'lucide-react';

interface AvatarSelectorProps {
  selectedAvatar?: string;
  onSelect: (avatarUrl: string) => void;
  size?: 'small' | 'medium' | 'large';
}

export const AvatarSelector: React.FC<AvatarSelectorProps> = ({
  selectedAvatar,
  onSelect,
  size = 'medium'
}) => {
  const [currentSelected, setCurrentSelected] = useState(selectedAvatar || '');

  const avatars = [
    { id: 'avatar1', url: '/avatars/avatar1.svg', name: 'Sunny Sam' },
    { id: 'avatar2', url: '/avatars/avatar2.svg', name: 'Curly Quinn' },
    { id: 'avatar3', url: '/avatars/avatar3.svg', name: 'Smart Alex' },
    { id: 'avatar4', url: '/avatars/avatar4.svg', name: 'Brainy Belle' },
    { id: 'avatar5', url: '/avatars/avatar5.svg', name: 'Happy Harper' },
    { id: 'avatar6', url: '/avatars/avatar6.svg', name: 'Clever Casey' }
  ];

  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-16 h-16',
    large: 'w-20 h-20'
  };

  const handleAvatarSelect = (avatarUrl: string) => {
    setCurrentSelected(avatarUrl);
    onSelect(avatarUrl);
  };

  const handleRandomSelect = () => {
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    handleAvatarSelect(randomAvatar.url);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Choose Your Avatar</h3>
        <button
          onClick={handleRandomSelect}
          className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
        >
          <Shuffle className="h-4 w-4" />
          <span>Random</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {avatars.map((avatar) => (
          <div
            key={avatar.id}
            className="flex flex-col items-center space-y-2"
          >
            <button
              onClick={() => handleAvatarSelect(avatar.url)}
              className={`relative ${sizeClasses[size]} rounded-full border-4 transition-all duration-200 hover:scale-105 ${
                currentSelected === avatar.url
                  ? 'border-blue-500 shadow-lg shadow-blue-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img
                src={avatar.url}
                alt={avatar.name}
                className="w-full h-full rounded-full object-cover"
              />
              {currentSelected === avatar.url && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
              )}
            </button>
            <span className="text-xs text-gray-600 text-center font-medium">
              {avatar.name}
            </span>
          </div>
        ))}
      </div>

      {currentSelected && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <img
              src={currentSelected}
              alt="Selected avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-green-800">Avatar Selected!</p>
              <p className="text-xs text-green-600">
                {avatars.find(a => a.url === currentSelected)?.name}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};