import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialUser = {
  name: "",
  username: "",
  email: "",
  mobile: "",
};

export const useSuperStore = create(
  persist(
    (set) => ({
      user: initialUser,
      categories: [],
      notes: "",
      weatherRegion: "Delhi",
      setUser: (user) => set({ user }),
      setCategories: (categories) => set({ categories }),
      setNotes: (notes) => set({ notes }),
      setWeatherRegion: (weatherRegion) => set({ weatherRegion }),
      reset: () =>
        set({
          user: initialUser,
          categories: [],
          notes: "",
          weatherRegion: "Delhi",
        }),
    }),
    {
      name: "super-app-store",
      partialize: (state) => ({
        user: state.user,
        categories: state.categories,
        notes: state.notes,
        weatherRegion: state.weatherRegion,
      }),
    }
  )
);
