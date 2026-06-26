"use client";

import { useRouter } from "next/navigation";
import { updateAppointmentStatus } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Check, X, Clock } from "lucide-react";
import { useState } from "react";

export function AppointmentStatusActions({
  appointmentId,
  currentStatus,
}: {
  appointmentId: string;
  currentStatus: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  async function handleStatus(status: string) {
    setLoading(status);
    await updateAppointmentStatus(appointmentId, status);
    router.refresh();
    setLoading(null);
  }

  if (currentStatus === "COMPLETED" || currentStatus === "CANCELLED") {
    return null;
  }

  return (
    <div className="flex items-center justify-end gap-1">
      {currentStatus === "SCHEDULED" && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleStatus("CONFIRMED")}
          isLoading={loading === "CONFIRMED"}
          title="Confirm"
        >
          <Clock className="h-4 w-4 text-blue-600" />
        </Button>
      )}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleStatus("COMPLETED")}
        isLoading={loading === "COMPLETED"}
        title="Complete"
      >
        <Check className="h-4 w-4 text-emerald-600" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleStatus("CANCELLED")}
        isLoading={loading === "CANCELLED"}
        title="Cancel"
      >
        <X className="h-4 w-4 text-red-600" />
      </Button>
    </div>
  );
}
