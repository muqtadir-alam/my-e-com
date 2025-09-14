"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Package, Truck, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function OrderConfirmation() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId") || "ORDER123"

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-center mb-8">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-green-500 mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground">Thank you for your purchase. Your order has been successfully placed.</p>
      </div>

      <Card className="bg-card border-border mb-6">
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Order Number:</span>
            <span className="text-primary font-mono">{orderId}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Order Date:</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Total Amount:</span>
            <span className="text-xl font-bold text-primary">$739.96</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Payment Method:</span>
            <span className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              •••• •••• •••• 3456
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            What's Next?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
              1
            </div>
            <div>
              <h3 className="font-medium">Order Processing</h3>
              <p className="text-sm text-muted-foreground">We're preparing your items for shipment.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground text-sm font-bold">
              2
            </div>
            <div>
              <h3 className="font-medium">Shipping</h3>
              <p className="text-sm text-muted-foreground">Your order will be shipped within 1-2 business days.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground text-sm font-bold">
              3
            </div>
            <div>
              <h3 className="font-medium">Delivery</h3>
              <p className="text-sm text-muted-foreground">Expected delivery in 5-7 business days.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center space-y-4">
        <p className="text-muted-foreground">
          A confirmation email has been sent to your email address with order details and tracking information.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href={`/orders?orderId=${orderId}`}>
              <Truck className="h-4 w-4 mr-2" />
              Track Your Order
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-border bg-transparent">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
