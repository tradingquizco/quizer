"use client";

import {
  Button,
  Divider,
  Form,
  Input,
  message,
  Spin,
  Radio,
  Typography,
  FormInstance,
  Flex,
} from "antd";
import React, { useState, useTransition } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import UploadImage from "./upload";
import { MessageInstance } from "antd/es/message/interface";
import FormItem from "antd/es/form/FormItem";
import useQuizImages from "@/lib/store/useQuizImage";
import { UploadFile } from "antd/lib";
import useQuiz from "@/lib/store/useQuiz";
import { Group } from "antd/es/radio";
import CreateQuizAction from "@/lib/createQuizAction";
import PackBoxes from "./PackBoxes";
import usePack from "@/lib/store/usePack";

const { TextArea } = Input;
const { Title, Text } = Typography;

export interface ICreateQuizForm {
  title: string;
  description: string;
  option: string;
  answer: string;
  questionText: string;
  questionImage: UploadFile;
  answerImage: UploadFile;
}

const CreateQuizForm = ({ messageApi }: { messageApi: MessageInstance }) => {
  const [options, setOptions] = useState<string[]>([]);

  const [loading, startTransition] = useTransition();

  const { answerImage, questionImage, setQuestionImage, setAnswerImage } =
    useQuizImages();
  const { packId, setPackId } = usePack();
  const [form] = Form.useForm<ICreateQuizForm>();

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

  const handleSubmit = (values: ICreateQuizForm) => {
    console.log(packId)
    if (!questionImage)
      return messageApi.error("Please Provide Question Image");
    if (!answerImage) return messageApi.error("Please Provide Answer Image");
    if (!packId) return messageApi.error("Please Add Quiz to Pack");

    startTransition(async () => {
      const { isError, message } = await CreateQuizAction({
        quizFormData: values,
        questionImage,
        answerImage,
        options,
        packId
      });

      if (isError) {
        messageApi.error(message);
      } else {
        messageApi.success(message);
        setQuestionImage(null);
        setAnswerImage(null);
        setPackId(null);
        setOptions([]);
        form.resetFields([
          "answer",
          "answerImage",
          "description",
          "option",
          "questionImage",
          "questionText",
          "title",
        ]);
      }
    });
  };

  return (
    <div className="w-full md:w-1/2 flex items-center justify-center mx-auto mt-10 flex-col">
      <Divider className="!w-3/4">
        <Title>Create Quiz</Title>
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
          label="Question Text"
          name="questionText"
          rules={[
            { required: true, message: "Question Text is required", min: 3 },
          ]}
        >
          <Input placeholder="Question Text" />
        </FormItem>

        <OptionList
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
          rules={[
            { required: true, message: "Description is required", min: 3 },
          ]}
        >
          <TextArea placeholder="Description" maxLength={250} rows={3} />
        </FormItem>

        <FormItem className="w-full">
          <Divider>
            <Title level={3}>Choose Pack</Title>
          </Divider>
          <PackBoxes />
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
              Create Quiz
            </Button>
          </Spin>
        </FormItem>
      </Form>
    </div>
  );
};

const OptionList = ({
  options,
  handleAddOption,
  handleRemoveOption,
  form,
}: {
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

    <FormItem label="Answer" name="answer" rules={[{ required: true }]}>
      <Group className="w-full">
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
  form: FormInstance<ICreateQuizForm>;
}) => (
  <div className="flex justify-between">
    <FormItem
      label="Question Image"
      name="questionImage"
      rules={[{ required: true }]}
    >
      <UploadImage type="question" messageApi={messageApi} form={form} />
    </FormItem>
    <FormItem
      label="Answer Image"
      name="answerImage"
      rules={[{ required: true }]}
    >
      <UploadImage type="answer" messageApi={messageApi} form={form} />
    </FormItem>
  </div>
);

export default CreateQuizForm;
