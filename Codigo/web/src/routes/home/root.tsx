import { Header } from '@/components/header'
import { Separator } from '@/components/ui/separator'
import { Outlet } from 'react-router-dom'

export function Root() {
  return (
    <div>
      <Header />
      <Separator />
      <div className="max-w-5xl mx-auto px-6 py-2">
        <Outlet />
      </div>
    </div>
  )
}
