import create from "zustand";

interface AuthState {
  authh: boolean;
  setAuthh: (authh: boolean) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  authh: false,
  setAuthh: (authh) => set({ authh }),
}));

export default useAuthStore;
