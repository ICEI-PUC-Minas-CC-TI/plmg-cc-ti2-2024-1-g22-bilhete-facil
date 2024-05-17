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

export function LoginForm() {
  const navigate = useNavigate()
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await api.post('/login', {
        ...values,
        senha: values.password,
      })
      localStorage.setItem('user', response.data)
      navigate('/')
    } catch (error) {
      toast.error(error.response.data)
    }
  }

  return (
    <div className="w-full space-y-6">
      <header className="flex flex-col items-center">
        <h1 className="text-2xl font-medium">Entre na sua conta</h1>
        <span className="text-muted-foreground text-sm">
          preencha o formulário abaixo para entrar na sua conta.
        </span>
      </header>
      <Form {...form}>
        <form
          className="space-y-4 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="user@email.com" {...field} />
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
                  <Input type="password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Entrar
          </Button>
        </form>
      </Form>
    </div>
  )
}
