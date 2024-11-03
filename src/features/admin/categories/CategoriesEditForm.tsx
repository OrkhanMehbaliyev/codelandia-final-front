import { Form, FormProps, Input, message, UploadFile } from "antd";
import CustomButton from "../../../ui/CustomButton";
import UploadPicture from "../../../ui/UploadPicture";
import { CategoryFormTypes } from "../../../types/category";
import { useParams } from "react-router-dom";
import {
  useGetOneCategoryQuery,
  useUpdateCategoryMutation,
} from "../../api/apiSlice";
import { useState } from "react";
const styles = { Form: { width: "500px" } };
function CategoriesEditForm() {
  const [form] = Form.useForm();
  const [file, setFile] = useState<UploadFile<any> | null>(null);
  const { id } = useParams();
  const [updateCategory] = useUpdateCategoryMutation();

  const {
    data: oldCategoryData,
    error: oldCategoryError,
    isLoading: oldCategoryIsLoading,
  } = useGetOneCategoryQuery(id);

  const onFinishFailed: FormProps<CategoryFormTypes>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  if (oldCategoryIsLoading) {
    return <div>Loading...</div>;
  }
  if (oldCategoryError) {
    return <div>Error</div>;
  }
  if (!oldCategoryData || !oldCategoryData.data)
    return <div>Old data does not exist.</div>;
  const handleFileChange = (file: UploadFile<any>) => {
    const fileObj = file;
    if (fileObj) setFile(fileObj);
  };
  const handleSubmit = async (values: CategoryFormTypes) => {
    const formData = new FormData();
    formData.append("name", values.name);
    if (file) formData.append("image", file as unknown as File);

    try {
      const response = await updateCategory({ id, formData }).unwrap();

      if (response) {
        message.success("Category updated successfully!");
      }
    } catch (error) {
      message.error("Error updating category.");
    }
  };
  return (
    <Form
      onFinish={handleSubmit}
      onFinishFailed={onFinishFailed}
      layout="vertical"
      style={styles.Form}
      form={form}
    >
      <Form.Item
        required
        rules={[{ required: true, message: "Please input the category name." }]}
        initialValue={oldCategoryData.data.name}
        label="Name"
        name={"name"}
      >
        <Input
          size="large"
          defaultValue={oldCategoryData.data.name}
          placeholder="Text"
        ></Input>
      </Form.Item>
      <Form.Item required label="Image" name={"image"}>
        <UploadPicture handleFileChange={handleFileChange} />
      </Form.Item>
      <Form.Item>
        <CustomButton type="primary" htmlType="submit">
          Submit
        </CustomButton>
      </Form.Item>
    </Form>
  );
}

export default CategoriesEditForm;
