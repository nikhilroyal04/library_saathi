'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function AuthButton() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated by checking for session cookie
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check', { credentials: 'include' })
        setIsAuthenticated(response.ok)
      } catch {
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }
    checkAuth()
  }, [])

  if (isLoading) {
    return null
  }

  if (isAuthenticated) {
    return (
      <Link href="/dashboard">
        <Button variant="outline" size="sm" className="nav-link-cta">
          Dashboard
        </Button>
      </Link>
    )
  }

  return (
    <Link href="/login">
      <Button variant="outline" size="sm" className="nav-link-cta">
        Login
      </Button>
    </Link>
  )
}

