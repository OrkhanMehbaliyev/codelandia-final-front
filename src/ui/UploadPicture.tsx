import { Upload, UploadFile, UploadProps } from "antd";
import { useState } from "react";
import CustomButton from "./CustomButton";

interface UploadPictureProps {
  handleFileChange: (file: UploadFile<any>) => void;
  isSubmitting?: boolean;
}

const UploadPicture: React.FC<UploadPictureProps> = ({
  handleFileChange,
  isSubmitting = false,
}) => {
  const [fileList, setFileList] = useState<UploadProps["fileList"]>([]);

  const handleFileListChange = ({
    file,
    fileList,
  }: {
    file: UploadFile<any>;
    fileList: UploadProps["fileList"];
  }) => {
    setFileList(fileList);
    handleFileChange(file);
  };

  return (
    <Upload
      beforeUpload={() => false}
      fileList={fileList}
      maxCount={1}
      onChange={handleFileListChange}
    >
      <CustomButton disabled={isSubmitting} type="secondary">
        Upload
      </CustomButton>
    </Upload>
  );
};

export default UploadPicture;
