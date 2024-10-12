import { UploadFile } from "antd";
import { create } from "zustand";

interface IUsePack {
  packCover: UploadFile | null;
  packId: string | null;
  setPackId: (id: string | null) => void;
  setPackCover: (file: UploadFile | null) => void;
}

const usePack = create<IUsePack>((set, get) => ({
  packCover: null,
  packId: null,
  setPackId: (packId) => set(() => ({ packId })),
  setPackCover: (file) => set((state) => ({ packCover: file })),
}));

export default usePack;
