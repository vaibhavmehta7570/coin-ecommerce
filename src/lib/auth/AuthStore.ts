import create from "zustand";

type AuthItem = {
  userName: string;
  password: string;
  firstName: string;
  imgLink: string;
  token: string;
};

type AuthState = {
  auth: AuthItem[];
  Login: (firstName: string, imglink: string, token: string) => void;
  Logout: (firstName: string, imglink: string, token: string) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  auth: [],
  Login: (firstName, imglink, token) =>
    set((state) => {
      return {
        auth: [...state.auth, { firstName, imglink, token }],
      };
    }),
  Logout: (token) =>
    set((state) => {
      return {
        auth: state.auth.filter((item) => item.token !== token),
      };
    }),
}));

export default useAuthStore;
