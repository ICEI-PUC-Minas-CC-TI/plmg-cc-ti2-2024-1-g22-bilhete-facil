import { ShoppingCart, SignOut, Ticket, User } from '@phosphor-icons/react'
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
import { Link, useNavigate } from 'react-router-dom'

export function UserDropdown() {
  const navigate = useNavigate()
  function handleLogout() {
    localStorage.removeItem('token')
    navigate('/account/login')
  }
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/rodrigomsrocha.png" />
          <AvatarFallback>RM</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuLabel>
          <div className="flex items-center gap-4 py-1">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/rodrigomsrocha.png" />
              <AvatarFallback>RM</AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-1">
              <strong className="text-sm leading-none">Rodrigo Marques</strong>
              <span className="text-xs leading-none text-muted-foreground">
                rodrigomtc82@gmail.com
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
            <Link to="/profile/cart" className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Carrinho
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/profile/new-ticket" className="flex items-center gap-2">
              <Ticket className="h-5 w-5" />
              Vender Ingresso
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
