import CompanyPlanCard from "../../components/company-admin/dashboard/CompanyPlanCard";
import CompanyAdminMetrics from "../../components/company-admin/dashboard/CompanyAdminMetrics";
import MachineStatusOverview from "../../components/company-admin/dashboard/MachineStatusOverview";
import AlertSummaryChart from "../../components/company-admin/dashboard/AlertSummaryChart";
import MaintenanceDueCard from "../../components/company-admin/dashboard/MaintenanceDueCard";
import CompanyRecentActivity from "../../components/company-admin/dashboard/CompanyRecentActivity";

export default function CompanyAdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Company Admin Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
          Manage company machines, operators, mechanics, alerts and maintenance.
        </p>
      </div>

      <CompanyPlanCard />

      <CompanyAdminMetrics />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <MachineStatusOverview />
        <AlertSummaryChart />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <MaintenanceDueCard />
        <CompanyRecentActivity />
      </div>
    </div>
  );
}