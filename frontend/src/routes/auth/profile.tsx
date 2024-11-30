import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { LoginForm } from '@/ui/auth/login'
import { Profile } from '@/ui/auth/profile'

export const Route = createFileRoute('/auth/profile')({
  component: () => {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
    useEffect(() => {
      const token = localStorage.getItem('token');
      setIsUserAuthenticated(token !== null);
    }, []); 
    return isUserAuthenticated ? <Profile /> : <LoginForm />;
  },
})
