"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

// Mock cart data
const initialCartItems = [
  {
    id: 1,
    name: "Chronograph Master",
    price: 4850,
    quantity: 1,
    image: "luxury chronograph watch with blue dial",
    slug: "chronograph-master"
  },
  {
    id: 2,
    name: "Diver Professional",
    price: 3200,
    quantity: 1,
    image: "professional diving watch with black bezel",
    slug: "diver-professional"
  }
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [shippingMethod, setShippingMethod] = useState("standard");

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    toast("Item removed from cart");
  };

  const applyPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim() === "") return;

    // Simulate promo code validation
    if (promoCode.toLowerCase() === "welcome10") {
      toast("Promo code applied", {
        description: "10% discount has been applied to your order."
      });
    } else {
      toast("Invalid promo code", {
        description: "The promo code you entered is invalid or expired."
      });
    }
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = promoCode.toLowerCase() === "welcome10" ? subtotal * 0.1 : 0;
  const shippingCost = shippingMethod === "express" ? 50 : 0;
  const total = subtotal - discount + shippingCost;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif font-bold mb-8">Shopping Cart</h1>

        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <Card>
                <CardHeader>
                  <CardTitle>
                    Cart Items (
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col sm:flex-row gap-4"
                      >
                        <div className="h-24 w-24 rounded-md overflow-hidden relative flex-shrink-0">
                          <Image
                            src={`/abstract-geometric-shapes.png?height=96&width=96&query=${item.image}`}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <div>
                              <Link
                                href={`/products/${item.slug}`}
                                className="font-medium hover:underline"
                              >
                                {item.name}
                              </Link>
                              <p className="text-gray-500 text-sm">
                                Ref: {item.slug}
                              </p>
                            </div>
                            <p className="font-medium">
                              ${item.price.toLocaleString()}
                            </p>
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                              >
                                <Minus className="h-3 w-3" />
                                <span className="sr-only">
                                  Decrease quantity
                                </span>
                              </Button>
                              <span className="w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                              >
                                <Plus className="h-3 w-3" />
                                <span className="sr-only">
                                  Increase quantity
                                </span>
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-500 hover:text-red-500"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link href="/products">Continue Shopping</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setCartItems([]);
                      toast("Cart has been cleared");
                    }}
                  >
                    Clear Cart
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>${subtotal.toLocaleString()}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount (10%)</span>
                        <span>-${discount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>
                        {shippingCost > 0
                          ? `$${shippingCost.toLocaleString()}`
                          : "Free"}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span>${total.toLocaleString()}</span>
                    </div>

                    {/* Promo Code */}
                    <div className="pt-4">
                      <form onSubmit={applyPromoCode} className="flex gap-2">
                        <Input
                          placeholder="Promo code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="flex-1"
                        />
                        <Button type="submit" variant="outline">
                          Apply
                        </Button>
                      </form>
                      <p className="text-xs text-gray-500 mt-1">
                        Try "WELCOME10" for 10% off
                      </p>
                    </div>

                    {/* Shipping Options */}
                    <div className="pt-4">
                      <Label className="text-base">Shipping Method</Label>
                      <RadioGroup
                        value={shippingMethod}
                        onValueChange={setShippingMethod}
                        className="mt-2 space-y-2"
                      >
                        <div className="flex items-center justify-between space-x-2 rounded-md border p-3">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="standard" id="standard" />
                            <Label
                              htmlFor="standard"
                              className="font-normal cursor-pointer"
                            >
                              Standard Shipping
                            </Label>
                          </div>
                          <span>Free</span>
                        </div>
                        <div className="flex items-center justify-between space-x-2 rounded-md border p-3">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="express" id="express" />
                            <Label
                              htmlFor="express"
                              className="font-normal cursor-pointer"
                            >
                              Express Shipping
                            </Label>
                          </div>
                          <span>$50.00</span>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="lg" asChild>
                    <Link href="/checkout">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-6" />
            <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Looks like you haven't added any watches to your cart yet. Explore
              our collection to find your perfect timepiece.
            </p>
            <Button asChild size="lg">
              <Link href="/products">
                Explore Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
