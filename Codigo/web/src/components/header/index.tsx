import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { MagnifyingGlass, Ticket } from '@phosphor-icons/react'
import { UserDropdown } from '../user-dropdown'
import { Link } from 'react-router-dom'

export function Header() {
  const isAuthenticated = localStorage.getItem('token')
  return (
    <header className="max-w-5xl gap-4 px-6 mx-auto flex justify-between items-center py-2">
      <Link
        to="/"
        className="text-xl flex gap-2 items-center hover:animate-pulse duration-1000 cursor-pointer"
      >
        <Ticket className="-rotate-45" size={24} />
        <span className="hidden sm:inline">BilheteFacil</span>
      </Link>
      <div className="flex gap-2 items-center max-w-xs w-full">
        <Input type="text" placeholder="Evento..." />
        <Button className="aspect-square" size="icon">
          <MagnifyingGlass size={18} />
        </Button>
      </div>
      {isAuthenticated ? (
        <UserDropdown />
      ) : (
        <div className="flex gap-2">
          <Button variant="ghost">
            <Link to="/account/login">Entrar</Link>
          </Button>
          <Button>
            <Link to="/account/signup">Cadastrar</Link>
          </Button>
        </div>
      )}
    </header>
  )
}
