import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Plus } from "lucide-react";

export default async function RecordsPage() {
  const records = await prisma.medicalRecord.findMany({
    include: { patient: true },
    orderBy: { recordedAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Medical Records
          </h1>
          <p className="mt-1 text-slate-500">
            View and manage patient medical records
          </p>
        </div>
        <Link href="/dashboard/records/new">
          <Button>
            <Plus className="h-4 w-4" />
            New Record
          </Button>
        </Link>
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
                  Diagnosis
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-slate-500">
                  Symptoms
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-slate-500">
                  Prescription
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-slate-500">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {records.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No medical records yet.
                  </td>
                </tr>
              ) : (
                records.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <Link
                        href={`/dashboard/patients/${record.patientId}`}
                        className="font-medium text-teal-600 hover:underline"
                      >
                        {record.patient.firstName} {record.patient.lastName}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-900">
                      {record.diagnosis}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {record.symptoms || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {record.prescription || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {formatDate(record.recordedAt)}
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
