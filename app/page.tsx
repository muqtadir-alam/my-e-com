import { Hero } from "@/components/hero"
import { FeaturedProducts } from "@/components/featured-products"
import { Categories } from "@/components/categories"
import { Newsletter } from "@/components/newsletter"

export default function HomePage() {
  return (
    <div className="space-y-12">
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Newsletter />
    </div>
  )
}
