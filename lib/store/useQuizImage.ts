import { FileType } from "@/components/upload";
import { UploadFile } from "antd";
import { create } from "zustand";

interface IUseQuizImages {
  questionImage: FileType | null;
  answerImage: FileType | null;

  setQuestionImage: (file: FileType | null) => void;
  setAnswerImage: (file: FileType | null ) => void;
}

const useQuizImages = create<IUseQuizImages>((set, get) => ({
  answerImage: null,
  questionImage: null,
  setAnswerImage: (file) => set((state) => ({ ...state, answerImage: file })),
  setQuestionImage: (file) => set((state) => ({ ...state, questionImage: file })),
}));


export default useQuizImages
