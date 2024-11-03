import Title from "antd/es/typography/Title";
import { CSSProperties } from "react";
type TextProps = {
  type: "title" | "paragraph";
  margin?: string;
  level?: 1 | 2 | 3 | 4 | 5;
  bold?: boolean;
  children: React.ReactNode;
  style?: CSSProperties;
  fontSize?: number;
};
function CustomText({
  type,
  margin = "0px",
  level,
  bold = false,
  children,
  style,
  fontSize,
}: TextProps) {
  let options: CSSProperties = {};
  if (type === "paragraph") {
    options.fontSize = "18px";
    options.fontWeight = "300";
    if (bold) options.fontWeight = "600";
  }

  return (
    <Title
      level={level}
      style={{
        ...options,
        fontSize: fontSize ? `${fontSize}px` : undefined,
        margin: margin,
        ...style,
      }}
    >
      {children}
    </Title>
  );
}

export default CustomText;
