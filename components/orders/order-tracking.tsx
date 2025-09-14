"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Package, Truck, CheckCircle, Clock, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

interface Order {
  id: string
  date: string
  status: "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  items: OrderItem[]
  shippingAddress: string
  trackingNumber?: string
  estimatedDelivery?: string
  carrier?: string
}

const mockOrders: Order[] = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15",
    status: "delivered",
    total: 739.96,
    items: [
      {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 299.99,
        quantity: 1,
        image: "/premium-wireless-headphones.png",
      },
      {
        id: 2,
        name: "Smart Fitness Watch",
        price: 199.99,
        quantity: 2,
        image: "/smart-fitness-watch.png",
      },
    ],
    shippingAddress: "123 Main St, New York, NY 10001",
    trackingNumber: "1Z999AA1234567890",
    carrier: "UPS",
  },
  {
    id: "ORD-2024-002",
    date: "2024-01-20",
    status: "shipped",
    total: 449.99,
    items: [
      {
        id: 4,
        name: "Ergonomic Office Chair",
        price: 449.99,
        quantity: 1,
        image: "/ergonomic-office-chair.png",
      },
    ],
    shippingAddress: "123 Main St, New York, NY 10001",
    trackingNumber: "1Z999AA1234567891",
    estimatedDelivery: "2024-01-25",
    carrier: "UPS",
  },
  {
    id: "ORD-2024-003",
    date: "2024-01-22",
    status: "processing",
    total: 169.98,
    items: [
      {
        id: 6,
        name: "Bluetooth Speaker",
        price: 129.99,
        quantity: 1,
        image: "/bluetooth-speaker.png",
      },
      {
        id: 5,
        name: "Wireless Charging Pad",
        price: 39.99,
        quantity: 1,
        image: "/wireless-charging-pad.png",
      },
    ],
    shippingAddress: "123 Main St, New York, NY 10001",
  },
]

export function OrderTracking() {
  const searchParams = useSearchParams()
  const [orders] = useState<Order[]>(mockOrders)
  const [searchOrderId, setSearchOrderId] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  useEffect(() => {
    const orderId = searchParams.get("orderId")
    if (orderId) {
      const order = orders.find((o) => o.id === orderId)
      if (order) {
        setSelectedOrder(order)
        setSearchOrderId(orderId)
      }
    }
  }, [searchParams, orders])

  const handleSearch = () => {
    const order = orders.find((o) => o.id.toLowerCase().includes(searchOrderId.toLowerCase()))
    setSelectedOrder(order || null)
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "processing":
        return "bg-yellow-500"
      case "shipped":
        return "bg-blue-500"
      case "delivered":
        return "bg-green-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "processing":
        return <Clock className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      case "cancelled":
        return <Package className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getTrackingSteps = (order: Order) => {
    const steps = [
      { label: "Order Placed", completed: true, date: order.date },
      { label: "Processing", completed: true, date: order.date },
      {
        label: "Shipped",
        completed: order.status === "shipped" || order.status === "delivered",
        date: order.status === "shipped" || order.status === "delivered" ? "2024-01-23" : undefined,
      },
      {
        label: "Delivered",
        completed: order.status === "delivered",
        date: order.status === "delivered" ? "2024-01-24" : undefined,
      },
    ]
    return steps
  }

  return (
    <div className="space-y-6">
      {/* Order Search */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Track Your Order</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder="Enter order number (e.g., ORD-2024-001)"
              value={searchOrderId}
              onChange={(e) => setSearchOrderId(e.target.value)}
              className="bg-input border-border"
            />
            <Button onClick={handleSearch} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Track Order
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="recent">Recent Orders</TabsTrigger>
          <TabsTrigger value="details">Order Details</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-16">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">No orders found</h2>
              <p className="text-muted-foreground mb-6">You haven't placed any orders yet</p>
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{order.id}</h3>
                        <p className="text-sm text-muted-foreground">
                          Placed on {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={`${getStatusColor(order.status)} text-white`}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1 capitalize">{order.status}</span>
                        </Badge>
                        <p className="text-lg font-bold text-primary mt-1">${order.total.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium mb-2">Items ({order.items.length})</h4>
                        <div className="space-y-2">
                          {order.items.slice(0, 2).map((item) => (
                            <div key={item.id} className="flex items-center gap-3">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div className="flex-1">
                                <p className="text-sm font-medium">{item.name}</p>
                                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                              </div>
                            </div>
                          ))}
                          {order.items.length > 2 && (
                            <p className="text-sm text-muted-foreground">+{order.items.length - 2} more items</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Shipping Details</h4>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{order.shippingAddress}</span>
                          </div>
                          {order.trackingNumber && (
                            <div className="flex items-center gap-2">
                              <Truck className="h-4 w-4" />
                              <span>Tracking: {order.trackingNumber}</span>
                            </div>
                          )}
                          {order.estimatedDelivery && (
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>Est. Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedOrder(order)}
                        className="border-border bg-transparent hover:bg-muted"
                      >
                        View Details
                      </Button>
                      {order.trackingNumber && (
                        <Button variant="outline" size="sm" className="border-border bg-transparent hover:bg-muted">
                          Track Package
                        </Button>
                      )}
                      {order.status === "delivered" && (
                        <Button variant="outline" size="sm" className="border-border bg-transparent hover:bg-muted">
                          Reorder
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="details">
          {selectedOrder ? (
            <div className="space-y-6">
              {/* Order Header */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{selectedOrder.id}</CardTitle>
                      <p className="text-muted-foreground">
                        Placed on {new Date(selectedOrder.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge className={`${getStatusColor(selectedOrder.status)} text-white`}>
                      {getStatusIcon(selectedOrder.status)}
                      <span className="ml-1 capitalize">{selectedOrder.status}</span>
                    </Badge>
                  </div>
                </CardHeader>
              </Card>

              {/* Tracking Progress */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Order Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {getTrackingSteps(selectedOrder).map((step, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            step.completed ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {step.completed ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <div className="w-2 h-2 bg-current rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${step.completed ? "text-foreground" : "text-muted-foreground"}`}>
                            {step.label}
                          </p>
                          {step.date && (
                            <p className="text-sm text-muted-foreground">{new Date(step.date).toLocaleDateString()}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">${item.price} each</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${(selectedOrder.total * 0.85).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>${(selectedOrder.total * 0.07).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${(selectedOrder.total * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg border-t border-border pt-2">
                      <span>Total</span>
                      <span className="text-primary">${selectedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center py-16">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">No order selected</h2>
              <p className="text-muted-foreground">Search for an order or select one from your recent orders</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
