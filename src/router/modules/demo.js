import { GdLayout } from '@/components'
export default {
  path: '/demo',
  component: GdLayout,
  children: [
    {
      path: 'home',
      component: () => import('@/views/home')
    }
  ]
}
