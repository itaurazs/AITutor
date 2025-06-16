// src/services/userTierManager.ts
export type UserTier = 'free' | 'premium' | 'unlimited';

export interface TierLimits {
  dailyQuestions: number;
  monthlyQuestions: number;
  totalQuestions: number;
  features: string[];
  priority: boolean;
  analytics: boolean;
  exportData: boolean;
  customSupport: boolean;
}

export interface UserData {
  tier: UserTier;
  userId?: string;
  email?: string;
  subscriptionId?: string;
  subscriptionStatus: 'active' | 'cancelled' | 'expired' | 'none';
  subscriptionExpiry?: Date;
  usage: {
    daily: {
      count: number;
      date: string; // YYYY-MM-DD
    };
    monthly: {
      count: number;
      month: string; // YYYY-MM
    };
    total: number;
  };
  createdAt: Date;
  lastUsed: Date;
}

// Define tier configurations
export const TIER_LIMITS: Record<UserTier, TierLimits> = {
  free: {
    dailyQuestions: 5,
    monthlyQuestions: 50,
    totalQuestions: 200,
    features: [
      'Basic AI explanations',
      'All subjects (Math, Science, English, History, Geography, Economics)',
      'Step-by-step solutions',
      'Question history (last 10)',
      'Community support'
    ],
    priority: false,
    analytics: false,
    exportData: false,
    customSupport: false
  },
  premium: {
    dailyQuestions: 50,
    monthlyQuestions: 500,
    totalQuestions: 2000,
    features: [
      'Enhanced AI explanations',
      'All subjects with advanced examples',
      'Detailed step-by-step solutions',
      'Unlimited question history',
      'Basic analytics dashboard',
      'PDF export of solutions',
      'Email support',
      'No advertisements'
    ],
    priority: true,
    analytics: true,
    exportData: true,
    customSupport: false
  },
  unlimited: {
    dailyQuestions: Infinity,
    monthlyQuestions: Infinity,
    totalQuestions: Infinity,
    features: [
      'Premium AI explanations with detailed reasoning',
      'All subjects with expert-level examples',
      'Interactive step-by-step solutions',
      'Unlimited question history with search',
      'Advanced analytics & insights',
      'Export to PDF, Word, and more',
      'Priority email & chat support',
      'No advertisements',
      'Early access to new features',
      'Custom study plans',
      'Progress tracking & recommendations'
    ],
    priority: true,
    analytics: true,
    exportData: true,
    customSupport: true
  }
};

export const TIER_PRICING = {
  free: {
    price: 0,
    period: 'forever',
    description: 'Perfect for trying out AI tutoring',
    popular: false
  },
  premium: {
    price: 12.99,
    period: 'month',
    description: 'Great for regular students',
    popular: true
  },
  unlimited: {
    price: 24.99,
    period: 'month',
    description: 'For serious learners and educators',
    popular: false
  }
};

export class UserTierManager {
  private readonly STORAGE_KEY = 'ai_tutor_user_data';

  private getDefaultUserData(): UserData {
    return {
      tier: 'free',
      subscriptionStatus: 'none',
      usage: {
        daily: {
          count: 0,
          date: new Date().toISOString().split('T')[0]
        },
        monthly: {
          count: 0,
          month: new Date().toISOString().slice(0, 7)
        },
        total: 0
      },
      createdAt: new Date(),
      lastUsed: new Date()
    };
  }

  private getUserData(): UserData {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) {
      const newUser = this.getDefaultUserData();
      this.saveUserData(newUser);
      return newUser;
    }

