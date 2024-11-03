import { Form, FormProps, Input, message, Select, UploadFile } from "antd";
import UploadPicture from "../../../ui/UploadPicture";
import CustomButton from "../../../ui/CustomButton";
import { ProductFormTypes } from "../../../types/product";
import {
  useGetCategoriesQuery,
  useGetOneProductQuery,
  useUpdateProductMutation,
} from "../../api/apiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { convertCategoriesToOptions } from "../../../utils/helpers";
import { StylesType } from "../../../types/style";
const styles: StylesType = {
  form: { width: "500px" },
};
function ProductsEditForm() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [file, setFile] = useState<UploadFile<any> | null>(null);
  const [updateProduct] = useUpdateProductMutation();
  const [form] = Form.useForm();
  const { id } = useParams();
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
  const {
    data: productData,
    error: productError,
    isLoading: productIsLoading,
  } = useGetOneProductQuery(id);
  if (categoryIsLoading || productIsLoading) {
    return <div>Loading...</div>;
  }
  if (categoryError || productError) {
    return <div>Error.</div>;
  }
  if (!productData || !productData.data)
    return <div>Product is not available.</div>;
  if (!categoryData || !categoryData.data)
    return <div>Categories are not available.</div>;
  const oldProduct = productData.data;
  const categoriesArray = categoryData.data;
  const optionsArray = convertCategoriesToOptions(categoriesArray);
  const handleSubmit = async (values: ProductFormTypes) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("name", values?.name as string);
    formData.append("short_description", values?.short_description as string);
    formData.append("long_description", values?.long_description as string);
    formData.append("price", values?.price as unknown as string);
    formData.append("category_id", values?.category_id as unknown as string);
    if (file) {
      formData.append("image", file as unknown as File);
    }
    try {
      const response = await updateProduct({ id, formData }).unwrap();

      if (response) {
        message.success("Product created successfully!");
        navigate(-1);
      }
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
        initialValue={oldProduct.name}
        label="Name"
        name={"name"}
      >
        <Input
          defaultValue={oldProduct.name}
          size="large"
          placeholder="Text"
        ></Input>
      </Form.Item>
      <Form.Item
        required
        rules={[
          {
            required: true,
            message: "Please input the short product description.",
          },
        ]}
        initialValue={oldProduct.short_description}
        label="Short description"
        name={"short_description"}
      >
        <Input
          defaultValue={oldProduct.short_description}
          size="large"
          placeholder="Text"
        ></Input>
      </Form.Item>
      <Form.Item
        required
        rules={[
          {
            required: true,
            message: "Please input the product description.",
          },
        ]}
        initialValue={oldProduct.long_description}
        label="Description"
        name={"long_description"}
      >
        <Input
          defaultValue={oldProduct.long_description}
          size="large"
          placeholder="Text"
        ></Input>
      </Form.Item>
      <Form.Item
        initialValue={oldProduct.price}
        required
        rules={[{ required: true, message: "Please input the product price" }]}
        label="Price"
        name={"price"}
      >
        <Input
          defaultValue={oldProduct.price}
          size="large"
          type="number"
          placeholder="Text"
        ></Input>
      </Form.Item>
      <Form.Item
        initialValue={oldProduct.category_id}
        required
        rules={[
          { required: true, message: "Please input the product category" },
        ]}
        label="Category"
        name={"category_id"}
      >
        <Select
          defaultValue={oldProduct.category_id}
          size="large"
          options={optionsArray}
        />
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

export default ProductsEditForm;
