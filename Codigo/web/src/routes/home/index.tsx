import { api } from '@/lib/api'
import { getUser } from '@/lib/auth'
import { Ticket } from '@/shared/interfaces/ticket.interface'
import { useLoaderData } from 'react-router-dom'
import { TicketItem } from '../../components/ticket-item'

export async function loader() {
  const user = getUser()

  const response = await api.get(`/ingressos`)
  const data = JSON.parse(response.data)

  if (!user) {
    return data.ingressos
  }
  return data.ingressos.filter(
    (ticket: Ticket) => ticket.idUsuario !== user.idUsuario,
  )
}

export function Home() {
  const tickets = useLoaderData() as Ticket[]

  return (
    <>
      <h1 className="font-bold text-2xl mb-4">Para você</h1>
      <main className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tickets.map((ticket) => (
          <TicketItem key={ticket.idIngresso} {...ticket} />
        ))}
      </main>
    </>
  )
}
