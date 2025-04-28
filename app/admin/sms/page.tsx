import type { Metadata } from "next";
import AdminSmsPanel from "@/components/admin/sms-panel";

export const metadata: Metadata = {
  title: "SMS Admin | Teodinkee",
  description: "Admin panel for sending SMS notifications to customers"
};

export default function AdminSmsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold mb-2">
            SMS Marketing Admin
          </h1>
          <p className="text-gray-600">Send SMS notifications to customers</p>
        </div>

        <AdminSmsPanel />
      </div>
    </div>
  );
}
