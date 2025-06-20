import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User,
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  connectAuthEmulator
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';

export type UserTier = 'free' | 'premium' | 'unlimited';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  avatar?: string; // Added avatar field
  tier: UserTier;
  subscriptionId?: string;
  subscriptionStatus: 'active' | 'cancelled' | 'expired' | 'none';
  subscriptionExpiry?: Date;
  createdAt: Date;
  lastLogin: Date;
  usage: {
    daily: {
      count: number;
      date: string;
    };
    monthly: {
      count: number;
      month: string;
    };
    total: number;
  };
  progress: {
    totalQuestions: number;
    subjectStats: Record<string, {
      questionsAsked: number;
      lastUsed: Date;
      favoriteTopics: string[];
    }>;
    streakDays: number;
    lastActiveDate: string;
  };
}

class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;
  private userProfile: UserProfile | null = null;
  private authInitialized = false;

  private constructor() {
    this.initializeAuth();
  }

  private async initializeAuth() {
    // Only initialize auth listener if Firebase is properly configured
    if (auth) {
      try {
        // Set up auth state listener with timeout
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          this.currentUser = user;
          if (user) {
            await this.loadUserProfile(user.uid);
          } else {
            this.userProfile = null;
          }
          this.authInitialized = true;
        });

        // Set a timeout for auth initialization
        setTimeout(() => {
          if (!this.authInitialized) {
            console.warn('Firebase Auth initialization timed out');
            this.authInitialized = true;
          }
        }, 5000);

      } catch (error) {
        console.warn('Firebase Auth initialization failed:', error);
        this.authInitialized = true;
      }
    } else {
      console.warn('Firebase Auth is not initialized. Please check your Firebase configuration.');
      this.authInitialized = true;
    }
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // Helper function to create timeout promise
  private createTimeoutPromise<T>(promise: Promise<T>, timeoutMs: number = 10000): Promise<T> {
    return Promise.race([
      promise,
      new Promise<T>((_, reject) => 
        setTimeout(() => reject(new Error('Operation timed out')), timeoutMs)
      )
    ]);
  }

  // Sign up with email and password
  async signUp(email: string, password: string, displayName: string, avatar?: string): Promise<UserProfile> {
    if (!auth) {
      throw new Error('Firebase is not initialized. Please check your Firebase configuration.');
    }

    try {
      const userCredential = await this.createTimeoutPromise(
        createUserWithEmailAndPassword(auth, email, password),
        15000
      );
      const user = userCredential.user;

      // Update display name
      await this.createTimeoutPromise(
        updateProfile(user, { displayName }),
        10000
      );

      // Create user profile
      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email!,
        displayName,
        avatar: avatar || '/avatars/avatar1.svg', // Default avatar
        tier: 'free',
        subscriptionStatus: 'none',
        createdAt: new Date(),
        lastLogin: new Date(),
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
        progress: {
          totalQuestions: 0,
          subjectStats: {},
          streakDays: 0,
          lastActiveDate: new Date().toISOString().split('T')[0]
        }
      };

      // Try to save to Firestore with timeout
      if (db) {
        try {
          await this.createTimeoutPromise(
            setDoc(doc(db, 'users', user.uid), {
              ...userProfile,
              createdAt: serverTimestamp(),
              lastLogin: serverTimestamp()
            }),
            10000
          );
        } catch (error) {
          console.warn('Failed to save user profile to Firestore:', error);
          // Continue with local profile
        }
      }

      this.userProfile = userProfile;
      return userProfile;
    } catch (error: any) {
      console.error('Sign up error:', error);
      if (error.message === 'Operation timed out') {
        throw new Error('Sign up is taking too long. Please check your internet connection and try again.');
      }
      throw error;
    }
  }

  // Sign in with email and password
  async signIn(email: string, password: string): Promise<UserProfile> {
    if (!auth) {
      throw new Error('Firebase Auth is not initialized. Please check your Firebase configuration.');
    }

    try {
      const userCredential = await this.createTimeoutPromise(
        signInWithEmailAndPassword(auth, email, password),
        15000
      );
      const user = userCredential.user;

      // Update last login if db is available
      if (db) {
        try {
          await this.createTimeoutPromise(
            updateDoc(doc(db, 'users', user.uid), {
              lastLogin: serverTimestamp()
            }),
            5000
          );
        } catch (error) {
          console.warn('Failed to update last login:', error);
        }
      }

      await this.loadUserProfile(user.uid);
      return this.userProfile!;
    } catch (error: any) {
      console.error('Sign in error:', error);
      if (error.message === 'Operation timed out') {
        throw new Error('Sign in is taking too long. Please check your internet connection and try again.');
      }
      throw error;
    }
  }

  // Sign in with Google
  async signInWithGoogle(): Promise<UserProfile> {
    if (!auth) {
      throw new Error('Firebase Auth is not initialized. Please check your Firebase configuration.');
    }

    try {
      const provider = new GoogleAuthProvider();
      
      // Add additional scopes if needed
      provider.addScope('email');
      provider.addScope('profile');
      
      // Set custom parameters
      provider.setCustomParameters({
        prompt: 'select_account'
      });

      const userCredential = await this.createTimeoutPromise(
        signInWithPopup(auth, provider),
        20000 // Longer timeout for Google sign-in
      );
      const user = userCredential.user;

      // Create a basic user profile first
      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email!,
        displayName: user.displayName || 'User',
        avatar: '/avatars/avatar1.svg', // Default avatar for Google sign-in
        tier: 'free',
        subscriptionStatus: 'none',
        createdAt: new Date(),
        lastLogin: new Date(),
        usage: {
          daily: { count: 0, date: new Date().toISOString().split('T')[0] },
          monthly: { count: 0, month: new Date().toISOString().slice(0, 7) },
          total: 0
        },
        progress: {
          totalQuestions: 0,
          subjectStats: {},
          streakDays: 0,
          lastActiveDate: new Date().toISOString().split('T')[0]
        }
      };

      // Set the profile immediately for offline scenarios
      this.userProfile = userProfile;

      // Try to sync with Firestore if available (with shorter timeout)
      if (db) {
        try {
          const userDoc = await this.createTimeoutPromise(
            getDoc(doc(db, 'users', user.uid)),
            8000
          );
          
          if (!userDoc.exists()) {
            // Create new user profile in Firestore
            await this.createTimeoutPromise(
              setDoc(doc(db, 'users', user.uid), {
                ...userProfile,
                createdAt: serverTimestamp(),
                lastLogin: serverTimestamp()
              }),
              8000
            );
          } else {
            // Load existing profile from Firestore
            const data = userDoc.data();
            this.userProfile = {
              ...data,
              createdAt: data.createdAt?.toDate() || new Date(),
              lastLogin: data.lastLogin?.toDate() || new Date(),
              subscriptionExpiry: data.subscriptionExpiry?.toDate(),
              avatar: data.avatar || '/avatars/avatar1.svg' // Ensure avatar exists
            } as UserProfile;

            // Update last login
            await this.createTimeoutPromise(
              updateDoc(doc(db, 'users', user.uid), {
                lastLogin: serverTimestamp()
              }),
              5000
            );
          }
        } catch (error) {
          console.warn('Firestore operation failed, continuing with local profile:', error);
          // Continue with the basic profile we created above
        }
      }

      return this.userProfile!;
    } catch (error: any) {
      console.error('Google sign in error:', error);
      
      // Provide more specific error messages
      if (error.message === 'Operation timed out') {
        throw new Error('Google Sign-In is taking too long. Please check your internet connection and try again.');
      } else if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Sign-in was cancelled. Please try again.');
      } else if (error.code === 'auth/popup-blocked') {
        throw new Error('Pop-up was blocked by your browser. Please allow pop-ups and try again.');
      } else if (error.code === 'auth/unauthorized-domain') {
        throw new Error('This domain is not authorized for Google Sign-In. Please contact support.');
      } else if (error.code === 'auth/operation-not-allowed') {
        throw new Error('Google Sign-In is not enabled. Please contact support.');
      } else if (error.code === 'auth/network-request-failed') {
        throw new Error('Network error. Please check your internet connection and try again.');
      } else if (error.message && error.message.includes('offline')) {
        throw new Error('You appear to be offline. Please check your internet connection and try again.');
      } else {
        throw new Error(`Google Sign-In failed: ${error.message || 'Unknown error'}`);
      }
    }
  }

  // Sign out
  async signOut(): Promise<void> {
    if (!auth) {
      throw new Error('Firebase Auth is not initialized. Please check your Firebase configuration.');
    }

    try {
      await this.createTimeoutPromise(signOut(auth), 10000);
      this.currentUser = null;
      this.userProfile = null;
    } catch (error: any) {
      console.error('Sign out error:', error);
      if (error.message === 'Operation timed out') {
        // Force local sign out even if remote fails
        this.currentUser = null;
        this.userProfile = null;
        return;
      }
      throw error;
    }
  }

  // Reset password
  async resetPassword(email: string): Promise<void> {
    if (!auth) {
      throw new Error('Firebase Auth is not initialized. Please check your Firebase configuration.');
    }

    try {
      await this.createTimeoutPromise(
        sendPasswordResetEmail(auth, email),
        10000
      );
    } catch (error: any) {
      console.error('Password reset error:', error);
      if (error.message === 'Operation timed out') {
        throw new Error('Password reset is taking too long. Please check your internet connection and try again.');
      }
      throw error;
    }
  }

  // Load user profile from Firestore
  private async loadUserProfile(uid: string): Promise<void> {
    if (!db) {
      console.warn('Firestore is not initialized. Using basic profile.');
      // Create a basic profile if Firestore is not available
      if (this.currentUser) {
        this.userProfile = {
          uid: this.currentUser.uid,
          email: this.currentUser.email!,
          displayName: this.currentUser.displayName || 'User',
          avatar: '/avatars/avatar1.svg',
          tier: 'free',
          subscriptionStatus: 'none',
          createdAt: new Date(),
          lastLogin: new Date(),
          usage: {
            daily: { count: 0, date: new Date().toISOString().split('T')[0] },
            monthly: { count: 0, month: new Date().toISOString().slice(0, 7) },
            total: 0
          },
          progress: {
            totalQuestions: 0,
            subjectStats: {},
            streakDays: 0,
            lastActiveDate: new Date().toISOString().split('T')[0]
          }
        };
      }
      return;
    }

    try {
      const userDoc = await this.createTimeoutPromise(
        getDoc(doc(db, 'users', uid)),
        8000
      );
      
      if (userDoc.exists()) {
        const data = userDoc.data();
        this.userProfile = {
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          lastLogin: data.lastLogin?.toDate() || new Date(),
          subscriptionExpiry: data.subscriptionExpiry?.toDate(),
          avatar: data.avatar || '/avatars/avatar1.svg' // Ensure avatar exists
        } as UserProfile;
      } else {
        // Create a basic profile if document doesn't exist
        if (this.currentUser) {
          this.userProfile = {
            uid: this.currentUser.uid,
            email: this.currentUser.email!,
            displayName: this.currentUser.displayName || 'User',
            avatar: '/avatars/avatar1.svg',
            tier: 'free',
            subscriptionStatus: 'none',
            createdAt: new Date(),
            lastLogin: new Date(),
            usage: {
              daily: { count: 0, date: new Date().toISOString().split('T')[0] },
              monthly: { count: 0, month: new Date().toISOString().slice(0, 7) },
              total: 0
            },
            progress: {
              totalQuestions: 0,
              subjectStats: {},
              streakDays: 0,
              lastActiveDate: new Date().toISOString().split('T')[0]
            }
          };
        }
      }
    } catch (error) {
      console.warn('Error loading user profile from Firestore:', error);
      // Create a basic profile as fallback
      if (this.currentUser) {
        this.userProfile = {
          uid: this.currentUser.uid,
          email: this.currentUser.email!,
          displayName: this.currentUser.displayName || 'User',
          avatar: '/avatars/avatar1.svg',
          tier: 'free',
          subscriptionStatus: 'none',
          createdAt: new Date(),
          lastLogin: new Date(),
          usage: {
            daily: { count: 0, date: new Date().toISOString().split('T')[0] },
            monthly: { count: 0, month: new Date().toISOString().slice(0, 7) },
            total: 0
          },
          progress: {
            totalQuestions: 0,
            subjectStats: {},
            streakDays: 0,
            lastActiveDate: new Date().toISOString().split('T')[0]
          }
        };
      }
    }
  }

  // Update user profile
  async updateUserProfile(updates: Partial<UserProfile>): Promise<void> {
    if (!this.currentUser) throw new Error('No authenticated user');

    if (db) {
      try {
        await this.createTimeoutPromise(
          updateDoc(doc(db, 'users', this.currentUser.uid), updates),
          8000
        );
      } catch (error) {
        console.warn('Error updating user profile in Firestore:', error);
        // Continue with local update
      }
    }

    if (this.userProfile) {
      this.userProfile = { ...this.userProfile, ...updates };
    }
  }

  // Update user avatar
  async updateAvatar(avatarUrl: string): Promise<void> {
    await this.updateUserProfile({ avatar: avatarUrl });
  }

  // Record AI usage
  async recordAIUsage(subject: string): Promise<void> {
    if (!this.currentUser || !this.userProfile) return;

    const today = new Date().toISOString().split('T')[0];
    const currentMonth = new Date().toISOString().slice(0, 7);

    // Update usage stats
    const updatedUsage = {
      daily: {
        count: this.userProfile.usage.daily.date === today 
          ? this.userProfile.usage.daily.count + 1 
          : 1,
        date: today
      },
      monthly: {
        count: this.userProfile.usage.monthly.month === currentMonth 
          ? this.userProfile.usage.monthly.count + 1 
          : 1,
        month: currentMonth
      },
      total: this.userProfile.usage.total + 1
    };

    // Update progress stats
    const subjectStats = { ...this.userProfile.progress.subjectStats };
    if (!subjectStats[subject]) {
      subjectStats[subject] = {
        questionsAsked: 0,
        lastUsed: new Date(),
        favoriteTopics: []
      };
    }
    subjectStats[subject].questionsAsked += 1;
    subjectStats[subject].lastUsed = new Date();

    // Calculate streak
    const lastActiveDate = this.userProfile.progress.lastActiveDate;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    let streakDays = this.userProfile.progress.streakDays;
    if (lastActiveDate === yesterdayStr) {
      streakDays += 1;
    } else if (lastActiveDate !== today) {
      streakDays = 1;
    }

    const updatedProgress = {
      totalQuestions: this.userProfile.progress.totalQuestions + 1,
      subjectStats,
      streakDays,
      lastActiveDate: today
    };

    await this.updateUserProfile({
      usage: updatedUsage,
      progress: updatedProgress
    });
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  // Get user profile
  getUserProfile(): UserProfile | null {
    return this.userProfile;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  // Check if Firebase is configured
  isFirebaseConfigured(): boolean {
    return auth !== null;
  }

  // Check if auth is initialized
  isAuthInitialized(): boolean {
    return this.authInitialized;
  }
}

// Export singleton instance
export default AuthService.getInstance();