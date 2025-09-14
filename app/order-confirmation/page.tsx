import { Suspense } from "react"
import { OrderConfirmation } from "@/components/checkout/order-confirmation"

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderConfirmation />
    </Suspense>
  )
}
