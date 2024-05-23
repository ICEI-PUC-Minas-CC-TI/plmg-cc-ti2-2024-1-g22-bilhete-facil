import img from '../../assets/event.jpg'

export function CartItem() {
  return (
    <div className="block space-y-2 sm:flex justify-between flex-wrap gap-4">
      <div className="flex gap-2">
        <img
          className="w-20 h-20 object-cover overflow-hidden rounded-md"
          src={img}
          alt=""
        />
        <div className="">
          <strong className="text-lg block">Show Kanye West</strong>
          <time className="text-muted-foreground block">10/12/2024</time>
          <span className="text-right mt-auto">R$ 230,00</span>
        </div>
      </div>
    </div>
  )
}
