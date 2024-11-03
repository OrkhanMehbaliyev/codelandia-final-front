import { Button, ConfigProvider } from "antd";
import { MouseEventHandler } from "react";
import { Link, useNavigate } from "react-router-dom";
type CustomButtonProps = {
  type: "secondary" | "primary" | "back" | "add";
  style?: React.CSSProperties;
  children: React.ReactNode;
  onClick?: MouseEventHandler;
  htmlType?: "button" | "reset" | "submit";
  disabled?: boolean;
};
const styleObj = {
  primary: {},
  secondary: { border: "0px" },
  back: {
    position: "absolute",
    top: "0px",
    left: "0px",
    margin: "20px",
  },
  add: {},
};
function CustomButton({
  type,
  style,
  children,
  onClick,
  htmlType,
  disabled = false,
}: CustomButtonProps) {
  let handleClick = onClick ? onClick : undefined;
  const navigate = useNavigate();
  if (type === "back") {
    handleClick = () => navigate(-1);
  }
  const combinedStyle = style
    ? { ...styleObj[type], ...style }
    : styleObj[type];
  const designToken =
    type === "secondary"
      ? {
          defaultColor: "white",
          defaultBg: "var(--color-secondary)",
          defaultHoverBg: "var(--color-primary)",
          defaultHoverColor: "white",
        }
      : {};
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: designToken,
        },
      }}
    >
      {type === "add" ? (
        <Link to="add">
          <Button
            disabled={disabled}
            htmlType={htmlType}
            onClick={handleClick}
            style={combinedStyle}
            type={"default"}
          >
            {children}
          </Button>
        </Link>
      ) : (
        <Button
          disabled={disabled}
          htmlType={htmlType}
          onClick={handleClick}
          style={combinedStyle}
          type={"default"}
        >
          {children}
        </Button>
      )}
    </ConfigProvider>
  );
}

export default CustomButton;
