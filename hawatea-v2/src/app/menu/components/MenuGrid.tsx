'use client'

import { useCartStore } from '@/store/cartStore'

type MenuItem = {
  id: string
  name: string
  description: string
  price: number
  category: string
  image_url: string
}

export default function MenuGrid({ items }: { items: MenuItem[] }) {
  const addItem = useCartStore((state) => state.addItem)

  // Group items by category
  const categories = Array.from(new Set(items.map(i => i.category)))

  return (
    <div className="flex flex-col gap-12">
      {categories.map(category => (
        <section key={category}>
          <h2 className="text-2xl font-black uppercase tracking-wider mb-6 border-b-4 border-black pb-2 inline-block">
            {category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.filter(i => i.category === category).map(item => (
              <div key={item.id} className="bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-4 flex flex-col gap-4 rounded-xl hover:translate-y-1 hover:shadow-[4px_4px_0px_#000] transition-all">
                {item.image_url && (
                  <img src={item.image_url} alt={item.name} className="w-full h-48 object-cover border-2 border-black rounded-lg" />
                )}
                <div>
                  <h3 className="text-xl font-bold font-serif">{item.name}</h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                </div>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <span className="text-xl font-black">${item.price.toFixed(2)}</span>
                  <button 
                    onClick={() => addItem({ menu_item_id: item.id, name: item.name, quantity: 1, unit_price: item.price })}
                    className="bg-yellow-400 text-black px-6 py-2 font-black uppercase border-2 border-black hover:bg-black hover:text-white transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
