"use server";

import { ICreateQuizForm } from "@/components/createQuizFrom";
import { UploadFile } from "antd";
import { cookies } from "next/headers";
import getBase64 from "./helper/getBase64";
import { FileType } from "@/components/upload";
import base64ToBlob from "./helper/base64ToBlob";

export type ActionResultType = { isError: boolean; message: string };
const CreateQuizAction = async ({
  quizFormData,
  answerImageFile,
  options,
  questionImageFile,
  packId,
}: {
  quizFormData: ICreateQuizForm;
  questionImageFile: Blob;
  options: string[];
  answerImageFile: Blob;
  packId: string;
}): Promise<ActionResultType> => {
  try {
  const sessionId = (await cookies()).get("sessionId")?.value ?? "";

  const { option, ...restValues } = quizFormData;
  const { answer, description, questionText, title } = { ...restValues };

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
  formData.append("sessionId", sessionId);

    const response = await fetch(`${process.env.API}/quizzes`, {
      method: "POST",
      cache: "no-cache",
      body: formData,
    });

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
