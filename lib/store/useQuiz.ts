import { create } from "zustand";

interface IUseCreate {
  quizFormData: FormData | null;
  packFormData: FormData | null;
  packId: string | null,
  setQuizFormdData: (formdata: FormData | null) => void;
  setPackFormdData: (formdata: FormData | null) => void;
  setPackId: (id: string | null) => void;
}

const useQuiz = create<IUseCreate>((set, get) => ({
  quizFormData: null,
  packFormData: null,
  packId: null,
  setQuizFormdData: (formData) => set((state) => ({quizFormData: formData})),
  setPackFormdData: (formData) => set((state) => ({packFormData: formData})),
  setPackId: (id) => set(state => ({packId: id}))
}));


export default useQuiz