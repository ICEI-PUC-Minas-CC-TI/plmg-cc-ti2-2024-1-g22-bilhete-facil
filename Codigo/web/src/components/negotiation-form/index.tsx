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

interface NegotiationFormProps {
  disabled?: boolean
}

const FormSchema = z.object({
  price: z.string().refine((val) => !Number.isNaN(parseInt(val, 10))),
})

export function NegotiationForm({ disabled = true }: NegotiationFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
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
