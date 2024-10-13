"use client";

import React, { useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import getBase64 from "@/lib/helper/getBase64";
import { MessageInstance } from "antd/es/message/interface";
import Text from "antd/lib/typography/Text";
import useQuizImages from "@/lib/store/useQuizImage";
import { FormInstance } from "antd/lib";
import { ICreateQuizForm } from "./createQuizFrom";
import CreatePackForm, { ICreatePack } from "./createPackForm";
import usePack from "@/lib/store/usePack";
import { IForm } from "./editPackForm";
import base64ToBlob from "@/lib/helper/base64ToBlob";

export type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

type CreateQuizType = {
  type: "question" | "answer";
  messageApi: MessageInstance;
  form: FormInstance<ICreateQuizForm>;
};

type CreatePackType = {
  type: "packCover";
  messageApi: MessageInstance;
  form: FormInstance<ICreatePack | any>;
};

const UploadImage = ({
  messageApi,
  type,
  form,
}: CreatePackType | CreateQuizType) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [error, setError] = useState<string>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const ref = useRef<UploadFile<any>>();

  const { setQuestionImage, setAnswerImage, questionImage, answerImage } =
    useQuizImages();
  const { setPackCover, packCover } = usePack();

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
    } else if (type === "answer") {
      setAnswerImage(file);
      form.setFieldValue("answerImage", file);
    } else if (type === "packCover") {
      setPackCover(file);
      form.setFieldValue("packCover", file);
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
      console.log(questionImage)
      setQuestionImage(null);
      form.resetFields(["questionImage"]);
    } else if (type === "answer") {
      setAnswerImage(null);
      form.resetFields(["answerImage"]);
    } else if (type === "packCover") {
      setPackCover(null);
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  useEffect(() => {
    if (packCover === null && type === "packCover") {
      setFileList([]);
      setPreviewImage("");
    }

    if (questionImage === null && type === "question") {
      setFileList([]);
      setPreviewImage("");
    }

    if (answerImage === null && type === "answer") {
      setFileList([]);
      setPreviewImage("");
    }
  }, [packCover, questionImage, answerImage]);

  return (
    <>
      <Upload
        ref={ref}
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
          alt={`${type}-image`}
          src={previewImage}
        />
      )}
    </>
  );
};

export default UploadImage;
