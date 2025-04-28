export const foo = "bar";
// "use client";

// import type React from "react";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Heart, Package, Settings, User, LogIn } from "lucide-react";
// import { useSession, signOut } from "next-auth/react";
// import { useRouter, useSearchParams } from "next/navigation";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle
// } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";
// import { Switch } from "@/components/ui/switch";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { toast } from "sonner";

// type OrderItem = {
//   id: number;
//   name: string;
//   img_url: string;
//   slug: string;
//   quantity: number;
//   price_at_purchase_in_cents: number;
// };

// type Order = {
//   id: number;
//   created_at: string;
//   status: string;
//   total_price_in_cents: number;
//   tracking_number: string | null;
//   items: OrderItem[];
// };

// type WishlistItem = {
//   id: number;
//   name: string;
//   price: number;
//   img_url: string;
//   slug: string;
// };

// export default function AccountPage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const tabParam = searchParams.get("tab");

//   const [activeTab, setActiveTab] = useState("orders");
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     zipCode: "",
//     country: ""
//   });
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
//   const [isLoadingOrders, setIsLoadingOrders] = useState(false);
//   const [isLoadingWishlist, setIsLoadingWishlist] = useState(false);

//   useEffect(() => {
//     if (
//       tabParam &&
//       ["orders", "wishlist", "profile", "settings"].includes(tabParam)
//     ) {
//       setActiveTab(tabParam);
//     }
//   }, [tabParam]);

//   useEffect(() => {
//     // Redirect to sign in if not authenticated
//     if (status === "unauthenticated") {
//       router.push("/auth/signin");
//     }

//     // Populate form data with user information if available
//     if (session?.user) {
//       const nameParts = (session.user.name || "").split(" ");
//       setFormData((prev) => ({
//         ...prev,
//         firstName: nameParts[0] || "",
//         lastName: nameParts.slice(1).join(" ") || "",
//         email: session.user?.email || ""
//       }));
//     }
//   }, [session, status, router]);

//   // Fetch orders when on orders tab
//   useEffect(() => {
//     if (status === "authenticated" && activeTab === "orders") {
//       fetchOrders();
//     }
//   }, [status, activeTab]);

//   // Fetch wishlist when on wishlist tab
//   useEffect(() => {
//     if (status === "authenticated" && activeTab === "wishlist") {
//       fetchWishlist();
//     }
//   }, [status, activeTab]);

//   const fetchOrders = async () => {
//     setIsLoadingOrders(true);
//     try {
//       const response = await fetch("/api/account/orders");
//       if (!response.ok) throw new Error("Failed to fetch orders");
//       const data = await response.json();
//       setOrders(data);
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//       toast.error("Failed to load orders");
//     } finally {
//       setIsLoadingOrders(false);
//     }
//   };

//   const fetchWishlist = async () => {
//     setIsLoadingWishlist(true);
//     try {
//       // For now, we'll use mock data since we haven't implemented the wishlist API yet
//       // In a real app, you would fetch from an API endpoint
//       setTimeout(() => {
//         setWishlist([
//           {
//             id: 1,
//             name: "Grand Tourbillon",
//             price: 12500,
//             img_url:
//               "/abstract-geometric-shapes.png?height=300&width=300&query=luxury tourbillon watch with skeleton dial",
//             slug: "grand-tourbillon"
//           },
//           {
//             id: 2,
//             name: "Vintage Elegance",
//             price: 3800,
//             img_url:
//               "/abstract-geometric-shapes.png?height=300&width=300&query=vintage style watch with cream dial",
//             slug: "vintage-elegance"
//           },
//           {
//             id: 3,
//             name: "Skeleton Artisan",
//             price: 7500,
//             img_url:
//               "/abstract-geometric-shapes.png?height=300&width=300&query=skeleton dial watch showing movement",
//             slug: "skeleton-artisan"
//           }
//         ]);
//         setIsLoadingWishlist(false);
//       }, 500);
//     } catch (error) {
//       console.error("Error fetching wishlist:", error);
//       toast.error("Failed to load wishlist");
//       setIsLoadingWishlist(false);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSaveChanges = (e: React.FormEvent) => {
//     e.preventDefault();
//     toast.success("Changes saved", {
//       description: "Your profile information has been updated."
//     });
//   };

//   const handleRemoveWishlistItem = (id: number) => {
//     setWishlist(wishlist.filter((item) => item.id !== id));
//     toast("Item removed", {
//       description: "The item has been removed from your wishlist."
//     });
//   };

