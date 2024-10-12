"use client";

import React, { useEffect, useState, useTransition } from "react";
import { IPack } from "./PackCard";
import { useForm } from "antd/es/form/Form";
import { Button, Form, Input, message, Spin, Switch } from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import { Group } from "antd/lib/radio";
import { Radio } from "antd";
import UploadImage from "./upload";
import usePack from "@/lib/store/usePack";
import EditPackAction from "@/lib/editPack";
import { useRouter } from "next/navigation";

export interface IForm {
  title: string;
  description: string;
  level: string;
  price: number;
  isFree: string | boolean;
}

const EditPackForm = ({ pack }: { pack: IPack }) => {
  const [loading, startTransition] = useTransition();
  const [messageApi, context] = message.useMessage();
  const [form] = useForm<IForm>();
  const { packCover, setPackCover } = usePack();
  const [initialValues, setInitialValues] = useState<IForm | null>(null);
  const { refresh } = useRouter();

  const handleSubmit = (value: IForm) => {
    const changedFields = Object.keys(value).reduce((acc: any, key: string) => {
      if (
        initialValues &&
        value[key as keyof IForm] !== initialValues[key as keyof IForm]
      ) {
        acc[key] = value[key as keyof IForm];
      }
      return acc;
    }, {} as Partial<IForm>);

    startTransition(async () => {
      const result = await EditPackAction({
        id: pack.id,
        value: changedFields,
        packCover,
      });

      if (result.isError) {
        messageApi.error(result.message);
      } else {
        refresh();
        messageApi.success(result.message);
        setPackCover(null);
      }
    });
  };

  useEffect(() => {
    const initialFormValues: IForm = {
      description: pack.description,
      title: pack.title,
      isFree: pack.isFree,
      level: pack.level,
      price: pack.price,
    };

    form.setFieldsValue(initialFormValues);
    setInitialValues(initialFormValues); // Save initial values when component mounts
  }, [pack, form]);

  return (
    <>
      {context}
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
              Save Changes
            </Button>
          </Spin>
        </FormItem>
      </Form>
    </>
  );
};

export default EditPackForm;
