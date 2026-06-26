"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { createPatient } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export default function NewPatientPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await createPatient(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    router.push("/dashboard/patients");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link
          href="/dashboard/patients"
          className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-teal-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Patients
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
          Add New Patient
        </h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="First Name *" name="firstName" required />
            <Input label="Last Name *" name="lastName" required />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Phone *" name="phone" type="tel" required />
            <Input label="Email" name="email" type="email" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Date of Birth *" name="dateOfBirth" type="date" required />
            <Select
              label="Gender *"
              name="gender"
              required
              options={[
                { value: "MALE", label: "Male" },
                { value: "FEMALE", label: "Female" },
                { value: "OTHER", label: "Other" },
              ]}
            />
          </div>

          <Input label="Address" name="address" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Blood Type" name="bloodType" placeholder="e.g. O+" />
            <Input label="Emergency Contact" name="emergencyContact" />
          </div>
          <Input label="Allergies" name="allergies" />
          <Textarea label="Notes" name="notes" rows={3} />

          <div className="flex gap-3 pt-2">
            <Button type="submit" isLoading={loading}>
              Create Patient
            </Button>
            <Link href="/dashboard/patients">
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
