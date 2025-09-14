"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, ShoppingCart, Trash2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface WishlistItem {
  id: number
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  badge?: string
  inStock: boolean
  category: string
}

const initialWishlistItems: WishlistItem[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviews: 124,
    image: "/premium-wireless-headphones.png",
    badge: "Best Seller",
    inStock: true,
    category: "Electronics",
  },
  {
    id: 3,
    name: "Minimalist Desk Lamp",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.9,
    reviews: 56,
    image: "/minimalist-desk-lamp.png",
    badge: "Sale",
    inStock: false,
    category: "Home & Garden",
  },
  {
    id: 4,
    name: "Ergonomic Office Chair",
    price: 449.99,
    rating: 4.7,
    reviews: 203,
    image: "/ergonomic-office-chair.png",
    badge: "Premium",
    inStock: true,
    category: "Furniture",
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    price: 129.99,
    rating: 4.5,
    reviews: 167,
    image: "/bluetooth-speaker.png",
    badge: "Popular",
    inStock: true,
    category: "Electronics",
  },
]

export function WishlistContent() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(initialWishlistItems)
  const [filter, setFilter] = useState<string>("all")

  const removeFromWishlist = (id: number) => {
    setWishlistItems((items) => items.filter((item) => item.id !== id))
  }

  const addToCart = (item: WishlistItem) => {
    // In a real app, this would add to cart state/context
    console.log("Added to cart:", item.name)
    // Optionally remove from wishlist after adding to cart
    // removeFromWishlist(item.id)
  }

  const filteredItems = wishlistItems.filter((item) => {
    if (filter === "all") return true
    if (filter === "inStock") return item.inStock
    if (filter === "outOfStock") return !item.inStock
    return item.category.toLowerCase() === filter.toLowerCase()
  })

  const categories = [
    "all",
    "inStock",
    "outOfStock",
    ...Array.from(new Set(wishlistItems.map((item) => item.category))),
  ]

  if (wishlistItems.length === 0) {
    return (
      <div className="text-center py-16">
        <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
        <p className="text-muted-foreground mb-6">Start adding products you love to your wishlist</p>
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/">Browse Products</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={filter === category ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(category)}
            className={
              filter === category ? "bg-primary text-primary-foreground" : "border-border bg-transparent hover:bg-muted"
            }
          >
            {category === "all"
              ? "All Items"
              : category === "inStock"
                ? "In Stock"
                : category === "outOfStock"
                  ? "Out of Stock"
                  : category}
          </Button>
        ))}
      </div>

      {/* Wishlist Stats */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"} in your wishlist
        </p>
        {wishlistItems.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setWishlistItems([])}
            className="border-border bg-transparent hover:bg-destructive hover:text-destructive-foreground"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Wishlist Items */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No items match your current filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="group p-0 hover:shadow-lg transition-all duration-300 bg-card border-border">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.badge && (
                    <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">{item.badge}</Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 bg-background/80 hover:bg-background text-destructive"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="destructive">Out of Stock</Badge>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>

                  <Link href={`/product/${item.id}`}>
                    <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors line-clamp-2">
                      {item.name}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(item.rating) ? "fill-primary text-primary" : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {item.rating} ({item.reviews})
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl font-bold text-primary">${item.price}</span>
                    {item.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">${item.originalPrice}</span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Button
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                      disabled={!item.inStock}
                      onClick={() => addToCart(item)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {item.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-border bg-transparent hover:bg-muted"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <Heart className="h-4 w-4 mr-2 fill-current" />
                      Remove from Wishlist
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Recommendations */}
      {wishlistItems.length > 0 && (
        <div className="mt-12 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold mb-4">You might also like</h2>
          <p className="text-muted-foreground mb-6">Based on items in your wishlist</p>
          <Button asChild variant="outline" className="border-border bg-transparent hover:bg-muted">
            <Link href="/">Browse Similar Products</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
