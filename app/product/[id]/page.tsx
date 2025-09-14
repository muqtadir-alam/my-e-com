import { ProductDetail } from "@/components/product/product-detail"

// In a real app, this would fetch from an API or database
const getProduct = (id: string) => {
  const products = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.8,
      reviews: 124,
      images: [
        "/premium-wireless-headphones.png",
        "/headphones-side-view.png",
        "/headphones-case.png",
        "/headphones-controls.jpg",
      ],
      badge: "Best Seller",
      inStock: true,
      category: "Electronics",
      brand: "AudioTech",
      sku: "AT-WH-001",
      description:
        "Experience premium sound quality with our flagship wireless headphones. Featuring advanced noise cancellation, 30-hour battery life, and premium materials for ultimate comfort.",
      features: [
        "Active Noise Cancellation",
        "30-hour battery life",
        "Premium leather ear cups",
        "Bluetooth 5.0 connectivity",
        "Quick charge (15 min = 3 hours)",
        "Voice assistant compatible",
      ],
      specifications: {
        "Driver Size": "40mm",
        "Frequency Response": "20Hz - 20kHz",
        Impedance: "32 ohms",
        Weight: "250g",
        Connectivity: "Bluetooth 5.0, 3.5mm jack",
        Battery: "30 hours playback",
      },
      colors: ["Black", "Silver", "Rose Gold"],
      sizes: [],
      warranty: "2 years",
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      rating: 4.6,
      reviews: 89,
      images: [
        "/smart-fitness-watch.png",
        "/fitness-watch-side-view.jpg",
        "/fitness-watch-apps.jpg",
        "/fitness-watch-charging.jpg",
      ],
      badge: "New",
      inStock: true,
      category: "Electronics",
      brand: "FitTech",
      sku: "FT-SW-002",
      description:
        "Track your fitness goals with our advanced smartwatch. Features heart rate monitoring, GPS tracking, and 7-day battery life.",
      features: [
        "Heart rate monitoring",
        "GPS tracking",
        "7-day battery life",
        "Water resistant (50m)",
        "Sleep tracking",
        "100+ workout modes",
      ],
      specifications: {
        Display: '1.4" AMOLED',
        Battery: "7 days typical use",
        "Water Rating": "5ATM",
        Sensors: "Heart rate, GPS, Accelerometer",
        Connectivity: "Bluetooth 5.0, Wi-Fi",
        Compatibility: "iOS 12+, Android 6+",
      },
      colors: ["Black", "White", "Blue"],
      sizes: ["38mm", "42mm"],
      warranty: "1 year",
    },
  ]

  return products.find((p) => p.id === Number.parseInt(id))
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProduct(params.id)

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
      </div>
    )
  }

  return <ProductDetail product={product} />
}
