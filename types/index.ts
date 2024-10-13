import { Interface } from "readline";

export type LoginActionResult = {
  isError: boolean;
  message: string;
};


export interface IQuizOfPack {
  id: string,
  title: string,
  description: string,
  questionImgUrl: string,
  answerImgUrl:string,
  options: string,
  answer: string,
  username: string,
  creatorId: string,
  questionText: string,
  account: {
    username: string
  }
}