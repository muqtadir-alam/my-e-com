import { CartContent } from "@/components/cart/cart-content"

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <p className="text-muted-foreground mt-2">Review your items before checkout</p>
      </div>
      <CartContent />
    </div>
  )
}
