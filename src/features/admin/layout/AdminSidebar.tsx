import { Divider, Menu, Space } from "antd";
import Sider from "antd/es/layout/Sider";
import Title from "antd/es/typography/Title";
import CustomButton from "../../../ui/CustomButton";
import { Link } from "react-router-dom";
import useLogout from "../../../hooks/useLogout";
type SidebarProps = {
  selectedMenuItem: string;
};
const items = [
  {
    key: "dashboard",
    label: <Link to="/admin/dashboard">Dashboard</Link>,
  },
  { key: "products", label: <Link to="/admin/products">Products</Link> },
  { key: "categories", label: <Link to="/admin/categories">Categories</Link> },
  { key: "users", label: <Link to="/admin/users">Users</Link> },
  { key: "orders", label: <Link to="/admin/orders">Orders</Link> },
];
const styles = {
  sidebar: { background: "#101010", padding: "2px" },
  box: { margin: "20px" },
  menu: { background: "" },
};
function AdminSidebar({ selectedMenuItem }: SidebarProps) {
  const handleLogout = useLogout();
  return (
    <Sider width="20%" style={styles.sidebar}>
      <Space style={styles.box} direction="vertical">
        <Title level={3}>Welcome, Admin</Title>
        <CustomButton type="primary" onClick={handleLogout}>
          Log out
        </CustomButton>
        <Link to={"/"}>
          <CustomButton type="secondary">Go to main shop</CustomButton>
        </Link>
      </Space>
      <Divider />
      <Menu
        style={styles.menu}
        defaultSelectedKeys={[`${selectedMenuItem}`]}
        items={items}
      ></Menu>
    </Sider>
  );
}

export default AdminSidebar;
