import SuperAdminMetrics from "../../components/super-admin/dashboard/SuperAdminMetrics.tsx";
import AdminManagementTable from "../../components/super-admin/dashboard/AdminManagementTable.tsx";
import PlanDistribution from "../../components/super-admin/dashboard/PlanDistribution.tsx";
import RecentActivity from "../../components/super-admin/dashboard/RecentActivity.tsx";
import OperatorsMechanicsChart from "../../components/super-admin/dashboard/OperatorsMechanicsChart.tsx";
import MachineStatusOverview from "../../components/super-admin/dashboard/MachineStatusOverview.tsx";
import AlertSummaryChart from "../../components/super-admin/dashboard/AlertSummaryChart.tsx.tsx";
import RoleDetailsPage from "../../components/super-admin/dashboard/RoleDetails.tsx";

export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          👑 Super Admin Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Welcome back, Super Admin! Here&apos;s what&apos;s happening today.
        </p>
      </div>

      <SuperAdminMetrics />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <AdminManagementTable />
        </div>

        <div className="space-y-6">
          <PlanDistribution />
          <RecentActivity />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <OperatorsMechanicsChart />
        <MachineStatusOverview />
        <AlertSummaryChart />

      </div>
      <div>
        <RoleDetailsPage />
      </div>
    </div>
  );
}