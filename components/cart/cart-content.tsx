"use client"

import { useState } from "react"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CartItem {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  quantity: number
  inStock: boolean
  size?: string
  color?: string
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    image: "/premium-wireless-headphones.png",
    quantity: 1,
    inStock: true,
    color: "Black",
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199.99,
    image: "/smart-fitness-watch.png",
    quantity: 2,
    inStock: true,
    size: "42mm",
    color: "Space Gray",
  },
  {
    id: 5,
    name: "Wireless Charging Pad",
    price: 39.99,
    originalPrice: 59.99,
    image: "/wireless-charging-pad.png",
    quantity: 1,
    inStock: false,
  },
]

export function CartContent() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Add some products to get started</p>
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-4">
        {cartItems.map((item) => (
          <Card key={item.id} className="bg-card p-0 border-border">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-shrink-0 mx-auto sm:mx-0">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-32 h-32 sm:w-24 sm:h-24 object-cover rounded-lg"
                  />
                  {!item.inStock && (
                    <Badge variant="destructive" className="absolute -top-2 -right-2">
                      Out of Stock
                    </Badge>
                  )}
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div className="text-center sm:text-left">
                      <h3 className="font-semibold text-lg leading-tight">{item.name}</h3>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-muted-foreground mt-1">
                        {item.color && <span>Color: {item.color}</span>}
                        {item.size && <span>Size: {item.size}</span>}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-destructive h-10 w-10 self-center sm:self-start"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-primary">${item.price}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">${item.originalPrice}</span>
                      )}
                    </div>

                    <div className="flex items-center border border-border rounded-lg">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="px-4 py-2 min-w-[4rem] text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={!item.inStock}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {!item.inStock && (
                    <p className="text-sm text-destructive text-center sm:text-left">
                      This item is currently out of stock
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <Card className="bg-card p-0 border-border lg:sticky lg:top-4">
          <CardContent className="p-4 sm:p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-border pt-3">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {shipping > 0 && (
              <div className="bg-muted p-3 rounded-lg mb-4">
                <p className="text-sm text-center">Add ${(100 - subtotal).toFixed(2)} more for free shipping!</p>
              </div>
            )}

            <div className="space-y-3">
              <Button
                asChild
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-medium"
                disabled={cartItems.some((item) => !item.inStock)}
              >
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
              <Button asChild variant="outline" className="w-full h-12 border-border bg-transparent text-base">
                <Link href="/">Continue Shopping</Link>
              </Button>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="font-semibold mb-3">Promo Code</h3>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="flex-1 px-3 py-3 bg-input border border-border rounded-md text-sm"
                />
                <Button variant="outline" className="border-border bg-transparent h-12 sm:h-auto">
                  Apply
                </Button>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Secure checkout
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
