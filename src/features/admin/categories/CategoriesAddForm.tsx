import { Form, Input, message, UploadFile } from "antd";
import { useCreateCategoryMutation } from "../../api/apiSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryFormTypes } from "../../../types/category";
import UploadPicture from "../../../ui/UploadPicture";
import CustomButton from "../../../ui/CustomButton";
const styles = { Form: { width: "500px" } };
function CategoriesAddForm() {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<UploadFile<any> | null>(null);
  const [createCategory] = useCreateCategoryMutation();
  const navigate = useNavigate();

  const handleFileChange = (file: UploadFile<any>) => {
    const fileObj = file;
    if (fileObj) setFile(fileObj);
  };
  const handleSubmit = async (values: CategoryFormTypes) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("image", file as unknown as File);

    try {
      const response = await createCategory(formData).unwrap();

      if (response) {
        message.success("Category created successfully!");
        navigate(-1);
      }
    } catch (error: any) {
      message.error(error.data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      onFinish={handleSubmit}
      layout="vertical"
      style={styles.Form}
      form={form}
    >
      <Form.Item
        required
        rules={[{ required: true, message: "Please input the category name." }]}
        label="Name"
        name={"name"}
      >
        <Input size="large" placeholder="Text"></Input>
      </Form.Item>
      <Form.Item required label="Image" name={"image"}>
        <UploadPicture
          isSubmitting={isSubmitting}
          handleFileChange={handleFileChange}
        />
      </Form.Item>
      <Form.Item>
        <CustomButton disabled={isSubmitting} type="primary" htmlType="submit">
          Submit
        </CustomButton>
      </Form.Item>
    </Form>
  );
}

export default CategoriesAddForm;
