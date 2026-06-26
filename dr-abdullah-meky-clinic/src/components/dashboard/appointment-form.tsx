"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { createAppointment } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

type Patient = { id: string; firstName: string; lastName: string };

export function AppointmentForm({ patients }: { patients: Patient[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedPatient = searchParams.get("patientId") || "";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [patientId, setPatientId] = useState(preselectedPatient);

  useEffect(() => {
    if (preselectedPatient) setPatientId(preselectedPatient);
  }, [preselectedPatient]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.set("patientId", patientId);

    const result = await createAppointment(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    router.push("/dashboard/appointments");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link
          href="/dashboard/appointments"
          className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-teal-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Appointments
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
          New Appointment
        </h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <Select
            label="Patient *"
            name="patientId"
            required
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            options={[
              { value: "", label: "Select a patient" },
              ...patients.map((p) => ({
                value: p.id,
                label: `${p.firstName} ${p.lastName}`,
              })),
            ]}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Date *"
              name="date"
              type="date"
              min={new Date().toISOString().split("T")[0]}
              required
            />
            <Select
              label="Status"
              name="status"
              options={[
                { value: "SCHEDULED", label: "Scheduled" },
                { value: "CONFIRMED", label: "Confirmed" },
              ]}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Start Time *" name="startTime" type="time" required />
            <Input label="End Time *" name="endTime" type="time" required />
          </div>

          <Input label="Reason" name="reason" />
          <Textarea label="Notes" name="notes" rows={3} />

          <div className="flex gap-3 pt-2">
            <Button type="submit" isLoading={loading}>
              Create Appointment
            </Button>
            <Link href="/dashboard/appointments">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
