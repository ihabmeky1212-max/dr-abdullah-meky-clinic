export type DashboardStats = {
  totalPatients: number;
  todayAppointments: number;
  pendingAppointments: number;
  completedThisMonth: number;
};

export type NavItem = {
  label: string;
  href: string;
  icon: string;
};
