import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from '../ui/form'
import { Input } from '../ui/input'
import { getUser } from '@/lib/auth'
import { api } from '@/lib/api'
import { toast } from 'sonner'

interface NegotiationFormProps {
  disabled?: boolean
  idIngresso: number
}

const FormSchema = z.object({
  price: z.string().refine((val) => !Number.isNaN(parseInt(val, 10))),
})

export function NegotiationForm({
  disabled = true,
  idIngresso,
}: NegotiationFormProps) {
  const user = getUser()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const negotiation = {
      precoOferecido: +data.price,
      ingressoIdIngresso: idIngresso,
      status: 'pendente',
      usuarioIdUsuario: user.idUsuario,
    }

    try {
      const response = await api.post('/insere_negociacao', negotiation)
      const data = JSON.parse(response.data)

      if (!data.ok) {
        throw new Error('Erro ao negociar o ingresso')
      }

      toast.success('Negociação realizada com sucesso')
    } catch (error) {
      toast.error('Erro ao negociar o ingresso')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex gap-4">
                  <Input
                    className="w-full"
                    type="number"
                    disabled={disabled}
                    placeholder="R$ 280,00"
                    {...field}
                  />
                  <Button disabled={disabled} type="submit">
                    Negociar
                  </Button>
                </div>
              </FormControl>
              <FormDescription>
                {disabled
                  ? 'O vendedor desse ingresso não aceita negociações'
                  : 'O vendedor desse ingresso aceita negociações'}
              </FormDescription>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
