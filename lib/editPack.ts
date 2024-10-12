"use server";

import { IForm } from "@/components/editPackForm";
import { ActionResultType } from "./createQuizAction";
import { UploadFile } from "antd";
import { revalidatePath } from "next/cache";

const EditPackAction = async ({
    id,
  packCover,
  value,
}: {
    id: string,
  value: IForm;
  packCover: UploadFile | null;
}): Promise<ActionResultType> => {
  const body = new FormData();
  Object.entries(value).forEach(([key, val]) => {
    body.append(key, val as string);
  });

  if(packCover) {
    const coverFile = new File([], packCover.name, {
        type: packCover.type,
        lastModified: packCover.lastModified
    });
    body.append("coverPack", coverFile)
  };

  try {
    const response = await fetch(`${process.env.API}/packs/update/${id}`, {
        method: "PATCH",
        body
    });

    if(!response.ok){
        const { message } = await response.json();
        return {isError: true, message}
    }

    revalidatePath("/my-stuff")
    return {isError: false, message: "Changes Was Saved!"}
  } catch(err) {
    console.log(err);
    return {isError: true, message: "Faild to Fetch"}
  }
};

export default EditPackAction;
