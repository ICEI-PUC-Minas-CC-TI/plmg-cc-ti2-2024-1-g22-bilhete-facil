import { getUser } from '@/lib/auth'
import { formatCurrency } from '@/lib/utils'
import { Ticket } from '@/shared/interfaces/ticket.interface'
import { ShoppingCart, Trash } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '../ui/button'

export function TicketItem(ticket: Ticket) {
  const user = getUser()
  function handleAddToCart() {
    toast('Ingresso adicionado ao carrinho')
  }

  function handleDeleteTicket() {
    toast('Ingresso deletado')
  }

  return (
    <div className="space-y-2 relative cursor-pointer">
      {user.idUsuario === ticket.idUsuario ? (
        <Button
          onClick={handleDeleteTicket}
          className="absolute top-2 right-2 z-10"
          size="icon"
        >
          <Trash size={18} />
        </Button>
      ) : (
        <Button
          onClick={handleAddToCart}
          className="absolute top-2 right-2 z-10"
          size="icon"
        >
          <ShoppingCart size={18} />
        </Button>
      )}
      <Link to={`/item/${ticket.idIngresso}`} className="group">
        <div className="rounded-md overflow-hidden">
          <img
            className="aspect-square w-full object-cover group-hover:scale-105 transition-transform"
            src={ticket.imagem}
            alt=""
          />
        </div>
        <strong className="text-lg block">{ticket.nome}</strong>
        <span className="text-muted-foreground">
          {formatCurrency(ticket.preco)}
        </span>
      </Link>
    </div>
  )
}
