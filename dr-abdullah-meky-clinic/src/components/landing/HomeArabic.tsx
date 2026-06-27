"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  Phone,
  Clock,
  Brain,
} from "lucide-react";

export default function HomeArabic() {
  return (
    <main dir="rtl" className="bg-white text-slate-900">

      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-50 to-white py-20">
        <div className="mx-auto max-w-7xl px-6">

          <div className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-4 py-2 text-teal-700">
            <Clock className="h-4 w-4" />
            نستقبل المرضى يومياً
          </div>

          <h1 className="mt-8 text-5xl font-bold leading-tight">
            عيادة
            <span className="text-teal-600">
              {" "}أ.د. عبدالله مكي
            </span>
          </h1>

          <p className="mt-6 text-2xl font-semibold">
            استشاري الطب النفسي والمخ والأعصاب وعلاج الإدمان
          </p>

          <p className="mt-3 text-lg text-gray-600">
            أستاذ بكلية طب الأزهر الشريف
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link href="/book">
              <Button size="lg">
                <Calendar className="mr-2 h-5 w-5" />
                احجز موعد
              </Button>
            </Link>

            <a href="https://wa.me/201021380900">
              <Button variant="outline" size="lg">
                واتساب
              </Button>
            </a>

          </div>

        </div>
      </section>

      {/* About */}
      <section className="py-20">

        <div className="mx-auto max-w-7xl px-6">

          <h2 className="mb-8 text-4xl font-bold">
            نبذة عن الدكتور
          </h2>

          <div className="rounded-2xl bg-slate-50 p-8">

            <div className="flex items-center gap-3">
              <Brain className="text-teal-600" />
              <h3 className="text-2xl font-semibold">
                أ.د. عبدالله أحمد عبدالله مكي
              </h3>
            </div>

            <p className="mt-6 leading-9 text-lg">
              استشاري الطب النفسي والمخ والأعصاب وعلاج الإدمان،
              وأستاذ بكلية طب الأزهر الشريف، ويقدم خدمات التشخيص
              والعلاج والاستشارات النفسية والعصبية بأحدث الأساليب
              الطبية مع الحفاظ على خصوصية وراحة المريض.
            </p>

          </div>

        </div>

      </section>
            {/* الخدمات */}

      <section className="bg-slate-50 py-20">

        <div className="mx-auto max-w-7xl px-6">

          <h2 className="mb-10 text-center text-4xl font-bold">
            الخدمات
          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            <div className="rounded-2xl border bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-semibold">
                الكشف النفسي
              </h3>

              <p className="mt-4 text-gray-600 leading-8">
                تشخيص وعلاج جميع الاضطرابات النفسية
                للبالغين والمراهقين.
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-semibold">
                علاج الإدمان
              </h3>

              <p className="mt-4 text-gray-600 leading-8">
                برامج علاج الإدمان والمتابعة
                وإعادة التأهيل.
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-semibold">
                أمراض المخ والأعصاب
              </h3>

              <p className="mt-4 text-gray-600 leading-8">
                تشخيص وعلاج الأمراض العصبية
                واضطرابات الجهاز العصبي.
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-semibold">
                الاستشارات الطبية
              </h3>

              <p className="mt-4 text-gray-600 leading-8">
                استشارات متخصصة ومتابعة
                للحالات المختلفة.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* معلومات العيادة */}

      <section className="py-20">

        <div className="mx-auto max-w-5xl rounded-3xl bg-teal-600 p-10 text-white">

          <h2 className="text-center text-4xl font-bold">
            معلومات العيادة
          </h2>

          <div className="mt-10 grid gap-8 md:grid-cols-2">

            <div className="flex gap-3">
              <MapPin />
              <div>
                <h3 className="font-bold">
                  العنوان
                </h3>

                <p>
                  شبرا الخيمة
                </p>

                <p>
                  شارع 15 مايو
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Clock />
              <div>
                <h3 className="font-bold">
                  المواعيد
                </h3>

                <p>
                  من السبت إلى الخميس
                </p>

                <p>
                  من الساعة 2 ظهراً حتى 11 مساءً
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Phone />
              <div>

                <h3 className="font-bold">
                  الهاتف
                </h3>

                <p>01277654222</p>

                <p>01021380900</p>

              </div>
            </div>

            <div className="flex gap-3">
              <Phone />
              <div>

                <h3 className="font-bold">
                  واتساب
                </h3>

                <a
                  className="underline"
                  href="https://wa.me/201021380900"
                >
                  01021380900
                </a>

              </div>
            </div>

          </div>

        </div>

      </section>
            {/* الحجز */}

      <section className="bg-slate-100 py-20">

        <div className="mx-auto max-w-5xl text-center">

          <h2 className="text-4xl font-bold">
            احجز موعدك الآن
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            يمكنك الحجز بسهولة من خلال الموقع أو التواصل معنا عبر الهاتف أو الواتساب.
          </p>

          <div className="mt-10 flex justify-center gap-4">

            <Link href="/book">
              <Button size="lg">
                <Calendar className="mr-2 h-5 w-5" />
                احجز الآن
              </Button>
            </Link>

            <a href="https://wa.me/201021380900">
              <Button variant="outline" size="lg">
                واتساب
              </Button>
            </a>

          </div>

        </div>

      </section>

    </main>
  );
}