import Link from "next/link";
import { Stethoscope } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-600 text-white">
                <Stethoscope className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold text-white">
                Dr. Abdullah Meky
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed">
              Providing compassionate, patient-centered healthcare with modern
              medical expertise and personalized attention.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/book" className="hover:text-teal-400">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-teal-400">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-teal-400">
                  Staff Portal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white">Contact</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Mon – Fri: 9:00 AM – 5:00 PM</li>
              <li>Sat: 9:00 AM – 1:00 PM</li>
              <li>Phone: +966 50 000 0000</li>
              <li>Email: info@drmeky-clinic.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm">
          © {new Date().getFullYear()} Dr. Abdullah Meky Clinic. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
