"use server";

import { ICreateQuizForm } from "@/components/createQuizFrom";
import { UploadFile } from "antd";
import { cookies } from "next/headers";

export type ActionResultType = { isError: boolean; message: string };
const CreateQuizAction = async ({
  quizFormData,
  answerImage,
  options,
  questionImage,
  packId,
}: {
  quizFormData: ICreateQuizForm;
  questionImage: UploadFile;
  options: string[];
  answerImage: UploadFile;
  packId: string;
}): Promise<ActionResultType> => {
  let result: ActionResultType = { isError: false, message: "" };

  const cookie = (await cookies()).get("session")?.value ?? "";
  const { currentAccountId } = JSON.parse(cookie);

  const { option, ...restValues } = quizFormData;
  const { answer, description, questionText, title } = { ...restValues };

  const questionImageFile = new File([], questionImage.name, {
    type: questionImage.type,
    lastModified: questionImage.lastModified,
  });

  const answerImageFile = new File([], answerImage.name, {
    type: answerImage.type,
    lastModified: answerImage.lastModified,
  });

  //create formData
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("answer", answer);
  formData.append("options", options.join(","));
  formData.append("questionText", questionText);
  formData.append("questionImage", questionImageFile);
  formData.append("answerImage", answerImageFile);
  formData.append("packId", packId);
  formData.append("creatorId", currentAccountId);

  try {
    const response = await fetch(`${process.env.API}/quizzes`, {
      method: "POST",
      cache: "no-cache",
      body: formData,
    });

    console.log(response);
    if (!response.ok) {
      const { message } = await response.json();
      return { isError: true, message };
    }

    return { isError: false, message: "Quiz Created" };
  } catch (err) {
    return { isError: true, message: "Faild To Fetch" };
  }
};

export default CreateQuizAction;