    try {
      const data = JSON.parse(stored) as UserData;
      // Convert date strings back to Date objects
      data.createdAt = new Date(data.createdAt);
      data.lastUsed = new Date(data.lastUsed);
      if (data.subscriptionExpiry) {
        data.subscriptionExpiry = new Date(data.subscriptionExpiry);
      }
      
      return this.validateAndUpdateUserData(data);
    } catch {
      const newUser = this.getDefaultUserData();
      this.saveUserData(newUser);
      return newUser;
    }
  }

  private validateAndUpdateUserData(data: UserData): UserData {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const currentMonth = now.toISOString().slice(0, 7);
    
    // Reset daily usage if it's a new day
    if (data.usage.daily.date !== today) {
      data.usage.daily.count = 0;
      data.usage.daily.date = today;
    }

    // Reset monthly usage if it's a new month
    if (data.usage.monthly.month !== currentMonth) {
      data.usage.monthly.count = 0;
      data.usage.monthly.month = currentMonth;
    }

    // Check subscription expiry
    if (data.subscriptionExpiry && now > data.subscriptionExpiry) {
      data.tier = 'free';
      data.subscriptionStatus = 'expired';
    }

    // Update last used
    data.lastUsed = now;

    this.saveUserData(data);
    return data;
  }

  private saveUserData(data: UserData): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  // Get current user information
  getCurrentUser(): UserData {
    return this.getUserData();
  }

  // Get current tier limits
  getCurrentLimits(): TierLimits {
    const user = this.getUserData();
    return TIER_LIMITS[user.tier];
  }

  // Check if user can make an AI request
  canMakeAIRequest(): { 
    allowed: boolean; 
    reason?: string; 
    remainingDaily?: number;
    remainingMonthly?: number;
    remainingTotal?: number;
  } {
    const user = this.getUserData();
    const limits = TIER_LIMITS[user.tier];

    // Check subscription status
    if (user.tier !== 'free' && user.subscriptionStatus !== 'active') {
      return {
        allowed: false,
        reason: 'Subscription expired or cancelled. Please renew your subscription or continue with free tier.'
      };
    }

    // Check daily limit
    if (user.usage.daily.count >= limits.dailyQuestions) {
      const resetTime = new Date();
      resetTime.setDate(resetTime.getDate() + 1);
      resetTime.setHours(0, 0, 0, 0);
      const hoursUntilReset = Math.ceil((resetTime.getTime() - Date.now()) / (1000 * 60 * 60));
      
      return {
        allowed: false,
        reason: `Daily limit of ${limits.dailyQuestions} AI questions reached. Resets in ${hoursUntilReset} hours.`
      };
    }

    // Check monthly limit
    if (user.usage.monthly.count >= limits.monthlyQuestions) {
      return {
        allowed: false,
        reason: `Monthly limit of ${limits.monthlyQuestions} AI questions reached. Upgrade for more questions.`
      };
    }

    // Check total limit
    if (user.usage.total >= limits.totalQuestions) {
      return {
        allowed: false,
        reason: `Total limit of ${limits.totalQuestions} AI questions reached. Upgrade for unlimited access.`
      };
    }

    return {
      allowed: true,
      remainingDaily: limits.dailyQuestions - user.usage.daily.count,
      remainingMonthly: limits.monthlyQuestions - user.usage.monthly.count,
      remainingTotal: limits.totalQuestions - user.usage.total
    };
  }

  // Record AI usage
  recordAIUsage(): void {
    const user = this.getUserData();
    user.usage.daily.count += 1;
    user.usage.monthly.count += 1;
    user.usage.total += 1;
    user.lastUsed = new Date();
    this.saveUserData(user);
  }

  // Upgrade user tier
  upgradeTier(newTier: UserTier, subscriptionId?: string, expiryDate?: Date): boolean {
    if (newTier === 'free') {
      return false; // Can't "upgrade" to free
    }

    const user = this.getUserData();
    user.tier = newTier;
    user.subscriptionId = subscriptionId;
    user.subscriptionStatus = 'active';
    user.subscriptionExpiry = expiryDate;
    
    this.saveUserData(user);
    return true;
  }

  // Downgrade to free tier
  downgradeToFree(): void {
    const user = this.getUserData();
    user.tier = 'free';
    user.subscriptionStatus = 'none';
    user.subscriptionId = undefined;
    user.subscriptionExpiry = undefined;
    
    this.saveUserData(user);
  }

  // Cancel subscription (user keeps benefits until expiry)
  cancelSubscription(): void {
    const user = this.getUserData();
    user.subscriptionStatus = 'cancelled';
    this.saveUserData(user);
  }

  // Get usage statistics
  getUsageStats(): {
    current: UserData['usage'];
    limits: TierLimits;
    tier: UserTier;
    subscriptionStatus: string;
    daysUntilExpiry?: number;
  } {
    const user = this.getUserData();
    const limits = TIER_LIMITS[user.tier];
    
    let daysUntilExpiry: number | undefined;
    if (user.subscriptionExpiry) {
      const timeDiff = user.subscriptionExpiry.getTime() - Date.now();
      daysUntilExpiry = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    }

    return {
      current: user.usage,
      limits,
      tier: user.tier,
      subscriptionStatus: user.subscriptionStatus,
      daysUntilExpiry
    };
  }

  // Reset usage (for testing or admin purposes)
  resetUsage(): void {
    const user = this.getUserData();
    user.usage = {
      daily: {
        count: 0,
        date: new Date().toISOString().split('T')[0]
      },
      monthly: {
        count: 0,
        month: new Date().toISOString().slice(0, 7)
      },
      total: 0
    };
    this.saveUserData(user);
  }

  // Simulate subscription for testing
  simulateSubscription(tier: UserTier, days: number = 30): void {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + days);
    
    this.upgradeTier(tier, `sim_${Date.now()}`, expiryDate);
  }

  // Export user data
  exportUserData(): string {
    const user = this.getUserData();
    return JSON.stringify(user, null, 2);
  }
}

// Singleton instance
export const userTierManager = new UserTierManager();
