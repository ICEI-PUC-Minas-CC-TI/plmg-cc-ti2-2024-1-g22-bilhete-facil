import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '../ui/separator'
import { useState } from 'react'
import { Negotiation } from '@/shared/interfaces/negotiation.interface'
import { api } from '@/lib/api'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { formatCurrency } from '@/lib/utils'
import { Button } from '../ui/button'
import { Trash } from '@phosphor-icons/react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'
import { toast } from 'sonner'
import axios from 'axios'

interface TicketNegotiationsModalProps {
  children: React.ReactNode
  negotiations: Negotiation[]
}

interface FormettedNegotiation {
  idNegociacao: number
  ingressoIdIngresso: number
  usuarioIdUsuario: number
  precoOferecido: number
  status: 'pendente' | 'aceito' | 'recusado'
  user: {
    name: string
    email: string
  }
}

export function TicketNegotiationsModal({
  children,
  negotiations,
}: TicketNegotiationsModalProps) {
  const [formattedNegotiations, setFormattedNegotiations] = useState<
    FormettedNegotiation[]
  >([])
  async function getNegotiations() {
    const negotiationsWithUser = negotiations.map(async (negotiation) => {
      const response = await api.get(`/usuario/${negotiation.usuarioIdUsuario}`)
      const data = JSON.parse(response.data)

      return {
        ...negotiation,
        user: {
          name: data.nome,
          email: data.email,
        },
      }
    })

    setFormattedNegotiations(await Promise.all(negotiationsWithUser))
  }

  async function handleUpdateNegotiationStatus(negotiation: Negotiation) {
    try {
      const response = await api.put(
        `/updateNegociacao/${negotiation.idNegociacao}`,
        {
          ...negotiation,
        },
      )

      const data = JSON.parse(response.data)

      if (!data.ok) {
        throw new Error('Erro ao atualizar status da negociação')
      }

      setFormattedNegotiations(
        formattedNegotiations.map((formattedNegotiation) => {
          if (formattedNegotiation.idNegociacao === negotiation.idNegociacao) {
            return {
              ...formattedNegotiation,
              status: negotiation.status,
            }
          }

          return formattedNegotiation
        }),
      )
      toast('Status da negociação atualizado')
    } catch (error) {
      console.log(error)

      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response?.data?.message)
      }
    }
  }

  function handleDeleteNegotiation(idNegociacao: number) {
    try {
      api.delete(`/deletarNegociacao/${idNegociacao}`)
      setFormattedNegotiations(
        formattedNegotiations.filter(
          (negotiation) => negotiation.idNegociacao !== idNegociacao,
        ),
      )
      toast('Negociação deletada')
    } catch (error) {
      console.log(error)

      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response?.data?.message)
      }
    }
  }

  return (
    <Dialog onOpenChange={getNegotiations}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Negociações recebidas</DialogTitle>
          <DialogDescription>
            O usuário está interessado em negociar o valor do ingresso
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="space-y-4">
          {formattedNegotiations.length !== 0 ? (
            formattedNegotiations.map((negotiation) => (
              <div
                className="bg-primary-foreground p-4 space-y-8 rounded-md"
                key={negotiation.idNegociacao}
              >
                <div className="space-y-4">
                  <header>
                    <div className="ml-auto flex gap-2 items-center">
                      <strong>Status:</strong>
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
                  </header>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback>
                        {negotiation.user.name[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <strong className="block">{negotiation.user.name}</strong>
                      <span className="text-muted-foreground">
                        {negotiation.user.email}
                      </span>
                    </div>
                    <strong className="text-lg bg-secondary-foreground text-muted p-2 rounded ml-auto">
                      {formatCurrency(negotiation.precoOferecido)}
                    </strong>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Button
                    onClick={() => {
                      handleUpdateNegotiationStatus({
                        idNegociacao: negotiation.idNegociacao,
                        ingressoIdIngresso: negotiation.ingressoIdIngresso,
                        usuarioIdUsuario: negotiation.usuarioIdUsuario,
                        precoOferecido: negotiation.precoOferecido,
                        status: 'aceito',
                      })
                    }}
                  >
                    Aceitar
                  </Button>
                  <Button
                    onClick={() => {
                      handleUpdateNegotiationStatus({
                        idNegociacao: negotiation.idNegociacao,
                        ingressoIdIngresso: negotiation.ingressoIdIngresso,
                        usuarioIdUsuario: negotiation.usuarioIdUsuario,
                        precoOferecido: negotiation.precoOferecido,
                        status: 'recusado',
                      })
                    }}
                    variant="secondary"
                  >
                    Recusar
                  </Button>
                  <Button
                    onClick={() =>
                      handleDeleteNegotiation(negotiation.idNegociacao)
                    }
                    variant="destructive"
                    size="icon"
                  >
                    <Trash />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="border border-muted border-dashed text-center p-4 rounded-md">
              Nenhuma negociação recebida
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
