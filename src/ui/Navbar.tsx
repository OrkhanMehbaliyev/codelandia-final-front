import { Button, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import { Link, NavLink } from "react-router-dom";
import CustomButton from "./CustomButton";
import { useSelector } from "react-redux";
import useLogout from "../hooks/useLogout";
import { RootState } from "../store";

function Navbar() {
  const userData = useSelector((state: RootState) => state.user);
  const handleLogout = useLogout();
  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        background: "transparent",
        alignItems: "center",
        padding: "50px",
        paddingTop: "40px",
        paddingBottom: "40px",
      }}
    >
      <Space size="large" style={{ fontSize: "1.1rem" }}>
        <NavLink to="/" style={{ color: "white" }}>
          Home
        </NavLink>
        <NavLink to="/about" style={{ color: "white" }}>
          About
        </NavLink>
        <NavLink to="/products" style={{ color: "white" }}>
          Shop
        </NavLink>
      </Space>
      <Link to="/">
        <Title
          style={{
            color: "white",
            margin: "10px",
            top: "0px",
            left: "690px",
            position: "absolute",
          }}
        >
          <span style={{ color: "var(--color-primary)" }}>AI</span>-Max
        </Title>
      </Link>
      <Space>
        {!userData.username ? (
          <>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          </>
        ) : (
          <>
            {userData.role === "admin" ? (
              <Link to="/admin">
                <CustomButton type="primary">Go to admin panel</CustomButton>
              </Link>
            ) : null}

            <Link to="/wishlist">
              <CustomButton type="secondary">Wishlist</CustomButton>
            </Link>

            <CustomButton type="primary" onClick={handleLogout}>
              Logout
            </CustomButton>
          </>
        )}
      </Space>
    </Header>
  );
}

export default Navbar;
