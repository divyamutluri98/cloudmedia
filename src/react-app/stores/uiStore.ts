import { create } from 'zustand'

interface UIState {
  isDarkMode: boolean
  isMobileMenuOpen: boolean
  isSearchOpen: boolean
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  toggleDarkMode: () => void
  toggleMobileMenu: () => void
  toggleSearch: () => void
  setMobileMenuOpen: (open: boolean) => void
  setSearchOpen: (open: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  isDarkMode: false,
  isMobileMenuOpen: false,
  isSearchOpen: false,
  selectedCategory: 'all',

  toggleDarkMode: () => {
    set((state) => {
      const newMode = !state.isDarkMode
      localStorage.setItem('darkMode', newMode.toString())
      if (newMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      return { isDarkMode: newMode }
    })
  },

  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  
  setMobileMenuOpen: (open: boolean) => set({ isMobileMenuOpen: open }),
  
  setSearchOpen: (open: boolean) => set({ isSearchOpen: open }),

  setSelectedCategory: (category: string) => set({ selectedCategory: category }),
}))

// Initialize dark mode from localStorage
if (typeof window !== 'undefined') {
  const isDark = localStorage.getItem('darkMode') === 'true'
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  if (isDark || (!isDark && prefersDark)) {
    document.documentElement.classList.add('dark')
  }
}
