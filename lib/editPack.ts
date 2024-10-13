"use server";

import { IForm } from "@/components/editPackForm";
import { ActionResultType } from "./createQuizAction";
import { UploadFile } from "antd";
import { revalidatePath } from "next/cache";
import base64ToBlob from "./helper/base64ToBlob";
import { FileType } from "@/components/upload";

const EditPackAction = async ({
  id,
  coverPack,
  value,
}: {
  id: string;
  value: IForm;
  coverPack: Blob | null;
}): Promise<ActionResultType> => {
  const body = new FormData();
  Object.entries(value).forEach(([key, val]) => {
    body.append(key, val as string);
  });

  if (coverPack) {
    body.append("coverPack", coverPack);
  }

  try {
    const response = await fetch(`${process.env.API}/packs/update/${id}`, {
      method: "PATCH",
      body,
    });

    console.error("responze");
    console.log(response);
    if (!response.ok) {
      const { message } = await response.json();
      return { isError: true, message };
    }

    revalidatePath("/my-stuff");
    return { isError: false, message: "Changes Was Saved!" };
  } catch (err) {
    console.log(err);
    return { isError: true, message: "Faild to Fetch" };
  }
};

export default EditPackAction;
