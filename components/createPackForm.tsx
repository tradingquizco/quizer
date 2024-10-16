"use client";

import useQuiz from "@/lib/store/useQuiz";
import {
  Button,
  Divider,
  Flex,
  Form,
  Input,
  message,
  Select,
  Spin,
  Switch,
} from "antd";
import { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import Radio, { Group } from "antd/es/radio";
import Title from "antd/es/typography/Title";
import React, { useEffect, useState, useTransition } from "react";
import DraggerImage from "./dragger";
import { MessageInstance } from "antd/es/message/interface";
import UploadImage from "./upload";
import { UploadFile } from "antd/lib";
import usePack from "@/lib/store/usePack";
import CreatePackAction from "@/lib/createPackAction";
import base64ToBlob from "@/lib/helper/base64ToBlob";

export interface ICreatePack {
  title: string;
  description: string;
  quizNumber: number;
  isFree: boolean;
  level: "hard" | "easy" | "medium";
  category: "Technical Analysis" | "Smart Money";
  packCover: UploadFile;
}

const CreatePackForm = ({ messageApi }: { messageApi: MessageInstance }) => {
  const [loading, startTransition] = useTransition();

  const { setPackFormdData } = useQuiz();
  const { packCover, setPackCover } = usePack();
  const [form] = useForm<ICreatePack>();

  const handleSubmit = async (data: ICreatePack) => {
    if (!packCover) return messageApi.error("Please Provider Cover For Pack");

    const packCoverBlob = await base64ToBlob(packCover);
    startTransition(async () => {
      const { isError, message } = await CreatePackAction(data, packCoverBlob);
      if (isError) {
        messageApi.error(message);
      } else {
        messageApi.success(message);
        setPackFormdData(null);
        setPackCover(null);
        form.resetFields([
          "description",
          "isFree",
          "level",
          "packCover",
          "quizNumber",
          "title",
        ]);
      }
    });
  };

  useEffect(() => {
    form.setFieldValue('isFree', true);
    form.setFieldValue("level", "easy");
    form.setFieldValue("category", "Technical Analysis");
  }, []);

  return (
    <div className="w-full md:w-1/2 flex items-center justify-center mx-auto mt-10 flex-col">
      <Divider className="!w-3/4">
        <Title>Create Pack</Title>
      </Divider>

      <Form
        variant="filled"
        form={form}
        layout="vertical"
        validateTrigger="onBlur"
        className="mt-5 w-full"
        onFinish={handleSubmit}
      >
        <FormItem
          label="Title"
          name="title"
          rules={[{ required: true, message: "Title is required", min: 3 }]}
        >
          <Input placeholder="Title" />
        </FormItem>

        <FormItem
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Description is required", min: 3 },
          ]}
        >
          <TextArea placeholder="Description" maxLength={250} rows={3} />
        </FormItem>
        <Flex className="w-full" justify="center" gap={12}>
          <FormItem label="Level Of Pack" name="level" className="flex-1">
            <Select
              defaultValue="Easy"
              options={[
                { value: "easy", label: "Easy" },
                { value: "medium", label: "Medium" },
                { value: "hard", label: "Hard" },
              ]}
            />
          </FormItem>
          <FormItem label="Category" name="category" className="flex-1">
            <Select
              defaultValue="Technical Analysis"
              options={[
                { value: "Technical Analysis", label: "Technical Analysis" },
                { value: "Smart Money", label: "Smart Money" },
              ]}
            />
          </FormItem>
        </Flex>
        <FormItem label="Free" name="isFree">
          <Switch />
        </FormItem>
        <FormItem label="Pack Cover" name="cover">
          <UploadImage form={form} messageApi={messageApi} type="packCover" />
        </FormItem>
        <FormItem>
          <Spin spinning={loading}>
            <Button
              type="primary"
              color="primary"
              variant="filled"
              className="w-full"
              htmlType="submit"
            >
              Create Pack
            </Button>
          </Spin>
        </FormItem>
      </Form>
    </div>
  );
};

export default CreatePackForm;
