import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  trend?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  description,
  icon,
  trend,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200 bg-white p-6 shadow-sm",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
          {description && (
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          )}
          {trend && (
            <p className="mt-2 text-sm font-medium text-teal-600">{trend}</p>
          )}
        </div>
        <div className="rounded-lg bg-teal-50 p-3 text-teal-600">{icon}</div>
      </div>
    </div>
  );
}
