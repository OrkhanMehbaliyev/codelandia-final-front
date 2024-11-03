import { Flex, Space } from "antd";
import Title from "antd/es/typography/Title";
import { useGetTotalCountsQuery } from "../../api/apiSlice";
import LoadingSpinner from "../../../ui/LoadingSpinner";
const styles = { totalCountTitle: { fontWeight: 300 } };
function TotalCountContainer() {
  const { data: totalCounts, error, isLoading } = useGetTotalCountsQuery();
  if (error) return <div>Some error occurred.</div>;
  if (isLoading) return <LoadingSpinner />;
  return (
    <Flex vertical>
      <Flex justify="space-around">
        <Space direction="vertical" align="center" size={"small"}>
          <Title style={styles.totalCountTitle} level={3}>
            Products
          </Title>
          <Title level={3}>{totalCounts?.data.products}</Title>
        </Space>
        <Space direction="vertical" align="center">
          <Title style={styles.totalCountTitle} level={3}>
            Orders
          </Title>
          <Title level={3}>{totalCounts?.data.orders}</Title>
        </Space>
        <Space direction="vertical" align="center">
          <Title style={styles.totalCountTitle} level={3}>
            Users
          </Title>
          <Title level={3}>{totalCounts?.data.users}</Title>
        </Space>
      </Flex>
    </Flex>
  );
}

export default TotalCountContainer;
