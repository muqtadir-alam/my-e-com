import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-card to-muted py-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
          Discover Premium Products in <span className="text-primary">Dark Elegance</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
          Experience shopping like never before with our curated collection of premium products, designed for those who
          appreciate sophisticated aesthetics.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Shop Now
          </Button>
          <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-muted bg-transparent">
            View Collections
          </Button>
        </div>
      </div>
    </section>
  )
}
