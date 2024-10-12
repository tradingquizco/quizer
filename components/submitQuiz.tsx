"use client";

import CreateQuizAction from "@/lib/createQuizAction";
import useQuiz from "@/lib/store/useQuiz";
import { Button, Divider, Flex, Spin } from "antd";
import { MessageInstance } from "antd/es/message/interface";
import Text from "antd/es/typography/Text";
import React, { useTransition } from "react";

const SubmitQuiz = ({ messageApi }: { messageApi: MessageInstance }) => {
  const { quizFormData } = useQuiz();
  const [loading, startTransition] = useTransition();

  const onClickHandler = () => {
    // startTransition(async () => {
    //   const { isError, message } = await CreateQuizAction({
    //     quizFormData,
    //   });

    //   if (isError) {
    //     messageApi.error(message);
    //     return;
    //   }
    // });
  };

  return (
    <Flex vertical className="w-full md:w-1/2 mt-5 mx-auto">
      <Divider>
        <Text className="text-sm" type="secondary">
          confirm to Create Quiz and Pack
        </Text>
      </Divider>
      <Spin spinning={loading} className="w-full">
        <Button
          type="primary"
          color="primary"
          variant="filled"
          className="w-full"
          onClick={onClickHandler}
        >
          Create Quiz
        </Button>
      </Spin>
    </Flex>
  );
};

export default SubmitQuiz;
