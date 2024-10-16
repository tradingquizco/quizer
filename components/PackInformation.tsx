import React from "react";
import { IPack } from "./PackCard";
import { Button, Flex } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/es/typography/Title";
import {
  InfoCircleFilled,
  InfoCircleOutlined,
  InfoCircleTwoTone,
} from "@ant-design/icons";

const PackInformation = ({ pack }: { pack: IPack }) => {
  return (
    <Flex vertical className="text-sm w-full">
      <Text type="secondary">
        <span className="text-primary text-lg">Category</span> - {pack.category}
      </Text>

        <Text type="secondary">
          <span className="text-primary text-lg">Level</span> - {pack.level}
        </Text>

      <Text type="secondary">
        <span className="text-primary text-lg">Quizzes</span> - {pack.quizNumber}
      </Text>
      <Text type="secondary">
        <span className="text-primary text-lg">isFree</span> -{" "}
        {pack.isFree ? "Yes" : "No"}
      </Text>
      <Text type="secondary">
        <span className="text-primary text-lg">Price</span> - {pack.price}
      </Text>
    </Flex>
  );
};

export default PackInformation;
