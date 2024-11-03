import { Row } from "antd";
import { ReactNode } from "react";

function LandingField({ children }: { children: ReactNode }) {
  return (
    <Row
      style={{
        height: "85vh",
        backgroundImage: "url(/landingImg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      align={"bottom"}
    >
      {children}
    </Row>
  );
}
export default LandingField;
