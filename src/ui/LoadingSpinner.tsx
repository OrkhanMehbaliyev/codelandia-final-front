import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

function LoadingSpinner() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "100%",
        background: "var(--color-background)",
      }}
    >
      <Spin
        style={{ minHeight: "100%" }}
        indicator={
          <LoadingOutlined style={{ fontSize: 200, color: "white" }} spin />
        }
      />
    </div>
  );
}

export default LoadingSpinner;
