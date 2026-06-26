"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteSchedule } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export function ScheduleActions({ scheduleId }: { scheduleId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Remove this time slot?")) return;
    setLoading(true);
    await deleteSchedule(scheduleId);
    router.refresh();
    setLoading(false);
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleDelete}
      isLoading={loading}
      className="text-red-600 hover:bg-red-50"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
