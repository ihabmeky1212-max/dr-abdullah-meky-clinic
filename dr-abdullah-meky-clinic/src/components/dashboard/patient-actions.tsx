"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { deletePatient } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";
import { useState } from "react";

export function PatientActions({ patientId }: { patientId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this patient?")) return;
    setLoading(true);
    await deletePatient(patientId);
    router.refresh();
    setLoading(false);
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <Link href={`/dashboard/patients/${patientId}`}>
        <Button variant="ghost" size="sm">
          <Eye className="h-4 w-4" />
        </Button>
      </Link>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleDelete}
        isLoading={loading}
        className="text-red-600 hover:bg-red-50 hover:text-red-700"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
