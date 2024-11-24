import { createFileRoute } from '@tanstack/react-router'
import { LoginForm } from '@/ui/login'

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
})

function RouteComponent() {
  return <LoginForm/> 
}


