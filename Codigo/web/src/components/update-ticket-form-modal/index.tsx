import { api } from '@/lib/api'
import { Ticket } from '@/shared/interfaces/ticket.interface'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '../ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

interface UpdateTicketFormModalProps {
  initialData: Ticket
  updateInitialData: (ticket: Ticket) => void
  children: React.ReactNode
}

const formSchema = z.object({
  event: z.string().min(2).max(50),
  description: z.string(),
  price: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: 'Expected number, received a string',
  }),
})

export function UpdateTicketFormModal({
  initialData,
  updateInitialData,
  children,
}: UpdateTicketFormModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData.descricao,
      event: initialData.nome,
      price: initialData.preco.toString(),
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await api.put(
        `/updateIngresso/${initialData.idIngresso}`,
        {
          nome: values.event,
          descricao: values.description,
          preco: values.price,
        },
      )

      const data = JSON.parse(response.data)

      if (!data.ok) {
        throw new Error('Erro ao atualizar ingresso')
      }

      toast('Ingresso atualizado')

      updateInitialData({
        ...initialData,
        nome: values.event,
        descricao: values.description,
        preco: +values.price,
      })

      setIsOpen(false)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response?.data?.message)
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            Editar ingresso
          </DialogTitle>
          <DialogDescription>
            Faça alterações no seu ingresso aqui.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="event"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Evento</FormLabel>
                  <FormControl>
                    <Input placeholder="Show rap" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      className="max-h-[100px] h-[100px]"
                      placeholder="Descrição do evento..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="R$ 150,00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Atualizar</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
