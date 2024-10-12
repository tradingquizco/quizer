"use server";

import { ICreatePack } from "@/components/createPackForm";
import { UploadFile } from "antd";
import { cookies } from "next/headers";
import { ActionResultType } from "./createQuizAction";

const CreatePackAction = async (
  data: ICreatePack,
  packCover: UploadFile
): Promise<ActionResultType> => {
  const { description, isFree, level, title } = data;
  const cookie = (await cookies()).get("session")?.value ?? "";

  const { currentAccountId, email } = await JSON.parse(cookie);

  const coverFile = new File([], packCover.name, {
    type: packCover?.type,
    lastModified: packCover?.lastModified,
  });

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("isFree", isFree.toString());
  formData.append("level", level);
  formData.append("price", "0");
  formData.append("coverPack", coverFile);
  formData.append("creatorId", currentAccountId);

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
