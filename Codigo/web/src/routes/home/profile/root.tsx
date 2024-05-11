import { Separator } from '@/components/ui/separator'
import { SidebarNav } from '@/components/sidebar-nav'
import { Outlet } from 'react-router-dom'

const sidebarNavItems = [
  {
    title: 'Meu Perfil',
    href: '/profile/me',
  },
  {
    title: 'Carrinho',
    href: '/profile/cart',
  },
  {
    title: 'Vender ingresso',
    href: '/profile/new-ticket',
  },
]

export function ProfileRoot() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-bold text-2xl">Perfil</h1>
        <span className="leading-none text-muted-foreground">
          Gerencie seu perfil por aqui.
        </span>
      </header>
      <Separator />
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-xl">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
