import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Cart from "../features/app/cart/Cart";

function AppLayout() {
  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: "var(--color-background)",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      <Navbar />
      <Content style={{ position: "relative" }}>
        <Outlet />
        <Cart />
      </Content>
    </Layout>
  );
}

export default AppLayout;
