"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { bookPublicAppointment } from "@/lib/actions";
import { Calendar, CheckCircle } from "lucide-react";

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
];

export default function BookAppointmentPage() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await bookPublicAppointment(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center px-4 py-20">
          <Card className="max-w-md text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle className="h-8 w-8 text-emerald-600" />
            </div>
            <CardHeader>
              <CardTitle>Appointment Booked!</CardTitle>
              <CardDescription>
                Your appointment request has been submitted successfully. Our
                team will confirm your booking shortly.
              </CardDescription>
            </CardHeader>
            <div className="flex flex-col gap-3">
              <Link href="/">
                <Button variant="outline" className="w-full">
                  Back to Home
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setSuccess(false)}
              >
                Book Another
              </Button>
            </div>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-slate-50 py-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-100">
              <Calendar className="h-7 w-7 text-teal-600" />
            </div>
            <h1 className="mt-4 text-3xl font-bold text-slate-900">
              Book an Appointment
            </h1>
            <p className="mt-2 text-slate-600">
              Fill in your details to schedule a visit with Dr. Abdullah Meky
            </p>
          </div>

          <Card>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                <Input
                  label="Date of Birth *"
                  name="dateOfBirth"
                  type="date"
                  required
                />
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

              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Preferred Date *"
                  name="date"
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
                <Select
                  label="Preferred Time *"
                  name="startTime"
                  required
                  options={[
                    { value: "", label: "Select a time" },
                    ...timeSlots.map((t) => ({ value: t, label: t })),
                  ]}
                />
              </div>

              <Textarea
                label="Reason for Visit"
                name="reason"
                placeholder="Briefly describe your symptoms or reason for visit"
                rows={3}
              />

              <Button type="submit" className="w-full" size="lg" isLoading={loading}>
                Submit Appointment Request
              </Button>
            </form>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
