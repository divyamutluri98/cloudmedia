import { create } from 'zustand'
import { supabase } from '../lib/supabase'

interface Notification {
  id: string
  message: string
  type: string
  is_read: boolean
  link: string | null
  created_at: string
}

interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  fetchNotifications: () => Promise<void>
  markAsRead: (id: string) => Promise<void>
  markAllAsRead: () => Promise<void>
  subscribeToNotifications: (userId: string) => void
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,

  fetchNotifications: async () => {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)
    
    if (!error && data) {
      set({ 
        notifications: data,
        unreadCount: data.filter(n => !n.is_read).length
      })
    }
  },

  markAsRead: async (id: string) => {
    await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', id)
    
    set((state) => ({
      notifications: state.notifications.map(n => 
        n.id === id ? { ...n, is_read: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    }))
  },

  markAllAsRead: async () => {
    await supabase
      .from('notifications')
      .update({ is_read: true })
      .in('id', get().notifications.map(n => n.id))
    
    set({ 
      notifications: get().notifications.map(n => ({ ...n, is_read: true })),
      unreadCount: 0,
    })
  },

  subscribeToNotifications: (userId: string) => {
    const channel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          set((state) => ({
            notifications: [payload.new as Notification, ...state.notifications],
            unreadCount: state.unreadCount + 1,
          }))
        }
      )
      .subscribe()
    
    return () => {
      supabase.removeChannel(channel)
    }
  },
}))
