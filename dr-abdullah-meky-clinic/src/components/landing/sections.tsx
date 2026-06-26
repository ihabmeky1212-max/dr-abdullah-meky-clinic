"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Heart,
  Shield,
  Stethoscope,
  Users,
  Clock,
} from "lucide-react";

const services = [
  {
    icon: Stethoscope,
    title: "General Consultation",
    description:
      "Comprehensive health assessments and personalized treatment plans for all ages.",
  },
  {
    icon: Heart,
    title: "Preventive Care",
    description:
      "Regular check-ups, screenings, and wellness programs to keep you healthy.",
  },
  {
    icon: Shield,
    title: "Chronic Disease Management",
    description:
      "Expert care for diabetes, hypertension, and other long-term conditions.",
  },
  {
    icon: Users,
    title: "Family Medicine",
    description:
      "Complete healthcare solutions for your entire family under one roof.",
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-slate-50">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwZDk0ODgiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggIGQ9Ik0zNiAzNGg2djZoLTZ6bTAtMzBoNnY2aC02eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-4 py-1.5 text-sm font-medium text-teal-700">
              <Clock className="h-4 w-4" />
              Accepting New Patients
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Your Health,{" "}
              <span className="text-teal-600">Our Priority</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Welcome to Dr. Abdullah Meky&apos;s clinic — where compassionate
              care meets medical excellence. Book your appointment today and
              experience healthcare tailored to you.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/book">
                <Button size="lg">
                  <Calendar className="h-5 w-5" />
                  Book Appointment
                </Button>
              </Link>
              <Link href="#services">
                <Button variant="outline" size="lg">
                  Our Services
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-teal-600 to-teal-800 p-8 shadow-2xl">
              <div className="flex h-full flex-col justify-between text-white">
                <div>
                  <p className="text-sm font-medium text-teal-100">
                    Trusted Healthcare
                  </p>
                  <p className="mt-2 text-3xl font-bold">Dr. Abdullah Meky</p>
                  <p className="mt-1 text-teal-100">General Practitioner</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                    <p className="text-2xl font-bold">15+</p>
                    <p className="text-sm text-teal-100">Years Experience</p>
                  </div>
                  <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                    <p className="text-2xl font-bold">5000+</p>
                    <p className="text-sm text-teal-100">Happy Patients</p>
                  </div>
                  <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                    <p className="text-2xl font-bold">24/7</p>
                    <p className="text-sm text-teal-100">Emergency Support</p>
                  </div>
                  <div className="rounded-xl bg-white/10 p-4 backdrop-blur">
                    <p className="text-2xl font-bold">98%</p>
                    <p className="text-sm text-teal-100">Satisfaction Rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="services" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Our Services
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Comprehensive medical services designed to meet all your healthcare
            needs with the highest standards of care.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-teal-200 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-50 text-teal-600 transition-colors group-hover:bg-teal-600 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-slate-900">
              About Dr. Abdullah Meky
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              With over 15 years of experience in general medicine, Dr. Abdullah
              Meky is dedicated to providing personalized, evidence-based
              healthcare. His patient-first approach ensures that every
              individual receives the attention and care they deserve.
            </p>
            <p className="mt-4 leading-relaxed text-slate-600">
              Our clinic combines modern medical technology with a warm,
              welcoming environment to make your healthcare experience as
              comfortable as possible.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Board-certified general practitioner",
                "Member of the Saudi Medical Association",
                "Multilingual staff (Arabic & English)",
                "State-of-the-art diagnostic equipment",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-slate-700">
                  <div className="h-1.5 w-1.5 rounded-full bg-teal-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Consultations", value: "10,000+" },
              { label: "Success Rate", value: "98%" },
              { label: "Staff Members", value: "12" },
              { label: "Awards", value: "5" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm"
              >
                <p className="text-3xl font-bold text-teal-600">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-teal-600 to-teal-700 px-8 py-12 text-center text-white shadow-xl sm:px-16">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to Take Care of Your Health?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-teal-100">
            Schedule your appointment today. Our team is ready to provide you
            with exceptional healthcare services.
          </p>
          <div className="mt-8">
            <Link href="/book">
              <Button
                size="lg"
                className="bg-white text-teal-700 hover:bg-teal-50"
              >
                <Calendar className="h-5 w-5" />
                Book Your Appointment Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
