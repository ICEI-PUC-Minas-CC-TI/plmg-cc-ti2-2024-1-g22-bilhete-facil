import { api } from '@/lib/api'
import { formatCurrency } from '@/lib/utils'
import { Negotiation } from '@/shared/interfaces/negotiation.interface'
import { Ticket } from '@/shared/interfaces/ticket.interface'
import { Trash } from '@phosphor-icons/react'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { TicketItem } from '../ticket-item'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

interface NegotiationProps {
  negotiation: Negotiation
}

export function NegotiationItem({ negotiation }: NegotiationProps) {
  const [ticket, setTicket] = useState<Ticket>()

  useEffect(() => {
    async function loadTicket() {
      const response = await api.get(
        `/ingressos/${negotiation.ingressoIdIngresso}`,
      )
      setTicket(JSON.parse(response.data))
    }
    loadTicket()
  }, [negotiation])

  function handleDeleteNegotiation(idNegociacao: number) {
    try {
      api.delete(`/deletarNegociacao/${idNegociacao}`)

      // Remove the deleted negotiation from the UI
      setTicket(undefined)
      toast('Negociação deletada')
    } catch (error) {
      console.log(error)

      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response?.data?.message)
      }
    }
  }

  if (!ticket) {
    return null
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      <TicketItem {...ticket} />
      <div className="col-span-2 flex flex-col content-between justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <strong className="leading-none">Status: </strong>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={`
                    w-2 h-2 rounded-full ${negotiation.status === 'pendente' ? 'bg-yellow-500' : negotiation.status === 'aceito' ? 'bg-green-500' : 'bg-red-500'} 
                  `}
                  ></div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{negotiation.status}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <span className="block">
            <strong>Preço oferecido:</strong>{' '}
            {formatCurrency(negotiation.precoOferecido)}
          </span>
          <div className="flex gap-2">
            <Link to={`/checkout/${ticket.idIngresso}`}>
              <Button
                className="flex-1"
                disabled={negotiation.status !== 'aceito'}
              >
                Comprar
              </Button>
            </Link>
            <Button
              onClick={() => handleDeleteNegotiation(negotiation.idNegociacao)}
              variant="destructive"
              size="icon"
            >
              <Trash weight="bold" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
