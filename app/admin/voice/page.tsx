import type { Metadata } from "next";
import AdminVoicePanel from "@/components/admin/voice-panel";

export const metadata: Metadata = {
  title: "Voice Call Admin | Teodinkee",
  description: "Admin panel for dispatching automated voice calls to customers"
};

export default function AdminVoicePage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold mb-2">
            Voice Call Admin
          </h1>
          <p className="text-gray-600">
            Dispatch automated voice calls to customers
          </p>
        </div>

        <AdminVoicePanel />
      </div>
    </div>
  );
}
