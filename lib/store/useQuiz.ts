import { IQuizOfPack } from "@/types";
import { create } from "zustand";

interface IUseCreate {
  quizFormData: FormData | null;
  packFormData: FormData | null;
  packId: string | null;
  packQuizzes: IQuizOfPack[] | null;
  setPackQuizzes: (packId: string) => void;
  setQuizFormdData: (formdata: FormData | null) => void;
  setPackFormdData: (formdata: FormData | null) => void;
  setPackId: (id: string | null) => void;
}

const useQuiz = create<IUseCreate>((set, get) => ({
  quizFormData: null,
  packFormData: null,
  packId: null,
  packQuizzes: [],
  setPackQuizzes: async (packId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/quizzes/pack/${packId}`
      );

      console.log(response);
      if (response.ok) {
        const quizzes = await response.json();
        console.log(quizzes)

        set(() => ({ packQuizzes: quizzes }));
        console.log(get().packQuizzes)
      }
      set(() => ({ packQuizzes: [] }));
    } catch (err) {
      set(() => ({ packQuizzes: [] }));
    }
  },
  setQuizFormdData: (formData) => set((state) => ({ quizFormData: formData })),
  setPackFormdData: (formData) => set((state) => ({ packFormData: formData })),
  setPackId: (id) => set((state) => ({ packId: id })),
}));

export default useQuiz;
