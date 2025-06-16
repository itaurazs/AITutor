import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  tier: 'free' | 'premium';
  questionsUsed: number;
  questionsLimit: number;
  createdAt: Date;
}

class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;
  private userProfile: UserProfile | null = null;

  private constructor() {
    // Only initialize auth listener if Firebase is properly configured
    if (auth) {
      onAuthStateChanged(auth, (user) => {
        this.currentUser = user;
        if (user) {
          this.loadUserProfile(user.uid);
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

  async signIn(email: string, password: string): Promise<User> {
    if (!auth) {
      throw new Error('Firebase Auth is not initialized. Please check your Firebase configuration.');
    }
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  }

  async signUp(email: string, password: string, displayName: string): Promise<User> {
    if (!auth || !db) {
      throw new Error('Firebase is not initialized. Please check your Firebase configuration.');
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update the user's display name
    await updateProfile(user, { displayName });

    // Create user profile in Firestore
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email!,
      displayName,
      tier: 'free',
      questionsUsed: 0,
      questionsLimit: 10,
      createdAt: new Date()
    };

    await setDoc(doc(db, 'users', user.uid), userProfile);
    this.userProfile = userProfile;

    return user;
  }

  async signOut(): Promise<void> {
    if (!auth) {
      throw new Error('Firebase Auth is not initialized. Please check your Firebase configuration.');
    }
    
    await signOut(auth);
    this.userProfile = null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  async loadUserProfile(uid: string): Promise<UserProfile | null> {
    if (!db) {
      console.warn('Firestore is not initialized. Cannot load user profile.');
      return null;
    }

    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        this.userProfile = {
          ...data,
          createdAt: data.createdAt?.toDate() || new Date()
        } as UserProfile;
        return this.userProfile;
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
    return null;
  }

  getUserProfile(): UserProfile | null {
    return this.userProfile;
  }

  async updateUserProfile(updates: Partial<UserProfile>): Promise<void> {
    if (!db || !this.currentUser) {
      throw new Error('Firebase is not initialized or user is not authenticated.');
    }

    const userRef = doc(db, 'users', this.currentUser.uid);
    await setDoc(userRef, updates, { merge: true });
    
    if (this.userProfile) {
      this.userProfile = { ...this.userProfile, ...updates };
    }
  }

  async incrementQuestionUsage(): Promise<void> {
    if (!this.userProfile || !this.currentUser) {
      throw new Error('User profile not loaded or user not authenticated.');
    }

    const newUsage = this.userProfile.questionsUsed + 1;
    await this.updateUserProfile({ questionsUsed: newUsage });
  }

  canUseQuestion(): boolean {
    if (!this.userProfile) return false;
    return this.userProfile.questionsUsed < this.userProfile.questionsLimit;
  }

  getRemainingQuestions(): number {
    if (!this.userProfile) return 0;
    return Math.max(0, this.userProfile.questionsLimit - this.userProfile.questionsUsed);
  }

  isFirebaseConfigured(): boolean {
    return auth !== null && db !== null;
  }

  onAuthStateChange(callback: (user: User | null) => void): () => void {
    if (!auth) {
      console.warn('Firebase Auth is not initialized. Auth state changes will not be monitored.');
      return () => {}; // Return empty unsubscribe function
    }
    
    return onAuthStateChanged(auth, callback);
  }
}

// Export singleton instance
export default AuthService.getInstance();