import { formatCurrency } from '@/lib/utils'

interface CartItemProps {
  img: string
  name: string
  price: number
}

export function CartItem({ img, name, price }: CartItemProps) {
  return (
    <div className="block space-y-2 sm:flex justify-between flex-wrap gap-4">
      <div className="flex gap-2">
        <img
          className="w-20 h-20 object-cover overflow-hidden rounded-md"
          src={img}
          alt=""
        />
        <div className="">
          <strong className="text-lg block">{name}</strong>
          <span className="text-right mt-auto">{formatCurrency(price)}</span>
        </div>
      </div>
    </div>
  )
}
