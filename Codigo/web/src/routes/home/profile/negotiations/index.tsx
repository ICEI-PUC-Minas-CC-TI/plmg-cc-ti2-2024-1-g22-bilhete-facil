import { NegotiationItem } from '@/components/negotiation'
import { Separator } from '@/components/ui/separator'
import { api } from '@/lib/api'
import { getUser } from '@/lib/auth'
import { Negotiation } from '@/shared/interfaces/negotiation.interface'
import { useLoaderData } from 'react-router-dom'

export async function loader() {
  const user = getUser()
  const response = await api.get(`/negociacoes`)
  const data = JSON.parse(response.data)

  return data.negociacoes.filter(
    (negotiation: Negotiation) =>
      negotiation.usuarioIdUsuario !== user.idUsuario,
  )
}

export function NegotioationsPage() {
  const negotiations = useLoaderData() as Negotiation[]

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-xl">Suas negociações</h1>
        <span className="text-muted-foreground">
          Essas são as negociações que você enviou
        </span>
      </header>
      <Separator />
      {negotiations.map((negotiation) => (
        <NegotiationItem
          key={negotiation.idNegociacao}
          negotiation={negotiation}
        />
      ))}
    </div>
  )
}
