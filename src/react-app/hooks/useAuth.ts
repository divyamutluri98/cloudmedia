import { useEffect } from 'react'
import { useAuthStore } from '../stores/authStore'

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, getUser } = useAuthStore()

  useEffect(() => {
    getUser()
  }, [])

  return {
    user,
    isAuthenticated,
    isLoading,
  }
}
