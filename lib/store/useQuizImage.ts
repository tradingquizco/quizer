import { UploadFile } from "antd";
import { create } from "zustand";

interface IUseQuizImages {
  questionImage: UploadFile | null;
  answerImage: UploadFile | null;

  setQuestionImage: (file: UploadFile | null) => void;
  setAnswerImage: (file: UploadFile | null ) => void;
}

const useQuizImages = create<IUseQuizImages>((set, get) => ({
  answerImage: null,
  questionImage: null,
  setAnswerImage: (file) => set((state) => ({ ...state, answerImage: file })),
  setQuestionImage: (file) => set((state) => ({ ...state, questionImage: file })),
}));


export default useQuizImages
