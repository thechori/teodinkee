"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import {
  BarChart,
  Megaphone,
  MessageSquare,
  Package,
  Phone,
  Settings,
  Users
} from "lucide-react";
import { usePathname } from "next/navigation";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  return (
    <div className="flex min-h-screen">
      {/* Admin Sidebar */}
      <div className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50 pt-16 bg-gray-900 text-white">
        <div className="px-4 py-6 border-b border-gray-800">
          <h2 className="text-xl font-serif font-bold">Admin Dashboard</h2>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1">
          <Link
            href="/admin"
            className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-md"
          >
            <BarChart className="mr-3 h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/admin/products"
            className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-md"
          >
            <Package className="mr-3 h-5 w-5" />
            Products
          </Link>
          <Link
            href="/admin/customers"
            className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-md"
          >
            <Users className="mr-3 h-5 w-5" />
            Customers
          </Link>
          <Link
            href="/admin/sms"
            className={`flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-md ${
              pathname === "/admin/sms" ? "bg-gray-800 text-white" : ""
            }`}
          >
            <MessageSquare className="mr-3 h-5 w-5" />
            SMS Marketing
          </Link>
          <Link
            href="/admin/voice"
            className={`flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-md ${
              pathname === "/admin/voice" ? "bg-gray-800 text-white" : ""
            }`}
          >
            <Phone className="mr-3 h-5 w-5" />
            Voice Calls
          </Link>
          <Link
            href="/admin/marketing"
            className={`flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-md ${
              pathname === "/admin/marketing" ? "bg-gray-800 text-white" : ""
            }`}
          >
            <Megaphone className="mr-3 h-5 w-5" />
            Marketing
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-md"
          >
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">{children}</div>
    </div>
  );
}
