import { Minus, Plus, Trash } from '@phosphor-icons/react'
import img from '../../assets/event.jpg'
import { Button } from '../ui/button'
import { useState } from 'react'

interface CartItemProps {
  showQuantityInput?: boolean
}

export function CartItem({ showQuantityInput = true }: CartItemProps) {
  const [quantity, setQuantity] = useState(0)

  function increaseQuantity() {
    setQuantity((prev) => (prev += 1))
  }

  function decreaaseQuantity() {
    if (quantity === 0) return
    setQuantity((prev) => (prev -= 1))
  }

  return (
    <div className="block space-y-2 sm:flex justify-between flex-wrap gap-4">
      <div className="flex gap-2">
        <img
          className="w-20 h-20 object-cover overflow-hidden rounded-md"
          src={img}
          alt=""
        />
        <div className="space-y-2">
          <span className="text-lg block">Show Kanye West</span>
          <time className="text-muted-foreground">10/12/2024</time>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        {showQuantityInput && (
          <div className="border border-border rounded-md flex items-center">
            <Button onClick={decreaaseQuantity} variant="link" size="icon">
              <Minus />
            </Button>
            <span>{quantity}</span>
            <Button onClick={increaseQuantity} variant="link" size="icon">
              <Plus />
            </Button>
          </div>
        )}
        <strong className="text-right">R$ 230,00</strong>
        <Button className="ml-auto sm:ml-0" size="icon">
          <Trash size={18} />
        </Button>
      </div>
    </div>
  )
}
