import { TagList } from '@/ui/tag-list'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tags')({
  component: () => <TagList />,
})
