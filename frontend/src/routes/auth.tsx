import { createFileRoute } from '@tanstack/react-router'
import { LoginForm } from '@/ui/login'
import { Profile } from '@/ui/profile';

const isUserAuthenticated = localStorage.getItem('token') !== null;
export const Route = createFileRoute('/auth')({
  component: () => isUserAuthenticated ? <Profile /> : <LoginForm />,
})




