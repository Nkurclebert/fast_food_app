import { getCurrentUser } from '@/lib/appwrite';
import { User } from '@/type';
import { create } from 'zustand';

type AuthState = {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;

    setIsAuthenticated: (value: boolean) => void;
    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;

    fetchAuthenticatedUser: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    isLoading: true,

    setIsAuthenticated: (value) => set({ isAuthenticated: value }),

    setUser: (user) => set({ user }),
    setLoading: (value) => set({ isLoading: value }),

    fetchAuthenticatedUser: async () => {
        set({ isLoading: true });

        try {
            // Try to get the current user
            const user = await getCurrentUser();

            if (user) set({ isAuthenticated: true, user: user as User });
            else set({ isAuthenticated: false, user: null });

        } catch (error: any) {
            // If error is missing scope, treat as not authenticated
            if (
                error.message?.includes("missing scope") ||
                error.message?.includes("session is prohibited")
            ) {
                set({ isAuthenticated: false, user: null });
            } else {
                console.log('fetchAuthenticatedUser error:', error);
                set({ isAuthenticated: false, user: null });
            }
        } finally {
            set({ isLoading: false });
        }
    },
}))

export default useAuthStore;