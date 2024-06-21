import { Camera, Spinner } from '@phosphor-icons/react'
import axios, { AxiosRequestConfig } from 'axios'
import { ChangeEvent, useState } from 'react'
import { Control, UseFormRegisterReturn } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'

interface FileInputInterface {
  control?: Control<{
    image: FileList
    pdf: FileList
    event: string
    description: string
    price: string
    negotiable: boolean
  }>

  fileRef: UseFormRegisterReturn<'image'>
  setLocalUrl: (url: string) => void
  localUrl: string
  setImageUrl: (url: string) => void
}

export function FileInput({
  control,
  fileRef,
  setLocalUrl,
  localUrl,
  setImageUrl,
}: FileInputInterface) {
  const [isSending, setIsSending] = useState(false)

  async function onImageUpload(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files?.length) {
      console.log('No file selected')
      return
    }

    setImageUrl('')
    setLocalUrl('')
    setIsSending(true)

    const formData = new FormData()

    formData.append(event.target.name, event.target.files[0])
    formData.append('key', import.meta.env.VITE_IMGBB_API_KEY)

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    } as AxiosRequestConfig

    try {
      const response = await axios.post(
        'https://api.imgbb.com/1/upload',
        formData,
        config,
      )
      setImageUrl(response.data.data.url)
      setLocalUrl(URL.createObjectURL(event.target.files[0]))
    } catch (error) {
      console.error(error)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <FormField
      control={control}
      name="image"
      render={() => (
        <FormItem>
          <FormLabel>
            {localUrl && !isSending ? (
              <div className="h-40 w-40 rounded-md border border-dashed overflow-hidden">
                <img
                  className="h-40 w-40 object-cover"
                  src={localUrl}
                  alt="preview"
                />
              </div>
            ) : (
              <div className="h-40 w-40 gap-2 rounded-md border border-dashed flex items-center justify-center">
                {isSending ? (
                  <>
                    <Spinner className="animate-spin" size={18} />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Camera size={18} />
                    Carregar Foto
                  </>
                )}
              </div>
            )}
          </FormLabel>
          <FormControl>
            <Input
              {...fileRef}
              onChange={(event) => {
                onImageUpload(event)
                fileRef.onChange(event)
              }}
              className="hidden"
              type="file"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
