import { Separator } from '@/components/ui/separator'
import { UpdateProfileForm } from '@/components/update-profile-form'

export function ProfilePage() {
  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-xl">Meu Perfil</h1>
        <span className="text-muted-foreground">
          É assim que oss outros vão te ver.
        </span>
      </header>
      <Separator />
      <UpdateProfileForm />
    </div>
  )
}
