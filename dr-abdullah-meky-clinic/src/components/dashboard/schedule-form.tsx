"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createSchedule } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { DAYS_OF_WEEK } from "@/lib/utils";

export function ScheduleForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.set("isActive", "true");

    const result = await createSchedule(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    router.refresh();
    setLoading(false);
    (e.target as HTMLFormElement).reset();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <Select
        label="Day of Week"
        name="dayOfWeek"
        required
        options={DAYS_OF_WEEK.map((day, index) => ({
          value: String(index),
          label: day,
        }))}
      />

      <Input label="Start Time" name="startTime" type="time" required />
      <Input label="End Time" name="endTime" type="time" required />

      <Button type="submit" className="w-full" isLoading={loading}>
        Add Slot
      </Button>
    </form>
  );
}
