import { api } from '@/lib/api'
import { getUser } from '@/lib/auth'
import { formatCurrency } from '@/lib/utils'
import { Ticket } from '@/shared/interfaces/ticket.interface'
import { Pencil, Trash } from '@phosphor-icons/react'
import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { UpdateTicketFormModal } from '../update-ticket-form-modal'

export function TicketItem(ticket: Ticket) {
  const [isDeleted, setIsDeleted] = useState(false)
  const [initialData, setInitialData] = useState<Ticket>(ticket)
  const user = getUser()

  function updateInitialData(ticket: Ticket) {
    setInitialData(ticket)
  }

  async function handleDeleteTicket() {
    try {
      const response = await api.delete(`/deletarIngresso/${ticket.idIngresso}`)

      const data = JSON.parse(response.data)

      if (!data.ok) {
        throw new Error('Erro ao deletar ingresso')
      }

      toast('Ingresso deletado')
      setIsDeleted(true)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response?.data?.message)
      }
    }
  }

  if (isDeleted) {
    return null
  }

  return (
    <div className="space-y-2 relative cursor-pointer">
      {user && user.idUsuario === ticket.idUsuario && (
        <div className="flex gap-2 absolute top-2 right-2 z-10">
          <UpdateTicketFormModal
            initialData={initialData}
            updateInitialData={updateInitialData}
          >
            <Button size="icon">
              <Pencil size={18} />
            </Button>
          </UpdateTicketFormModal>
          <Button onClick={handleDeleteTicket} size="icon">
            <Trash size={18} />
          </Button>
        </div>
      )}
      <Link to={`/item/${initialData.idIngresso}`} className="group">
        <div className="rounded-md overflow-hidden">
          <img
            className="aspect-square w-full object-cover group-hover:scale-105 transition-transform"
            src={initialData.imagem}
            alt=""
          />
        </div>
        <strong className="text-lg block">{initialData.nome}</strong>
        <span className="text-muted-foreground">
          {formatCurrency(initialData.preco)}
        </span>
      </Link>
    </div>
  )
}
