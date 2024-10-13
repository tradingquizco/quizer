"use client";

import QuizTable from "@/components/QuizTable";
import useQuiz from "@/lib/store/useQuiz";
import { useEffect, useState, useTransition } from "react";

type PageProps = {
  params: any
};

export default function Page({ params }: PageProps ) {
  const [loading, startTransition] = useTransition();
  const [quizzes, setQuizzes] = useState<any[]>([]);

  const getPackQuizzes = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/quizzes/pack/${params.packId}`
    );
    if (!response.ok) {
      console.log(response);
    }

    //   console.log(await response.json());
    const packQuiz = await response.json();
    setQuizzes(packQuiz);
};
console.log(quizzes);

  useEffect(() => {
    getPackQuizzes();

    return () => {
      getPackQuizzes();
    };
  }, []);
  return (
    <div className="overflow-x-auto">
      <QuizTable loading={loading} data={quizzes} />
    </div>
  );
}
