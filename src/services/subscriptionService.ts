import { loadStripe } from '@stripe/stripe-js';
import authService, { UserTier } from './authService';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export interface SubscriptionPlan {
  id: string;
  name: string;
  tier: UserTier;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  stripePriceId: string;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'premium-monthly',
    name: 'Premium Monthly',
    tier: 'premium',
    price: 12.99,
    interval: 'month',
    stripePriceId: 'price_premium_monthly', // Replace with actual Stripe price ID
    features: [
      '50 daily AI questions',
      '500 monthly AI questions',
      'Unlimited question history',
      'Basic analytics',
      'PDF export',
      'Email support',
      'No advertisements'
    ]
  },
  {
    id: 'premium-yearly',
    name: 'Premium Yearly',
    tier: 'premium',
    price: 129.99,
    interval: 'year',
    stripePriceId: 'price_premium_yearly', // Replace with actual Stripe price ID
    features: [
      '50 daily AI questions',
      '500 monthly AI questions',
      'Unlimited question history',
      'Basic analytics',
      'PDF export',
      'Email support',
      'No advertisements',
      '2 months free!'
    ]
  },
  {
    id: 'unlimited-monthly',
    name: 'Unlimited Monthly',
    tier: 'unlimited',
    price: 24.99,
    interval: 'month',
    stripePriceId: 'price_unlimited_monthly', // Replace with actual Stripe price ID
    features: [
      'Unlimited AI questions',
      'Advanced analytics',
      'Export to PDF, Word, and more',
      'Priority email & chat support',
      'No advertisements',
      'Early access to new features',
      'Custom study plans',
      'Progress tracking'
    ]
  },
  {
    id: 'unlimited-yearly',
    name: 'Unlimited Yearly',
    tier: 'unlimited',
    price: 249.99,
    interval: 'year',
    stripePriceId: 'price_unlimited_yearly', // Replace with actual Stripe price ID
    features: [
      'Unlimited AI questions',
      'Advanced analytics',
      'Export to PDF, Word, and more',
      'Priority email & chat support',
      'No advertisements',
      'Early access to new features',
      'Custom study plans',
      'Progress tracking',
      '2 months free!'
    ]
  }
];

export class SubscriptionService {
  private static instance: SubscriptionService;

  public static getInstance(): SubscriptionService {
    if (!SubscriptionService.instance) {
      SubscriptionService.instance = new SubscriptionService();
    }
    return SubscriptionService.instance;
  }

  // Create checkout session
  async createCheckoutSession(planId: string): Promise<string> {
    const user = authService.getCurrentUser();
    if (!user) {
      throw new Error('User must be authenticated to subscribe');
    }

    const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
    if (!plan) {
      throw new Error('Invalid subscription plan');
    }

    try {
      // In a real application, this would call your backend API
      // For now, we'll simulate the checkout process
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await user.getIdToken()}`
        },
        body: JSON.stringify({
          priceId: plan.stripePriceId,
          userId: user.uid,
          userEmail: user.email
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      return sessionId;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  }

  // Redirect to Stripe Checkout
  async redirectToCheckout(sessionId: string): Promise<void> {
    const stripe = await stripePromise;
    if (!stripe) {
      throw new Error('Stripe failed to load');
    }

    const { error } = await stripe.redirectToCheckout({ sessionId });
    if (error) {
      throw error;
    }
  }

  // Subscribe to a plan (simplified for demo)
  async subscribeToPlan(planId: string): Promise<void> {
    const user = authService.getCurrentUser();
    if (!user) {
      throw new Error('User must be authenticated to subscribe');
    }

    const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
    if (!plan) {
      throw new Error('Invalid subscription plan');
    }

    try {
      // For demo purposes, we'll simulate a successful subscription
      // In a real app, this would go through Stripe Checkout
      const expiryDate = new Date();
      if (plan.interval === 'month') {
        expiryDate.setMonth(expiryDate.getMonth() + 1);
      } else {
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
      }

      await authService.updateUserProfile({
        tier: plan.tier,
        subscriptionId: `sim_${Date.now()}`,
        subscriptionStatus: 'active',
        subscriptionExpiry: expiryDate
      });

      console.log(`Successfully subscribed to ${plan.name}`);
    } catch (error) {
      console.error('Subscription error:', error);
      throw error;
    }
  }

  // Cancel subscription
  async cancelSubscription(): Promise<void> {
    const user = authService.getCurrentUser();
    const profile = authService.getUserProfile();
    
    if (!user || !profile) {
      throw new Error('User must be authenticated');
    }

    if (!profile.subscriptionId) {
      throw new Error('No active subscription found');
    }

    try {
      // In a real app, this would call your backend to cancel the Stripe subscription
      await authService.updateUserProfile({
        subscriptionStatus: 'cancelled'
      });

      console.log('Subscription cancelled successfully');
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      throw error;
    }
  }

  // Get available plans
  getAvailablePlans(): SubscriptionPlan[] {
    return SUBSCRIPTION_PLANS;
  }

  // Get plan by ID
  getPlanById(planId: string): SubscriptionPlan | undefined {
    return SUBSCRIPTION_PLANS.find(plan => plan.id === planId);
  }
}

export const subscriptionService = SubscriptionService.getInstance();