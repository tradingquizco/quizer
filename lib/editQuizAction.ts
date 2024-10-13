"use server";

import { ICreateQuizForm } from "@/components/createQuizFrom";
import { ActionResultType } from "./createQuizAction";

const EditQuizAction = async ({
  id,
  answerBlob,
  questionBlob,
  value,
  options,
  answer,
}: {
  id: string;
  value: ICreateQuizForm;
  questionBlob: Blob;
  answerBlob: Blob;
  answer: string;
  options: string[];
}): Promise<ActionResultType> => {
  const body = new FormData();

  console.log(value.answer);
  Object.entries(value).forEach(([key, val]) => {
    body.append(key, val as string);
  });
  body.append("options", options.join(","));
  body.append('answer', answer)

  if (questionBlob) {
    body.append("questionImage", questionBlob);
  }

  if (answerBlob) {
    body.append("answerImage", answerBlob);
  }

  try {
    const resposne = await fetch(`${process.env.API}/quizzes/update/${id}`, {
      method: "PATCH",
      body,
    });

    if (!resposne.ok) {
      const { message } = await resposne.json();
      return { isError: true, message };
    }

    return { isError: false, message: "Changes Was Saved!" };
  } catch (err) {
    return { isError: true, message: "Fetch Faild" };
  }
};

export default EditQuizAction;
