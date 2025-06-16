import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User,
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  tier: 'free' | 'premium' | 'unlimited';
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

  private constructor() {
    // Only initialize auth listener if Firebase is properly configured
    if (auth) {
      onAuthStateChanged(auth, async (user) => {
        this.currentUser = user;
        if (user) {
          await this.loadUserProfile(user.uid);
        } else {
          this.userProfile = null;
        }
      });
    } else {
      console.warn('Firebase Auth is not initialized. Please check your Firebase configuration.');
    }
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // Sign up with email and password
  async signUp(email: string, password: string, displayName: string): Promise<UserProfile> {
    if (!auth || !db) {
      throw new Error('Firebase is not initialized. Please check your Firebase configuration.');
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update display name
      await updateProfile(user, { displayName });

      // Create user profile in Firestore
      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email!,
        displayName,
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

      await setDoc(doc(db, 'users', user.uid), {
        ...userProfile,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp()
      });

      this.userProfile = userProfile;
      return userProfile;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  }

  // Sign in with email and password
  async signIn(email: string, password: string): Promise<UserProfile> {
    if (!auth) {
      throw new Error('Firebase Auth is not initialized. Please check your Firebase configuration.');
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update last login if db is available
      if (db) {
        await updateDoc(doc(db, 'users', user.uid), {
          lastLogin: serverTimestamp()
        });
      }

      await this.loadUserProfile(user.uid);
      return this.userProfile!;
    } catch (error) {
      console.error('Sign in error:', error);
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
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Check if user profile exists (only if db is available)
      if (db) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        
        if (!userDoc.exists()) {
          // Create new user profile
          const userProfile: UserProfile = {
            uid: user.uid,
            email: user.email!,
            displayName: user.displayName || 'User',
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

          await setDoc(doc(db, 'users', user.uid), {
            ...userProfile,
            createdAt: serverTimestamp(),
            lastLogin: serverTimestamp()
          });

          this.userProfile = userProfile;
        } else {
          // Update last login
          await updateDoc(doc(db, 'users', user.uid), {
            lastLogin: serverTimestamp()
          });
          await this.loadUserProfile(user.uid);
        }
      } else {
        // If no db, create a basic profile
        this.userProfile = {
          uid: user.uid,
          email: user.email!,
          displayName: user.displayName || 'User',
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

      return this.userProfile!;
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    }
  }

  // Sign out
  async signOut(): Promise<void> {
    if (!auth) {
      throw new Error('Firebase Auth is not initialized. Please check your Firebase configuration.');
    }

    try {
      await signOut(auth);
      this.currentUser = null;
      this.userProfile = null;
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

  // Reset password
  async resetPassword(email: string): Promise<void> {
    if (!auth) {
      throw new Error('Firebase Auth is not initialized. Please check your Firebase configuration.');
    }

    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  }

  // Load user profile from Firestore
  private async loadUserProfile(uid: string): Promise<void> {
    if (!db) {
      console.warn('Firestore is not initialized. Cannot load user profile.');
      return;
    }

    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        this.userProfile = {
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          lastLogin: data.lastLogin?.toDate() || new Date(),
          subscriptionExpiry: data.subscriptionExpiry?.toDate()
        } as UserProfile;
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  }

  // Update user profile
  async updateUserProfile(updates: Partial<UserProfile>): Promise<void> {
    if (!this.currentUser) throw new Error('No authenticated user');

    if (db) {
      try {
        await updateDoc(doc(db, 'users', this.currentUser.uid), updates);
      } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
      }
    }

    if (this.userProfile) {
      this.userProfile = { ...this.userProfile, ...updates };
    }
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
}

// Export singleton instance
export default AuthService.getInstance();