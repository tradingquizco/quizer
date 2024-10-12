"use client";

import useQuiz from "@/lib/store/useQuiz";
import { Button, Divider, Form, Input, message, Spin, Switch } from "antd";
import { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import Radio, { Group } from "antd/es/radio";
import Title from "antd/es/typography/Title";
import React, { useState, useTransition } from "react";
import DraggerImage from "./dragger";
import { MessageInstance } from "antd/es/message/interface";
import UploadImage from "./upload";
import { UploadFile } from "antd/lib";
import usePack from "@/lib/store/usePack";
import CreatePackAction from "@/lib/createPackAction";

export interface ICreatePack {
  title: string;
  description: string;
  quizNumber: number;
  isFree: boolean;
  level: "hard" | "easy" | "medium";
  packCover: UploadFile;
}

const CreatePackForm = ({ messageApi }: { messageApi: MessageInstance }) => {
  const [loading, startTransition] = useTransition();

  const { setPackFormdData } = useQuiz();
  const { packCover, setPackCover } = usePack();
  const [form] = useForm<ICreatePack>();

  const handleSubmit = (data: ICreatePack) => {
    if (!packCover) return messageApi.error("Please Provider Cover For Pack");

    startTransition(async () => {
      const { isError, message } = await CreatePackAction(data, packCover);
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
        <FormItem
          label="Level Of Pack"
          name="level"
          rules={[{ required: true }]}
        >
          <Group>
            <Radio value={"easy"}>Easy</Radio>
            <Radio value={"medium"}>Medium</Radio>
            <Radio value={"hard"}>Hard</Radio>
          </Group>
        </FormItem>
        <FormItem label="Free" name="isFree" rules={[{ required: true }]}>
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
