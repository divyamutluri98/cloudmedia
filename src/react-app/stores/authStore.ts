import { create } from 'zustand'
import { supabase, getSupabaseUser } from '../lib/supabase'
import type { Database } from '../types/database.types'

type Profile = Database['public']['Tables']['profiles']['Row']

interface AuthState {
  user: Profile | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ error: any }>
  signInWithGoogle: () => Promise<void>
  register: (email: string, password: string, username: string) => Promise<{ error: any }>
  logout: () => Promise<void>
  getUser: () => Promise<void>
  updateUser: (data: Partial<Profile>) => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (!error) {
      await get().getUser()
    }
    
    return { error }
  },

  signInWithGoogle: async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  },

  register: async (email: string, password: string, username: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    })
    
    return { error }
  },

  logout: async () => {
    await supabase.auth.signOut()
    set({ user: null, isAuthenticated: false })
  },

  getUser: async () => {
    const user = await getSupabaseUser()
    
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      
      set({ 
        user: profile || null, 
        isAuthenticated: true,
        isLoading: false 
      })
    } else {
      set({ user: null, isAuthenticated: false, isLoading: false })
    }
  },

  updateUser: async (data: Partial<Profile>) => {
    if (!get().user) return
    
    const { error } = await supabase
      .from('profiles')
      .update(data)
      .eq('id', get().user!.id)
    
    if (!error) {
      set((state) => ({
        user: state.user ? { ...state.user, ...data } : null,
      }))
    }
  },
}))
