"use server";

import { ICreatePack } from "@/components/createPackForm";
import { UploadFile } from "antd";
import { cookies } from "next/headers";
import { ActionResultType } from "./createQuizAction";

const CreatePackAction = async (
  data: ICreatePack,
  packCover: Blob
): Promise<ActionResultType> => {
  const { description, isFree, level, title, category } = data;
  const sessionId = (await cookies()).get("sessionId")?.value ?? "";

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("isFree", `${isFree}`);
  formData.append("level", level);
  formData.append("coverPack", packCover);
  formData.append("category", category);
  formData.append("sessionId", sessionId);

  try {
    const response = await fetch(`${process.env.API}/packs`, {
      method: "POST",
      cache: "no-cache",
      body: formData,
    });

    if (!response.ok) {
      const { message } = await response.json();
      return { isError: true, message };
    }

    const pack = await response.json();
    return {
      isError: false,
      message: `Pack With ID: ${pack.id} and Title: ${pack.title} was created!`,
    };
  } catch (err) {
    console.log(err);
    return { isError: true, message: "Faild Fetch" };
  }
};

export default CreatePackAction;
