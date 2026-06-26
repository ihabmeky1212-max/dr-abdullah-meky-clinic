import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, getStatusBadgeVariant } from "@/components/ui/badge";
import { formatDate, formatTime } from "@/lib/utils";
import { ArrowLeft, Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function PatientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const patient = await prisma.patient.findUnique({
    where: { id },
    include: {
      appointments: { orderBy: { date: "desc" }, take: 10 },
      medicalRecords: { orderBy: { recordedAt: "desc" }, take: 10 },
    },
  });

  if (!patient) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/dashboard/patients"
          className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-teal-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Patients
        </Link>
        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              {patient.firstName} {patient.lastName}
            </h1>
            <p className="text-slate-500">{patient.phone}</p>
          </div>
          <div className="flex gap-2">
            <Link href={`/dashboard/appointments/new?patientId=${patient.id}`}>
              <Button variant="outline">
                <Calendar className="h-4 w-4" />
                New Appointment
              </Button>
            </Link>
            <Link href={`/dashboard/records/new?patientId=${patient.id}`}>
              <Button>
                <FileText className="h-4 w-4" />
                Add Record
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
          </CardHeader>
          <dl className="space-y-3 text-sm">
            {[
              ["Email", patient.email || "—"],
              ["Date of Birth", formatDate(patient.dateOfBirth)],
              ["Gender", patient.gender],
              ["Address", patient.address || "—"],
              ["Blood Type", patient.bloodType || "—"],
              ["Allergies", patient.allergies || "—"],
              ["Emergency Contact", patient.emergencyContact || "—"],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="font-medium text-slate-500">{label}</dt>
                <dd className="mt-0.5 text-slate-900">{value}</dd>
              </div>
            ))}
            {patient.notes && (
              <div>
                <dt className="font-medium text-slate-500">Notes</dt>
                <dd className="mt-0.5 text-slate-900">{patient.notes}</dd>
              </div>
            )}
          </dl>
        </Card>

        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Appointments</CardTitle>
            </CardHeader>
            {patient.appointments.length === 0 ? (
              <p className="text-sm text-slate-500">No appointments yet.</p>
            ) : (
              <div className="space-y-3">
                {patient.appointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="flex items-center justify-between rounded-lg border border-slate-100 p-3"
                  >
                    <div>
                      <p className="font-medium text-slate-900">
                        {formatDate(apt.date)}
                      </p>
                      <p className="text-sm text-slate-500">
                        {formatTime(apt.startTime)} – {formatTime(apt.endTime)}
                        {apt.reason && ` · ${apt.reason}`}
                      </p>
                    </div>
                    <Badge variant={getStatusBadgeVariant(apt.status)}>
                      {apt.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Medical Records</CardTitle>
            </CardHeader>
            {patient.medicalRecords.length === 0 ? (
              <p className="text-sm text-slate-500">No medical records yet.</p>
            ) : (
              <div className="space-y-3">
                {patient.medicalRecords.map((record) => (
                  <div
                    key={record.id}
                    className="rounded-lg border border-slate-100 p-3"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-slate-900">
                        {record.diagnosis}
                      </p>
                      <span className="text-xs text-slate-400">
                        {formatDate(record.recordedAt)}
                      </span>
                    </div>
                    {record.symptoms && (
                      <p className="mt-1 text-sm text-slate-600">
                        Symptoms: {record.symptoms}
                      </p>
                    )}
                    {record.prescription && (
                      <p className="mt-1 text-sm text-slate-600">
                        Rx: {record.prescription}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
