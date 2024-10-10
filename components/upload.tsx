"use client";

import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import getBase64 from "@/lib/helper/getBase64";
import { MessageInstance } from "antd/es/message/interface";
import Text from "antd/lib/typography/Text";
import useQuizImages from "@/lib/store/quizImagsStore";
import { FormInstance } from "antd/lib";
import { ICreateQuizForm } from "./createQuizFrom";

export type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

interface IUploadImage {
  type: "question" | "answer";
  messageApi: MessageInstance;
  form: FormInstance<ICreateQuizForm>;
}

const UploadImage = ({ messageApi, type, form }: IUploadImage) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [error, setError] = useState<string>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { setQuestionImage, setAnswerImage } = useQuizImages();

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      messageApi.error("You can only upload JPG/PNG file!");
      setError("You can only upload JPG/PNG file!");
      return false;
    }

    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      messageApi.error("Image must be smaller than 5MB!");
      setError("Image must be smaller than 5MB!");
      return true;
    }

    if (type === "question") {
      setQuestionImage(file);
      form.setFieldValue("questionImage", file);
    } else {
      setAnswerImage(file);
      form.setFieldValue("answerImage", file);
    }
    setError("");

    return true;
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    if (!error) {
      setPreviewImage(file.url || (file.preview as string));
      setPreviewOpen(true);
    }
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(error ? [] : newFileList);
  };

  const handleRemove = () => {
    if (type === "question") {
      setQuestionImage(null);
      form.resetFields(['questionImage']);
    } else {
      setAnswerImage(null);
      form.resetFields(['answerImage']);
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  useEffect(() => {
    if (fileList.length === 1) {
    }
  }, [fileList.length]);

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={beforeUpload}
        onRemove={handleRemove}
        maxCount={1}
        accept="image/png, image/jpeg"
      >
        {fileList.length === 0 && uploadButton}
      </Upload>
      {error && <Text type="danger">{error}</Text>}
      {previewOpen && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default UploadImage;
