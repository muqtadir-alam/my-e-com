import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  return (
    <section className="bg-card py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter and be the first to know about new products, exclusive deals, and special offers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input type="email" placeholder="Enter your email address" className="flex-1 bg-input border-border" />
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Subscribe</Button>
        </div>
        <p className="text-sm text-muted-foreground mt-4">We respect your privacy. Unsubscribe at any time.</p>
      </div>
    </section>
  )
}
