import BusinessDashboard from './BusinessDashboard';
import SystemDashboard from './SystemDashboard';

function DashboardPage() {
  return (
    <div className="pb-10">
      <div className="mb-10 px-5">
        <SystemDashboard />
      </div>
      <div className="mt-5 px-5">
        <BusinessDashboard />
      </div>
    </div>
  );
}

export default DashboardPage;
