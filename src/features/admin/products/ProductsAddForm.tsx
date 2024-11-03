import { Form, FormProps, Input, message, Select, UploadFile } from "antd";
import { useState } from "react";
import {
  useCreateProductMutation,
  useGetCategoriesQuery,
} from "../../api/apiSlice";
import { useNavigate } from "react-router-dom";
import { convertCategoriesToOptions } from "../../../utils/helpers";
import { ProductFormTypes } from "../../../types/product";
import UploadPicture from "../../../ui/UploadPicture";
import CustomButton from "../../../ui/CustomButton";
import { StylesType } from "../../../types/style";
const styles: StylesType = {
  form: { width: "500px" },
};
function ProductsAddForm() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [file, setFile] = useState<UploadFile<any> | null>(null);
  const [createProduct] = useCreateProductMutation();
  const [form] = Form.useForm();
  const handleFileChange = (file: UploadFile<any>) => {
    const fileObj = file;
    if (fileObj) setFile(fileObj);
  };
  const navigate = useNavigate();
  const {
    data: categoryData,
    error: categoryError,
    isLoading: categoryIsLoading,
  } = useGetCategoriesQuery();
  if (categoryIsLoading) {
    return <div>Loading...</div>;
  }
  if (categoryError) {
    return <div>Error.</div>;
  }
  if (!categoryData || !categoryData.data)
    return (
      <div>
        There is no category. Add some categories before adding products.
      </div>
    );
  const categoriesArray = categoryData.data;
  const optionsArray = convertCategoriesToOptions(categoriesArray);
  const handleSubmit = async (values: ProductFormTypes) => {
    setIsSubmitting(true);
    const formData = new FormData();
    let category_id;
    if (categoryData && categoryData.data && values) {
      category_id = categoryData.data.find(
        (el) => el.name === values?.category_id
      )?.category_id;
    }
    formData.append("name", values?.name as string);
    formData.append("short_description", values?.short_description as string);
    formData.append("description", values?.long_description as string);
    formData.append("price", values?.price as unknown as string);
    formData.append("category_id", category_id as unknown as string);
    if (file) {
      formData.append("image", file as unknown as File);
    }
    try {
      const response = await createProduct(formData).unwrap();
      message.success("Product created successfully!");
      navigate(-1);
    } catch (error) {
      message.error("Error creating product.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const onFinishFailed: FormProps<ProductFormTypes>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      onFinish={handleSubmit}
      onFinishFailed={onFinishFailed}
      layout="vertical"
      style={styles.form}
      form={form}
    >
      <Form.Item
        required
        rules={[{ required: true, message: "Please input the product name." }]}
        label="Name"
        name={"name"}
      >
        <Input size="large" placeholder="Text"></Input>
      </Form.Item>
      <Form.Item
        required
        rules={[
          {
            required: true,
            message: "Please input the short product description.",
          },
        ]}
        label="Short description"
        name={"short_description"}
      >
        <Input size="large" placeholder="Text"></Input>
      </Form.Item>
      <Form.Item
        required
        rules={[
          {
            required: true,
            message: "Please input the product description.",
          },
        ]}
        label="Description"
        name={"description"}
      >
        <Input size="large" placeholder="Text"></Input>
      </Form.Item>
      <Form.Item
        required
        rules={[{ required: true, message: "Please input the product price" }]}
        label="Price"
        name={"price"}
      >
        <Input size="large" type="number" placeholder="Text"></Input>
      </Form.Item>
      <Form.Item
        required
        rules={[
          { required: true, message: "Please input the product category" },
        ]}
        label="Category"
        name={"category_id"}
      >
        <Select size="large" options={optionsArray} />
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

export default ProductsAddForm;
