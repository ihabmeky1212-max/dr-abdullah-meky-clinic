import { getDashboardStats } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, getStatusBadgeVariant } from "@/components/ui/badge";
import { formatDate, formatTime } from "@/lib/utils";
import { Users, Calendar, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const upcomingAppointments = await prisma.appointment.findMany({
    where: {
      date: { gte: today, lt: tomorrow },
      status: { in: ["SCHEDULED", "CONFIRMED"] },
    },
    include: { patient: true },
    orderBy: { startTime: "asc" },
    take: 5,
  });

  const recentPatients = await prisma.patient.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Dashboard
        </h1>
        <p className="mt-1 text-slate-500">
          Welcome back. Here&apos;s an overview of your clinic today.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Patients"
          value={stats.totalPatients}
          icon={<Users className="h-6 w-6" />}
        />
        <StatCard
          title="Today's Appointments"
          value={stats.todayAppointments}
          icon={<Calendar className="h-6 w-6" />}
        />
        <StatCard
          title="Pending Appointments"
          value={stats.pendingAppointments}
          icon={<Clock className="h-6 w-6" />}
        />
        <StatCard
          title="Completed This Month"
          value={stats.completedThisMonth}
          icon={<CheckCircle className="h-6 w-6" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Today&apos;s Appointments</CardTitle>
              <Link
                href="/dashboard/appointments"
                className="text-sm font-medium text-teal-600 hover:underline"
              >
                View all
              </Link>
            </div>
          </CardHeader>

          {upcomingAppointments.length === 0 ? (
            <p className="text-sm text-slate-500">No appointments scheduled for today.</p>
          ) : (
            <div className="space-y-3">
              {upcomingAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-center justify-between rounded-lg border border-slate-100 p-3"
                >
                  <div>
                    <p className="font-medium text-slate-900">
                      {apt.patient.firstName} {apt.patient.lastName}
                    </p>
                    <p className="text-sm text-slate-500">
                      {formatTime(apt.startTime)} – {formatTime(apt.endTime)}
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
            <div className="flex items-center justify-between">
              <CardTitle>Recent Patients</CardTitle>
              <Link
                href="/dashboard/patients"
                className="text-sm font-medium text-teal-600 hover:underline"
              >
                View all
              </Link>
            </div>
          </CardHeader>

          {recentPatients.length === 0 ? (
            <p className="text-sm text-slate-500">No patients registered yet.</p>
          ) : (
            <div className="space-y-3">
              {recentPatients.map((patient) => (
                <Link
                  key={patient.id}
                  href={`/dashboard/patients/${patient.id}`}
                  className="flex items-center justify-between rounded-lg border border-slate-100 p-3 transition-colors hover:bg-slate-50"
                >
                  <div>
                    <p className="font-medium text-slate-900">
                      {patient.firstName} {patient.lastName}
                    </p>
                    <p className="text-sm text-slate-500">{patient.phone}</p>
                  </div>
                  <span className="text-xs text-slate-400">
                    {formatDate(patient.createdAt)}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
