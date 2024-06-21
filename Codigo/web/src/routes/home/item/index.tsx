import { NegotiationForm } from '@/components/negotiation-form'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import { formatCurrency } from '@/lib/utils'
import { Ticket } from '@/shared/interfaces/ticket.interface'
import { CaretLeft } from '@phosphor-icons/react'
import { Link, useLoaderData } from 'react-router-dom'

export async function loader({ params }: { params: { id: string } }) {
  const response = await api.get(`/ingressos/${params.id}`)
  return JSON.parse(response.data)
}

export function Item() {
  const ticket = useLoaderData() as Ticket

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
          className="aspect-square rounded-md object-cover md:max-w-sm w-full"
          src={ticket.imagem}
          alt=""
        />
        <div className="flex-1 flex flex-col gap-4 justify-between">
          <div>
            <span className="text-muted-foreground mb-2 block">
              #{ticket.idIngresso.toString().padStart(4, '0')}
            </span>
            <h1 className="text-lg font-bold">{ticket.nome}</h1>
            <p>{ticket.descricao}</p>
          </div>
          <div className="flex flex-col gap-4">
            <strong className="text-2xl">{formatCurrency(ticket.preco)}</strong>
            <Link className="flex-1" to="/checkout">
              <Button className="w-full">Comprar</Button>
            </Link>
            <NegotiationForm
              idIngresso={ticket.idIngresso}
              disabled={!ticket.negociar}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
