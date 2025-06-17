import React from 'react';
import { Home, Calculator, History, User, Settings } from 'lucide-react';

interface MobileNavigationProps {
  currentView: string;
  onNavigate: (view: string) => void;
  hasHistory: boolean;
  isAuthenticated: boolean;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  currentView,
  onNavigate,
  hasHistory,
  isAuthenticated
}) => {
  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      active: currentView === 'home'
    },
    {
      id: 'mathematics',
      label: 'Maths',
      icon: Calculator,
      active: currentView === 'mathematics'
    },
    {
      id: 'history',
      label: 'History',
      icon: History,
      active: currentView === 'history',
      disabled: !hasHistory,
      badge: hasHistory ? '•' : undefined
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      active: currentView === 'profile',
      disabled: !isAuthenticated
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      active: currentView === 'settings'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => !item.disabled && onNavigate(item.id)}
              disabled={item.disabled}
              className={`flex flex-col items-center justify-center space-y-1 transition-colors touch-manipulation ${
                item.active
                  ? 'text-blue-600 bg-blue-50'
                  : item.disabled
                  ? 'text-gray-300'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {item.badge && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};