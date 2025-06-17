// Mobile utility functions for better UX

export const isMobileDevice = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const isIOSDevice = (): boolean => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

export const getViewportHeight = (): number => {
  return window.innerHeight || document.documentElement.clientHeight;
};

export const getViewportWidth = (): number => {
  return window.innerWidth || document.documentElement.clientWidth;
};

export const scrollToTop = (smooth: boolean = true): void => {
  window.scrollTo({
    top: 0,
    behavior: smooth ? 'smooth' : 'auto'
  });
};

export const scrollToElement = (elementId: string, offset: number = 0): void => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

export const preventZoom = (): void => {
  // Prevent zoom on double tap for iOS
  let lastTouchEnd = 0;
  document.addEventListener('touchend', (event) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
};

export const addTouchFeedback = (element: HTMLElement): void => {
  element.addEventListener('touchstart', () => {
    element.style.transform = 'scale(0.98)';
    element.style.opacity = '0.8';
  });

  element.addEventListener('touchend', () => {
    element.style.transform = 'scale(1)';
    element.style.opacity = '1';
  });

  element.addEventListener('touchcancel', () => {
    element.style.transform = 'scale(1)';
    element.style.opacity = '1';
  });
};

export const optimizeForMobile = (): void => {
  // Add viewport meta tag if not present
  if (!document.querySelector('meta[name="viewport"]')) {
    const viewport = document.createElement('meta');
    viewport.name = 'viewport';
    viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.head.appendChild(viewport);
  }

  // Prevent zoom
  preventZoom();

  // Add touch-action CSS for better touch handling
  document.body.style.touchAction = 'manipulation';
};

export const formatCurrencyForMobile = (amount: number): string => {
  // Format Australian currency for mobile display
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const vibrate = (pattern: number | number[] = 100): void => {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
};

export const hapticFeedback = (type: 'light' | 'medium' | 'heavy' = 'light'): void => {
  // Provide haptic feedback on supported devices
  const patterns = {
    light: 50,
    medium: 100,
    heavy: 200
  };
  
  vibrate(patterns[type]);
};