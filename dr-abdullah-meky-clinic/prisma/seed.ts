import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  await prisma.medicalRecord.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.doctorSchedule.deleteMany();
  await prisma.patient.deleteMany();

  const patients = await Promise.all([
    prisma.patient.create({
      data: {
        firstName: "Ahmed",
        lastName: "Al-Rashid",
        email: "ahmed@example.com",
        phone: "+966501234567",
        dateOfBirth: new Date("1985-03-15"),
        gender: "MALE",
        address: "Riyadh, Saudi Arabia",
        bloodType: "O+",
        allergies: "Penicillin",
      },
    }),
    prisma.patient.create({
      data: {
        firstName: "Fatima",
        lastName: "Hassan",
        email: "fatima@example.com",
        phone: "+966509876543",
        dateOfBirth: new Date("1992-07-22"),
        gender: "FEMALE",
        address: "Jeddah, Saudi Arabia",
        bloodType: "A+",
      },
    }),
    prisma.patient.create({
      data: {
        firstName: "Omar",
        lastName: "Khalil",
        phone: "+966551112233",
        dateOfBirth: new Date("1978-11-08"),
        gender: "MALE",
        bloodType: "B+",
        emergencyContact: "+966554445566",
      },
    }),
    prisma.patient.create({
      data: {
        firstName: "Sara",
        lastName: "Mansour",
        email: "sara@example.com",
        phone: "+966556667788",
        dateOfBirth: new Date("2000-01-30"),
        gender: "FEMALE",
        address: "Dammam, Saudi Arabia",
      },
    }),
  ]);

  const scheduleData = [
    { dayOfWeek: 0, startTime: "09:00", endTime: "13:00" },
    { dayOfWeek: 1, startTime: "09:00", endTime: "17:00" },
    { dayOfWeek: 2, startTime: "09:00", endTime: "17:00" },
    { dayOfWeek: 3, startTime: "09:00", endTime: "17:00" },
    { dayOfWeek: 4, startTime: "09:00", endTime: "17:00" },
    { dayOfWeek: 5, startTime: "09:00", endTime: "13:00" },
  ];

  for (const slot of scheduleData) {
    await prisma.doctorSchedule.create({ data: slot });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const appointments = await Promise.all([
    prisma.appointment.create({
      data: {
        patientId: patients[0].id,
        date: today,
        startTime: "09:00",
        endTime: "09:30",
        status: "CONFIRMED",
        reason: "Annual check-up",
      },
    }),
    prisma.appointment.create({
      data: {
        patientId: patients[1].id,
        date: today,
        startTime: "10:00",
        endTime: "10:30",
        status: "SCHEDULED",
        reason: "Follow-up consultation",
      },
    }),
    prisma.appointment.create({
      data: {
        patientId: patients[2].id,
        date: tomorrow,
        startTime: "11:00",
        endTime: "11:30",
        status: "SCHEDULED",
        reason: "Blood pressure monitoring",
      },
    }),
  ]);

  await prisma.medicalRecord.create({
    data: {
      patientId: patients[0].id,
      appointmentId: appointments[0].id,
      diagnosis: "Hypertension - Stage 1",
      symptoms: "Occasional headaches, elevated BP readings",
      prescription: "Amlodipine 5mg once daily",
      vitalSigns: "BP: 145/92, HR: 78, Temp: 36.7°C",
      notes: "Patient advised to reduce sodium intake and exercise regularly.",
    },
  });

  await prisma.medicalRecord.create({
    data: {
      patientId: patients[1].id,
      diagnosis: "Seasonal Allergic Rhinitis",
      symptoms: "Sneezing, nasal congestion, itchy eyes",
      prescription: "Cetirizine 10mg once daily, Fluticasone nasal spray",
      vitalSigns: "BP: 118/76, HR: 72, Temp: 36.5°C",
    },
  });

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
