import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/api'
import { getUser } from '@/lib/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosRequestConfig } from 'axios'
import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'
import { FileInput } from '../file-input'
import { Switch } from '../ui/switch'
import { Textarea } from '../ui/textarea'

const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

const formSchema = z.object({
  event: z.string().min(2).max(50),
  description: z.string(),
  price: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: 'Expected number, received a string',
  }),
  pdf: z
    .instanceof(FileList)
    .refine((files) => files?.length === 1, 'File is required')
    .refine(
      (files) => files?.length === 1 && files?.[0].size <= 10000000,
      `Max file size is 10MB.`,
    )
    .refine(
      (files) => files?.[0]?.type === 'application/pdf',
      'Only PDF files are accepted.',
    ),
  image: z
    .instanceof(FileList)
    .refine((files) => files?.length === 1, 'File is required')
    .refine(
      (files) => files?.length === 1 && files?.[0].size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`,
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.',
    ),
  negotiable: z.boolean(),
})

export function SellTicketForm() {
  const user = getUser()
  const [localUrl, setLocalUrl] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [pdfUrl, setPdfUrl] = useState('')
  const [pdfPath, setPdfPath] = useState('')
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      negotiable: false,
    },
  })

  async function handlePdfUpload(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files?.length) {
      console.log('No file selected')
      return
    }

    setPdfUrl('')
    setPdfPath('')

    const formData = new FormData()

    formData.append(event.target.name, event.target.files[0])

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    } as AxiosRequestConfig

    try {
      const response = await api.post('/uploadPdf', formData, config)
      const data = JSON.parse(response.data)
      setPdfUrl(data.url)
      setPdfPath(data.path)
    } catch (error) {
      console.error(error)
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const ticket = {
      nome: values.event,
      descricao: values.description,
      imagem: imageUrl,
      preco: values.price,
      negociar: values.negotiable,
      idUsuario: user.idUsuario,
    }

    try {
      const response = await api.post('/insere_ingresso', { ...ticket })
      const data = JSON.parse(response.data)

      if (data.ok) {
        toast.success('Sucesso', {
          description: data.mensagem,
        })
      } else {
        toast.error('Erro', {
          description: data.mensagem,
        })
      }
    } catch (error) {
      console.error(error)
    } finally {
      form.reset()
      setImageUrl('')
      setLocalUrl('')
    }
  }

  const fileRef = form.register('image')
  const pdfRef = form.register('pdf')

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FileInput
          setImageUrl={setImageUrl}
          localUrl={localUrl}
          setLocalUrl={setLocalUrl}
          fileRef={fileRef}
          control={form.control}
        />
        <FormField
          control={form.control}
          name="pdf"
          render={() => (
            <FormItem>
              <FormLabel>Arquivo</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  {...pdfRef}
                  onChange={(event) => {
                    handlePdfUpload(event)
                    fileRef.onChange(event)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="negotiable"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between">
              <div className="space-y-0.5">
                <FormLabel>Negociável</FormLabel>
                <FormDescription>
                  Aceitar ofertas sobre o preço do seu evento.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Vender</Button>
      </form>
    </Form>
  )
}
