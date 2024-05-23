import { getUser } from '@/lib/auth'
import { MagnifyingGlass, Ticket } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { UserDropdown } from '../user-dropdown'

export function Header() {
  const user = getUser()
  return (
    <header className="max-w-5xl gap-4 px-6 mx-auto flex justify-between items-center py-2">
      <Link
        to="/"
        className="text-xl flex gap-2 items-center hover:animate-pulse duration-1000 cursor-pointer"
      >
        <Ticket className="-rotate-45" size={24} />
        <span className="hidden sm:inline">BilheteFacil</span>
      </Link>
      <div className="flex gap-2 max-w-xs w-full">
        <Input type="text" placeholder="Evento..." />
        <Button className="w-12" size="icon">
          <MagnifyingGlass size={18} />
        </Button>
      </div>
      {user ? (
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
