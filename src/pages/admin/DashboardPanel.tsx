import { Flex } from "antd";
import AdminPageHeader from "../../ui/AdminPageHeader";
import TotalCountContainer from "../../features/admin/dashboard/TotalCountContainer";
import PieChartContainer from "../../features/admin/dashboard/PieChartContainer";

function DashboardPanel() {
  return (
    <>
      <AdminPageHeader>Dashboard</AdminPageHeader>
      <Flex vertical gap={60} style={{ marginTop: "50px" }}>
        <TotalCountContainer />
        <PieChartContainer />
      </Flex>
    </>
  );
}

export default DashboardPanel;
