import { useAuth } from './useAuth'

type Role = 'admin' | 'editor' | 'contributor'

export const usePermissions = () => {
  const { user, isAuthenticated } = useAuth()

  const hasRole = (roles: Role[]) => {
    if (!isAuthenticated || !user) return false
    return roles.includes(user.role)
  }

  const isAdmin = hasRole(['admin'])
  const isEditor = hasRole(['admin', 'editor'])
  const isContributor = hasRole(['admin', 'editor', 'contributor'])

  return {
    user,
    isAdmin,
    isEditor,
    isContributor,
    hasRole,
    canEditArticle: (authorId: string) => {
      if (!user) return false
      return isAdmin || isEditor || user.id === authorId
    },
    canPublishArticle: isAdmin || isEditor,
    canManageUsers: isAdmin,
    canAccessAdmin: isContributor,
  }
}
