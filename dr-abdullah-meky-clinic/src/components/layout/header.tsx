import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Stethoscope, Menu, X } from "lucide-react";

interface HeaderProps {
  mobileMenuOpen?: boolean;
  onToggleMenu?: () => void;
}

export function Header({ mobileMenuOpen, onToggleMenu }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-600 text-white">
            <Stethoscope className="h-5 w-5" />
          </div>
          <div>
            <span className="text-lg font-bold text-slate-900">
              Dr. Abdullah Meky
            </span>
            <span className="hidden text-sm text-slate-500 sm:inline">
              {" "}
              · Medical Clinic
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#services"
            className="text-sm font-medium text-slate-600 hover:text-teal-600"
          >
            Services
          </Link>
          <Link
            href="#about"
            className="text-sm font-medium text-slate-600 hover:text-teal-600"
          >
            About
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium text-slate-600 hover:text-teal-600"
          >
            Contact
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login">
            <Button variant="ghost">Staff Login</Button>
          </Link>
          <Link href="/book">
            <Button>Book Appointment</Button>
          </Link>
        </div>

        {onToggleMenu && (
          <button
            onClick={onToggleMenu}
            className="rounded-lg p-2 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-slate-700" />
            ) : (
              <Menu className="h-6 w-6 text-slate-700" />
            )}
          </button>
        )}
      </div>
    </header>
  );
}
