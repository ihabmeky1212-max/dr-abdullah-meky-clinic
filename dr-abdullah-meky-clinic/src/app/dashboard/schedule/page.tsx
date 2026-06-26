import { prisma } from "@/lib/prisma";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { DAYS_OF_WEEK, formatTime } from "@/lib/utils";
import { ScheduleForm } from "@/components/dashboard/schedule-form";
import { ScheduleActions } from "@/components/dashboard/schedule-actions";
import { Badge } from "@/components/ui/badge";

export default async function SchedulePage() {
  const schedules = await prisma.doctorSchedule.findMany({
    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
  });

  const grouped = DAYS_OF_WEEK.map((day, index) => ({
    day,
    dayOfWeek: index,
    slots: schedules.filter((s) => s.dayOfWeek === index),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Doctor Schedule
        </h1>
        <p className="mt-1 text-slate-500">
          Manage Dr. Abdullah Meky&apos;s weekly availability
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Add Time Slot</CardTitle>
          </CardHeader>
          <ScheduleForm />
        </Card>

        <div className="space-y-4 lg:col-span-2">
          {grouped.map(({ day, dayOfWeek, slots }) => (
            <Card key={dayOfWeek} padding="sm">
              <div className="flex items-center justify-between px-2 py-1">
                <h3 className="font-semibold text-slate-900">{day}</h3>
                <span className="text-sm text-slate-500">
                  {slots.length} slot{slots.length !== 1 ? "s" : ""}
                </span>
              </div>

              {slots.length === 0 ? (
                <p className="px-2 py-3 text-sm text-slate-400">No slots configured</p>
              ) : (
                <div className="mt-2 space-y-2">
                  {slots.map((slot) => (
                    <div
                      key={slot.id}
                      className="flex items-center justify-between rounded-lg border border-slate-100 px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-slate-900">
                          {formatTime(slot.startTime)} – {formatTime(slot.endTime)}
                        </span>
                        <Badge variant={slot.isActive ? "success" : "default"}>
                          {slot.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <ScheduleActions scheduleId={slot.id} />
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
