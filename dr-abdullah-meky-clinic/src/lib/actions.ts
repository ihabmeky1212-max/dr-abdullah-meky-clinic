"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  patientSchema,
  appointmentSchema,
  scheduleSchema,
  medicalRecordSchema,
} from "@/lib/validations";

export async function getDashboardStats() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const [totalPatients, todayAppointments, pendingAppointments, completedThisMonth] =
    await Promise.all([
      prisma.patient.count(),
      prisma.appointment.count({
        where: { date: { gte: today, lt: tomorrow } },
      }),
      prisma.appointment.count({
        where: { status: { in: ["SCHEDULED", "CONFIRMED"] } },
      }),
      prisma.appointment.count({
        where: {
          status: "COMPLETED",
          date: { gte: startOfMonth },
        },
      }),
    ]);

  return {
    totalPatients,
    todayAppointments,
    pendingAppointments,
    completedThisMonth,
  };
}

export async function createPatient(data: FormData) {
  const parsed = patientSchema.safeParse({
    firstName: data.get("firstName"),
    lastName: data.get("lastName"),
    email: data.get("email") || "",
    phone: data.get("phone"),
    dateOfBirth: data.get("dateOfBirth"),
    gender: data.get("gender"),
    address: data.get("address") || undefined,
    bloodType: data.get("bloodType") || undefined,
    allergies: data.get("allergies") || undefined,
    emergencyContact: data.get("emergencyContact") || undefined,
    notes: data.get("notes") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    const patient = await prisma.patient.create({
      data: {
        ...parsed.data,
        dateOfBirth: new Date(parsed.data.dateOfBirth),
        email: parsed.data.email || null,
      },
    });
    revalidatePath("/dashboard/patients");
    return { success: true, patient };
  } catch {
    return { error: "Failed to create patient" };
  }
}

export async function updatePatient(id: string, data: FormData) {
  const parsed = patientSchema.safeParse({
    firstName: data.get("firstName"),
    lastName: data.get("lastName"),
    email: data.get("email") || "",
    phone: data.get("phone"),
    dateOfBirth: data.get("dateOfBirth"),
    gender: data.get("gender"),
    address: data.get("address") || undefined,
    bloodType: data.get("bloodType") || undefined,
    allergies: data.get("allergies") || undefined,
    emergencyContact: data.get("emergencyContact") || undefined,
    notes: data.get("notes") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    const patient = await prisma.patient.update({
      where: { id },
      data: {
        ...parsed.data,
        dateOfBirth: new Date(parsed.data.dateOfBirth),
        email: parsed.data.email || null,
      },
    });
    revalidatePath("/dashboard/patients");
    revalidatePath(`/dashboard/patients/${id}`);
    return { success: true, patient };
  } catch {
    return { error: "Failed to update patient" };
  }
}

export async function deletePatient(id: string) {
  try {
    await prisma.patient.delete({ where: { id } });
    revalidatePath("/dashboard/patients");
    return { success: true };
  } catch {
    return { error: "Failed to delete patient" };
  }
}

export async function createAppointment(data: FormData) {
  const parsed = appointmentSchema.safeParse({
    patientId: data.get("patientId"),
    date: data.get("date"),
    startTime: data.get("startTime"),
    endTime: data.get("endTime"),
    reason: data.get("reason") || undefined,
    notes: data.get("notes") || undefined,
    status: data.get("status") || "SCHEDULED",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    const appointment = await prisma.appointment.create({
      data: {
        ...parsed.data,
        date: new Date(parsed.data.date),
      },
    });
    revalidatePath("/dashboard/appointments");
    revalidatePath("/dashboard");
    return { success: true, appointment };
  } catch {
    return { error: "Failed to create appointment" };
  }
}

export async function updateAppointmentStatus(id: string, status: string) {
  try {
    await prisma.appointment.update({
      where: { id },
      data: { status: status as "SCHEDULED" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "NO_SHOW" },
    });
    revalidatePath("/dashboard/appointments");
    revalidatePath("/dashboard");
    return { success: true };
  } catch {
    return { error: "Failed to update appointment" };
  }
}

export async function createSchedule(data: FormData) {
  const parsed = scheduleSchema.safeParse({
    dayOfWeek: data.get("dayOfWeek"),
    startTime: data.get("startTime"),
    endTime: data.get("endTime"),
    isActive: data.get("isActive") === "true",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    const schedule = await prisma.doctorSchedule.create({ data: parsed.data });
    revalidatePath("/dashboard/schedule");
    return { success: true, schedule };
  } catch {
    return { error: "Failed to create schedule slot" };
  }
}

export async function deleteSchedule(id: string) {
  try {
    await prisma.doctorSchedule.delete({ where: { id } });
    revalidatePath("/dashboard/schedule");
    return { success: true };
  } catch {
    return { error: "Failed to delete schedule slot" };
  }
}

export async function createMedicalRecord(data: FormData) {
  const parsed = medicalRecordSchema.safeParse({
    patientId: data.get("patientId"),
    appointmentId: data.get("appointmentId") || "",
    diagnosis: data.get("diagnosis"),
    symptoms: data.get("symptoms") || undefined,
    prescription: data.get("prescription") || undefined,
    vitalSigns: data.get("vitalSigns") || undefined,
    notes: data.get("notes") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    const record = await prisma.medicalRecord.create({
      data: {
        ...parsed.data,
        appointmentId: parsed.data.appointmentId || null,
      },
    });
    revalidatePath("/dashboard/records");
    return { success: true, record };
  } catch {
    return { error: "Failed to create medical record" };
  }
}

export async function bookPublicAppointment(data: FormData) {
  const firstName = data.get("firstName") as string;
  const lastName = data.get("lastName") as string;
  const phone = data.get("phone") as string;
  const email = (data.get("email") as string) || "";
  const dateOfBirth = data.get("dateOfBirth") as string;
  const gender = data.get("gender") as "MALE" | "FEMALE" | "OTHER";
  const date = data.get("date") as string;
  const startTime = data.get("startTime") as string;
  const reason = (data.get("reason") as string) || "";

  if (!firstName || !lastName || !phone || !dateOfBirth || !date || !startTime) {
    return { error: "Please fill in all required fields" };
  }

  try {

    const patient = await prisma.patient.create({
  data: {
    firstName,
    lastName,
    phone,
    email,
    dateOfBirth: new Date(dateOfBirth),
    gender,
  },
});

const endTime = startTime;
  await prisma.appointment.create({
    data: {
      patientId: patient.id,
      date: new Date(date),
      startTime,
      endTime,
      reason,
      status: "SCHEDULED",
    },
  });

  revalidatePath("/dashboard/appointments");
  return { success: true };

} catch (error) {
  console.error(error);

  return {
    error: "Failed to book appointment. Please try again.",
  };
}
}