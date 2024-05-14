import { Camera } from '@phosphor-icons/react'
import { ChangeEvent } from 'react'
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
  control?:
    | Control<{
        url: FileList
        event: string
        description: string
        price: string
      }>
    | undefined

  fileRef: UseFormRegisterReturn<'url'>
  setLocalUrl: (url: string) => void
  localUrl: string
}

export function FileInput({
  control,
  fileRef,
  setLocalUrl,
  localUrl,
}: FileInputInterface) {
  function onImageUpload(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      setLocalUrl(URL.createObjectURL(event.target.files[0]))
    }
  }
  return (
    <FormField
      control={control}
      name="url"
      render={() => (
        <FormItem>
          <FormLabel>
            {localUrl ? (
              <div className="h-40 w-40 rounded-md border border-dashed overflow-hidden">
                <img src={localUrl} alt="preview" />
              </div>
            ) : (
              <div className="h-40 w-40 gap-2 rounded-md border border-dashed flex items-center justify-center">
                <Camera size={18} />
                Carregar Foto
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
