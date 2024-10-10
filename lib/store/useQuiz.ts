import { create } from "zustand";

interface IUseCreate {
  quizFormData: FormData | null;
  setQuizFormdData: (formdata: FormData | null) => void;
}

const useQuiz = create<IUseCreate>((set, get) => ({
  quizFormData: null,
  setQuizFormdData: (formData) => set((state) => ({quizFormData: formData})),
}));


export default useQuiz