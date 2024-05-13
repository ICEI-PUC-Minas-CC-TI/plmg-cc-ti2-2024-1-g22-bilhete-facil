import { formatCurrency } from '@/lib/utils'
import { Ticket } from '@/shared/interfaces/ticket.interface'
import { ShoppingCart } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '../ui/button'

export function TicketItem(ticket: Ticket) {
  function handleAddToCart() {
    toast('Ingresso adicionado ao carrinho')
  }

  return (
    <div className="space-y-2 relative cursor-pointer">
      <Button
        onClick={handleAddToCart}
        className="absolute top-2 right-2 z-10"
        size="icon"
      >
        <ShoppingCart size={18} />
      </Button>
      <Link to={`/item/${ticket.id}`} className="group">
        <div className="rounded-md overflow-hidden">
          <img
            className="aspect-square object-cover group-hover:scale-105 transition-transform"
            src={ticket.ingresso_pic}
            alt=""
          />
        </div>
        <strong className="text-lg block">{ticket.nome}</strong>
        <span className="text-muted-foreground">
          {formatCurrency(ticket.precoevento)}
        </span>
      </Link>
    </div>
  )
}