//   const handleSignOut = async () => {
//     await signOut({ callbackUrl: "/" });
//     toast.success("Signed out", {
//       description: "You have been signed out successfully."
//     });
//   };

//   const getInitials = (name: string) => {
//     return name
//       .split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase();
//   };

//   // Show loading state
//   if (status === "loading") {
//     return (
//       <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading your account...</p>
//         </div>
//       </div>
//     );
//   }

//   // Show sign in prompt if not authenticated
//   if (status === "unauthenticated") {
//     return (
//       <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
//         <div className="text-center">
//           <LogIn className="h-12 w-12 mx-auto text-gray-400 mb-4" />
//           <h2 className="text-2xl font-medium mb-2">Sign in required</h2>
//           <p className="text-gray-500 mb-6">
//             Please sign in to access your account.
//           </p>
//           <Button asChild>
//             <Link href="/auth/signin">Sign In</Link>
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pt-24 pb-16">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-col md:flex-row gap-8">
//           {/* Sidebar */}
//           <div className="md:w-1/4">
//             <div className="sticky top-24 space-y-6">
//               <div className="flex items-center gap-4">
//                 <Avatar className="h-16 w-16">
//                   <AvatarImage
//                     src={session?.user?.image || ""}
//                     alt={session?.user?.name || ""}
//                   />
//                   <AvatarFallback className="text-lg">
//                     {session?.user?.name
//                       ? getInitials(session.user.name)
//                       : "TD"}
//                   </AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <h2 className="font-medium text-lg">{session?.user?.name}</h2>
//                   <p className="text-sm text-gray-500">
//                     {session?.user?.email}
//                   </p>
//                 </div>
//               </div>

//               <Tabs
//                 value={activeTab}
//                 onValueChange={setActiveTab}
//                 className="w-full"
//               >
//                 <TabsList className="grid grid-cols-4 md:grid-cols-1 h-auto gap-2">
//                   <TabsTrigger
//                     value="orders"
//                     className="flex items-center justify-start gap-2 py-2 md:py-3"
//                   >
//                     <Package className="h-4 w-4" />
//                     <span className="hidden md:inline">Orders</span>
//                   </TabsTrigger>
//                   <TabsTrigger
//                     value="wishlist"
//                     className="flex items-center justify-start gap-2 py-2 md:py-3"
//                   >
//                     <Heart className="h-4 w-4" />
//                     <span className="hidden md:inline">Wishlist</span>
//                   </TabsTrigger>
//                   <TabsTrigger
//                     value="profile"
//                     className="flex items-center justify-start gap-2 py-2 md:py-3"
//                   >
//                     <User className="h-4 w-4" />
//                     <span className="hidden md:inline">Profile</span>
//                   </TabsTrigger>
//                   <TabsTrigger
//                     value="settings"
//                     className="flex items-center justify-start gap-2 py-2 md:py-3"
//                   >
//                     <Settings className="h-4 w-4" />
//                     <span className="hidden md:inline">Settings</span>
//                   </TabsTrigger>
//                 </TabsList>
//               </Tabs>

