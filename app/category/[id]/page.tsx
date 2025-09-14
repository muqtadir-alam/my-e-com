import { CategoryPage } from "@/components/category/category-page"

// In a real app, this would fetch from an API or database
const getCategory = (id: string) => {
  const categories = [
    { id: 1, name: "Electronics", description: "Discover the latest in technology and innovation" },
    { id: 2, name: "Fashion", description: "Style and comfort for every occasion" },
    { id: 3, name: "Home & Garden", description: "Transform your living space" },
    { id: 4, name: "Sports", description: "Gear up for your active lifestyle" },
  ]
  return categories.find((c) => c.id === Number.parseInt(id))
}

const getCategoryProducts = (categoryId: string) => {
  // Mock product data - in real app, this would filter by category
  const allProducts = [
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
      brand: "AudioTech",
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      rating: 4.6,
      reviews: 89,
      image: "/smart-fitness-watch.png",
      badge: "New",
      inStock: true,
      category: "Electronics",
      brand: "FitTech",
    },
    {
      id: 7,
      name: "4K Gaming Monitor",
      price: 549.99,
      originalPrice: 699.99,
      rating: 4.9,
      reviews: 156,
      image: "/placeholder-8dwki.png",
      badge: "Sale",
      inStock: true,
      category: "Electronics",
      brand: "DisplayPro",
    },
    {
      id: 8,
      name: "Mechanical Keyboard",
      price: 159.99,
      rating: 4.7,
      reviews: 203,
      image: "/mechanical-keyboard.png",
      inStock: true,
      category: "Electronics",
      brand: "KeyMaster",
    },
    {
      id: 9,
      name: "Wireless Mouse",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.5,
      reviews: 87,
      image: "/wireless-gaming-mouse.png",
      badge: "Popular",
      inStock: true,
      category: "Electronics",
      brand: "ClickTech",
    },
    {
      id: 10,
      name: "USB-C Hub",
      price: 89.99,
      rating: 4.4,
      reviews: 134,
      image: "/usb-c-hub-adapter.jpg",
      inStock: false,
      category: "Electronics",
      brand: "ConnectPro",
    },
    {
      id: 11,
      name: "Casual T-Shirt",
      price: 29.99,
      originalPrice: 39.99,
      rating: 4.3,
      reviews: 67,
      image: "/casual-cotton-t-shirt.jpg",
      badge: "Sale",
      inStock: true,
      category: "Fashion",
      brand: "ComfortWear",
    },
    {
      id: 12,
      name: "Denim Jeans",
      price: 89.99,
      rating: 4.6,
      reviews: 145,
      image: "/blue-denim-jeans.png",
      inStock: true,
      category: "Fashion",
      brand: "DenimCo",
    },
  ]

  const categoryName = getCategory(categoryId)?.name
  return allProducts.filter((product) => product.category === categoryName)
}

export default function CategoryPageRoute({ params }: { params: { id: string } }) {
  const category = getCategory(params.id)
  const products = getCategoryProducts(params.id)

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
        <p className="text-muted-foreground">The category you're looking for doesn't exist.</p>
      </div>
    )
  }

  return <CategoryPage category={category} products={products} />
}
