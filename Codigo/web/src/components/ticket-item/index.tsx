import { ShoppingCart } from '@phosphor-icons/react'
import img from '../../assets/event.jpg'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

interface TicketItemProps {
  id: number
}

export function TicketItem({ id }: TicketItemProps) {
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
      <Link to={`/item/${id}`} className="group">
        <div className="rounded-md overflow-hidden">
          <img
            className="aspect-square object-cover group-hover:scale-105 transition-transform"
            src={img}
            alt=""
          />
        </div>
        <strong className="text-lg block">Show Kanye West</strong>
        <span className="text-muted-foreground">R$ 230,00</span>
      </Link>
    </div>
  )
}
