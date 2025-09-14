import { OrderTracking } from "@/components/orders/order-tracking"

export default function OrdersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Order Tracking</h1>
        <p className="text-muted-foreground mt-2">Track your orders and view order history</p>
      </div>
      <OrderTracking />
    </div>
  )
}
