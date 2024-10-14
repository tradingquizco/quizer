"use client";

import useQuiz from "@/lib/store/useQuiz";
import { IQuizOfPack } from "@/types";
import {
  DeleteFilled,
  DeleteOutlined,
  EditFilled,
  EditOutlined,
} from "@ant-design/icons";
import {
  Button,
  Drawer,
  Flex,
  Image,
  Table,
  TableColumnsType,
  Tooltip,
} from "antd";
import React, { ReactNode, startTransition, useEffect, useState } from "react";
import EditQuizForm from "./editQuizForm";
import useMessage from "antd/lib/message/useMessage";

interface IQuizType {
  key: string | null;
  title: string | null;
  creator: string | null;
  questionImage: string | null | ReactNode;
  answerImage: string | null | ReactNode;
  packId: string | number | null;
}

const QuizTable = ({
  loading,
  data,
}: {
  data?: IQuizOfPack[];
  loading?: boolean;
}) => {
  const [openEditQuiz, setOpenEditQuiz] = useState<boolean>();
  const [currentQuizId, setCurrentQuizId] = useState<string>();
  const [messageApi, context] = useMessage();

  const deleteQuiz = (id: string) => {
    startTransition(async () => {
      try {
        messageApi.loading("Deletting...")
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/quizzes/${id}`,
          { method: "DELETE" }
        );

        const { message } = await response.json();
        if (!response.ok) {
          messageApi.error(message);
        } else {
          messageApi.success(message);
        }
      } catch (err) {
        messageApi.error("Faild To Fetch");
      }
    });
  };

  const columns: TableColumnsType<IQuizOfPack> = [
    { title: "Title", dataIndex: "title", key: "name" },
    { title: "Username", dataIndex: "username", key: "creator" },
    {
      title: "Question Image",
      dataIndex: "questionImgUrl",
      render: (value) => (
        <Tooltip title={<Image src={`${process.env.NEXT_PUBLIC_BASE_IMAGES_URL}/${value}`} />}>
          Quetion Image
        </Tooltip>
      ),
    },
    {
      title: "Answer Image",
      dataIndex: "answerImgUrl",
      render: (value) => (
        <Tooltip title={<Image src={`${process.env.NEXT_PUBLIC_BASE_IMAGES_URL}/${value}`} />}>
          Answer Image
        </Tooltip>
      ),
    },
    { title: "PackID", dataIndex: "packId", key: "packId" },
    {
      title: "Action",
      width: 20,
      render: (value) => {
        return (
          <Flex gap={5}>
            <Button
              icon={<EditOutlined />}
              type="dashed"
              onClick={() => {
                setOpenEditQuiz(true);
                setCurrentQuizId(value.id);
              }}
            />
            <Button
              icon={<DeleteOutlined />}
              type="dashed"
              danger
              onClick={async () => {deleteQuiz(value.id)}}
            />
          </Flex>
        );
      },
    },
  ];

  return (
    <Flex
      className="h-full w-[90%] mx-auto min-w-[700px]"
      align="center"
      justify="center"
    >
      {context}
      <Drawer
        onClose={() => setOpenEditQuiz(false)}
        open={openEditQuiz}
        title={"Edit Quiz"}
      >
        <EditQuizForm
          quiz={data?.find((quiz) => quiz.id === currentQuizId) ?? null}
        />
      </Drawer>
      <Table
        columns={columns}
        dataSource={data ?? []}
        className="w-full"
        virtual
        size="middle"
        pagination={{ pageSize: 10 }}
        loading={loading}
      />
    </Flex>
  );
};

export default QuizTable;
