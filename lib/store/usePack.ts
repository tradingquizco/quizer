import { UploadFile } from "antd";
import { create } from "zustand";
import Cookies from "js-cookie";
import { FileType } from "@/components/upload";
export interface IPack {
  id: string;
  title: string;
  username: string;
  quizNumber: number;
}
interface IUsePack {
  //States
  packCover: FileType | null;
  packId: string | null;
  packs: IPack[] | null;
  myPacks: any | null;
  isPublic: boolean;
  //Actinos
  setPackId: (id: string | null) => void;
  setPackCover: (file: FileType | null) => void;
  getAllPacks: () => void;
  getMyAccountPack: () => void;
  togglePublic: (packId: string, newValue: boolean) => void;
}

const usePack = create<IUsePack>((set, get) => ({
  packId: null,
  setPackId: (packId) => set(() => ({ packId })),

  packCover: null,
  setPackCover: (file) => set(() => ({ packCover: file })),

  packs: null,
  getAllPacks: async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/packs`);
      const packs = (await response.json()) as IPack[];
      return set(() => ({ packs }));
    } catch (err) {
      console.log("Error while getting Packs: " + err);
      return set(() => ({ packs: [] }));
    }
  },

  myPacks: null,
  getMyAccountPack: async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/packs`
      );

      if(!response.ok) {
        console.log(response);
        return;
      }
      const myPacks = (await response.json()) as any;
      return set(() => ({ myPacks }));
    } catch (err: any) {
      console.log("Error while getting Packs: " + err);
      return set(() => ({ myPacks: [] }));
    }
  },

  isPublic: false,
  togglePublic: async (packId, newValue) => {
    // const body = new FormData();

    // body.append("public", `${get().isPublic}`);
    // try {
    //   const response = await fetch(
    //     `${process.env.NEXT_PUBLIC_API}/packs/update/${packId}`,
    //     {
    //       method: "PATCH",
    //       body,
    //     }
    //   );

    //   if (response.ok) {
    //     set(() => ({ isPublic: newValue }));
    //   }
    //   set(() => ({ isPublic: get().isPublic }));
    // } catch (err) {
    //   set(() => ({ isPublic: get().isPublic }));
    // }
  },
}));

export default usePack;
