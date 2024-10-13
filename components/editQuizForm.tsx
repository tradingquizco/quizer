"use client";

import { DeleteOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, message, Radio, Spin } from "antd";
import FormItem from "antd/es/form/FormItem";
import { MessageInstance } from "antd/es/message/interface";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import { FormInstance } from "antd/lib";
import { useForm } from "antd/lib/form/Form";
import { Group } from "antd/lib/radio";
import React, { useEffect, useState, useTransition } from "react";
import UploadImage from "./upload";
import TextArea from "antd/es/input/TextArea";
import PackBoxes from "./PackBoxes";
import { IQuizOfPack } from "@/types";
import { ICreateQuizForm } from "./createQuizFrom";
import EditQuizAction from "@/lib/editQuizAction";
import useQuizImages from "@/lib/store/useQuizImage";
import base64ToBlob from "@/lib/helper/base64ToBlob";

const EditQuizForm = ({ quiz }: { quiz: IQuizOfPack | null }) => {
  const [options, setOptions] = useState<string[]>([]);
  const [initialValues, setInitialValues] = useState<{
    title: string;
    description: string;
    answer: string;
    questionText: string;
  }>();
  const [loading, startTransition] = useTransition();
  const { answerImage, questionImage } = useQuizImages();

  const [form] = useForm<ICreateQuizForm>();
  const [messageApi, context] = message.useMessage();

  const handleAddOption = () => {
    const option = form.getFieldValue("option");
    if (!option) return messageApi.error("Please Enter Option");

    if (options.includes(option)) {
      messageApi.warning("Option Already Added");
      return;
    }
    setOptions([...options, option]);
    form.resetFields(["option"]);
  };

  const handleRemoveOption = (option: string) => {
    setOptions(options.filter((opt) => opt !== option));
  };

  const handleSubmit = async (value: ICreateQuizForm) => {
    alert("");
    const changedFields = Object.keys(value).reduce((acc: any, key: string) => {
      if (
        initialValues &&
        value[key as keyof ICreateQuizForm] !==
          initialValues[
            key as keyof {
              title: string;
              description: string;
              answer: string;
              questionText: string;
            }
          ]
      ) {
        acc[key] = value[key as keyof ICreateQuizForm];
      }
      return acc;
    }, {} as Partial<ICreateQuizForm>);

    let questionBlob: Blob, answerBlob: Blob;

    if (questionImage) {
      questionBlob = await base64ToBlob(questionImage);
    }

    if (answerImage) {
      answerBlob = await base64ToBlob(answerImage);
    }

    startTransition(async () => {
      const { isError, message } = await EditQuizAction({
        id: quiz?.id ?? "",
        value: changedFields,
        answerBlob,
        questionBlob,
        answer: "",
        options,
      });

      if (isError) {
        messageApi.error(message);
      } else {
        messageApi.success(message);
      }
    });
  };

  useEffect(() => {
    setInitialValues({
      title: quiz?.title ?? "",
      description: quiz?.description ?? "",
      answer: quiz?.answer ?? "",
      questionText: quiz?.questionText ?? "",
    });

    setOptions(quiz?.options.split(",") ?? []);

    form.setFieldsValue({
      title: quiz?.title ?? "",
      description: quiz?.description ?? "",
      answer: quiz?.answer ?? "",
      questionText: quiz?.questionText ?? "",
    });
  }, []);

  return (
    <Form
      variant="filled"
      form={form}
      layout="vertical"
      validateTrigger="onBlur"
      className="mt-5 w-full"
      onFinish={handleSubmit}
    >
      {context}
      <FormItem
        label="Title"
        name="title"
        rules={[{ message: "Title is required", min: 3 }]}
      >
        <Input placeholder="Title" />
      </FormItem>

      <FormItem
        label="Question Text"
        name="questionText"
        rules={[{ message: "Question Text is required", min: 3 }]}
      >
        <Input placeholder="Question Text" />
      </FormItem>

      <OptionList
        answer={quiz?.answer ?? ""}
        options={options}
        handleAddOption={handleAddOption}
        handleRemoveOption={handleRemoveOption}
        form={form}
      />

      <Divider dashed>
        <Text type="secondary">Images</Text>
      </Divider>

      <ImageUploadSection messageApi={messageApi} form={form} />

      <FormItem
        label="Description"
        name="description"
        rules={[{ message: "Description is required", min: 3 }]}
      >
        <TextArea placeholder="Description" maxLength={250} rows={3} />
      </FormItem>
      <FormItem>
        <Spin spinning={loading} className="w-full">
          <Button
            type="primary"
            color="primary"
            variant="filled"
            className="w-full"
            htmlType="submit"
          >
            Save Changes
          </Button>
        </Spin>
      </FormItem>
    </Form>
  );
};

const OptionList = ({
  answer,
  options,
  handleAddOption,
  handleRemoveOption,
}: {
  answer: string;
  options: string[];
  handleAddOption: () => void;
  handleRemoveOption: (option: string) => void;
  form: any;
}) => (
  <>
    <FormItem label="Option" name="option">
      <div className="flex gap-2">
        <Input placeholder="Enter Option" />
        <Button onClick={handleAddOption}>Add Option</Button>
      </div>
    </FormItem>

    <FormItem label="Answer" name="answer">
      <Group
        className="w-full"
        defaultValue={answer}
      >
        <div className="flex flex-wrap gap-2">
          {options.length > 0 ? (
            options.map((option) => (
              <div
                key={option}
                className="flex items-center gap-2 bg-gray-100 p-2 rounded-md"
              >
                <Radio value={option}>{option}</Radio>
                <Button
                  icon={<DeleteOutlined />}
                  type="link"
                  danger
                  onClick={() => handleRemoveOption(option)}
                />
              </div>
            ))
          ) : (
            <Text type="secondary">No Options Added Yet</Text>
          )}
        </div>
      </Group>
    </FormItem>
  </>
);

const ImageUploadSection = ({
  messageApi,
  form,
}: {
  messageApi: MessageInstance;
  form: FormInstance<any>;
}) => (
  <div className="flex justify-between">
    <FormItem label="Question Image" name="questionImage">
      <UploadImage type="question" messageApi={messageApi} form={form} />
    </FormItem>
    <FormItem label="Answer Image" name="answerImage">
      <UploadImage type="answer" messageApi={messageApi} form={form} />
    </FormItem>
  </div>
);

export default EditQuizForm;
