import { Link, useLoaderData } from 'react-router-dom'
import img from '../../../assets/event.jpg'
import { Button } from '@/components/ui/button'
import { CaretLeft, ShoppingCart } from '@phosphor-icons/react'
import { toast } from 'sonner'

export function loader({ params }: { params: { id: string } }) {
  return { id: params.id }
}

export function Item() {
  const { id } = useLoaderData() as { id: string }

  function handleAddToCart() {
    toast('Ingresso adicionado ao carrinho')
  }

  return (
    <div className="space-y-2">
      <Link to="/">
        <Button variant="ghost">
          <CaretLeft size={18} className="mr-2" />
          Voltar
        </Button>
      </Link>
      <div className="flex flex-wrap gap-4">
        <img
          className="aspect-square object-cover md:max-w-sm w-full flex-1"
          src={img}
          alt=""
        />
        <div className="flex-1 flex flex-col gap-4 justify-between">
          <div>
            <span className="text-muted-foreground mb-2 block">
              #{id.padStart(4, '0')}
            </span>
            <h1 className="text-lg font-bold">Show Kanye West</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Explicabo itaque quae voluptatibus commodi, ab eveniet blanditiis
              magnam vel nisi vero.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <strong className="text-2xl">R$ 250,00</strong>
            <Link className="flex-1" to="/checkout">
              <Button className="w-full">Comprar</Button>
            </Link>
            <Button onClick={handleAddToCart} variant="outline">
              <ShoppingCart size={18} className="mr-2" />
              Adicionar ao carrinho
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
