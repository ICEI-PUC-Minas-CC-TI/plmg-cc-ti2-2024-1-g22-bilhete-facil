import { Button } from '@/components/ui/button'
import { Ticket } from '@phosphor-icons/react'
import { Link, Outlet, useLocation } from 'react-router-dom'

export function AccountRoot() {
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 p-12 gap-8">
      <div className="bg-muted p-12 rounded-lg hidden lg:flex flex-col justify-between">
        <Link to="/">
          <h1 className="text-2xl font-medium flex items-center gap-2">
            <Ticket className="-rotate-45" size={28} />
            BilheteFácil
          </h1>
        </Link>
        <p className="text-lg max-w-[500px] font-medium">
          Venda ou compre ingressos para os seus shows favoritos.
        </p>
      </div>
      <div className="flex flex-col items-center gap-8 justify-center max-w-md w-full mx-auto relative">
        <Button className="absolute top-0 right-0" variant="ghost">
          {pathname === '/account/signup' ? (
            <Link to="/account/login">Entrar</Link>
          ) : (
            <Link to="/account/signup">Cadastrar</Link>
          )}
        </Button>
        <Outlet />
      </div>
    </div>
  )
}
