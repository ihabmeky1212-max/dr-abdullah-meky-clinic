import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { AppointmentForm } from "@/components/dashboard/appointment-form";

export default async function NewAppointmentPage() {
  const patients = await prisma.patient.findMany({
    select: { id: true, firstName: true, lastName: true },
    orderBy: { lastName: "asc" },
  });

  return (
    <Suspense>
      <AppointmentForm patients={patients} />
    </Suspense>
  );
}
