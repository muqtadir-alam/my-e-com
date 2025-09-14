"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ShoppingCart, Heart, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary">
            ShopDark
          </Link>

          {/* Search bar - desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input border-border"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/wishlist" className="relative">
                <Heart className="h-6 w-6 text-foreground hover:text-primary transition-colors" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground text-xs">
                  2
                </Badge>
              </Link>
              <Link href="/cart" className="relative">
                <ShoppingCart className="h-6 w-6 text-foreground hover:text-primary transition-colors" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground text-xs">
                  3
                </Badge>
              </Link>
              <Link href="/login">
                <User className="h-6 w-6 text-foreground hover:text-primary transition-colors" />
              </Link>
            </nav>

            <div className="flex md:hidden items-center gap-3">
              <Link href="/wishlist" className="relative p-2">
                <Heart className="h-5 w-5 text-foreground" />
                <Badge className="absolute top-0 right-0 h-4 w-4 flex items-center justify-center p-0 bg-primary text-primary-foreground text-xs">
                  2
                </Badge>
              </Link>
              <Link href="/cart" className="relative p-2">
                <ShoppingCart className="h-5 w-5 text-foreground" />
                <Badge className="absolute top-0 right-0 h-4 w-4 flex items-center justify-center p-0 bg-primary text-primary-foreground text-xs">
                  3
                </Badge>
              </Link>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-10 w-10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input border-border h-12"
            />
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <nav className="flex flex-col gap-2">
              <Link
                href="/wishlist"
                className="flex items-center gap-3 py-3 px-2 rounded-lg hover:bg-muted transition-colors"
              >
                <Heart className="h-5 w-5" />
                <span>Wishlist</span>
                <Badge className="ml-auto bg-primary text-primary-foreground">2</Badge>
              </Link>
              <Link
                href="/cart"
                className="flex items-center gap-3 py-3 px-2 rounded-lg hover:bg-muted transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Cart</span>
                <Badge className="ml-auto bg-primary text-primary-foreground">3</Badge>
              </Link>
              <Link
                href="/login"
                className="flex items-center gap-3 py-3 px-2 rounded-lg hover:bg-muted transition-colors"
              >
                <User className="h-5 w-5" />
                <span>Account</span>
              </Link>
              <Link
                href="/orders"
                className="flex items-center gap-3 py-3 px-2 rounded-lg hover:bg-muted transition-colors"
              >
                <span>Track Orders</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
