import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

export function SignUpForm() {
  const navigate = useNavigate()
  const formSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    cpf: z.string().length(11),
    age: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: 'Expected number, received a string',
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const usuario = {
      nome: values.name,
      email: values.email,
      idade: values.age,
      cpf: values.cpf,
      senha: values.password,
    }

    const response = await api.post('/insere_usuario', { ...usuario })
    const data = JSON.parse(response.data)

    if (data.ok) {
      navigate('/account/login')
    } else {
      toast.error(data.message)
    }
  }

  return (
    <div className="w-full space-y-6">
      <header className="flex flex-col items-center">
        <h1 className="text-2xl font-medium">Crie sua conta</h1>
        <span className="text-muted-foreground text-sm">
          preencha o formulário abaixo para criar na sua conta.
        </span>
      </header>
      <Form {...form}>
        <form
          className="space-y-4 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@doe.com" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Senha" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="000.000.000-00"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Idade</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Idade" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full" type="submit">
            Cadastrar
          </Button>
        </form>
      </Form>
    </div>
  )
}
