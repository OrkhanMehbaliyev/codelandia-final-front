import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "../features/admin/layout/AdminSidebar";

function AdminLayout() {
  const location = useLocation();
  const selectedMenuItem = location.pathname.split("/").slice(-1)[0];
  return (
    <Layout
      style={{
        height: "100vh",
        background: "var(--color-background)",
      }}
    >
      <AdminSidebar selectedMenuItem={selectedMenuItem} />
      <Layout style={{ background: "var(--color-background)" }}>
        <Header style={{ background: "var(--color-primary)" }}>Header</Header>
        <Content style={{ overflowY: "scroll" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
