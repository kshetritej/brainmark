import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { RegisterForm } from '@/ui/auth/register'

export const Route = createFileRoute('/auth/register')({
  component: RouteComponent,
})

function RouteComponent() {
  <RegisterForm />
}
