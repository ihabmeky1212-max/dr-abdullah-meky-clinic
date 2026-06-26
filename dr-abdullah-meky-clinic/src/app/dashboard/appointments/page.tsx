import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge, getStatusBadgeVariant } from "@/components/ui/badge";
import { formatDate, formatTime } from "@/lib/utils";
import { Plus } from "lucide-react";
import { AppointmentStatusActions } from "@/components/dashboard/appointment-actions";

export default async function AppointmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;

  const appointments = await prisma.appointment.findMany({
    where: status ? { status: status as "SCHEDULED" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "NO_SHOW" } : undefined,
    include: { patient: true },
    orderBy: [{ date: "desc" }, { startTime: "asc" }],
  });

  const statuses = ["ALL", "SCHEDULED", "CONFIRMED", "COMPLETED", "CANCELLED"];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Appointments
          </h1>
          <p className="mt-1 text-slate-500">
            Manage and track all clinic appointments
          </p>
        </div>
        <Link href="/dashboard/appointments/new">
          <Button>
            <Plus className="h-4 w-4" />
            New Appointment
          </Button>
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        {statuses.map((s) => (
          <Link
            key={s}
            href={s === "ALL" ? "/dashboard/appointments" : `/dashboard/appointments?status=${s}`}
          >
            <Button
              variant={
                (s === "ALL" && !status) || status === s ? "primary" : "outline"
              }
              size="sm"
            >
              {s}
            </Button>
          </Link>
        ))}
      </div>

      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-slate-500">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-slate-500">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-slate-500">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-slate-500">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-slate-500">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No appointments found.
                  </td>
                </tr>
              ) : (
                appointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <Link
                        href={`/dashboard/patients/${apt.patientId}`}
                        className="font-medium text-teal-600 hover:underline"
                      >
                        {apt.patient.firstName} {apt.patient.lastName}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {formatDate(apt.date)}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {formatTime(apt.startTime)} – {formatTime(apt.endTime)}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {apt.reason || "—"}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={getStatusBadgeVariant(apt.status)}>
                        {apt.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <AppointmentStatusActions
                        appointmentId={apt.id}
                        currentStatus={apt.status}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
