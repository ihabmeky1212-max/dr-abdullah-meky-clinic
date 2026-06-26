import { prisma } from "@/lib/prisma";
import { RecordForm } from "@/components/dashboard/record-form";

export default async function NewRecordPage() {
  const patients = await prisma.patient.findMany({
    select: { id: true, firstName: true, lastName: true },
    orderBy: { lastName: "asc" },
  });

  return <RecordForm patients={patients} />;
}
