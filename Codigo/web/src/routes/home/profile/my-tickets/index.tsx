import { TicketItem } from '@/components/ticket-item'
import { api } from '@/lib/api'
import { getUser } from '@/lib/auth'
import { Ticket } from '@/shared/interfaces/ticket.interface'
import { useLoaderData } from 'react-router-dom'

export async function loader() {
  const user = getUser()
  const response = await api.get(`/ingressos`)
  const data = JSON.parse(response.data)

  return data.ingressos.filter(
    (ticket: Ticket) => ticket.idUsuario === user.idUsuario,
  )
}

export function MyTicketsPage() {
  const tickets = useLoaderData() as Ticket[]

  return (
    <div className="grid grid-cols-3 gap-4">
      {tickets.map((ticket) => (
        <TicketItem key={ticket.idIngresso} {...ticket} />
      ))}
    </div>
  )
}
