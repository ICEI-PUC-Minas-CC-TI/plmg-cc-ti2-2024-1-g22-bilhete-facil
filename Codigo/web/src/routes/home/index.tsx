import { TicketItem } from '../../components/ticket-item'

export function Home() {
  return (
    <>
      <h1 className="font-bold text-2xl mb-4">Para você</h1>
      <main className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <TicketItem id={1} />
        <TicketItem id={2} />
        <TicketItem id={3} />
        <TicketItem id={4} />
        <TicketItem id={5} />
      </main>
    </>
  )
}
