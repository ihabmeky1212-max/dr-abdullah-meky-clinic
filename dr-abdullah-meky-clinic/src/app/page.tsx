import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero, Services, About, CTA } from "@/components/landing/sections";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col" dir="rtl">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <About />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}