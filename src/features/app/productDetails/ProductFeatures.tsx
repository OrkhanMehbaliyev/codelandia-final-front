import {
  HomeOutlined,
  MoneyCollectOutlined,
  TruckOutlined,
} from "@ant-design/icons";
import { Space } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
type FeaturesProps = {
  feat1: string | null;
  feat2: string | null;
  feat3: string | null;
};
function ProductFeatures({ feat1, feat2, feat3 }: FeaturesProps) {
  return (
    <Space direction="vertical" size="small">
      <Paragraph style={{ fontSize: "20px", fontWeight: "500" }}>
        <HomeOutlined
          style={{ color: "var(--color-primary)", fontSize: "36px" }}
        />{" "}
        {feat1}
      </Paragraph>
      <Paragraph style={{ fontSize: "20px", fontWeight: "500" }}>
        <TruckOutlined
          style={{ color: "var(--color-primary)", fontSize: "36px" }}
        />{" "}
        {feat2}
      </Paragraph>
      <Paragraph style={{ fontSize: "20px", fontWeight: "500" }}>
        <MoneyCollectOutlined
          style={{ color: "var(--color-primary)", fontSize: "36px" }}
        />{" "}
        {feat3}
      </Paragraph>
    </Space>
  );
}

export default ProductFeatures;
