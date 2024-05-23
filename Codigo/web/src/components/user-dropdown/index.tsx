import { getUser } from '@/lib/auth'
import { CurrencyDollar, SignOut, Ticket, User } from '@phosphor-icons/react'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export function UserDropdown() {
  const user = getUser()
  const navigate = useNavigate()
  function handleLogout() {
    localStorage.removeItem('user')
    navigate('/account/login')
  }
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>{user.nome[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuLabel>
          <div className="flex items-center gap-4 py-1">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" />
              <AvatarFallback>{user.nome[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-1">
              <strong className="text-sm leading-none">{user.nome}</strong>
              <span className="text-xs leading-none text-muted-foreground">
                {user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="py-2 space-y-2">
          <DropdownMenuItem asChild>
            <Link to="/profile/me" className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Meu Perfil
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/profile/new-ticket" className="flex items-center gap-2">
              <CurrencyDollar className="h-5 w-5" />
              Vender Ingresso
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/profile/my-tickets" className="flex items-center gap-2">
              <Ticket className="h-5 w-5" />
              Meus Ingressos
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2">
          <SignOut className="h-5 w-5 text-red-700" />
          <button onClick={handleLogout} className="text-red-500">
            Log out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
