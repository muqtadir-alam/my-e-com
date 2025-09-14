import { WishlistContent } from "@/components/wishlist/wishlist-content"

export default function WishlistPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <p className="text-muted-foreground mt-2">Save your favorite items for later</p>
      </div>
      <WishlistContent />
    </div>
  )
}