//               <div className="hidden md:block">
//                 <Button
//                   variant="outline"
//                   className="w-full"
//                   onClick={handleSignOut}
//                 >
//                   Sign Out
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="md:w-3/4">
//             <Tabs
//               value={activeTab}
//               onValueChange={setActiveTab}
//               className="w-full"
//             >
//               <TabsContent value="orders" className="mt-0">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Order History</CardTitle>
//                     <CardDescription>
//                       View and manage your orders
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     {isLoadingOrders ? (
//                       <div className="text-center py-12">
//                         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto mb-4"></div>
//                         <p className="text-gray-600">Loading your orders...</p>
//                       </div>
//                     ) : orders.length > 0 ? (
//                       <div className="space-y-6">
//                         {orders.map((order) => (
//                           <div
//                             key={order.id}
//                             className="border rounded-lg overflow-hidden"
//                           >
//                             <div className="bg-gray-50 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
//                               <div>
//                                 <div className="flex items-center gap-2">
//                                   <span className="font-medium">
//                                     Order #{order.id}
//                                   </span>
//                                   <span
//                                     className={`px-2 py-1 text-xs rounded-full ${
//                                       order.status === "DELIVERED"
//                                         ? "bg-green-100 text-green-800"
//                                         : "bg-blue-100 text-blue-800"
//                                     }`}
//                                   >
//                                     {order.status}
//                                   </span>
//                                 </div>
//                                 <p className="text-sm text-gray-500">
//                                   Placed on{" "}
//                                   {new Date(
//                                     order.created_at
//                                   ).toLocaleDateString()}
//                                 </p>
//                               </div>
//                               <div className="flex gap-2">
//                                 <Button variant="outline" size="sm">
//                                   Track Order
//                                 </Button>
//                                 <Button variant="outline" size="sm">
//                                   View Details
//                                 </Button>
//                               </div>
//                             </div>
//                             <div className="p-4">
//                               {order.items.map((item, index) => (
//                                 <div
//                                   key={index}
//                                   className="flex items-center gap-4"
//                                 >
//                                   <div className="h-16 w-16 rounded-md overflow-hidden relative flex-shrink-0">
//                                     <Image
//                                       src={item.img_url || "/placeholder.svg"}
//                                       alt={item.name}
//                                       fill
//                                       className="object-cover"
//                                     />
//                                   </div>
//                                   <div className="flex-1">
//                                     <h4 className="font-medium">{item.name}</h4>
//                                     <p className="text-sm text-gray-500">
//                                       $
//                                       {(
//                                         item.price_at_purchase_in_cents / 100
//                                       ).toFixed(2)}
//                                     </p>
//                                   </div>
//                                   <Button variant="outline" size="sm">
//                                     Buy Again
//                                   </Button>
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     ) : (
//                       <div className="text-center py-12">
//                         <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
//                         <h3 className="text-lg font-medium mb-2">
//                           No orders yet
//                         </h3>
//                         <p className="text-gray-500 mb-6">
//                           You haven't placed any orders yet.
//                         </p>
//                         <Button asChild>
//                           <Link href="/products">Start Shopping</Link>
//                         </Button>
//                       </div>
//                     )}
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               <TabsContent value="wishlist" className="mt-0">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Wishlist</CardTitle>
//                     <CardDescription>
//                       Items you've saved for later
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     {isLoadingWishlist ? (
//                       <div className="text-center py-12">
//                         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto mb-4"></div>
//                         <p className="text-gray-600">
//                           Loading your wishlist...
//                         </p>
//                       </div>
//                     ) : wishlist.length > 0 ? (
//                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {wishlist.map((item) => (
//                           <div
//                             key={item.id}
//                             className="border rounded-lg overflow-hidden group"
//                           >
//                             <div className="aspect-square relative">
//                               <Image
//                                 src={item.img_url || "/placeholder.svg"}
//                                 alt={item.name}
//                                 fill
//                                 className="object-cover transition-transform duration-500 group-hover:scale-105"
//                               />
//                               <Button
//                                 variant="ghost"
//                                 size="icon"
//                                 className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full"
//                                 onClick={() =>
//                                   handleRemoveWishlistItem(item.id)
//                                 }
//                               >
//                                 <Heart className="h-5 w-5 fill-red-500 text-red-500" />
//                                 <span className="sr-only">
//                                   Remove from wishlist
//                                 </span>
//                               </Button>
//                             </div>
//                             <div className="p-4">
//                               <Link href={`/products/${item.slug}`}>
//                                 <h3 className="font-medium mb-1 group-hover:text-gray-700">
//                                   {item.name}
//                                 </h3>
//                               </Link>
//                               <p className="text-gray-500 mb-3">
//                                 ${item.price.toLocaleString()}
//                               </p>
//                               <Button className="w-full">Add to Cart</Button>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     ) : (
//                       <div className="text-center py-12">
//                         <Heart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
//                         <h3 className="text-lg font-medium mb-2">
//                           Your wishlist is empty
//                         </h3>
//                         <p className="text-gray-500 mb-6">
//                           Save items you love to your wishlist.
//                         </p>
//                         <Button asChild>
//                           <Link href="/products">Explore Products</Link>
//                         </Button>
//                       </div>
//                     )}
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               <TabsContent value="profile" className="mt-0">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Personal Information</CardTitle>
//                     <CardDescription>
//                       Manage your personal details
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <form onSubmit={handleSaveChanges}>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div className="space-y-2">
//                           <Label htmlFor="firstName">First Name</Label>
//                           <Input
//                             id="firstName"
//                             name="firstName"
//                             value={formData.firstName}
//                             onChange={handleInputChange}
//                           />
//                         </div>
//                         <div className="space-y-2">
//                           <Label htmlFor="lastName">Last Name</Label>
//                           <Input
//                             id="lastName"
//                             name="lastName"
//                             value={formData.lastName}
//                             onChange={handleInputChange}
//                           />
//                         </div>
//                         <div className="space-y-2">
//                           <Label htmlFor="email">Email</Label>
//                           <Input
//                             id="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleInputChange}
//                           />
//                         </div>
//                         <div className="space-y-2">
//                           <Label htmlFor="phone">Phone</Label>
//                           <Input
//                             id="phone"
//                             name="phone"
//                             value={formData.phone}
//                             onChange={handleInputChange}
//                           />
//                         </div>
//                       </div>

//                       <Separator className="my-6" />

//                       <h3 className="text-lg font-medium mb-4">
//                         Shipping Address
//                       </h3>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div className="space-y-2 md:col-span-2">
//                           <Label htmlFor="address">Address</Label>
//                           <Input
//                             id="address"
//                             name="address"
//                             value={formData.address}
//                             onChange={handleInputChange}
//                           />
//                         </div>
//                         <div className="space-y-2">
//                           <Label htmlFor="city">City</Label>
//                           <Input
//                             id="city"
//                             name="city"
//                             value={formData.city}
//                             onChange={handleInputChange}
//                           />
//                         </div>
//                         <div className="space-y-2">
//                           <Label htmlFor="state">State/Province</Label>
//                           <Input
//                             id="state"
//                             name="state"
//                             value={formData.state}
//                             onChange={handleInputChange}
//                           />
//                         </div>
//                         <div className="space-y-2">
//                           <Label htmlFor="zipCode">ZIP/Postal Code</Label>
//                           <Input
//                             id="zipCode"
//                             name="zipCode"
//                             value={formData.zipCode}
//                             onChange={handleInputChange}
//                           />
//                         </div>
//                         <div className="space-y-2">
//                           <Label htmlFor="country">Country</Label>
//                           <Input
//                             id="country"
//                             name="country"
//                             value={formData.country}
//                             onChange={handleInputChange}
//                           />
//                         </div>
//                       </div>

//                       <div className="mt-6">
//                         <Button type="submit">Save Changes</Button>
//                       </div>
//                     </form>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               <TabsContent value="settings" className="mt-0">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Account Settings</CardTitle>
//                     <CardDescription>
//                       Manage your account preferences
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-6">
//                       <h3 className="text-lg font-medium">Notifications</h3>
//                       <div className="space-y-4">
//                         <div className="flex items-center justify-between">
//                           <div>
//                             <p className="font-medium">Order updates</p>
//                             <p className="text-sm text-gray-500">
//                               Receive updates about your orders
//                             </p>
//                           </div>
//                           <Switch defaultChecked />
//                         </div>
//                         <div className="flex items-center justify-between">
//                           <div>
//                             <p className="font-medium">New products</p>
//                             <p className="text-sm text-gray-500">
//                               Be the first to know about new releases
//                             </p>
//                           </div>
//                           <Switch defaultChecked />
//                         </div>
//                         <div className="flex items-center justify-between">
//                           <div>
//                             <p className="font-medium">Blog posts</p>
//                             <p className="text-sm text-gray-500">
//                               Get notified about new articles
//                             </p>
//                           </div>
//                           <Switch />
//                         </div>
//                         <div className="flex items-center justify-between">
//                           <div>
//                             <p className="font-medium">Special offers</p>
//                             <p className="text-sm text-gray-500">
//                               Receive exclusive deals and promotions
//                             </p>
//                           </div>
//                           <Switch defaultChecked />
//                         </div>
//                       </div>

//                       <Separator />

//                       <h3 className="text-lg font-medium">Security</h3>
//                       <div className="space-y-4">
//                         <Button variant="outline">Change Password</Button>
//                         <div className="flex items-center justify-between">
//                           <div>
//                             <p className="font-medium">
//                               Two-factor authentication
//                             </p>
//                             <p className="text-sm text-gray-500">
//                               Add an extra layer of security to your account
//                             </p>
//                           </div>
//                           <Switch />
//                         </div>
//                       </div>

//                       <Separator />

//                       <h3 className="text-lg font-medium">Privacy</h3>
//                       <div className="space-y-4">
//                         <div className="flex items-center justify-between">
//                           <div>
//                             <p className="font-medium">Data sharing</p>
//                             <p className="text-sm text-gray-500">
//                               Allow us to use your data to improve our services
//                             </p>
//                           </div>
//                           <Switch defaultChecked />
//                         </div>
//                         <div className="flex items-center justify-between">
//                           <div>
//                             <p className="font-medium">Marketing preferences</p>
//                             <p className="text-sm text-gray-500">
//                               Allow us to share your information with partners
//                             </p>
//                           </div>
//                           <Switch />
//                         </div>
//                       </div>

//                       <div className="mt-6">
//                         <Button>Save Preferences</Button>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//             </Tabs>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
