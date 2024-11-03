import { Flex, Form, message, Rate, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";
import CustomButton from "../../../ui/CustomButton";
import { useSelector } from "react-redux";
import { useAddReviewToProductMutation } from "../../api/apiSlice";
import { RootState } from "../../../store";
import { AddReviewForm } from "../../../types/review";
type Props = { product_id: string };
function AddReview({ product_id }: Props) {
  const { user_id } = useSelector((state: RootState) => state.user);
  const [addReview] = useAddReviewToProductMutation();
  const handleSubmit = async (values: AddReviewForm) => {
    const formData = { ...values, user_id, product_id };
    try {
      await addReview(formData).unwrap();

      message.success("Review added successfully.");
    } catch (err: any) {
      message.error(err.data);
    }
  };
  return (
    <Space size={"small"} direction="vertical">
      <Title style={{ margin: "0px" }} level={3}>
        Add review
      </Title>

      <Form onFinish={handleSubmit}>
        <Flex
          gap={5}
          vertical
          align="end"
          justify="center"
          style={{ width: "100%" }}
        >
          <Form.Item
            rules={[{ required: true, message: "Please input the comment." }]}
            name="comment"
            style={{ width: "100%", margin: "0px" }}
          >
            <TextArea
              autoSize={{ minRows: 3 }}
              style={{
                background: "var(--color-background)",
                color: "white",
                fontSize: "16px",
              }}
              allowClear
              placeholder="Your comment..."
            ></TextArea>
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Please rate the product." }]}
            name={"rating"}
            style={{ width: "100%", margin: "0px" }}
          >
            <Rate style={{ alignSelf: "start" }} />
          </Form.Item>
          <CustomButton
            htmlType="submit"
            style={{ width: "200px" }}
            type="primary"
          >
            Submit
          </CustomButton>
        </Flex>
      </Form>
    </Space>
  );
}

export default AddReview;
