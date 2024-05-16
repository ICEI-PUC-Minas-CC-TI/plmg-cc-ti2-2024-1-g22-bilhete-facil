import { api } from '@/lib/api'
import { Ticket } from '@/shared/interfaces/ticket.interface'
import { useEffect, useState } from 'react'
import { TicketItem } from '../../components/ticket-item'

export function Home() {
  const [tickets, setTickets] = useState<Ticket[]>([])

  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    const response = await api.get('/ingressos')

    console.log(JSON.parse(response.data).ingressos)

    setTickets(JSON.parse(response.data).ingressos)
  }
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
