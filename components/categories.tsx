import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "/modern-electronics.png",
    count: 156,
  },
  {
    id: 2,
    name: "Fashion",
    image: "/placeholder-762rn.png",
    count: 89,
  },
  {
    id: 3,
    name: "Home & Garden",
    image: "/modern-home-decor.png",
    count: 234,
  },
  {
    id: 4,
    name: "Sports",
    image: "/assorted-sports-gear.png",
    count: 67,
  },
]

export function Categories() {
  return (
    <section className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link key={category.id} href={`/category/${category.id}`}>
            <Card className="group p-0 hover:shadow-lg transition-all duration-300 bg-card border-border">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                  <p className="text-muted-foreground text-sm">{category.count} products</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
